// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
// import { PieChart, BarChart } from 'react-native-chart-kit'
// import { filterUserData } from './filterDataFunction'

// // streamline data function
// function combineData(catArr, timeArr) {
//   let yogaTotal = 0
//   let sportTotal = 0
//   let readTotal = 0

//   let combinedTimeValuesArray = catArr.reduce((acc, currentVal, index) => {
//     if (currentVal === 'Yoga') yogaTotal += timeArr[index]
//     if (currentVal === 'Sport') sportTotal += timeArr[index]
//     if (currentVal === 'Read') readTotal += timeArr[index]

//     acc = [yogaTotal, sportTotal, readTotal]
//     return acc
//   }, [])

//   return combinedTimeValuesArray
// }

// const MyBarChart = () => {
//   console.log('Inside BarChart')
//   const [chartData, setChartData] = useState({})
//   const [time, setTime] = useState([])
//   const [category, setCategory] = useState([])

//   const chart = async () => {
//     let usersCat = []
//     let usersTime = []
//     let categoriesSet
//     let timeSet

//     try {
//       const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions')
//       console.log('Data -->', data)

//       // update state variable arrays with data
//       data.forEach(obj => {
//         usersCat.push(data.categoryName)
//         usersTime.push(data.time)
//       })

//       timeSet = combineData(usersTime, usersCat) // [ 40, 90, 10 ]
//       categoriesSet = [...new Set(usersCat)]

//       console.log('timeSet', timeSet)
//       console.log('categoriesSer', categoriesSet)

//       setTime(timeSet)
//       setCategory(categoriesSet)

//       // setChartData({
//       //   labels: time,
//       //   datasets: [
//       //     {
//       //       data: category
//       //     }
//       //   ]
//       // })
//     } catch (error) {
//       console.log('Unable to load')
//     }
//     console.log(usersCat, usersTime)
//     console.log(time, category)
//   }

//   useEffect(() => {
//     chart()
//   }, [])

//   // console.log('UserCate', timeDataSet)
//   // console.log('UserTime', categoryDataSet)

//   return (
//     <View>
//       <Text style={styles.header}>Bar Chart</Text>
//       <BarChart
//         data={{
//           labels: time,
//           datasets: [
//             {
//               data: category
//             }
//           ]
