import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { firebase } from './config/Firebase';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserInfoContext } from './UserContext';

import {
  Onboarding,
  LoginScreen,
  RegistrationScreen,
  HomeScreen,
  PointScreen,
  StoreScreen,
  GraphScreen,
  GroupScreen,
  InviteScreen,
  NotifScreen,
  PieChartScreen,
  GroupsScreen,
  BottomTabs
} from './src/screens';

import { StatusBar } from 'react-native';

import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#aedcff',
    background: '#8cffde'
  }
};

// const userInfo = {
//   user,
//   loading
// };

// const UserInfoContext = React.createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectCat, setSelectedCat] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [groupName, setGroupName] = useState('');

  console.log('POINTS IN APP.JS', points);

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

  // Good Spot to add a spinnging wheel or loading icon

  if (loading) {
    return <></>;
  }

  const data = {
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
              {/* ANY thing that needs to be navagated to that isn't in the BottomsTab should be included here */}
              <Stack.Screen name='NotifScreen' component={NotifScreen} />
              <Stack.Screen name='Points' component={PointScreen} />
              <Stack.Screen name='Graph' component={GraphScreen} />
              <Stack.Screen name='PieChart' component={PieChartScreen} />
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
