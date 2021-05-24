import React, { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
    groupNames,
    setGroupNames,
    groupData,
    setGroupData
  } = useContext(UserInfoContext);
  const [groupIsLoading, setGroupIsLoading] = useState(true)
  const navigation = useNavigation();
  const someGroupData = async () => {
    if (groupIsLoading) {
      try {
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/group');
        const filterData = data.filter(obj => {
          if (obj.email === user.email) {
            return obj.groups;
          }
        });
        const [groupObj] = filterData.map((obj)=>obj.groups)
        const groupNames = groupObj.map((obj)=>obj.groupName)
        setGroupNames(groupNames)
        setGroupIsLoading(false)
      } catch (error) {
          setGroupIsLoading(false)
          console.log('Group is not loading', error)
      }
    }
  };
  useEffect(()=>{
    someGroupData()
  }, [])


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

  if (groupIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
//           <Text>My Groups</Text>
//         {
//            groupNames.map((name, idx)=> <Button style={{ padding: 10 }} key={idx} title={name} onPress={()=>navigation.navigate('Group', {props:name})} />)
//           }
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
