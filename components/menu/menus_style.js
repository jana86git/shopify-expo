import { colors } from "../../styles/colors";
export const style = {
    menu: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors?.light2,
        borderRadius: 10,
        marginRight: 5,
        color: "green"
    },

    menu_wrapper: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20
    },

    menu_active: {
        backgroundColor: colors?.info,
        color: colors?.light2
    },

    menu_text: {
        color: colors?.dark
    },

    menu_text_active:{
        color: colors?.light
    }
}