import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'
import TimerExperiment from '../TimerExperiment/TimerExperiment'

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        <TimerExperiment />
      </View>
    </View>
  );
}
