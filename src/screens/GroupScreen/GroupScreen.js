import React, { useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, Text, Button } from 'react-native';
//import styles from './styles'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import InviteScreen from '../InviteScreen/InviteScreen';
// const screenWidth = Dimensions.get('window').width
// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
// }


//console.log('hello from GroupScreen line 15');
export default function GroupScreen(props) {
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
    groupNames,
    groupData,
    setGroupData
  } = useContext(UserInfoContext);
  //console.log('groupData', groupData)
  const navigation = useNavigation();

  //console.log('groupsMember1')
  return (
    <View>
      <Text h1>{props.route.params.props}</Text>
      <Text>user 1</Text>
      <Text>user 2</Text>
      <Text>user 3</Text>
      <Text>user 4</Text>
      <View>
        <Button title='🔑' onPress={() => navigation.navigate('Groups')}></Button>
      </View>
    </View>
  );
}
