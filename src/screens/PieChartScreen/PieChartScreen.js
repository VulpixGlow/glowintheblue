import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View, Dimensions, StyleSheet } from 'react-native';
import { UserInfoContext } from '../../../UserContext';
import FilterDataPieChart from '../../dataFunctions/FilterDataPieFunction';

import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

function MyPieChart() {
  const { user } = useContext(UserInfoContext);
  const [pieGraphIsLoading, setPieGraph] = useState(true);
  const [pieData, setPieData] = useState([]);

  const fetchUpdatedData = async () => {
    if (pieGraphIsLoading) {
      try {
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions/');
        setPieData(FilterDataPieChart(data, user.email));
        setPieGraph(false);
      } catch (error) {
        setPieGraph(false);
        console.log('PieChart Component Error', error);
      }
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  if (pieGraphIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glow Pie Chart</Text>
      <PieChart
        data={pieData}
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
    </View>
  );
}

export default function PieGraph() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyPieChart />
    </SafeAreaView>
  );
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
});
