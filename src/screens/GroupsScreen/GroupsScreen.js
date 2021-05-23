import React, { useContext, useEffect } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, StyleSheet, TextInput } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
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
    groups,
    setGroups,
    setGroupName
  } = useContext(UserInfoContext);
  //console.log('userData in groups screen', groupName)
  const navigation = useNavigation();
  const groupData = async () => {
    //console.log('props in group screen line 8', props)
    const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/group');
    console.log('Data returned from axios request GROUPSCREEN', data);

    /*
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions/');
        setUserTimeLineData(FilterDataFunction(data, user.email));
        setGraphLoading(false);
    */
    // console.log('user in groupscreen line 32', user)
    // const { data } = await axios.get('http://localhost:8080/api/group', {
    //   email: 'user2@gmail.com'
    // })
    //console.log('groupData in groups screen line 35', data);
    // const groupNames = data.map(group => group.groupName);
    //console.log('group names in group screen line 40', groupNames)
    //setGroups(data)
  };

  groupData();

  const handleSubmit = evt => {
    // email = "s@s.com, a@a.com",

    const emails = inviteEmail.split(', ');

    const notificationData = async () => {
      const { data } = await axios.post('https://glowintheblue.herokuapp.com/api/notifications', {
        ownerEmail: user.email,
        emails: emails,
        groupName: groupName
      });
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

  //console.log('groups in groups screen line 42', groups)
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}> All Groups</Text>
      {groups ? (
        groups.map(group => (
          <Button title={group.name} onPress={() => navigation.navigate('Group')} />
        ))
      ) : (
        <Text>No group to display</Text>
      )} */}
      {/* <Button title='View Group 1' onPress={() => navigation.navigate('Group')} /> */}
      {/* <Button title='Create Group' onPress={() => navigation.navigate('InviteScreen')} /> */}
      <View>
        <Card>
          <Text>My Groups</Text>
          <Button style={{ padding: 10 }} title='Group 1' />
          <Button style={{ padding: 10 }} title='Group 2' />
          <Button style={{ padding: 10 }} title='Group 3' />
        </Card>
        <Card>
          <View style={{ marginBottom: 30 }}>
            <Text h1>Group name</Text>
            <TextInput
              type='text'
              placeholder='name your group'
              value={groupName}
              onChangeText={text => {
                setGroupName(text);
              }}
            />
            <Text h1>Invite your friends!</Text>
            <TextInput
              type='text'
              placeholder='Email'
              value={inviteEmail}
              onChangeText={text => {
                setInviteEmail(text);
              }}
              rightIcon={{ name: 'add', size: 24, color: 'green' }}
            />
          </View>
          <Button title='Send' onPress={handleSubmit}></Button>
        </Card>
      </View>
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
  }
});
