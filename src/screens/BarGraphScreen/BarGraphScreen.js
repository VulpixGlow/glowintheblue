import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View, Dimensions, StyleSheet } from 'react-native';
import { UserInfoContext } from '../../../UserContext';
import FilterDataPieChart from '../../dataFunctions/FilterDataPieFunction';
// import styles from './styles';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

function MyBarChart() {
  const { user } = useContext(UserInfoContext);
  const [barGraphIsLoading, setBarGraph] = useState(true);
  const [barData, setBarData] = useState([]);

  const fetchUpdatedData = async () => {
    if (barGraphIsLoading) {
      try {
        const { data } = await axios.get('https://glowintheblue.herokuapp.com/api/sessions/');
        // setPieData(FilterDataPieChart(data, user.email));

        setBarGraph(false);
      } catch (error) {
        setBarGraph(false);
        console.log('PieChart Component Error', error);
      }
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  if (barGraphIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#5BA5E7' />
      </View>
    );
  }

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default function BarGraph() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyBarChart />
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
