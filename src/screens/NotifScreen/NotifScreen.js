import React, { useState, useContext, useEffect } from 'react';
import { UserInfoContext } from '../../../UserContext';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { firebase } from '../../../config/Firebase';
import { FontAwesome } from '@expo/vector-icons';

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
    setGroupName,
    groupData
  } = useContext(UserInfoContext);
  const [notifIsLoading, setNotifIsLoading] = useState(true);
  const [friend, setFriend] = useState('');
  const navigation = useNavigation();
  //console.log('user in notifScreen', user)
  const notifiReceived = async () => {
    if (notifIsLoading) {
      try {
        //const { data } = await axios.get('http://localhost:8080/api/notifications')
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/notifications');
        //console.log('data in notification',data)
        const detailsArr = data.map(obj => obj.groupDetails);
        const detailsNesArr = detailsArr.map(str => str.split(','));

        const notifIdx = detailsNesArr.map((arr, idx) =>
          arr.indexOf(user.email) ? idx : null
        );
        const filtered = idxArr => {
          return idxArr.filter(idx => idx !== null);
        };
        const theIdx = filtered(notifIdx);
        //console.log('notifIdx line 54', notifIdx);
        const getData = (idxs, data) => {
          let newArr = [];
          for (let i = 0; i < idxs.length; i++) {
            newArr.push(data[idxs[i]]);
          }
          return newArr;
        };
        const myNotif = getData(theIdx, data);
        console.log('myNotif line 63', myNotif)
        if (myNotif){
          setFriend(myNotif);
        }
        setNotifIsLoading(false);
      } catch (e) {
        setNotifIsLoading(false);
        console.log('not getting notif data', e);
      }
    }
  };
  const acceptInvite = async (idx) => {
    try {
      //const { data } = await axios.put('http://localhost:8080/api/group', {
      const { data } = await axios.put('https://glowintheblue.herokuapp.com/api/group', {
        email:user.email,
        groupId: groupData.id
      })
      friend.splice(idx,1)
      setFriend(friend)
      console.log('Invite accepted, here is the data', data)
    } catch (e){
      console.log('not able to accept invites', e)
    }
  }
  useEffect(() => {
    notifiReceived();
  }, []);

  if (notifIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  if (friend){
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Card containerStyle={styles.inviteCard}>
              <View style={styles.inviteView}>
                <Text style={styles.inviteTitle}>Group Invites:</Text>
                    {
                      friend.length ? (
                        friend.map((obj, idx)=>
                        <View key={idx} style={styles.inviteInfo}>
                        <View>
                          <Text style={styles.groupName}>{groupData.groupName}</Text>
                          <Text style={styles.invitedBy}>Invited by {obj.user.email}</Text>
                        </View>
                          <View style={styles.buttonsView}>
                            <TouchableOpacity style={styles.buttonYes}>
                              <FontAwesome
                                name='check'
                                color={'#8cffdf'}
                                size={20}
                                onPress={() => acceptInvite(idx)}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonNo}>
                              <FontAwesome
                                name='times'
                                color={'#fec7fb'}
                                size={20}
                                onPress={() => navigation.navigate('PieChart')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>)
                        ):(
                        <Text
                          style={styles.invitedBy}
                        >Invited by {friend.user.email}</Text>)
                    }
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
            <Card containerStyle={styles.inviteCard}>
              <View style={styles.inviteView}>
                <Text style={styles.inviteTitle}>Group Invites:</Text>
                <View style={styles.inviteInfo}>
                  <View>
                    <Text style={styles.groupName}>Group Name</Text>
                    <Text style={styles.invitedBy}>Invited by </Text>
                  </View>
                  <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.buttonYes}>
                      <FontAwesome
                        name='check'
                        color={'#8cffdf'}
                        size={20}
                        onPress={() => navigation.navigate('Timeline')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNo}>
                      <FontAwesome
                        name='times'
                        color={'#fec7fb'}
                        size={20}
                        onPress={() => navigation.navigate('PieChart')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
        </View>
      </ScrollView>
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2660',
    flex: 1
  },
  inviteTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    // marginLeft: 10,
    color: '#8cffde'
  },
  inviteCard: {
    backgroundColor: '#42397d',
    borderWidth: 0,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20
  },
  buttonYes: {
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    // marginTop: 40,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#8cffde',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  buttonNo: {
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fec7fb',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  buttonsView: {
    flexDirection: 'row',
    marginBottom: 20
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff'
  },
  invitedBy: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    color: '#fff'
  },
  inviteInfo: {
    borderBottomColor: '#cbc4ff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
