import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function PointScreen(props) {
  const navigation = useNavigation()
  console.log("PointScreen Props", props)
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
}
