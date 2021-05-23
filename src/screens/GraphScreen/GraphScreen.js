import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Button } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { UserInfoContext } from '../../../UserContext';
import FilterDataFunction from './filterDataFunction';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

// had issue with displaying graph with using a sperate style file

const Graph = () => {
  const { user, userData, setUserData } = useContext(UserInfoContext);

  const navigation = useNavigation();

  const fetchUpdatedData = async () => {
    try {
      //console.log('LINE 84');
      // return the updated data for the timeline to reflect newly completed session
      // http://localhost:8080/api/sessions
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions/');
      //console.log('Newly DATA LINE 21 GRAPH -->', data);
      setUserData(FilterDataFunction(data, user.email));
    } catch (error) {
      console.log('GraphScreen Axios error', error);
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Glow Timeline </Text>
      <Timeline
        data={userData}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13
        }}
        descriptionStyle={{ color: 'rgb(64,64,64)' }}
        options={{
          style: { paddingTop: 5 }
        }}
      />
      <View style={styles.graphButtonSection}>
        <Button
          title='Pie Chart'
          style={styles.barGraphButton}
          onPress={() => navigation.navigate('PieChart')}
        />
      </View>
    </View>
  );
};

export default Graph;

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
