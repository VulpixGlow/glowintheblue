import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import styles from './styles';
import TimerExperiment from '../TimerExperiment/TimerExperiment';
import axios from 'axios';
import { UserInfoContext } from '../../../UserContext';
import FilterDataFunction from '../../dataFunctions/FilterDataFunction';

export default function HomeScreen() {
  const { user, setUserData, setUserTimeLineData } = useContext(UserInfoContext);

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

  useEffect(() => {
    sessionData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container_timer}>
        <TimerExperiment />
      </View>
    </View>
  );
}
