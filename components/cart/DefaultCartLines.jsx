import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { QuantityPickerOne } from "../quantity_pickers/QuantityPicker";
import { AntDesign } from '@expo/vector-icons';

import {cartLinesUpdate} from "../../api/cart/cartLinesUpdate";

import { setCartCount, setCartId, setFetchingCart, setUpdatingLine, setCartData, setCheckoutURL, setTotalAmount, setTotalTaxAmount, setSubtotalAmount, setTotalQuantity, setCurrencyCode } from "../../data/slices/cartPageSlice";
import { cartLineDelete } from "../../api/cart/cartLineDelete";
import { colors } from "../../styles/colors";
import Skeleton from "../skeleton/Skeleton";
import DefaultCartLineSkeleton from "../skeleton/DefaultCartLineSkeleton";
export default function DefaultCartLines() {
    const { cartLines, cartData, fetchingCart, cartID } = useSelector((state) => state?.cartPageData);
    console.log("cart lines ", cartLines, cartData,)
    return (
        <View style={{flex:1}}>
            {fetchingCart ?

               <DefaultCartLineSkeleton/>
                :
                <View style={{flex:1}}>
                    <View>
                        {cartLines && cartLines?.map((line, key) => {
                            console.log(JSON.stringify(line?.merchandise?.product))
                            return (
                                <View key={key}>
                                    <CartLine line={line} cartID={cartID} />
                                </View>
                            )
                        })}
                    </View>
                    {cartLines?.length === 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , height:300}}><Text style={{fontSize:20, fontWeight:500}}>No item in cart</Text></View> : null}



                </View>}

        </View>
    )

}

function CartLine({ line, cartID }) {
    const quantity = line?.quantity;
    const dispatch = useDispatch();
    const [updatingCartLine, setUpdatingCartLine] = useState(false)
    const [deletingLine, setDeletingLine] = useState(false);

    function increaseQuantity() {

        // setQuantity((q) => (q + 1))
        cartUpdate(quantity + 1)


    }

    function decreaseQuantity() {
        // setQuantity((q) => { console.log(q - 1 > 1); if (q - 1 > 1) { return q - 1 } else { return 1 } })
        cartUpdate((quantity - 1 > 1) ? quantity - 1 : 1)
    }

    async function cartUpdate(quantity) {
        dispatch((setUpdatingLine(true)))
        setUpdatingCartLine(true)
        let resp = await cartLinesUpdate({
            "id": cartID,
            "lines": {
                "id": line?.id,
                "quantity": quantity
            }
        })
        console.log("Cart Update Resp ::::: ", resp)
      
        dispatch(setCartData(resp?.data?.cartLinesUpdate?.cart))
        dispatch((setUpdatingLine(false)))
        setUpdatingCartLine(false);
    }

    async function lineDelete() {
        setDeletingLine(true)
        dispatch((setUpdatingLine(true)))
        // {
        //     "cartId": "gid://shopify/<objectName>/10079785100",
        //     "lineIds": [
        //       "gid://shopify/<objectName>/10079785100"
        //     ]
        //   }
        const deleteInfo = {
            "cartId": cartID,
            "lineIds": [
                line?.id
            ]
        }

        const resp = await cartLineDelete(deleteInfo);
       
        dispatch(setCartData(resp?.data?.cartLinesRemove?.cart))
        dispatch((setUpdatingLine(false)))
        setDeletingLine(false);

    }

    return (
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 3, height: 100, marginRight: 10 }}>
                <Image style={{ width: "100%", height: "100%", objectFit: "contain" }} source={{ uri: line?.merchandise?.image?.url }} />
            </View>
            <View style={{ flex: 7 }}>
                <Text style={{ fontSize: 16, color: colors?.dark }}>{line?.merchandise?.product?.title}</Text>
                {line?.merchandise?.title === "Default Title" ? null : <Text style={{fontSize:12, color: colors.dark2}}>{line?.merchandise?.title}</Text>}
                {/* <PricingText price={line?.merchandise?.price?.amount} currencyCode={line?.merchandise?.price?.currencyCode} width={"95%"} yAxisMargin={4} fontSize={15} color={"black"} fontWeight={500} textAlign={"left"} compareAtPrice={line?.merchandise?.compareAtPrice?.amount} /> */}
                {line?.discountAllocations?.map((discount, key) => {
                    return (
                        <View key={key} style={{ marginBottom: 5 }}>
                            <Text style={{ color: colors?.success }}>Discount: {discount?.discountedAmount?.amount} {discount?.discountedAmount?.currencyCode}</Text>
                        </View>

                    )
                })}
                <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
                    <Text style={{ fontWeight: 500, fontSize: 14 }}>Total: </Text>
                    <Text style={{ fontSize: 14, color: colors?.info }}>{line?.cost?.totalAmount?.amount} {line?.cost?.totalAmount?.currencyCode}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width:"80%" }}>
                    <QuantityPickerOne quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} loading={updatingCartLine} />
                    <Pressable onPress={lineDelete} style={{ backgroundColor: colors?.Skeleton, borderRadius: 6, padding: 8, marginLeft: 8 }}>{deletingLine?<ActivityIndicator size={"small"} color={colors?.danger}/>:<AntDesign name="delete" size={18} color={colors?.danger} />}</Pressable>
                </View>
            </View>

        </View>
    )
}