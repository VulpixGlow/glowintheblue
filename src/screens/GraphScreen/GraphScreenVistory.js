import React, { useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, View } from 'react-native'
import { VictoryBar, VictoryPie, VictoryLabel, VictoryChart, VictoryTheme } from 'victory-native'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
]

const BarChart = () => {
  const chartData = async () => {
    let userTime = []
    let userCatgy = []
    try {
      const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/session')
      console.log('Data -->', data)
      for (const dataObj in data) {
        userTime.push(dataObj.time)
        userCatgy.push(dataObj.categoryName)
      }
    } catch (error) {
      console.log('Unable to complete chart data load')
    }

    useEffect(() => {
      chartData()
    }, [])
  }

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x='points' y='category' />
      </VictoryChart>
    </View>
  )
}

export default function Graph(props) {
  return (
    <View>
      <BarChart />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
})
