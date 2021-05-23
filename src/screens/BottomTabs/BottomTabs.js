import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserInfoContext } from '../../../UserContext';
import HomeScreen from '../HomeScreen/HomeScreen';
import TimelineScreen from '../TimelineScreen/TimelineScreen';
import GroupsScreen from '../GroupsScreen/GroupsScreen';

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

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      {/* <Tab.Screen name='Stats' component={TimelineScreen} /> */}
      <Tab.Screen name='Groups' component={GroupsScreen} />
    </Tab.Navigator>
  );
}
