import { View, ScrollView, Text } from "react-native";
import { style } from "./menus_style";

export default function MenuXScroll({ menus, active }) {
   
    return (
        <View style={style.menu_wrapper}>
            <ScrollView horizontal={true}>
                {menus && menus.map((menu, index) => {
                    return (
                        <View key={index} style={active === menu?.name ? {...style.menu, ...style.menu_active} : style.menu}>
                            <Text style={active === menu?.name ? {...style.menu_text, ...style.menu_text_active} : style.menu_text}>
                                {menu?.name}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}