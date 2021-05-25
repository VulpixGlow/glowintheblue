import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useAccessibilityInfo } from '@react-native-community/hooks';
import { firebase } from './config/Firebase';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserInfoContext } from './UserContext';
import { LogBox } from 'react-native';

import {
  Onboarding,
  LoginScreen,
  RegistrationScreen,
  PointScreen,
  TimelineScreen,
  GroupScreen,
  InviteScreen,
  NotifScreen,
  PieChartScreen,
  GroupsScreen,
  BottomTabs,
  BarGraphScreen
} from './src/screens';

import { StatusBar } from 'react-native';

import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// ignore yellow logs
// LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#aedcff',
    background: '#8CFFDF'
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userTimeLineData, setUserTimeLineData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectCat, setSelectedCat] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [groupNames, setGroupNames] = useState([]);
  const [groupData, setGroupData] = useState([]);

  // State for Accessibilty
  const {
    boldTextEnabled,
    screenReaderEnabled,
    reduceMotionEnabled,
    grayscaleEnabled,
    invertColorsEnabled,
    reduceTransparencyEnabled
  } = useAccessibilityInfo();

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch(error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  const data = {
    user,
    setUser,
    userData,
    setUserData,
    userTimeLineData,
    setUserTimeLineData,
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
    groups,
    setGroups,
    totalPoints,
    setTotalPoints,
    groupNames,
    setGroupNames,
    groupData,
    setGroupData
  };

  return (
    <UserInfoContext.Provider value={data}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar translucent backgroundColor='#2d2660' barStyle='light-content' />
        <Stack.Navigator screenOptions={{ title: '' }}>
          {user ? (
            <>
              <Stack.Screen
                name='Tabs'
                options={{
                  headerStyle: {
                    backgroundColor: '#2d2660',
                    shadowColor: 'transparent'
                  },
                  headerTintColor: 'white'
                }}
                component={BottomTabs}
              />
              {/*  Components that need to be navagated to that don't reside in BottomsTab should be included here */}
              <Stack.Screen name='NotifScreen' component={NotifScreen} />
              <Stack.Screen name='Points' component={PointScreen} />
              <Stack.Screen
                name='Timeline'
                options={{
                  headerStyle: {
                    backgroundColor: '#fec7fb',
                    shadowColor: 'transparent'
                  },
                  headerTintColor: '#e981e4'
                }}
                component={TimelineScreen}
              />
              <Stack.Screen
                name='PieChart'
                options={{
                  headerStyle: {
                    backgroundColor: '#8cffde',
                    shadowColor: 'transparent'
                  },
                  headerTintColor: '#397867'
                }}
                component={PieChartScreen}
              />
              <Stack.Screen name='BarChart' component={BarGraphScreen} />
              <Stack.Screen name='Group' component={GroupScreen} />
              <Stack.Screen name='Groups' component={GroupsScreen} />
              <Stack.Screen name='InviteScreen' component={InviteScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name='Onboarding'
                options={{
                  headerShown: false,
                  headerTintColor: null
                }}
                component={Onboarding}
              />
              <Stack.Screen
                name='Login'
                options={{
                  headerStyle: {
                    backgroundColor: '#ffe1fd',
                    shadowColor: 'transparent'
                  },
                  headerTintColor: '#e981e4'
                }}
                component={LoginScreen}
              />
              <Stack.Screen
                name='Registration'
                options={{
                  headerStyle: {
                    backgroundColor: '#cbe3fc',
                    shadowColor: 'transparent'
                  },
                  headerTintColor: '#64a5e9'
                }}
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfoContext.Provider>
  );
}
