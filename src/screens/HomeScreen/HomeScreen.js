import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import styles from './styles';
import TimerExperiment from '../TimerExperiment/TimerExperiment';
import axios from 'axios';
import { UserInfoContext } from '../../../UserContext';

export default function HomeScreen() {
  const { user } = useContext(UserInfoContext);

  console.log('WE WANT TO SEE USERS', user);


  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        <TimerExperiment />
      </View>
    </View>
  );
}
