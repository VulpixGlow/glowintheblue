import React, { useEffect, useState, useRef } from 'react'
import CountDown from 'react-native-countdown-component'
import { Text, View, Button, StyleSheet, Alert, SafeAreaView, Item } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import Success from '../Success/Success'
import Category from '../CategoryScreen/CategoryScreen'
import FooterScreen from '../FooterScreen/FooterScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectCountdownComponent from './SelectDropdownComponent'
import axios from 'axios'
import filterDataFunction from './filterDataFunction'

// for AsyncStorage
const STORAGE_KEY = '@save_points'

export default function TimerExperiment(props) {
  console.log('TIMEREXPERIMENT COMPONENT PROPS', props)
  const [userData, setUserData] = useState([])
  const [isRunning, setRunning] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0)
  const [points, setPoints] = useState(0)
  const navigation = useNavigation()
  const pickerRef = useRef()

  const sessionData = async () => {
    try {
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions')
      console.log('Data from Timer Component -->', data)

      setUserData(data)
    } catch (error) {
      console.log('Unable to retrieve data')
    }
  }

  useEffect(() => {
    sessionData()
  }, [])

  // Async Storage Logic
  // const { getItem, setItem } = AsyncStorage()

  const retrieveDataFromStorage = async () => {
    try {
      const userPoints = await AsyncStorage.getItem(STORAGE_KEY)

      if (userPoints !== null) {
        return JSON.parse(userPoints)
      }
    } catch (error) {
      alert('Failed to load points')
    }
  }

  const saveDataToStorage = async value => {
    try {
      const userPoints = JSON.stringify(value)

      await AsyncStorage.setItem(STORAGE_KEY, userPoints)

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
  const onConfirmCompleted = total => {
    // if (!points) return
    saveDataToStorage(total)
    setPoints(total)
  }
  // Async Storage Logic END

  let addPoints = 0

  switch (selectedValue) {
    case 10:
      addPoints = 5
      break
    case 20:
      addPoints = 10
      break
    case 30:
      addPoints = 15
      break
    case 40:
      addPoints = 20
      break
    case 50:
      addPoints = 25
      break
    case 60:
      addPoints = 30
      break
    default:
      addPoints = 35
  }
  //   console.log("selectedValue-->", selectedValue)
  //   console.log("addPoints-->", addPoints)

  let totalPoints = points + addPoints

  const createTwoButtonAlert = () =>
    Alert.alert('Congradulations', 'Confirm Completed Task', [
      {
        text: 'Uncompleted',
        onPress: () => console.log('Uncompleted Pressed'),
        style: 'cancel'
      },
      { text: 'I DID IT!', onPress: () => onConfirmCompleted(totalPoints) }
    ])
  // How can this all be stored in a object and referenced for graphing?
  // console.log('AselectedValue-->', selectedValue)
  // console.log('AaddPoints-->', addPoints)
  // console.log('Points', points)

  console.log('MOST RECENT USER DATA', userData)

  // how to access the user email => props.userData.extraData.email
  let dataForTimeLine = filterDataFunction(userData, 'aavrahamy2x@webnode.com')

  console.log('Data For TimeLine', dataForTimeLine)

  return (
    <SafeAreaView>
      <View style={styles.pointsIcon}>
        <Text>Points Earned:</Text>
        <Button
          title={`${points}`}
          onPress={() => {
            navigation.navigate('Points')
          }}></Button>
      </View>

      <View style={styles.mainView}>
        {/* <View> */}
        <Picker
          ref={pickerRef}
          selectedValue={selectedValue}
          onValueChange={itemValue => setSelectedValue(itemValue)}
          style={{ color: '#ffffff', placeholderTextColor: '#fff' }}>
          <Picker.Item color='white' label='10 minutes' value={10} />
          <Picker.Item color='white' label='20 minutes' value={20} />
          <Picker.Item color='white' label='30 minutes' value={30} />
        </Picker>
        {/* </View> */}
        <CountDown
          size={60}
          // until={selectedValue * 60}
          until={selectedValue}
          // onFinish={() => navigation.navigate('Success')}
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

        <View style={styles.pickerView}>
          <SelectCountdownComponent
            userSession={props}
            userPoints={points}
            userTime={selectedValue}
            userEmail={props.userData.extraData.email}
          />
        </View>
        <View style={styles.buttonsView}>
          <Button title='Start' onPress={() => setRunning(true)} />
          <Button title='Pause' onPress={() => setRunning(false)} />
        </View>
        <FooterScreen
          userSession={props}
          userPoints={points}
          userTime={selectedValue}
          userEmail={props.userData.extraData.email}
          userData={dataForTimeLine}
        />
      </View>
    </SafeAreaView>
  )
}

//   const sessionData = async () => {
//     try {
//       const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions')
//       console.log('Data -->', data)

//       update state variable arrays with data
//       data.forEach(obj => {
//         category.push(data.categoryName)
//         time.push(data.time)
//       })

//       timeDataSet = combineData(time, category)
//       categoryDataSet = [...new Set(categories)]

//       useEffect to reflect this change when the page rerenders

//       setTime(timeDataSet)
//       setCategory(categoryDataSet)
//     } catch (error) {
//       console.log(error)
//     }
//   }

// useEffect(() => {
//   sessionData()
// }, [])
