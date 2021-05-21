import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';

export default function NotifScreen(props) {
  // const navigation = useNavigation();
  const notificationData = async () => {
    //const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/notifications');
    const { data } = await axios.post('http://localhost:8080/api/notifications', {
      "userId": 5,
      "emails":["user6@gmail.com","user1@gmail.com","user2@gmail.com"],
      "groupName":"group1"
    })
    console.log('groupData line 12', data);
  };
  notificationData();
  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160, paddingTop: 30, justifyContent: 'center' }}>
          <Text h1>YOU'VE BEEN INVITED!</Text>
          <Text style={{ paddingTop: 20, paddingBottom: 20 }} h4>
            Which do you choose?
          </Text>
          <Button
            title='🎉🍭🎉🍭'
            type='outline'
            style={{ backgroundColor: 'green', marginBottom: 20 }}></Button>
          <Text></Text>
          <Button title='💣💔💣💔' type='outline' style={{ backgroundColor: 'red' }}></Button>
        </View>
      </Card>
      <FooterScreen  />
    </View>
  );
}

// userData={dataForTimeLine}
