import React, { useEffect, useState } from "react"
import { Text, View, Button, Alert } from "react-native"

//import { firebase } from "../../firebase/config"

export default TimerScreen = () => {
  const [mins, setMins] = useState(2)
  const [secs, setSecs] = useState(2)

  useEffect(() => {
    const timerId = setInterval(() => {
      if (secs <= 0) {
        if (mins <= 0) Alert.alert("end")
        else {
          setMins(m => m - 1)
          setSecs(59)
        }
      } else setSecs(s => s - 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [secs, mins])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>
        {mins}:{secs < 10 && 0}
        {secs}
      </Text>
      <Button title="stop-timer">Stop Timer</Button>
    </View>
  )
}
