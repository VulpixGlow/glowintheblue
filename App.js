import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Glow In The Blue</Text>
      <Image style={{ top: "5%" }} source={require("./assets/sea-horse.png")} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center"
  }
})
