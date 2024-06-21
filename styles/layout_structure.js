import { colors } from "./colors"
export const layout_structure_style = {
    wrapper: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors?.light
    },
    scroll_wrapper: {
        display: "flex",
        flexDirection: "row",
        flex: 11
    }, 
    scroll: {
        flex: 1
    },
    footer_wrapper:{
        flex: 1,
        backgroundColor: colors?.light2,
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footer: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 20
    }  ,
    footerItem:{
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    } 
}