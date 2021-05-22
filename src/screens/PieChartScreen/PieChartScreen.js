import React, { useEffect, useState, useContext } from 'react';
import { UserInfoContext } from '../../../UserContext';
import { SafeAreaView, Text, View, Image, StyleSheet, Button, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { filterUserDataPieChart } from '../TimerExperiment/filterDataPieFunction';

import { useNavigation } from '@react-navigation/native';

const MyPieChart = () => {
  const data = useContext(UserInfoContext);
  const navigation = useNavigation();

  // let chartData = filterUserDataPieChart(data, 'ebThur@g.com')

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pie Chart</Text>
      <PieChart
        data={data}
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
        accessor='time'
        backgroundColor='transparent'
        paddingLeft='15'
        absolute //for the absolute number remove if you want percentage
      />

      <View style={styles.graphButtonSection}>
        <Button
          title='Home'
          style={styles.barGraphButton}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

export default MyPieChart;

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
  },
  graphButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  barGraphButton: {
    backgroundColor: 'blue',
    color: 'white'
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16
  }
});
