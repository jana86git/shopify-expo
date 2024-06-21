// import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useRouter,useSearchParams,useGlobalSearchParams, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview/src';

import { colors } from '../../../styles/colors';
function checkout() {
    const {url} = useLocalSearchParams();
    // console.log("route", route)
    // const { url } = route.params;
//   console.log("url ..........", url)

  return (
    <View style={{ flex: 1 }}>
       <Stack.Screen
                options={{
                    title: 'Checkout',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                 
                }}
            />
    <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}

export default checkout;
