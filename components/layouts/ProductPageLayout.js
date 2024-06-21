
import { View, SafeAreaView, ScrollView, Pressable, Text, ActivityIndicator, ToastAndroid } from "react-native"
import { layout_structure_style } from "../../styles/layout_structure"
import { colors } from "../../styles/colors"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartInitiator } from "../../api/cart/cartIntiator";

import { cartCreate } from "../../api/cart/createCart";
import { cartLinesAdd } from "../../api/cart/cartLinesAdd";
import { cartFetch } from "../../api/cart/cartFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { setAddingToCart } from "../../data/slices/cartPageSlice";
import { addToWishlist, removeFromWishlist } from "../../data/slices/productPageSlice";
export default function ProductPageLayout({ children }) {

    const {selectedVariant, wishlist, product, loading} = useSelector((state) => state.productPageData);
    const {cartID, addingToCart} = useSelector((state) => state.cartPageData);
    const dispatch = useDispatch();
    const [heartType, setHeartType] = useState("hearto");
    const [heartColor, setHeartColor] = useState("black");

    async function toggleAddWishlist() {
        if (heartType === "hearto") {
           
            console.log(">>>>>>>>>>>>>>>>>>>>> adding to wishlist")
            dispatch(addToWishlist(product.id))
            let wishes = [...wishlist, product.id];
            // console.log(wishes);

            await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
            console.log("Added to wishlist ")
        } else {
        
            // console.log(">>>>>>>>>>>>>>>>>>>>> removing from wishlist")
            dispatch(removeFromWishlist(product.id));
            let wishes = wishlist.filter(item => item !== product.id);
            // console.log(wishes);
            await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
            // console.log("Removed from wishlist ")
        }
    }


    async function handleAddToCart(){
        dispatch(setAddingToCart(true));
        const defaultLineItem = [
            {
                "merchandiseId": selectedVariant?.id,
                "quantity": 1
            }
        ]

       
        if(cartID){
            let existingCart = await cartFetch(cartID);
            let validateId = existingCart?.data?.cart?.id 
            if(validateId === cartID){
                let cartLinesAddResp = await cartLinesAdd(cartID, defaultLineItem);
                // console.log(JSON.stringify(cartLinesAddResp))
                cartInitiator(dispatch);
                ToastAndroid.showWithGravity("Added to cart", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
              
            } else {
                let cartCreateResp = await cartCreate();
              
                let newCartId = cartCreateResp?.data?.cartCreate?.cart?.id;
                await AsyncStorage.setItem('cart-id', newCartId);
                cartInitiator(dispatch);
                ToastAndroid.showWithGravity("Added to cart", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        } else {
            
            let cartCreateResp = await cartCreate(defaultLineItem);
          
            let newCartId = cartCreateResp?.data?.cartCreate?.cart?.id;
            await AsyncStorage.setItem('cart-id', newCartId);
            cartInitiator(dispatch);
            ToastAndroid.showWithGravity("Added to cart", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        dispatch(setAddingToCart(false));
       
    }


    useEffect(()=>{
        // let callDispatch = (func)=>{dispatch(func())};
        cartInitiator(dispatch)
    },[])

    useEffect(()=>{
        if(wishlist.includes(product?.id)){
            setHeartType("heart");
            setHeartColor("red");
        } else {
            setHeartType("hearto");
            setHeartColor("black");
        }
    },[wishlist, product])

    return (
        <SafeAreaView style={layout_structure_style.wrapper}>
            <View style={layout_structure_style.scroll_wrapper}>
                <ScrollView style={layout_structure_style.scroll}>
                    {children}
                </ScrollView>
            </View>
            <View style={layout_structure_style.footer_wrapper}>
                {!loading?
                <View style={layout_structure_style.footer}>
                <Pressable style={{ backgroundColor: selectedVariant?.availableForSale ? colors.dark2 : colors?.danger, padding:10, flex:2, borderRadius:10}} onPress={handleAddToCart} disabled={!selectedVariant?.availableForSale}>

                    {addingToCart? <ActivityIndicator size="small" color={colors.light} />:
                  <Text style={{ fontWeight: 700, fontSize:16, color: colors.light, textAlign:"center"}}>{selectedVariant?.availableForSale ? "+ Add to bag" : "Out of stock" }</Text> }

                </Pressable>
                <Pressable onPress={toggleAddWishlist} style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <AntDesign name={heartType} size={18} color={heartColor}  />
                </Pressable>
                </View>:null}
            </View>

        </SafeAreaView>
    )
}
