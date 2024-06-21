//dependency import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, SafeAreaView, Pressable, Animated,StyleSheet  } from "react-native"
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { router, Stack } from 'expo-router';



//api imports
import { cartFetch } from '../../api/cart/cartFetch';
import { setCartCount, setCartId, setFetchingCart, setUpdatingLine, setCartData, setCheckoutURL, setTotalAmount, setTotalTaxAmount, setSubtotalAmount, setTotalQuantity, setCurrencyCode, setCartLines } from '../../data/slices/cartPageSlice';


//component imports
import DefaultCartLines from '../../components/cart/DefaultCartLines';
import { AntDesign } from '@expo/vector-icons';

//other imports 
import { colors } from '../../styles/colors';






export default function cart() {




    return (
        <View style={{ flex: 1 }}>
            <CartUI />
        </View>
    )
}

function CartUI() {
    const { cartID, cartData, cartLines, totalAmount, totalTaxAmount, subtotalAmount, checkoutURL, totalQuantity, currencyCode, updatingLine } = useSelector((state) => state.cartPageData);
    const [showDetailPricing, setShowDetailPricing] = useState(false);
    const dispatch = useDispatch();
    const [animation] = useState(new Animated.Value(0));

    console.log("######################################## updating line ", updatingLine)

    useEffect(() => {
      if (showDetailPricing) {
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }, [showDetailPricing]);

    const animatedStyle = {
        transform: [
          {
            scaleY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      };


    const initializeCartId = async () => {

        try {
            const value = await AsyncStorage.getItem('cart-id');
            // console.log("RETRIEVING CART ID FROM ASYNC STORAGE", value)
            dispatch(setCartId(value));
          
        } catch (e) {
            console.log(e)
        }
    }

    const initCartQuantity = async (cartQunatity) =>{
        try {
            await AsyncStorage.setItem("cart-quantity", cartQunatity?.toString());
        } catch (error) {
            
        }
    }

    const fetchCartData = async () => {
        dispatch(setFetchingCart(true))
        let cartResponse = await cartFetch(cartID);
        // console.log("Cart reponse :::::----> ", cartResponse);
        // let parsedCartData = JSON.parse(cartResponse);
        dispatch(setCartData(cartResponse?.data?.cart))
        dispatch(setFetchingCart(false))
    
    }

   

    useEffect(() => {
        initializeCartId();
    }, [])

    useEffect(() => {
        // console.log("Cart id ....", cartID)
        if (cartID !== null) {
            fetchCartData();
        }
    }, [cartID])

    useEffect(()=>{
        initCartQuantity(totalQuantity)
    },[totalQuantity])

   

    useEffect(() => {
        dispatch(setCartLines(cartData?.lines?.nodes || []))
        dispatch(setTotalAmount(cartData?.cost?.totalAmount?.amount || 0))
        dispatch(setTotalTaxAmount(cartData?.cost?.totalTaxAmount?.amount || 0))
        dispatch(setSubtotalAmount(cartData?.cost?.subtotalAmount?.amount || 0))
        dispatch(setCheckoutURL(cartData?.checkoutUrl || ""))
        dispatch(setTotalQuantity(cartData?.totalQuantity || 0))
        dispatch(setCurrencyCode(cartData?.cost?.subtotalAmount?.currencyCode || ""))
    }, [cartData])
    return (
        <SafeAreaView style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Stack.Screen
        options={{
          title: 'Cart',
          headerStyle: { backgroundColor: colors?.light },
          headerTintColor: colors.dark,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
            <ScrollView >
                <DefaultCartLines />
            </ScrollView>
            <View style={{ backgroundColor: "white", minHeight: "8%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ width: "95%", display: "flex", flexDirection: "row" }}>
                    <View style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", marginBottom: 10 }}>
                        <Text style={{ fontWeight: 500 }}>Total Quantity:&nbsp;</Text>
                        <Text>{totalQuantity}</Text>
                    </View>
                    <View style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignSelf: "center", marginBottom: 10 }}>
                        <Pressable onPress={() => setShowDetailPricing(!showDetailPricing)}>
                            {showDetailPricing? <AntDesign name="upcircleo" size={24} color="black" style={{ marginRight: 5 }} />: <AntDesign name="downcircleo" size={24} color="black" style={{ marginRight: 5 }} />}
                           
                        </Pressable>
                        <Text style={{ fontWeight: 500 }}>Total:&nbsp;</Text>
                        <Text style={{ fontWeight: 500 }}>{totalAmount} {currencyCode}</Text>

                    </View>
                </View>
                {showDetailPricing?
                <Animated.View style={[styles.detailContainer, animatedStyle]}>
                    <View style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignSelf: "flex-end", marginBottom: 10 }}>
                        <Text style={{ fontWeight: 500 }}>Subtotal:&nbsp;</Text>
                        <Text>{subtotalAmount} {currencyCode}</Text>
                    </View>
                    <View style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignSelf: "flex-end", marginBottom: 10 }}>
                        <Text style={{ fontWeight: 500 }}>Tax:&nbsp;</Text>
                        <Text >{totalTaxAmount || 0} {currencyCode}</Text>
                    </View>
                </Animated.View>:null}
                <Pressable style={{ width: "95%", alignSelf: "center", backgroundColor: colors?.primary, color: "white", borderRadius: 10, padding: 10,  backgroundColor:cartLines && cartLines?.length === 0?colors.dark:colors.dark2 }} onPress={() =>{ router.navigate(`/screens/checkout/${encodeURIComponent(checkoutURL)}`)}} disabled={cartLines && cartLines?.length === 0 }>
                    <Text style={{ color: colors?.light2, textAlign: "center", fontSize: 18 }}>Checkout</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleButton: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: 'lightblue',
      borderRadius: 5,
    },
    detailContainer: {
      width: '95%',
      alignSelf: 'center',
    },
    detailItem: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontWeight: '500',
      marginRight: 5,
    },
  });