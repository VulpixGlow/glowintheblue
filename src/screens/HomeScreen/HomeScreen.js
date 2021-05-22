import React, { useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import TimerExperiment from '../TimerExperiment/TimerExperiment';
import axios from 'axios';
import BottomTabs from '../BottomTabs/BottomTabs';

export default function HomeScreen(props) {
  console.log('HOMESCREEN PROPS', props);

  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        <TimerExperiment userData={props} />
      </View>
    </View>
  );
}
