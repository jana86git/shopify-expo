import { View, Text, Pressable } from "react-native"
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { colors } from "../../../styles/colors";
import ProductPageLayout from "../../../components/layouts/ProductPageLayout";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setSelectedVariant } from "../../../data/slices/productPageSlice";
import { fetchProduct } from "../../../api/products/fetchProduct";
import ProductImageSlider from "../../../components/product_image_slider/ProductImageSlider";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { setLoading } from "../../../data/slices/productPageSlice";


export default function Product() {
    const dispatch = useDispatch();
    const { id } = useLocalSearchParams();
    const { product, selectedVariant,loading } = useSelector((state) => state.productPageData);
    const { cartCount, cartId } = useSelector((state) => state.cartPageData);
   


    async function fetchProductInfo() {
        dispatch(setLoading(true));
        let data = await fetchProduct(id)
        dispatch(setProduct(data))
        dispatch(setLoading(false));

    }

    function checkAllObjectsPresent(array, objects) {
        return objects.every(obj => array.some(item => isEqual(item, obj)));
    }

    function isEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }
    function handleVaraintChange(name, value) {
        let otherOptions = selectedVariant?.selectedOptions?.filter(option => option.name !== name)
        // "name": "Size", "value": "Medium"
        let object = { "name": name, "value": value }
        otherOptions.push(object);
        let otherOptionsWithObject = otherOptions?.concat(object)
        let currentVariant = product?.variants?.nodes?.find((variant) => {
            return checkAllObjectsPresent(variant.selectedOptions, otherOptionsWithObject);
        })

        dispatch(setSelectedVariant(currentVariant))


    }



    useEffect(() => {
        if (id) {
            fetchProductInfo()
        }
    }, [id])

    useEffect(() => {

        if (product) {
            dispatch(setSelectedVariant(product?.variants?.nodes[0]))
        }
    }, [product])




    return (
        <ProductPageLayout>
            <Stack.Screen
                options={{
                    title: 'Product',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <Pressable onPress={() => { router.navigate("/screens/cart") }} >
                            <Feather name="shopping-bag" size={20} color="black" />
                            {cartCount > 0 && <Text style={{ position: "absolute", top: -5, right: -7, backgroundColor: colors.dark, color: colors.light, paddingHorizontal: 5, textAlign: "center", borderRadius: 50, fontSize: 12 }}>{cartCount}</Text>}
                        </Pressable>
                    ),
                }}
            />
            {!loading?
            <View>
                <ProductImageSlider images={product?.images?.nodes?.map((item) => item?.url)} />
                <View style={{ width: "90%", alignSelf: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 700, color: colors.dark }}>{product?.title}</Text>
                </View>
                <View style={style.pricing_wrapper}>
                    <Text style={style.currencyCode}>{selectedVariant?.price?.currencyCode}</Text>
                    {selectedVariant?.compareAtPrice ? <Text style={style.compare_product_price}>{selectedVariant?.compareAtPrice?.amount}</Text> : null}
                    <Text style={style.product_price}>{selectedVariant?.price?.amount}</Text>
                </View>
                <View>
                    <Text>{product?.description}</Text>
                </View>


                {product?.variants?.nodes?.length > 1 &&
                    <View style={{ width: "90%", alignSelf: "center" }}>
                        {product?.options?.map((option, key) => {
                            return (
                                <View key={key}>
                                    <Text style={{ fontSize: 16, fontWeight: 700, color: colors.dark, marginBottom: 4 }}>{option?.name}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", margin: 4, flexWrap: "wrap" }}>
                                        {option?.values?.map((value, key) => {
                                            let selected = (selectedVariant?.selectedOptions || []).find((item) => item?.name === option?.name);

                                            const color_ = selected?.value === value ? colors.light : colors.dark2;
                                            const bgColor = selected?.value === value ? colors.dark : colors.light;
                                            return (
                                                <Pressable key={key} onPress={() => { handleVaraintChange(option?.name, value) }} style={{ marginRight: 8, marginBottom: 8, borderColor: colors.dark2, borderWidth: 1, padding: 5, borderRadius: 4, minWidth: 50, backgroundColor: bgColor }}>
                                                    <Text style={{ textAlign: "center", color: color_, fontWeight: 500 }}>{value}</Text>
                                                </Pressable>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                    </View>}
            </View>:null}
        </ProductPageLayout>
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
        width: "90%",
        alignSelf: "center",
        marginTop: 10
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