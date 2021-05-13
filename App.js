import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './config/Firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import { decode, encode } from 'base-64';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import OnBoarding from './src/OnBoarding/OnBoarding'
import AsyncStorage from '@react-native-async-storage/async-storage'

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Loading = () => {
  <View>
    <ActivityIndicator size={large} />
  </View>
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false)
  const [user, setUser] = useState(null);

  const checkOnboarding = async ()=>{
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')
      if (value !== null){
        setViewedOnboarding(true)
      }
    } catch(e) {
      console.log('Error @checkOnboarding:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    checkOnboarding()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
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


  return (
    <NavigationContainer>
      <Stack.Navigator>
         {viewedOnboarding? (user ? (
          <Stack.Screen name='Glow In The Blue'>
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Registration' component={RegistrationScreen} />
          </>
        )
         ):(
           <Stack.Screen name='OnBoarding' component={OnBoarding} />
         )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
