import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router";
import { fetchCollectionData } from "../../../api/collections/fetchCollectionData";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { colors } from "../../../styles/colors";
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../../../components/product_cards/ProductCard";
export default function collection() {
    const { id } = useLocalSearchParams();
    const [products, setProducts] = useState([]);
    const [collectionTitle, setCollectionTitle] = useState('');
    const dispatch = useDispatch();
    const { wishlist } = useSelector(state => state.productPageData);

    async function importProducts() {
        let data = await fetchCollectionData(id);
        console.log(JSON.stringify(data));
        let prods = data?.products?.nodes;
        setProducts(prods);
        console.log("COllection title ", data?.title)
        setCollectionTitle(data?.title);
    }

    function renderItem({ item }) {
        return (
            <View style={{ backgroundColor:colors?.light2, marginBottom:10, borderRadius:8}}>
            <ProductCard product={item} wishlist={wishlist} dispatch={dispatch} />
            </View>
        )
    }

    useEffect(()=>{
        console.log(wishlist)
    },[wishlist])
    useEffect(() => {
        if (id) {
            importProducts();
        }
    }, [id])
    return (
        <View style={{ flex: 1, flexDirection: "column", padding: 0 }}>
            <Stack.Screen
                options={{
                    title: collectionTitle || 'Collection',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <View >
                            <MaterialIcons name="search" size={24} color="black" />
                        </View>
                    ),
                }}
            />
            <View style={{ flex: 1 }}>
                <FlatGrid
                    itemDimension={150}
                    data={products}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}