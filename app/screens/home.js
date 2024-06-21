import { View, Text, Pressable, Platform } from "react-native"
import { Link, Stack, router } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomePageLayout from "../../components/layouts/HomePageLayout";
import HeroSection from "../../components/hero_sections/HeroSection";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { setContent } from "../../data/slices/homePageSlice";
import { contentFiller } from "../../api/data_chunks/contentFiller";
import { colors } from "../../styles/colors";
import SearchBar from "../../components/search/SearchBar";
import MenuXScroll from "../../components/menu/MenuXScroll";
import ImageSlider from "../../components/hero_sections/ImageSlider";
import CollectionGrid from "../../components/collection_grid/CollectionGrid";
import OnSaleXScroll from "../../components/on_sale/OnSaleXScroll";
import PopularProducts from "../../components/popular_products/PopularProducts";
import { setFetchingData, setActivePage } from "../../data/slices/homePageSlice";





export default function Home() {
  const { storeName, contentToFetch, content, menus, images, fetchingData } = useSelector((state) => state.homePageData);
 const dispatch = useDispatch();

  async function fillContent() {
    dispatch(setFetchingData(true));
    let data = await contentFiller(contentToFetch);
    dispatch(setContent(data));
    dispatch(setFetchingData(false));
  }
  useEffect(() => {
    if (contentToFetch) {
      fillContent();

    }
  }, [contentToFetch]);



 


  return (
    <HomePageLayout>
      <Stack.Screen
        options={{
          title: 'Dengon',
          headerStyle: { backgroundColor: colors?.light },
          headerTintColor: colors.dark,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable onPress={() => { router.navigate("/screens/notification") }} >
              <MaterialIcons name="notifications-none" size={24} color="black" />
            </Pressable>
          ),
        }}
      />


      <SearchBar />

      <MenuXScroll menus={menus} active={"Home"} />
      <ImageSlider images={images} />


      {/* { content && content?.collections?.map((collection)=>{
      return (<View>
        <Text>{collection.title}</Text>
      </View>)
     })} */}

      <CollectionGrid collections={content?.collections} loading={fetchingData} />

      <OnSaleXScroll products={content?.onSale} loading={fetchingData} />
      <PopularProducts products={content?.popularProducts} loading={fetchingData} />



    </HomePageLayout>
  )
}