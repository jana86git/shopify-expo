import { View, Image, Text, TouchableOpacity } from "react-native"
import { colors } from "../../styles/colors"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { addToWishlist, removeFromWishlist, initWishlist } from "../../data/slices/productPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductCard } from "../product_cards/ProductCard";
export default function PopularProducts({ products, loading }) {
    const { wishlist } = useSelector((state) => state.productPageData)
    const dispatch = useDispatch()

    
    function renderItem({ item }) {
        return (
            <View >
            <ProductCard product={item} wishlist={wishlist} dispatch={dispatch} />
            </View>
        )
    }



    return (
        <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16, color: colors.dark2 }}>Popular Products</Text>
            {!loading ? <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {products && products?.map((product, key) => {

                    return (
                        <View style={{ width: "49%", backgroundColor:colors?.light2, marginBottom:10, borderRadius:8 }} key={key}>
                            <ProductCard product={product} wishlist={wishlist} dispatch={dispatch} key={key} />
                        </View>
                    )
                })}
            </View> : <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[0, 1, 2, 3].map((key) => {

                    return (
                        <ProductCardSkeleton key={key} />
                    )
                })}
            </View>}
        </View>
    )
}

// export function ProductCard({ product, wishlist, dispatch }) {
//     const [heartType, setHeartType] = useState("hearto"); //hearto, heart
//     const [heartColor, setHeartColor] = useState("black");




//    async function toggleAddWishlist(id) {
//         if (heartType === "hearto") {

//             console.log(">>>>>>>>>>>>>>>>>>>>> adding to wishlist")
//             dispatch(addToWishlist(id))
//             let wishes = [...wishlist, id];
//             // console.log(wishes);

//             await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
//             console.log("Added to wishlist ")
//         } else {

//             // console.log(">>>>>>>>>>>>>>>>>>>>> removing from wishlist")
//             dispatch(removeFromWishlist(id));
//             let wishes = wishlist.filter(item => item !== id);
//             // console.log(wishes);
//             await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
//             // console.log("Removed from wishlist ")
//         }
//     }

//     useEffect(() => {
//         console.log(">>>>>>>>>>>>>>>>>>>>> wishlist triggered 2",wishlist,wishlist.includes(product?.id))
//      if(wishlist.includes(product?.id)){
//         setHeartType("heart")
//         setHeartColor("red")
//      } else {
//         setHeartType("hearto")
//         setHeartColor("black")
//      }
//     }, [wishlist])


//     return (
//         <TouchableOpacity style={{ width: "48%", backgroundColor: colors.light2, marginBottom: 10, borderRadius: 8 }}  onPress={() => router.navigate(`/screens/product/${encodeURIComponent(product?.id)}`)} >
//             <View style={{ height: 180, marginBottom: 8 }}>
//                 <Image style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 8 }} source={{ uri: product?.featuredImage?.url || product?.images[0]?.url }} />
//                 <TouchableOpacity style={{ position: "absolute", top: 10, right: 10}} onPress={()=>toggleAddWishlist(product?.id)}>
//                     <AntDesign name={heartType} size={18} color={heartColor} />
//                 </TouchableOpacity>
//             </View>
//             <View style={{padding:4}}>
//             <Text style={{color:colors.dark2}}>{product.title}</Text>
//             <View style={style.pricing_wrapper}>
//             <Text style={style.currencyCode}>{product?.priceRange?.maxVariantPrice?.currencyCode}</Text>
//                 <Text style={style.product_price}>{product?.priceRange?.maxVariantPrice?.amount}</Text>
//             </View>
//             </View>

//         </TouchableOpacity>
//     )
// }

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