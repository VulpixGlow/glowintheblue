import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// const checkEmail = async (value) => {
//   try {
//     const userEmail = JSON.stringify(value);
//     await AsyncStorage.setEmail(STORAGE_KEY, userEmail);
//   } catch (error) {
//     alert('Failed to load points');
//   }
// };

export default function InviteScreen(props) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (evt) => {
    // email = "s@s.com, a@a.com",
    const emails = email.split(', ');
    // axios.post('')

    const notificationData = async () => {
      //const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/notifications');
      const { data } = await axios.post('http://localhost:8080/api/notifications', {
        "userId": 5,
        "emails": emails,
        "groupName": groupName
      })
      //console.log('groupData line 12', data);
    };
    notificationData();
    // const emails = email.split(', '); ['s@s.com', 'a@a.com']
    // email -> a string of comma delimited emails
    // make sure you split the emails email.split(',') so you can get an array
    // axios.post('herokuapp.com/api/...', emails)
    // axios.post('http://YOUR_IP_ADDRESS:8080/api/...', emails)
    // Make your axios call to that route, and pass in your list of emails
    evt.preventDefault();
    //console.log('EMAIL', email);
    alert(`Invite Sent!`);
  };

  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160 }}>
          <Text h1>Group name</Text>
            <TextInput
              type='text'
              placeholder='name your group'
              value={groupName}
              onChangeText={(text) => {
                setGroupName(text)
              }}
            />
          <Text h1>Invite your friends!</Text>
          <TextInput
            type='text'
            placeholder='Email'
            value={email}
            onChangeText={(text) => {
              //console.log('EVENT TARGET', text);
              setEmail(text);
            }}
            rightIcon={{ name: 'add', size: 24, color: 'green' }}
          />
        </View>
        <Button title='Send' onPress={handleSubmit}></Button>
      </Card>
      <FooterScreen />
    </View>
  );
}

// const styles = StyleSheet.create({
//   buttonContainer: {
//     marginRight: 7,
//   },
// });
