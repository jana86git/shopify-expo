import { View } from "react-native"
export default function Skeleton({width,height,xAxisMargin,yAxisMargin,borderRadius}) {
    return (
       <View style={{ backgroundColor: "#ccc", height: height, width: width, marginTop:yAxisMargin, marginBottom:yAxisMargin, alignSelf:'center', borderRadius:borderRadius, marginLeft:xAxisMargin, marginRight:xAxisMargin }}>

       </View>
    )
}