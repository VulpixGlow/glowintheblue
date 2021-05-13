import React from "react"
import { SafeAreaView, View, Text, Image, useWindowDimensions } from "react-native"
import styles from "../screens/HomeScreen/styles"
import Slides from '../../Slides'

export default OnBoardingItem = ({item}) => {
  const {width} = useWindowDimensions()
  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
      <View style={{flex:0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}
