// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   Dimensions,
//   View, TouchableOpacity
// } from 'react-native';

// import { StackNavigator, DrawerNavigator } from  'react-navigation';
// import IOSIcon from "react-native-vector-icons/Ionicons";
// import HomeScreen from "../HomeScreen/HomeScreen";
// // import DetailScreen from "./DetailScreen";
// import SideMenu from '../SideMenu/SideMenu'

// const drawernav = DrawerNavigator({
//   Item1: {
//       screen: stackNav,
//     }
//   }, {
//     contentComponent: SideMenu,
//     drawerWidth: Dimensions.get('window').width - 120,  
// });

// const stackNav = StackNavigator({
//   Main : {
//     screen: HomeScreen,
//     navigationOptions: ({navigation}) => ({
//       title: "Home",
//       headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
//                     <IOSIcon name="ios-menu" size={30} />
//                   </TouchableOpacity>
//       ),
//       headerStyle: { paddingRight: 10, paddingLeft: 15 }
//     })
//   },
//   // Detail: {
//   //   screen: DetailScreen,
//   //   navigationOptions: ({navigation}) => ({
//   //     title: "Detail",
//   //   })     
//   // }
// });

// export default stackNav;

// AppRegistry.registerComponent('Demo', () => drawernav);