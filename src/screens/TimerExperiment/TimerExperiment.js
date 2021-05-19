import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  Item,
  Animated,
  TouchableHighlight,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Success from '../Success/Success';
import Category from '../CategoryScreen/CategoryScreen';
import FooterScreen from '../FooterScreen/FooterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectCountdownComponent from './SelectDropdownComponent';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import axios from 'axios';
import filterDataFunction from './filterDataFunction';

// for AsyncStorage
const STORAGE_KEY = '@save_points';

export default function TimerExperiment(props) {
  console.log('TIMEREXPERIMENT COMPONENT PROPS', props);
  const timerEmail = props.userData.extraData.email;
  console.log('timerEmail -->', timerEmail);
  const [userData, setUserData] = useState([]);
  const [worktime, setWorktime] = useState(10);
  const [isRunning, setRunning] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [points, setPoints] = useState(0);
  const navigation = useNavigation();
  const pickerRef = useRef();

  const sessionData = async () => {
    try {
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions');
      console.log('Data from Timer Component -->', data);

      setUserData(data);
    } catch (error) {
      console.log('Unable to retrieve data');
    }
  };

  useEffect(() => {
    sessionData();
  }, []);

  // Async Storage Logic
  // const { getItem, setItem } = AsyncStorage()

  const retrieveDataFromStorage = async () => {
    try {
      const userPoints = await AsyncStorage.getItem(STORAGE_KEY);

      if (userPoints !== null) {
        return JSON.parse(userPoints);
      }
    } catch (error) {
      alert('Failed to load points');
    }
  };

  const saveDataToStorage = async (value) => {
    try {
      const userPoints = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, userPoints);
    } catch (error) {
      alert('Failed to save points');
    }
  };

  /* To retrieve the data whenever the app starts, invoke this method inside the useEffect hook.*/

  useEffect(() => {
    retrieveDataFromStorage();
  }, []);

  // Helper Function
  const onConfirmCompleted = (total) => {
    // if (!points) return;
    saveDataToStorage(total);
    setPoints(total);
  };
  // Async Storage Logic END

  let addPoints = 0;

  switch (selectedValue) {
    case 10:
      addPoints = 5;
      break;
    case 20:
      addPoints = 10;
      break;
    case 30:
      addPoints = 15;
      break;
    case 40:
      addPoints = 20;
      break;
    case 50:
      addPoints = 25;
      break;
    case 60:
      addPoints = 30;
      break;
    default:
      addPoints = 35;
  }
  //   console.log("selectedValue-->", selectedValue)
  //   console.log("addPoints-->", addPoints)

  let totalPoints = points + addPoints;

  const createTwoButtonAlert = () =>
    Alert.alert('Congratulations', 'Confirm Completed Task', [
      {
        text: 'Uncompleted',
        onPress: () => console.log('Uncompleted Pressed'),
        style: 'cancel',
      },
      { text: 'I DID IT!', onPress: () => onConfirmCompleted(totalPoints) },
    ]);
  // How can this all be stored in a object and referenced for graphing?
  console.log('MOST RECENT USER DATA', userData);

  // how to access the user email => props.userData.extraData.email
  // let dataForTimeLine = filterDataFunction(userData, 'aavrahamy2x@webnode.com');
  let dataForTimeLine = filterDataFunction(userData, `${timerEmail}`);

  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView>
      <View style={styles.inviteNotif}>
        <Button
          buttonStyle={styles.buttonContainerN}
          title='🔔'
          onPress={() => navigation.navigate('NotifScreen')}></Button>
        <View style={styles.pointsBox}>
          <Text style={styles.oima}>Points Earned:</Text>
          <Text>{points}</Text>
          {/* <Button
          title={`${points}`}
          onPress={() => {
            navigation.navigate('Points');
          }}></Button> */}
        </View>
        <Button
          buttonStyle={styles.buttonContainerF}
          title='👯'
          onPress={() => navigation.navigate('InviteScreen')}></Button>
      </View>

      <View style={styles.mainView}>
        <View style={styles.pickerView}>
          {/* <Text style={styles.pickerViewText}>Choose your time:</Text> */}
          <Picker
            ref={pickerRef}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={{ color: '#ffffff', placeholderTextColor: '#fff' }}>
            <Picker.Item color='white' label='5 seconds' value={5} />
            <Picker.Item color='white' label='20 minutes' value={20} />
            <Picker.Item color='white' label='30 minutes' value={30} />
          </Picker>
        </View>
        <View style={styles.countdownView}>
          <CountdownCircleTimer
            isPlaying={isRunning}
            key={selectedValue}
            duration={selectedValue}
            onComplete={createTwoButtonAlert}
            children
            size={180}
            strokeWidth={15}
            colors={[
              ['#e785e2', 0.4],
              ['#5ba5e7', 0.4],
              ['#e785e2', 0.4],
            ]}>
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor, fontSize: 50 }}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>

        <View style={styles.dropdownView}>
          <SelectCountdownComponent
            userSession={props}
            userPoints={points}
            userTime={selectedValue}
            userEmail={props.userData.extraData.email}
            userData={dataForTimeLine}
          />
        </View>
        <View style={styles.buttonsView}>
          <Button
            buttonStyle={styles.homeButton}
            titleStyle={{ color: '#2d2660' }}
            title='Start'
            onPress={() => setRunning(true)}
          />
          <Button
            buttonStyle={styles.homeButton}
            titleStyle={{ color: '#2d2660' }}
            title='Pause'
            onPress={() => setRunning(false)}
          />
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
  );
}
