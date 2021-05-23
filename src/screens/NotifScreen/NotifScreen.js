import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160, paddingTop: 30, justifyContent: 'center' }}>
          <Text h1>Group Invites:</Text>
          {/* <Text style={{ paddingTop: 20, paddingBottom: 20 }} h4>
            Which do you choose?
          </Text>
          <Button
            title='🎉🍭🎉🍭'
            type='outline'
            style={{ backgroundColor: 'green', marginBottom: 20 }}></Button>
          <Text></Text>
          <Button title='💣💔💣💔' type='outline' style={{ backgroundColor: 'red' }}></Button> */}
        </View>
      </Card>
    </View>
  );
}

// userData={dataForTimeLine}
