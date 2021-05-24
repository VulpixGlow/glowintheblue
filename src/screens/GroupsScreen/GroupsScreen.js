import React, { useContext, useEffect } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
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
    setGroupName,
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

  const handleSubmit = (evt) => {
    // email = "s@s.com, a@a.com",

    const emails = inviteEmail.split(', ');

    const notificationData = async () => {
      const { data } = await axios.post('https://glowintheblue.herokuapp.com/api/notifications', {
        ownerEmail: user.email,
        emails: emails,
        groupName: groupName,
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
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.title}> All Groups</Text>
      {groups ? (
        groups.map((group) => (
          <Button title={group.name} onPress={() => navigation.navigate('Group')} />
        ))
      ) : (
        <Text>No group to display</Text>
      )}
      <Button title='View Group 1' onPress={() => navigation.navigate('Group')} />
      <Button title='Create Group' onPress={() => navigation.navigate('InviteScreen')} /> */}
        <View>
          <Card containerStyle={styles.createGroupCard}>
            <Text style={styles.myGroupsTitle}>My Groups</Text>
            <Button
              buttonStyle={styles.myGroupsButton}
              titleStyle={{ color: '#7b4f79', fontWeight: 'bold' }}
              title='Group 1'
            />
            <Button
              buttonStyle={styles.myGroupsButton}
              titleStyle={{ color: '#7b4f79', fontWeight: 'bold' }}
              title='Group 2'
            />
            <Button
              buttonStyle={styles.myGroupsButton}
              titleStyle={{ color: '#7b4f79', fontWeight: 'bold' }}
              title='Group 3'
            />
          </Card>
          <Card containerStyle={styles.createGroupCard}>
            <Text style={styles.createGroupTitle}>Create Group</Text>
            <View style={styles}>
              <Text style={styles.createGroupSubtitle}>Group name:</Text>
              <TextInput
                style={styles.createGroupInput}
                type='text'
                placeholder='Type group name'
                placeholderTextColor='#928ace'
                value={groupName}
                onChangeText={(text) => {
                  setGroupName(text);
                }}
              />
              <Text style={styles.createGroupSubtitle}>Invite your friends:</Text>
              <TextInput
                style={styles.createGroupInput}
                color='white'
                type='text'
                placeholderTextColor='#928ace'
                placeholder='Type email'
                value={inviteEmail}
                onChangeText={(text) => {
                  setInviteEmail(text);
                }}
                rightIcon={{ name: 'add', size: 24, color: 'green' }}
              />
            </View>
            <Button
              title='Send'
              buttonStyle={styles.createGroupButton}
              titleStyle={{ color: '#397867', fontWeight: 'bold' }}
              onPress={handleSubmit}></Button>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2660',
    flex: 1,
  },
  createGroupButton: {
    borderRadius: 10,
    padding: 15,
    margin: 5,
    marginTop: 10,
    backgroundColor: '#8cffde',
  },
  myGroupsButton: {
    borderRadius: 10,
    padding: 15,
    margin: 5,
    marginTop: 10,
    backgroundColor: '#fec7fb',
  },
  createGroupCard: {
    backgroundColor: '#42397d',
    borderWidth: 0,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  myGroupsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    color: '#fec7fb',
  },
  createGroupTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    color: '#8cffde',
    // marginRight: 'auto',
  },
  createGroupSubtitle: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',

    // marginRight: 'auto',
  },
  createGroupInput: {
    color: 'white',
    marginBottom: 20,
    backgroundColor: '#5a5299',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    // width: 340,
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
