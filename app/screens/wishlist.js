//dependency import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, SafeAreaView, Pressable, Animated, StyleSheet } from "react-native"
import { Stack } from 'expo-router';
import HomePageLayout from '../../components/layouts/HomePageLayout';

import { colors } from '../../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../../data/slices/homePageSlice';
import { useEffect, useState } from 'react';
import { initWishlist, setProduct } from '../../data/slices/productPageSlice';
import { useSelector } from 'react-redux';
import { fetchProductsByIds } from '../../api/products/fetchProductsByIds';
import PopularProducts from '../../components/popular_products/PopularProducts';
import WishlistProducts from '../../components/wishlist/WishlistProduct';
export default function wishlist() {

const [wishlistProducts, setWishlistProducts] = useState([]);
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
const {wishlist} = useSelector((state)=>state.productPageData)

function renderItem({ item }) {
    return (
        <View >
        <ProductCard product={item} wishlist={wishlist} dispatch={dispatch} />
        </View>
    )
}

async function reloadWishlist(){
   
    let data = await AsyncStorage.getItem('wishlist');
    // console.log("RETRIEVING WISHLIST FROM ASYNC STORAGE", data)
    if(data){
        dispatch(initWishlist(JSON.parse(data)))
    }


}

async function fetchWishlistProduct(){
    setLoading(true)
    let products = await fetchProductsByIds(wishlist);
    setWishlistProducts(products);
    setLoading(false);
}




useEffect(() => {
reloadWishlist()
}, [])

useEffect(()=>{
    if(wishlist){
        fetchWishlistProduct()
    }
},[wishlist])
    return (
        <HomePageLayout>
            <Stack.Screen
                options={{
                    title: 'Wishlist',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <View >
                            <MaterialIcons name="notifications-none" size={24} color="black" />
                        </View>
                    ),
                }}
            />
          <WishlistProducts products={wishlistProducts} loading={loading}/>
        </HomePageLayout>
    )
}

