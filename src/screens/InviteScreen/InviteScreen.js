import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
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

export default function InviteScreen() {
  const {
    user,
    setUser,
    userData,
    setUserData,
    selectedValue,
    setSelectedValue,
    points,
    setPoints,
    selectCat,
    setSelectedCat,
    inviteEmail,
    setInviteEmail,
    groupName,
    setGroupName,
  } = useContext(UserInfoContext);
  // const navigation = useNavigation();
  //console.log('INVITE EMAIL', inviteEmail);
  const handleSubmit = (evt) => {
    // email = "s@s.com, a@a.com",
    const emails = inviteEmail.split(', ');
    //console.log('invite email in invitescreen', emails)
    // axios.post('')
    //hello i want to merge
    const notificationData = async () => {
      const { data } = await axios.post('https://glowintheblue.herokuapp.com/api/notifications', {
      //const { data } = await axios.post('http://localhost:8080/api/notifications', {
        ownerEmail: user.email,
        emails: emails,
        groupName: groupName,
      });
      console.log('groupData line 12', data);
    };
    notificationData();
    // const emails = email.split(', '); ['s@s.com', 'a@a.com']
    // email -> a string of comma delimited emails
    // make sure you split the emails email.split(',') so you can get an array
    // axios.post('herokuapp.com/api/...', emails)
    // axios.post('http://YOUR_IP_ADDRESS:8080/api/...', emails)
    // Make your axios call to that route, and pass in your list of emails
    evt.preventDefault();
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
              setGroupName(text);
            }}
          />
          <Text h1>Invite your friends!</Text>
          <TextInput
            type='text'
            placeholder='Email'
            value={inviteEmail}
            onChangeText={(text) => {
              //console.log('EVENT TARGET', text);
              setInviteEmail(text);
            }}
            rightIcon={{ name: 'add', size: 24, color: 'green' }}
          />
        </View>
        <Button title='Send' onPress={handleSubmit}></Button>
      </Card>
      {/* <FooterScreen /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   buttonContainer: {
//     marginRight: 7,
//   },
// });
