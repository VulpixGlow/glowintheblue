import React, { useState, useRef } from "react"
import { View, Text, FlatList, Animated } from "react-native"
import styles from "./styles"
import Slides from '../../Slides'
import OnBoardingItem from './OnBoardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default OnBoarding = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({viewableItems})=>{
    setCurrentIndex(viewableItems[0].index);
  }).current
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current
  const scrollTo = async () => {
    if (currentIndex < Slides.length-1) {
      slidesRef.current.scrollToIndex({index:currentIndex+1})
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true')
      } catch(e) {
        console.log('Error @setItem:', e)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={{flex:3}}>
        <FlatList
          data={Slides}
          renderItem={({item})=><OnBoardingItem item={item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>item.id}
          onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={Slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex+1)*(100/Slides.length)}/>
    </View>
  )
}
