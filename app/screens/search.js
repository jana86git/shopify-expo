import { View, Text, ActivityIndicator } from "react-native"
import SearchBar from "../../components/search/SearchBar"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProductsBySearchSyntax } from "../../api/products/fetchProductBySearchSyntax";
import { setProducts, setLoading } from "../../data/slices/searchPageSlice";
import { FlatGrid } from "react-native-super-grid";
import { ProductCard } from "../../components/product_cards/ProductCard";
import { colors } from "../../styles/colors";
import { Stack } from "expo-router";

export default function search() {
    const dispatch = useDispatch();
    const { query, products, loading } = useSelector(state => state.searchPageData);
    const [timer, setTimer] = useState(null);
    const { wishlist } = useSelector(state => state.productPageData)

    async function searchProduct() {

        console.log("searchProduct", query);
        const response = await fetchProductsBySearchSyntax(query);
        console.log("response", JSON.stringify(response));
        dispatch(setProducts(response));
        dispatch(setLoading(false));
    }

    function renderItem({ item }) {
        return (
            <View style={{ backgroundColor: colors?.light2, marginBottom: 10, borderRadius: 8 }}>
                <ProductCard product={item} wishlist={wishlist} dispatch={dispatch} />
            </View>
        )
    }

    useEffect(() => {
        if (query) {
            console.log("query", query);
            dispatch(setLoading(true));
        }

        if (timer) {
            clearTimeout(timer);
        }

        // Set a new timer to call the function after 1 second
        const newTimer = setTimeout(() => {
            if (query) {

                searchProduct();
            }

        }, 1000);

        setTimer(newTimer);

        // Cleanup function to clear the timer if the component unmounts or text changes
        return () => clearTimeout(newTimer);
    }, [query]);

    useEffect(() => {
        console.log("loading", loading)
    }, [loading])
    return (
        <View style={{ flex: 1 }}>

            <Stack.Screen
                options={{
                    title: 'Search',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                 
                }}
            />

            <SearchBar />

            {!loading ? <View style={{ flex: 1, marginTop: 10 }}>
                <FlatGrid
                    itemDimension={150}
                    data={products}
                    renderItem={renderItem}
                />
            </View> : <View style={{ flex: 1, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors?.dark} />
            </View>}


        </View>
    )

}