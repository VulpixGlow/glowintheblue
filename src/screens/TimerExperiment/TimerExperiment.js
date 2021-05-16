import React, { useEffect, useState, useRef } from 'react';
import CountDown from 'react-native-countdown-component';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Item,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Success from '../Success/Success';
import Category from '../CategoryScreen/CategoryScreen';
import Tabs from '../Tabs/Tabs'

export default function TimerExperiment() {
  const navigation = useNavigation();
  const [worktime, setWorktime] = useState(10);
  const [isRunning, setRunning] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const pickerRef = useRef();

  console.log('selectedValue-->', selectedValue);

  return (
    <View style={styles.mainView}>
      {/* <Text>Choose your time!</Text> */}
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemPosition) => setSelectedValue(itemValue)}
        // onValueChange={(itemValue) => console.log('itemValue -->', itemValue)}
        style={{ color: '#ffffff', placeholderTextColor: '#fff' }}
      >
        <Picker.Item color='white' label='0 minutes' value={0} />
        <Picker.Item color='white' label='10 minutes' value={10} />
        <Picker.Item color='white' label='20 minutes' value={20} />
        <Picker.Item color='white' label='30 minutes' value={30} />
      </Picker>
      <CountDown
        size={60}
        // until={selectedValue * 60}
        until={selectedValue}
        onFinish={() => navigation.navigate('Success')}
        digitStyle={{
          // backgroundColor: '#FFF',
          borderWidth: 0,
          borderColor: '#e785e2',
          borderRadius: 50,
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
      <Tabs />
    </View>
  );
}
