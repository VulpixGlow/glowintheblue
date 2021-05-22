import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserInfoContext } from '../../../UserContext';
import HomeScreen from '../HomeScreen/HomeScreen';
import GraphScreen from '../GraphScreen/GraphScreen';
import GroupsScreen from '../GroupsScreen/GroupsScreen';
import Login from '../LoginScreen/LoginScreen';
import Registration from '../RegistrationScreen/RegistrationScreen';

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
    setSelectedCat
  } = useContext(UserInfoContext);

  console.log('user in BottomTabs-->', user);
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Stats' component={GraphScreen} />
      <Tab.Screen name='Groups' component={GroupsScreen} />

      {/* <Tab.Screen name='Home' component={HomeScreen} /> */}
      {/* <Tab.Screen name='Stats' component={Grap} /> */}
      {/* <Tab.Screen name='Login' component={Login} />
      <Tab.Screen name='Registration' component={Registration} /> */}
    </Tab.Navigator>
  );
}
