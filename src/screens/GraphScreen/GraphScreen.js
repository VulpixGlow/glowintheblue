import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

const Graph = props => {
  console.log('PROPS TO GRAPH', props)
  console.log('Array', props.route.params.userData)
  const data = props.route.params.userData

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Glow Timeline </Text>
      <Timeline
        data={data}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13
        }}
        descriptionStyle={{ color: 'rgb(64,64,64)' }}
        options={{
          style: { paddingTop: 5 }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default Graph