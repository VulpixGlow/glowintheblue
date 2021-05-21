import React, { useEffect } from 'react'
import { View } from 'react-native'
import styles from './styles'
import TimerExperiment from '../TimerExperiment/TimerExperiment'
import axios from 'axios'

export default function HomeScreen(props) {
  //console.log('HOMESCREEN PROPS', props)

  const storeUserData = async () => {
    try {
      //console.log('STORING USER DATA HOMESCREEN', props.extraData.email)
      await axios.post('https://glowintheblue.herokuapp.com/api/users', props.extraData.email)
    } catch (error) {
      console.log('Unable to save user info')
    }
  }
  useEffect(() => {
    storeUserData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        <TimerExperiment userData={props} />
      </View>
    </View>
  )
}
