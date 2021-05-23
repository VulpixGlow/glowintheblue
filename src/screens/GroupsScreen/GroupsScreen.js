import React, { useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, Text, Button, StyleSheet } from 'react-native';
//import styles from './styles'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

//const screenWidth = Dimensions.get('window').width
// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
// }


//console.log('hello from GroupScreen line 15');
export default function GroupScreen() {
  const {
    user,
    userData,
    points,
    selectCat,
    groupName,
    groups,
    setGroups
  } = useContext(UserInfoContext);
  //console.log('userData in groups screen', groupName)
  const navigation = useNavigation();
  const groupData = async () => {
    //console.log('props in group screen line 8', props)
    const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/group', {
      email: user.email
    });
    // console.log('user in groupscreen line 32', user)
    // const { data } = await axios.get('http://localhost:8080/api/group', {
    //   email: 'user2@gmail.com'
    // })
    //console.log('groupData in groups screen line 35', data);
    const groupNames = data.map((group)=> group.groupName)
    //console.log('group names in group screen line 40', groupNames)
    //setGroups(data)
  };
  groupData();
  //console.log('groups in groups screen line 42', groups)
  return (
    <View style={styles.container}>
      <Text style={styles.title}> All Groups</Text>
      {groups? groups.map((group)=><Button title={group.name} onPress={()=> navigation.navigate('Group')} />): <Text>No group to display</Text>}
      {/* <Button title='View Group 1' onPress={() => navigation.navigate('Group')} /> */}
      <Button title='Create Group' onPress={() => navigation.navigate('InviteScreen')} />
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

});
