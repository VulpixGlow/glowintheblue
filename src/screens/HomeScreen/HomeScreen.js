import React from 'react'
import { View } from 'react-native'
import styles from './styles'

// import CategoryScreen from "../CategoryScreen/CategoryScreen"
// import TimerScreen from "../TimerScreen/TimerScreen"
import TimerExperiment from '../TimerExperiment/TimerExperiment'
// import Success from "../Success/Success"

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        {/* <TimerScreen /> */}

        {/* <CategoryScreen /> */}
        {/* <Success /> */}
        {/* <TimerExperiment homeProps={props} /> */}
        <TimerExperiment />
      </View>
    </View>
  )
}
