import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const Graph = (props) => {
  console.log('PROPS TO GRAPH', props);
  // console.log('Array', props.route.params.userData);
  // const data = props.route.params.userData;
  const [userData, setUserData] = useState({});

  // Axios request for data
  const sessionData = async () => {
    console.log('INSIDE SESSION DATA FUNCTION');
    try {
      // const { data } = await axios.get('http://localhost:8080/api/sessions')
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions');
      // console.log('Data from Timer Component -->', data);
      setUserData(data);
    } catch (error) {
      if (error.response) {
        // There is an error response from the server
        // https://stackoverflow.com/questions/61116450/what-is-causing-an-unhandled-promise-rejection-undefined-is-not-an-object-eval
        console.log('Error response from server', err.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response was recieved', error.request);
      } else {
        // Some other errors
        console.log('Error', error.message);
      }
    }
  };
  useEffect(() => {
    sessionData();
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
          borderRadius: 13,
        }}
        descriptionStyle={{ color: 'rgb(64,64,64)' }}
        options={{
          style: { paddingTop: 5 },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Graph;
