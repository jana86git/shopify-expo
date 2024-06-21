import Swiper from 'react-native-swiper'
import { View, TouchableOpacity, Image, Text } from 'react-native'

import { style } from './image_slider_style'
export default function ImageSlider({ images }) {
    return (
        <View style={style.slider_wrapper}>
            {images.length ?
                <Swiper autoplay={true} loop={true} autoplayTimeout={3} autoplayDirection={true} removeClippedSubviews={false}>
                    {images?.map((item, index) => (


                        <TouchableOpacity activeOpacity={1} onPress={() => { console.log("hello world") }} key={index}>
            

                            <Image source={{ uri: item?.src }} style={style.slider_image} />
                        </TouchableOpacity>

                    ))}
                </Swiper> : null}
        </View>
    )
}