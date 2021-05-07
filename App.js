import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, ImageBackground } from "react-native"
import seahorse from './assets/seahorse.jpg'

export default function App() {
  return (

    <ImageBackground source={seahorse} style={styles.container}>
      <Text style={styles.text}>Glow In The Blue</Text>
      <StatusBar style="auto" />
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: null,
    width: null,
    top:1,
    opacity: 0.9
  },
  text: {
    color: '#80daeb',
    fontSize: 30,
    fontWeight: '500',
    backgroundColor: '#000060'
  }
})
