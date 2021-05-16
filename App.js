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

const Stack = createStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aedcff",
    background: "#8cffde"
  }
}

export default function App(props) {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        translucent
        backgroundColor="#2d2660"
        barStyle="light-content"
      />

      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ title: "" }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2d2660",
              shadowColor: "transparent"
            },
            headerTintColor: "white"
          }}
        />

        <Stack.Screen name="Points" component={PointScreen} />
        <Stack.Screen name="Graph" component={GraphScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
