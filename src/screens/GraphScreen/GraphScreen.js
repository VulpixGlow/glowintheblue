import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { PieChart, BarChart } from 'react-native-chart-kit'

const MyBarChart = () => {
  console.log('Inside BarChart')
  const [chartData, setChartData] = useState({})
  // usestate varaibles to desplay data
  const [userSession, setUserSession] = useState([])
  const [userTime, setUserTime] = useState([])
  const [taskCategory, setTaskCategory] = useState([])

  // let userTime = []
  // let userCatgy = []

  const sessionData = async () => {
    try {
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/session')
      console.log('Data -->', data)
      console.log('Data Category', data[0].categoryName)
      for (const dataObj in data) {
        userTime.push(parseInt(dataObj.time))
        taskCategory.push(dataObj.categoryName)
      }
      setUserTime(userTime)
      setTaskCategory(taskCategory)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    sessionData()
  }, [])

  console.log('UserCate', taskCategory)
  console.log('UserTime', userTime)

  return (
    <View>
      <Text style={styles.header}>Bar Chart</Text>
      <BarChart
        data={{
          labels: taskCategory,
          datasets: [
            {
              data: userTime
            }
          ]
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}

const MyPieChart = () => {
  return (
    <>
      <Text style={styles.header}>Pie Chart</Text>
      <PieChart
        data={[
          {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'New York',
            population: 8538000,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        accessor='population'
        backgroundColor='transparent'
        paddingLeft='15'
        absolute //for the absolute number remove if you want percentage
      />
    </>
  )
}

export default function Graph() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <MyPieChart />
          <MyBarChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// export default Graph

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16
  }
})
