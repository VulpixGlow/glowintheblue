import "react-native-gesture-handler"
import React, { useEffect, useState } from "react"
import { firebase } from "./config/Firebase"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import {
  Onboarding,
  LoginScreen,
  RegistrationScreen,
  HomeScreen,
  PointScreen,
  StoreScreen,
  GraphScreen
} from "./src/screens"

import { StatusBar } from "react-native"

import { decode, encode } from "base-64"
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

const Stack = createStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aedcff",
    background: "#8cffde"
  }
}

// Lets consider creating a FooterScreen Component that holds all the footer elements so they can be viewed on everyscreen

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch(error => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return <></>
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        translucent
        backgroundColor="#2d2660"
        barStyle="light-content"
      />

      {/* <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ title: "" }}
      > */}
      <Stack.Navigator screenOptions={{ title: "" }}>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerStyle: {
                  backgroundColor: "#2d2660",
                  shadowColor: "transparent"
                },
                headerTintColor: "white"
              }}
            >
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Points" component={PointScreen} />
            <Stack.Screen name="Graph" component={GraphScreen} />
            <Stack.Screen name="Store" component={StoreScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
