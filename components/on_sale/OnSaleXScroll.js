import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import { colors } from "../../styles/colors"
import { router } from "expo-router"
export default function OnSaleXScroll({ products, loading }) {
    return (
        <View style={style.product_wrapper}>
            <Text style={style.heading}>On Sale</Text>
            {!loading ? <ScrollView horizontal={true}>
                {products && products?.map((product) => {

                    return (
                        <TouchableOpacity key={product.id} style={style.product} onPress={() => { router.navigate(`/screens/product/${encodeURIComponent(product?.id)}`) }}>
                            <View style={style.image_wrapper}>
                                <Image source={{ uri: product?.featuredImage?.url }} style={style.product_image} />
                            </View>
                            <View style={style.description_wrapper}>
                                <Text style={style.product_title}>{product.title}</Text>
                                <View style={style.pricing_wrapper}>
                                    <Text style={style.currencyCode}>{product?.priceRange?.maxVariantPrice?.currencyCode}</Text>
                                    {product?.compareAtPriceRange?.maxVariantPrice?.amount > 0 ? <Text style={style.compare_product_price}>{product?.compareAtPriceRange?.maxVariantPrice?.amount}</Text> : null}
                                    <Text style={style.product_price}>{product?.priceRange?.maxVariantPrice?.amount}</Text>
                                </View>

                            </View>


                        </TouchableOpacity>
                    )
                })}
            </ScrollView> : <ScrollView horizontal={true}>
                {[0, 1, 2, 3].map((product) => {

                    return (
                        <TouchableOpacity key={product} style={{ ...style.product, backgroundColor: "#ccc" }} >
                            <View style={{ ...style.image_wrapper, backgroundColor: colors.light }}>

                            </View>
                            <View style={{ ...style.description_wrapper }}>
                                <Text style={{ ...style.product_title, backgroundColor: colors.light }}></Text>
                                <View style={style.pricing_wrapper}>
                                    <Text style={{ ...style.currencyCode, backgroundColor: colors.light, width: "100%" }}></Text>


                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{ ...style.currencyCode, backgroundColor: colors.light, width: "100%" }}></Text>
                                </View>

                            </View>


                        </TouchableOpacity>
                    )
                })}
            </ScrollView>}
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