import { View, Text, ImageBackground, Pressable } from "react-native"
import { colors } from "../../styles/colors"
import { useEffect } from "react"
import { router } from "expo-router"
export default function CollectionGrid({collections, loading}){

  useEffect(()=>{
    console.log("loading", loading)
  },[loading])
   
    return(
      <View>
        {!loading?
        <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"100%", alignSelf:"center", justifyContent:"center"}}>
            {
                collections && collections?.map((collection, key)=>{
                    return(
                        <Pressable onPress={()=>{router.navigate(`/screens/collection/${encodeURIComponent(collection?.id)}`)}} key={key} style={{ width: "29%", backgroundColor: "gray", margin: "2%", height:110, borderRadius: 10,  shadowColor: '#ccc',
                        shadowRadius: 10,
                        shadowOpacity: 0.4 }}>
                        <ImageBackground source={{ uri: collection?.image?.url }} style={{ width: "100%", height: "100%",borderRadius: 10 }} imageStyle={{ alignSelf:"flex-start", height:"100%" , display:"flex", alignSelf:"flex-start", resizeMode:"cover", borderRadius: 10}}>
                          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', position:"absolute", bottom:0, backgroundColor:"white", width:"100%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10,backgroundColor: colors.light2 }}>
                            <Text style={{ fontSize:14, fontWeight:500, marginTop:4, marginBottom: 4, color: colors.dark}}>{collection?.title}</Text>
                          </View>
                        </ImageBackground>
                      </Pressable>
                      
                    )
                })
            }
        </View>:
         <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"100%", alignSelf:"center", justifyContent:"center"}}>
         {
             [0,1,2,3,4,5].map((collection, key)=>{
                 return(
                     <View key={key} style={{ width: "29%", backgroundColor: "gray", margin: "2%", height:110, borderRadius: 10,  shadowColor: '#ccc',
                     shadowRadius: 10,
                     shadowOpacity: 0.4 }}>
                     <View  style={{ width: "100%", height: "100%",borderRadius: 10 }} imageStyle={{ alignSelf:"flex-start", height:"100%" , display:"flex", alignSelf:"flex-start", resizeMode:"stretch", borderRadius: 10}}>
                       <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', position:"absolute", bottom:0, backgroundColor:"white", width:"100%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10,backgroundColor: colors.light2 }}>
                         <Text style={{ fontSize:14, fontWeight:500, marginTop:4, marginBottom: 4, color: colors.dark, backgroundColor:colors.light2}}>{collection?.title}</Text>
                       </View>
                     </View>
                   </View>
                   
                 )
             })
         }
     </View>}
        </View>
    )
}