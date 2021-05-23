import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
// CAN  YOU FEEL THE VIBRATION?
import { Text, View, Alert, SafeAreaView, Animated, Vibration } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SelectDropdown from 'react-native-select-dropdown';
import FooterScreen from '../FooterScreen/FooterScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import axios from 'axios';

export default function TimerExperiment() {
  const {
    user,
    setUser,
    userData,
    setUserData,
    selectedValue,
    setSelectedValue,
    points,
    setPoints,
    selectCat,
    setSelectedCat,
  } = useContext(UserInfoContext);
  //console.log('POINTS ', points);
  //console.log('INSIDE TIMERSCREEN', user);

  const [isRunning, setRunning] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(0);
  // const [points, setPoints] = useState(0);

  // const timerEmail = user.email;
  //console.log('timerEmail -->', timerEmail);
  const pickerRef = useRef();
  const navigation = useNavigation();

  // Category constants - Refactored
  // const [selectCat, setSelectedCat] = useState('');
  const categories = ['Focus', 'Meditate', 'Move', 'Connect', 'Other'];

  // Axios request for data
  const sessionData = async () => {
    //console.log('INSIDE SESSION DATA FUNCTION');
    try {
      // const { data } = await axios.get('http://localhost:8080/api/sessions')
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions');
      //console.log('Data from Timer Component -->', data);
      setUserData(data);
    } catch (error) {
      if (error.response) {
        // There is an error response from the server
        // https://stackoverflow.com/questions/61116450/what-is-causing-an-unhandled-promise-rejection-undefined-is-not-an-object-eval
        console.log('Error response from server', err.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response was recieved', error.request);
      } else {
        // Some other errors
        console.log('Error', error.message);
      }
    }
  };

  useEffect(() => {
    sessionData();
  }, []);

  // Axios call to update data in db after each "session"
  const onConfirmCompleted = async (total) => {
    try {
      //console.log('CHECK STATE OF POINTS', points);
      // http://localhost:8080/api/sessions/update
      await axios.put('https://glowintheblue.herokuapp.com/api/sessions/update', {
        email: user.email,
        userPoints: total,
        categoryName: selectCat,
        time: selectedValue,
        points: points,
      });
    } catch (error) {
      console.log('Error in onComfirmCompleted function', error);
    }
  };

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
      addPoints = 2;
  }

  // TotalPoint collected after each "session"
  let totalPoints = points + addPoints;

  // This function invokes "onConfirmCompleted" function which creates another axios request to update data
  const createTwoButtonAlert = () =>
    Alert.alert('Congratulations', 'Confirm Your Accomplishment', [
      {
        text: "Didn't happen",
        onPress: () => console.log('Uncompleted Pressed'),
        style: 'cancel',
      },
      {
        text: 'Glowing',
        onPress: () => {
          setPoints(totalPoints);
          onConfirmCompleted(totalPoints);
        },
      },
    ]);

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
        {/* <Button
          buttonStyle={styles.buttonContainerF}
          title='👯'
          onPress={() => navigation.navigate('InviteScreen')}></Button> */}
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
            onComplete={() => {
              setRunning(false);
              Vibration.vibrate();
              createTwoButtonAlert();
            }}
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
        <View style={styles.pickerView}>
          <SelectDropdown
            data={categories}
            defaultButtonText='Choose a category'
            buttonStyle={{
              backgroundColor: '#42397d',
              borderRadius: 50,
              borderColor: '#42397d',
              borderWidth: 2,
              outerHeight: 40,
            }}
            renderDropdownIcon={() => {
              return <FontAwesome name='chevron-down' color={'#fff'} size={14} />;
            }}
            dropdownIconPosition={'right'}
            buttonTextStyle={{ color: '#fff' }}
            onSelect={(selectedItem, index) => {
              setSelectedCat(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            dropdownStyle={{ backgroundColor: '#EFEFEF' }}
            rowStyle={{
              backgroundColor: '#42397d',
              borderBottomColor: '#C5C5C5',
            }}
            rowTextStyle={{ color: '#fff', textAlign: 'left' }}
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
      </View>
    </SafeAreaView>
  );
}
