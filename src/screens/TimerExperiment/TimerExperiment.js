import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
import {
  Text,
  View,
  Alert,
  SafeAreaView,
  Animated,
  Vibration,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SelectDropdown from 'react-native-select-dropdown';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FilterDataFunction from '../../dataFunctions/FilterDataFunction';
import styles from './styles';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TimerExperiment() {
  const {
    user,
    setUserData,
    userTimeLineData,
    setUserTimeLineData,
    selectedValue,
    setSelectedValue,
    // totalPoints,
    // setTotalPoints,
    points,
    setPoints,
    selectCat,
    setSelectedCat
  } = useContext(UserInfoContext);

  const [defaultTime, setDefaultTime] = useState(10);
  const [isRunning, setRunning] = useState(false);
  const pickerRef = useRef();
  const navigation = useNavigation();

  const categories = ['Focus', 'Meditate', 'Move', 'Connect', 'Other'];

  const sessionData = async () => {
    try {
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions');
      setUserData(data);
      setUserTimeLineData(FilterDataFunction(data, user.email));
    } catch (error) {
      if (error.response) {
        console.log('Error response from server', err.response.data);
      } else if (error.request) {
        console.log('No response was recieved', error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  const addTotalPoints = () => {
    return userTimeLineData.reduce((acc, currentVal) => {
      acc += currentVal.time;

      return acc;
    }, 0);
  };

  useEffect(() => {
    sessionData();
  }, [points]);

  const onConfirmCompleted = async total => {
    try {
      await axios.put('https://glowintheblue.herokuapp.com/api/sessions/update', {
        email: user.email,
        userPoints: total,
        categoryName: selectCat,
        time: selectedValue,
        points: points
      });
    } catch (error) {
      console.log('Error in onComfirmCompleted function', error);
    }
  };

  let addPoints = 0;

  switch (selectedValue) {
    case 10:
      addPoints = 10;
      break;
    case 20:
      addPoints = 20;
      break;
    case 30:
      addPoints = 30;
      break;
    case 40:
      addPoints = 40;
      break;
    case 50:
      addPoints = 50;
      break;
    case 60:
      addPoints = 60;
      break;
    default:
      addPoints = 2;
  }

  let totalPoints = points + addPoints;

  const createTwoButtonAlert = () =>
    Alert.alert('Congratulations', 'Confirm Your Accomplishment', [
      {
        text: "Didn't happen",
        onPress: () => console.log('Uncompleted Pressed'),
        style: 'cancel'
      },
      {
        text: 'Glowing',
        onPress: () => {
          setPoints(totalPoints);
          onConfirmCompleted(totalPoints);
        }
      }
    ]);

  const children = ( {remainingTime} ) => {
    const hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = parseInt(remainingTime % 60, 10)
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topHeader}>
          <View style={styles.pointsBox}>
            <Text style={styles.pointsBoxText}>Points: {points}</Text>
          </View>
          <View style={styles.graphButtonsView}>
            <TouchableOpacity style={styles.timeLineButton}>
              <FontAwesome
                name='line-chart'
                color={'#fff'}
                size={20}
                onPress={() => navigation.navigate('Timeline')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeLineButton}>
              <FontAwesome
                name='pie-chart'
                color={'#fff'}
                size={20}
                onPress={() => navigation.navigate('PieChart')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.mainTitle}>What are we doing today?</Text>
          <View style={styles.dropdownView}>
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
          <View style={styles.countdownView}>
            <CountdownCircleTimer
              isPlaying={isRunning}
              key={selectedValue}
              duration={selectedValue}
              onComplete={() => {
                setRunning(false);
                Vibration.vibrate();
                createTwoButtonAlert();
                setSelectedValue(defaultTime);
              }}
              size={180}
              strokeWidth={15}
              colors={[
                ['#8cffdf', 0.4],
                ['#e785e2', 0.4],
                ['#8cffdf', 0.4],
              ]}>
              {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor, fontSize: 45 }}>
                  {children({ remainingTime })}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </View>
        </View>
        <View style={styles.pickerView}>
          <Picker
            ref={pickerRef}
            selectedValue={selectedValue}
            onValueChange={itemValue => setSelectedValue(itemValue)}
            style={{ color: '#ffffff', placeholderTextColor: '#fff' }}>
            {/* <Picker.Item color='white' label='Choose' /> */}
            <Picker.Item color='white' label='10 seconds' value={10} />
            <Picker.Item color='white' label='20 minutes' value={1200} />
            <Picker.Item color='white' label='30 minutes' value={1800} />
          </Picker>
          <View style={styles.buttonsView}>
            <Button
              buttonStyle={styles.playPauseButtons}
              titleStyle={{ color: '#2d2660' }}
              icon={<FontAwesome name='play' size={15} color='white' />}
              // title='Start'
              onPress={() => setRunning(true)}
            />
            <Button
              buttonStyle={styles.playPauseButtons}
              titleStyle={{ color: '#2d2660' }}
              icon={<FontAwesome name='pause' size={15} color='white' />}
              // title='Pause'
              onPress={() => setRunning(false)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
