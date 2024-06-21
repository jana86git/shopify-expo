import HomePageLayout from "../../components/layouts/HomePageLayout"
import { Stack } from "expo-router"
import { View, Text, FlatList, Pressable } from "react-native"
import { colors } from "../../styles/colors"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Entypo from '@expo/vector-icons/Entypo';
import { removeNotification } from "../../data/slices/notificationSlice"
import { useDispatch } from "react-redux"

export default function notification() {
    const { notifications } = useSelector(state => state.notificationData);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(notifications)
    }, [notifications])


    async function deleteNotification(notification) {
        dispatch(removeNotification(notification.nid));
        let allNotification = notifications.filter((item) => item?.nid !== notification?.nid);
        await AsyncStorage.setItem('notifications', JSON.stringify(allNotification));
    }

  

    function NotificationComponent({notification}){
        console.log("..............................>",notification)
        return(
            <View style={{ backgroundColor: colors?.light2, marginTop: 10, padding: 4 }}>
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <Text style={{fontWeight:"bold", fontSize:16}}>{notification?.title}</Text>
                <Pressable onPress={() => deleteNotification(notification)}>
                    <Entypo name="cross" size={24} color="black" />
                </Pressable>
               
                </View>
                
                <Text>{notification?.body}</Text>
            </View>
        )
    }
    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Notification',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
       
              
               <View style={{ width:"90%", alignSelf:"center" }}>
                    {/* {notifications && notifications?.map((notification, index) => {
                        return (
                            <View key={index}>
                                <Text>{notification?.title}</Text>
                                <Text>{notification?.body}</Text>
                            </View>
                        )
                    })} */}

                    <FlatList
                        data={notifications}
                        renderItem={({ item }) => <NotificationComponent notification={item} />}
                        keyExtractor={item => item.nid}
                    />

                </View>
     
                    {notifications?.length === 0  && <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Text>No Notification</Text>
                    </View>}
        </View>
    )
}