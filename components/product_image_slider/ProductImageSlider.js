import Swiper from 'react-native-swiper'
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { useState, useRef } from 'react';
import { style } from './image_slider_style'
export default function ProductImageSlider({ images }) {
  
  const width = Dimensions.get('window').width;
  const baseOptions = {
    parallaxScrollingOffset: (width / 2) - 10,
    parallaxScrollingScale: 1,
    parallaxAdjacentItemScale: 1,
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {images && images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: currentIndex === index ? 1 : 0.5 },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={style.slider_wrapper}>
      {images?.length ?
        <Carousel
          ref={carouselRef}
          width={width}
          style={{ flex: 1 }}
          pagingEnabled={true}
          data={images}
          mode="parallax"
          modeConfig={baseOptions}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={() => { console.log("hello world") }} key={index} style={{ width: "50%" }}>

                <Image source={{ uri: item }} style={style.slider_image} />
              </TouchableOpacity>
            )
          }
          }
          onSnapToItem={(index) => setCurrentIndex(index)}
        /> : null}
      {renderPagination()}
      {/* {images?.length ?
                <Swiper autoplay={true} loop={true} autoplayTimeout={3} autoplayDirection={true} removeClippedSubviews={false}>
                    {images?.map((item, index) => (


                        <TouchableOpacity activeOpacity={1} onPress={() => { console.log("hello world") }} key={index} style={{width:"50%"}}>
            

                            <Image source={{ uri: item }} style={style.slider_image} />
                        </TouchableOpacity>

                    ))}
                </Swiper> : null} */}
    </View>
  )
}


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
};