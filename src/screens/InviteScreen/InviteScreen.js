import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const checkEmail = async (value) => {
  try {
    const userEmail = JSON.stringify(value);
    await AsyncStorage.setEmail(STORAGE_KEY, userEmail);
  } catch (error) {
    alert('Failed to load points');
  }
};

export default function InviteScreen(props) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('EMAIL', email);
    alert(`Invite Sent!`);
  };

  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160 }}>
          <Text h1>Invite your friends!</Text>
          <TextInput
          type="text"
            placeholder='Email'
            value={email}
            onChangeText={(text) => {
              console.log('EVENT TARGET', text);
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
