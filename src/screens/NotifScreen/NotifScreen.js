import React, { useState, useContext, useEffect } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { StyleSheet, View, Image, ImageBackground, ActivityIndicator, } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { firebase } from '../../../config/Firebase';

export default function NotifScreen() {
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
    setGroupName
  } = useContext(UserInfoContext);
  const [notifIsLoading, setNotifIsLoading] = useState(true)
  const [friend, setFriend ] = useState('')

  const notifiReceived = async () => {
    if (notifIsLoading){
      try {
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/notifications');
        const detailsArr = data.map((obj)=>obj.groupDetails)
        const detailsNesArr = detailsArr.map((str)=> str.split(','))
        const notifIdx = detailsNesArr.map((arr, idx)=>arr.indexOf(user.email)>0 ? idx:null)
        const filtered=(idxArr)=>{
          return idxArr.filter((idx)=>idx!==null)
        }
        const theIdx = filtered(notifIdx)
        console.log('detailsArr',theIdx)
        const getData =(idxs, data)=>{
          let newArr = []
          for(let i=0; i<idxs.length; i++){
            newArr.push(data[idxs[i]])
          }
          return newArr
        }
        const myNotif = getData(theIdx, data)
        setFriend(myNotif)
        setNotifIsLoading(false)
      } catch (e){
        setNotifIsLoading(false)
        console.log('not getting notif data', e)
      }
    }

  };
  useEffect(()=>{
    notifiReceived()
  },[])

  if (notifIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }
  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160, paddingTop: 30, justifyContent: 'center' }}>
          <Text h1>Group Invites:</Text>
          {
            friend.map((obj, idx)=><Text key={idx}>{obj.userId}</Text>)
          }
        </View>
      </Card>
    </View>
  );
}

// userData={dataForTimeLine}
