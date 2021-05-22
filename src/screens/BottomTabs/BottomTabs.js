import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import GraphScreen from '../GraphScreen/GraphScreen';
import Groups from '../GroupsScreen/GroupsScreen';
import Login from '../LoginScreen/LoginScreen';
import Registration from '../RegistrationScreen/RegistrationScreen';
import ContextProvider, { Context } from '../../../Context';

const Tab = createBottomTabNavigator();

export default function BottomTabs(props) {
  console.log('props in BottomTabs -->', props);
  const {
    user: [user, setUser],
    loading: [loading, setLoading],
  } = useContext(Context);

  console.log('user in BottomTabs-->', user);
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' children={() => <HomeScreen extraData={user} />} />
      <Tab.Screen name='Stats' children={() => <GraphScreen extraData={user} />} />
      <Tab.Screen name='Groups' children={() => <GroupsScreen extraData={user} />} />

      {/* <Tab.Screen name='Home' component={HomeScreen} /> */}
      {/* <Tab.Screen name='Stats' component={Grap} /> */}
      {/* <Tab.Screen name='Login' component={Login} />
      <Tab.Screen name='Registration' component={Registration} /> */}
    </Tab.Navigator>
  );
}
