import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Title, Divider, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { UserInfoContext } from '../../../UserContext';
import FilterDataFunction from '../../dataFunctions/FilterDataFunction';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

// had issue with displaying graph with using a sperate style file

export default function TimelineScreen() {
  const { user, userData, setUserData, userTimeLineData, setUserTimeLineData } =
    useContext(UserInfoContext);
  const [graphIsLoading, setGraphLoading] = useState(true);

  const navigation = useNavigation();

  const fetchUpdatedData = async () => {
    if (graphIsLoading) {
      try {
        console.log('Inside FetchUpdatedData in TimelineScreen');
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
      <Text style={styles.title}> Glow Timeline </Text>
      <Timeline
        data={userTimeLineData}
        circleSize={20}
        circleColor='#2D2660'
        lineColor='#2D2660'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#5BA5E7',
          color: 'white',
          padding: 5,
          borderRadius: 13
        }}
        descriptionStyle={{ color: 'rgb(64,64,64)' }}
        options={{
          style: { paddingTop: 5 }
        }}
      />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  graphButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  barGraphButton: {
    backgroundColor: 'blue',
    color: 'white'
  }
});
