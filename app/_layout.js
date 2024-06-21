import { View, Text } from "react-native"
import { Link, Stack } from "expo-router"
import { store } from "../data/store"
import { Provider } from "react-redux"
export default function Layout() {
    return (
        <Provider store={store}>
        <Stack/>
        </Provider>
    )
}