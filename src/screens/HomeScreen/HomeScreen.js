import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
} from 'react-native';
import styles from './styles';
import PomodoroTimer from '../TimeScreen/PomodoroTimer';
import CategoryScreen from '../CategoryScreen/CategoryScreen';
import TimerScreen from '../TimerScreen/TimerScreen';
import TimerExperiment from '../TimerExperiment/TimerExperiment';
import Success from '../Success/Success';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        {/* <TimerScreen /> */}
        {/* <PomodoroTimer homeProps={props} /> */}
        {/* <CategoryScreen /> */}
        {/* <Success /> */}
        <TimerExperiment homeProps={props} />
      </View>
    </View>
  );
}
