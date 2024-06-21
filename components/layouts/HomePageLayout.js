
import { View, SafeAreaView, ScrollView, Text, Pressable, Platform } from "react-native"
import { layout_structure_style } from "../../styles/layout_structure"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { colors } from "../../styles/colors";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { cartInitiator } from "../../api/cart/cartIntiator";
import { router } from "expo-router";
import { setActivePage } from "../../data/slices/homePageSlice";
import { useSegments } from "expo-router";
import { initWishlist } from "../../data/slices/productPageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { registerForPushNotificationsAsync } from "../../api/push_notification/registration";

import { addNotification, initNotifications } from "../../data/slices/notificationSlice";


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import uuid from 'react-native-uuid';
import Constants from 'expo-constants';
export default function HomePageLayout({ children }) {
    const {cartCount} = useSelector(state => state.cartPageData);
    const {activePage} = useSelector(state => state.homePageData);
    const dispatch = useDispatch();
    const segments = useSegments();


    const { notifications } = useSelector((state) => state.notificationData);
   
  
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState('');
  
    const notificationListener = useRef(null);
    const responseListener = useRef(null);
  
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  
    async function registerForPushNotification() {
      let token = await registerForPushNotificationsAsync();
      console.log(">>>>>> ", token, typeof token)
      setExpoPushToken(token);
    }
  
    async function addNotificationsHandler(notification) {
      let nid = uuid.v4();
      notification["nid"] = nid;
      dispatch(addNotification(notification));
      console.log("################## notifications", notifications);
      let allNotification = [...notifications, notification];
      console.log("################## allNotification", allNotification);
      await AsyncStorage.setItem('notifications', JSON.stringify(allNotification));
  
    }
  
    useEffect(() => {
      registerForPushNotification()
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log("Incoming notification ........ > ", JSON.stringify(notification?.request?.content));
        addNotificationsHandler(notification?.request?.content);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("After clicking on the notification ::: ", JSON.stringify(response?.notification?.request?.content));
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [])

    async function reloadWishlist() {

        let data = await AsyncStorage.getItem('wishlist');
        // console.log("RETRIEVING WISHLIST FROM ASYNC STORAGE", data)
        if (data) {
          dispatch(initWishlist(JSON.parse(data)))
        }
    
    
      }
    
      async function reloadNotifications(){
    
        let data = await AsyncStorage.getItem('notifications');
        console.log("RETRIEVING NOTIFICATIONS FROM ASYNC STORAGE", data)
        dispatch(initNotifications(JSON.parse(data || [])))
        
      }
    
    
    
    
      useEffect(() => {
        reloadWishlist();
        reloadNotifications();
        cartInitiator(dispatch);
      }, [])

  

 

    function handlePageChange(route, page){
        dispatch(setActivePage(page));
        router.navigate(route)
    }

    useEffect(()=>{
        console.log("segments", segments);
        dispatch(setActivePage(segments[1]));
    },[segments])
   
    return (
        <SafeAreaView style={layout_structure_style.wrapper}>
            <View style={layout_structure_style.scroll_wrapper}>
                {activePage === "home" && <ScrollView style={layout_structure_style.scroll}>
                    {children}
                </ScrollView>}
                {activePage === "wishlist" && <View style={layout_structure_style.scroll}>
                    {children}
                </View>}
                {activePage === "profile" && <View style={layout_structure_style.scroll}>
                    {children}
                </View>}
               
            </View>
            <View style={layout_structure_style.footer}>
                <Pressable style={layout_structure_style.footerItem}  onPress={()=>{handlePageChange("/screens/home")}}>
                    {activePage === "home" ?
                        <MaterialCommunityIcons name="home" size={24} color="black" /> :
                        <MaterialCommunityIcons name="home-outline" size={24} color="black" />}
                    <Text>Home</Text>
                  


                </Pressable>
                <Pressable style={layout_structure_style.footerItem} onPress={()=>{handlePageChange("/screens/wishlist")}}>
                {activePage === "wishlist" ?
                        <MaterialCommunityIcons name="heart" size={24} color="black" /> :
                        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />}
                    <Text>Wishlist</Text>
                </Pressable>
                <Pressable style={layout_structure_style.footerItem} onPress={()=>{handlePageChange("/screens/cart")}}>
                {activePage === "cart" ?
                        <MaterialCommunityIcons name="shopping" size={24} color="black" /> :
                        <MaterialCommunityIcons name="shopping-outline" size={24} color="black" />}
                    <Text>Bag</Text>
                    {cartCount > 0 && <Text style={{position:"absolute", top:-5, right:-7, backgroundColor:colors.dark, color:colors.light,  paddingHorizontal: 5,textAlign:"center", borderRadius:50, fontSize:12}}>{cartCount}</Text>}
                </Pressable>
                <Pressable style={layout_structure_style.footerItem} onPress={()=>{handlePageChange("/screens/profile")}}>
                {activePage === "profile" ?
                        <MaterialCommunityIcons name="account" size={24} color="black" /> :
                        <MaterialCommunityIcons name="account-outline" size={24} color="black" />}
                    <Text>Profile</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}
