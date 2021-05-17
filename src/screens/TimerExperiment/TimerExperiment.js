import React, { useEffect, useState, useRef } from 'react'
import CountDown from 'react-native-countdown-component'
import { Text, View, Button, StyleSheet, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import Success from '../Success/Success'
import Category from '../CategoryScreen/CategoryScreen'
import FooterScreen from '../FooterScreen/FooterScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

// for AsyncStorage
const STORAGE_KEY = '@save_points'

export default function TimerExperiment() {
  const [worktime, setWorktime] = useState(10)
  const [isRunning, setRunning] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0)
  const [points, setPoints] = useState(0)
  // console.log('points', points)

  // Async Storage Logic
  // const [userPoints, setUserPoints] = useState(0)

  // const { getItem, setItem } = AsyncStorage()

  const retrieveDataFromStorage = async () => {
    try {
      const userPoints = await AsyncStorage.getItem(STORAGE_KEY)
      console.log('retrieving data')

      if (userPoints !== null) {
        console.log('We have data!')
        console.log('Json Parse', JSON.parse(userPoints))
        return JSON.parse(userPoints)
      }
    } catch (error) {
      alert('Failed to load points')
    }
  }

  const saveDataToStorage = async value => {
    try {
      console.log('saving data!')
      const userPoints = JSON.stringify(value)
      console.log('Json string ', userPoints)
      await AsyncStorage.setItem(STORAGE_KEY, userPoints)
      alert('Points were saved')
      // setPoints(newValue)
    } catch (error) {
      alert('Failed to save points')
    }
  }

  /* To retrieve the data whenever the app starts, invoke this method inside the useEffect hook.*/

  useEffect(() => {
    retrieveDataFromStorage()
  }, [])

  // Helper Function
  // const onPointChange = userPoints => setPoints(userPoints)
  const onConfirmCompleted = total => {
    if (!points) return
    saveDataToStorage(total)
    setPoints(total)
  }

  // Async Storage Logic END

  const navigation = useNavigation()
  const pickerRef = useRef()

  let addPoints = 0

  switch (selectedValue) {
    case 10:
      addPoints = 5
      break
    case 20:
      addPoints = 10
      break
    // case 30:
    //   setPoints(points + 15)
    //   break
    // case 40:
    //   setPoints(points + 20)
    //   break
    // case 50:
    //   setPoints(points + 25)
    //   break
    // case 60:
    //   setPoints(points + 30)
    //   break
    default:
      addPoints = 0
  }
  //   console.log("selectedValue-->", selectedValue)
  //   console.log("addPoints-->", addPoints)

  let totalPoints = points + addPoints

  const createTwoButtonAlert = () =>
    Alert.alert('Congradulations', 'Confirm Completed Task', [
      {
        text: 'Uncompleted',
        onPress: () => console.log('NO - Uncompleted Pressed'),
        style: 'cancel'
      },
      { text: 'I DID IT!', onPress: () => onConfirmCompleted(totalPoints) }
    ])
  // How can this all be stored in a object and referenced for graphing?
  //   console.log("AselectedValue-->", selectedValue)
  //   console.log("AaddPoints-->", addPoints)
  //   console.log("Points", points)

  return (
    <View>
      <View style={styles.pointsIcon}>
        <Text>Points Earned:</Text>
        <Button
          title={`${points}`}
          // points={points}
          // selectedTime={selectedValue}
          // pointsAdded={addPoints}
          onPress={() => {
            navigation.navigate('Points')
          }}></Button>
      </View>

      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemPosition) => setSelectedValue(itemValue)}
        // onValueChange={(itemValue) => console.log('itemValue -->', itemValue)}
        style={{ color: '#ffffff', placeholderTextColor: '#fff' }}>
        <Picker.Item color='white' label='0 minutes' value={0} />
        <Picker.Item color='white' label='10 minutes' value={10} />
        <Picker.Item color='white' label='20 minutes' value={20} />
        <Picker.Item color='white' label='30 minutes' value={30} />
      </Picker>
      <CountDown
        size={60}
        // until={selectedValue * 60}
        until={selectedValue}
        // onFinish={() => navigation.navigate("Success")}
        //  onFinish={setPoints => navigation.navigate("Success")}
        onFinish={createTwoButtonAlert}
        digitStyle={{
          // backgroundColor: '#FFF',
          borderWidth: 0,
          borderColor: '#e785e2',
          borderRadius: 50
        }}
        digitTxtStyle={{ color: '#e785e2' }}
        timeLabelStyle={{ color: '#8cfede', fontWeight: 'light' }}
        separatorStyle={{ marginBottom: 10, color: '#e785e2' }}
        timeToShow={['M', 'S']}
        timeLabels={{ m: null, s: null }}
        showSeparator
        running={isRunning}
      />
      <Category name='Home' component={Category} />
      <Button title='Start' onPress={() => setRunning(true)} />
      <Button title='Pause' onPress={() => setRunning(false)} />
      <FooterScreen />
    </View>
  )
}
