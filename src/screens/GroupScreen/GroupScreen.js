import React from 'react'
import { View, Text } from 'react-native'
//import styles from './styles'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const groupData = async () => {
  // const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/group');
  const { data } = await axios.get('http://localhost:8080/api/group')
  console.log('groupData line 9', data);
};
groupData();

console.log('hello from GroupScreen line 14', `{data.groupName}`)
export default function GroupScreen() {


  console.log('hello from GroupScreen line 16')
  const navigation = useNavigation();
  return (
    <View>
        <Text>Hello My Friends</Text>
        <Text>data</Text>
    </View>
  )
}
