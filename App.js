import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './config/Firebase';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, Onboarding } from './src/screens';
import Success from './src/screens/Success/Success';
import { decode, encode } from 'base-64';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import TimerExperiment from './src/screens/TimerExperiment/TimerExperiment';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'red',
  },
};

export default function App(props) {

  return (

    <NavigationContainer theme={MyTheme}>
      <StatusBar
        translucent
        backgroundColor='#2d2660'
        barStyle='light-content'
      />
      <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ title: '' }}>
        <Stack.Screen name='Onboarding' component={Onboarding} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2d2660',
              shadowColor: 'transparent',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen name='Success' component={Success} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
