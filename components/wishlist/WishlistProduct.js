import { View, Image, Text, TouchableOpacity } from "react-native"
import { colors } from "../../styles/colors"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { addToWishlist, removeFromWishlist, initWishlist } from "../../data/slices/productPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";
import Feather from '@expo/vector-icons/Feather';

export default function WishlistProducts({ products, loading }) {

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.productPageData.wishlist);

    function renderItem({ item }) {
        return (
            <View style={{ backgroundColor:colors?.light2, marginBottom:10, borderRadius:8}}>
                <ProductCard product={item} wishlist={wishlist} dispatch={dispatch} />
            </View>
        )
    }



    return (
        <View style={{flex: 1 }}>

            {!loading ? <FlatGrid
                itemDimension={150}
                data={products}
                renderItem={renderItem}
            /> : <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[0, 1, 2, 3].map((key) => {

                    return (
                        <ProductCardSkeleton key={key} />
                    )
                })}
            </View>}
        </View>
    )
}

function ProductCard({ product, dispatch, wishlist }) {



    async function deleteWishlist(id) {

        dispatch(removeFromWishlist(id));
        // console.log(wishlist);
        let wihses = wishlist.filter(item => item !== id);
        // console.log(wihses);
        await AsyncStorage.setItem('wishlist', JSON.stringify(wihses));
    }





    return (
        <TouchableOpacity style={{ width: "100%", backgroundColor: colors.light2, marginBottom: 10, borderRadius: 8 }} onPress={() => router.navigate(`/screens/product/${encodeURIComponent(product?.id)}`)} >
            <View style={{ height: 180, marginBottom: 8 }}>
                <Image style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 8 }} source={{ uri: product?.featuredImage?.url || product?.images[0]?.url }} />
                <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }} onPress={() => deleteWishlist(product?.id)}>
                    <Feather name={"trash-2"} size={18} color={colors.danger} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 4 }}>
                <Text style={{ color: colors.dark2 }}>{product.title}</Text>
                <View style={style.pricing_wrapper}>
                    <Text style={style.currencyCode}>{product?.priceRange?.maxVariantPrice?.currencyCode}</Text>
                    <Text style={style.product_price}>{product?.priceRange?.maxVariantPrice?.amount}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

function ProductCardSkeleton() {
    const [heartType, setHeartType] = useState("hearto"); //hearto, heart
    const [heartColor, setHeartColor] = useState("black");

    function toggleAddWishlist() {
        if (heartType === "hearto") {
            setHeartType("heart")
            setHeartColor("red")
        } else {
            setHeartType("hearto")
            setHeartColor("black")
        }
    }
    return (
        <View style={{ width: "48%", backgroundColor: colors.light2, marginBottom: 10, borderRadius: 8 }} >
            <View style={{ height: 180, marginBottom: 8, backgroundColor: "#ccc" }}>

            </View>
            <View style={{ padding: 4 }}>
                <Text style={{ backgroundColor: colors.light, width: "100%" }}></Text>
                <View style={{ backgroundColor: "gray", ...style.pricing_wrapper }}>


                </View>
            </View>

        </View>
    )
}


const style = {
    heading: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 10
    },
    pricing_wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    product_wrapper: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",


    },
    image_wrapper: {
        width: "30%",
        height: 80,
        marginRight: "4%"
    },
    description_wrapper: {
        width: "60%"
    },
    product: {
        width: 150,
        marginRight: 10,
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        width: 200,
        backgroundColor: colors.light2,
        padding: 5,
        borderRadius: 8
    },
    product_image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        backgroundColor: colors.light2,
        borderRadius: 8
    },
    product_title: {
        fontSize: 14,
        fontWeight: 700,
        marginTop: 5,
        marginBottom: 5,
        color: colors.dark
    },
    product_price: {
        fontSize: 16,
        fontWeight: 500,
        color: colors.dark2
    },
    compare_product_price: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.info,
        textDecorationLine: "line-through",
        marginRight: 5,
        opacity: 0.7
    },
    currencyCode: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.dark2,
        marginRight: 5,
        opacity: 0.7
    }
}