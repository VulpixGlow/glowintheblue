import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Title, Divider, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { UserInfoContext } from '../../../UserContext';
import FilterDataFunction from '../../dataFunctions/FilterDataFunction';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

export default function TimelineScreen() {
  const { user, userData, setUserData, userTimeLineData, setUserTimeLineData } =
    useContext(UserInfoContext);
  const [graphIsLoading, setGraphLoading] = useState(true);

  const navigation = useNavigation();

  const fetchUpdatedData = async () => {
    if (graphIsLoading) {
      try {
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions/');
        setUserTimeLineData(FilterDataFunction(data, user.email));
        setGraphLoading(false);
      } catch (error) {
        setGraphLoading(false);
        console.log('Timeline Screen Axios error', error);
      }
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  if (graphIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Timeline
        timeTitle='HII'
        data={userTimeLineData}
        circleSize={20}
        innerCircle='dot'
        dotColor='#8cffde'
        circleColor='#e785e2'
        lineColor='#e785e2'
        separator='true'
        separatorStyle={{ backgroundColor: '#e785e2' }}
        timeContainerStyle={styles.timelineData}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#5BA5E7',
          color: 'white',
          padding: 5,
          borderRadius: 13,
          fontWeight: 'bold',
        }}
        descriptionStyle={{ color: 'rgb(64,64,64)' }}
        options={{
          style: {
            padding: 25,
            paddingTop: 100,
            margin: 20,
            backgroundColor: '#ffeafe',
            borderRadius: 10,
            height: 'auto',
          },
        }}
      />
      <Text style={styles.title}>Your Timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fec7fb',
  },
  title: {
    padding: 0,
    marginTop: 50,
    marginLeft: 40,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
  },
  graphButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barGraphButton: {
    backgroundColor: 'blue',
    color: 'white',
  },
  timelineCard: {
    backgroundColor: '#42397d',
    height: 200,
  },
  timelineData: {
    minWidth: 52,
    marginTop: -5,
  },
});
