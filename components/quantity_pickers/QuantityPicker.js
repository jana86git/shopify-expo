import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { colors } from "../../styles/colors";

export function QuantityPickerOne({ quantity, increaseQuantity, decreaseQuantity, loading }) {
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", alignSelf: "start" }}>

            <Pressable style={styles.btn} onPress={decreaseQuantity}>
                <Entypo name="minus" size={20} color={colors?.secondary} />
            </Pressable>
            {loading ?
                <View style={{ paddingLeft: 4, paddingRight: 4 }}>

                    <ActivityIndicator size="small" color={colors?.primary} />
                </View>
                :
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Text>{quantity}</Text>
                </View>}

            <Pressable style={styles.btn} onPress={increaseQuantity}>
                <Entypo name="plus" size={20} color={colors?.secondary} />
            </Pressable>
        </View>
    )
}

const styles = {
    btn: {
        padding: 6,
        borderRadius: 5,
        backgroundColor: colors?.primary,
        color: colors?.secondary,
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors?.light3
        // borderWidth: 1,
        // borderColor: colors?.primary
    }
}