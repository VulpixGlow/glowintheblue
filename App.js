import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { firebase } from './config/Firebase';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContextProvider, { Context } from './Context';

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
} from './src/screens';
import { StatusBar } from 'react-native';
import BottomTabs from './src/screens/BottomTabs/BottomTabs';

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
    background: '#8cffde',
  },
};

export default function App(props) {
  // const {
  //   user: [user, setUser],
  //   loading: [loading, setLoading],
  // } = useContext(Context);

  // console.log('Context in App', Context);
  // const a = useContext(Context);
  // console.log('a in App,', a);

  // if (loading) {
  //   return <></>;
  // }

  const someContext = useContext(Context);
  console.log('someContext IN APP.JS', someContext);

  return (
    <ContextProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar translucent backgroundColor='#2d2660' barStyle='light-content' />
        <Stack.Navigator screenOptions={{ title: '' }}>
          {/* {user ? (
            <> */}
          <Stack.Screen
            name='Home'
            options={{
              headerStyle: {
                backgroundColor: '#2d2660',
                shadowColor: 'transparent',
              },
              headerTintColor: 'white',
            }}>
            {(props) => <BottomTabs />}
          </Stack.Screen>
          {/* </>
          ) : (
            <>
              <Stack.Screen
                name='Onboarding'
                options={{
                  headerShown: false,
                  headerTintColor: null,
                }}
                component={Onboarding}
              />
              <Stack.Screen
                name='Login'
                options={{
                  headerStyle: {
                    backgroundColor: '#ffe1fd',
                    shadowColor: 'transparent',
                  },
                  headerTintColor: '#e981e4',
                }}
                component={LoginScreen}
              />
              <Stack.Screen
                name='Registration'
                options={{
                  headerStyle: {
                    backgroundColor: '#cbe3fc',
                    shadowColor: 'transparent',
                  },
                  headerTintColor: '#64a5e9',
                }}
                component={RegistrationScreen}
              />
            </>
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
