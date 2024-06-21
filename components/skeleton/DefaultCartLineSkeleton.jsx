import Skeleton from "./Skeleton"
import { View } from "react-native"
export default function DefaultCartLineSkeleton() {
    return (
        <View>
            {Array.from({ length: 10 }, (_, index) => index + 1)?.map((index) => {
                return (
                    <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "95%", alignSelf: "center" }}>
                        <View style={{ flex: 3 }}>
                            <Skeleton width={"95%"} height={80} yAxisMargin={5} borderRadius={5} xAxisMargin={0} />
                        </View>
                        <View style={{ flex: 7 }}>
                            <Skeleton width={"95%"} height={15} yAxisMargin={5} borderRadius={5} xAxisMargin={0} />
                            <Skeleton width={"95%"} height={15} yAxisMargin={5} borderRadius={5} xAxisMargin={0} />
                            <Skeleton width={"95%"} height={15} yAxisMargin={5} borderRadius={5} xAxisMargin={0} />
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "95%", alignSelf: "center" }}>
                                <Skeleton width={"15%"} height={35} yAxisMargin={5} borderRadius={5} xAxisMargin={4} />
                                <Skeleton width={"10%"} height={35} yAxisMargin={5} borderRadius={5} xAxisMargin={4} />
                                <Skeleton width={"15%"} height={35} yAxisMargin={5} borderRadius={5} xAxisMargin={4} />
                                <Skeleton width={"15%"} height={35} yAxisMargin={5} borderRadius={5} xAxisMargin={4} />
                            </View>

                        </View>

                    </View>
                )
            })}

        </View>
    )
}