import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../../styles/colors";
import { useState, useEffect } from "react";
import { addToWishlist, removeFromWishlist } from "../../data/slices/productPageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export function ProductCard({ product, wishlist, dispatch }) {
    const [heartType, setHeartType] = useState("hearto"); //hearto, heart
    const [heartColor, setHeartColor] = useState("black");
   
 
   

   async function toggleAddWishlist(id) {
        if (heartType === "hearto") {
           
            console.log(">>>>>>>>>>>>>>>>>>>>> adding to wishlist")
            dispatch(addToWishlist(id))
            let wishes = [...wishlist, id];
            // console.log(wishes);

            await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
            console.log("Added to wishlist ")
        } else {
        
            // console.log(">>>>>>>>>>>>>>>>>>>>> removing from wishlist")
            dispatch(removeFromWishlist(id));
            let wishes = wishlist.filter(item => item !== id);
            // console.log(wishes);
            await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
            // console.log("Removed from wishlist ")
        }
    }

    useEffect(() => {
        console.log(">>>>>>>>>>>>>>>>>>>>> wishlist triggered 2",wishlist,wishlist.includes(product?.id))
     if(wishlist.includes(product?.id)){
        setHeartType("heart")
        setHeartColor("red")
     } else {
        setHeartType("hearto")
        setHeartColor("black")
     }
    }, [wishlist])

   
    return (
        <TouchableOpacity style={{ width: "100%", backgroundColor: colors.light2, marginBottom: 10, borderRadius: 8 }}  onPress={() => router.navigate(`/screens/product/${encodeURIComponent(product?.id)}`)} >
            <View style={{maxHeight:200, marginBottom: 8 }}>
                <Image style={{ width: "100%", height: "100%", resizeMode: "contain", borderRadius: 8 }} source={{ uri: product?.featuredImage?.url || product?.images[0]?.url }} />
                <TouchableOpacity style={{ position: "absolute", top: 10, right: 10}} onPress={()=>toggleAddWishlist(product?.id)}>
                    <AntDesign name={heartType} size={18} color={heartColor} />
                </TouchableOpacity>
            </View>
            <View style={{padding:4}}>
            <Text style={{color:colors.dark2}}>{product.title}</Text>
            <View style={style.pricing_wrapper}>
            <Text style={style.currencyCode}>{product?.priceRange?.maxVariantPrice?.currencyCode}</Text>
                <Text style={style.product_price}>{product?.priceRange?.maxVariantPrice?.amount}</Text>
            </View>
            </View>
           
        </TouchableOpacity>
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