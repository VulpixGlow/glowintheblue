import React, { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

//const screenWidth = Dimensions.get('window').width
// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
// }
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

  if (groupIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Card>
          <Text>My Groups</Text>
          {
            groupNames.map((name, idx)=> <Button style={{ padding: 10 }} key={idx} title={name} onPress={()=>navigation.navigate('Group', {props:name})} />)
          }
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
