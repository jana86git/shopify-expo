import { View, Text, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { pdpActions } from "../../global_datas/pdp_actions";
import { colors } from "../../appearence/color";


export default function DefaultQuantityPicker() {

    const { quantity } = useSelector((state) => state.pdpActions);
    const dispatch = useDispatch()

    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

            <Pressable style={styles.btn} onPress={() => dispatch(pdpActions.actions.decreaseQuantity())}>
                <Entypo name="minus" size={24} color={colors?.primary} />
            </Pressable>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Text>{quantity}</Text>
            </View>

            <Pressable style={styles.btn} onPress={() => dispatch(pdpActions.actions.increaseQuantity())}>
                <Entypo name="plus" size={24} color={colors?.primary} />
            </Pressable>
        </View>
    )
}

const styles = {
    btn: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: colors?.secondary,
        display: "flex",
        flexDirection: "row",
        borderwidth: 1,
        borderColor: colors?.primary
    }
}