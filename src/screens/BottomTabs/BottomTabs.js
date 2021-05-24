import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserInfoContext } from '../../../UserContext';
import HomeScreen from '../HomeScreen/HomeScreen';
import GroupsScreen from '../GroupsScreen/GroupsScreen';
import Login from '../LoginScreen/LoginScreen';
import Registration from '../RegistrationScreen/RegistrationScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NotifScreen from '../NotifScreen/NotifScreen';
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
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
  } = useContext(UserInfoContext);
  //console.log('user in BottomTabs-->', user);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#8cffdf',
        inactiveTintColor: '#6a60b4',
        style: {
          backgroundColor: '#2d2660',
          borderTopWidth: null,
          borderTopColor: '#cbc4ff',
        },
      }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name='home' color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name='Groups'
        component={GroupsScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome name='users' color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={NotifScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => <FontAwesome name='bell' color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}
