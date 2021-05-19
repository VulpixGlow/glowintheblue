import React, { useRef } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

// Determine if the user has already viewed app if so, no onboarding screens should show.

const Onboarding = () => {
  const navigation = useNavigation();
  const pagerRef = useRef(null);

  return (
    <Swiper style={styles.wrapper}>
      <View style={styles.slide1}>
        <Image
          source={require('../../../assets/images/main-splash.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.slide2}>
        <Image
          source={require('../../../assets/images/hiw-seahorse.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.slide3}>
        <Image
          source={require('../../../assets/images/hiw-squid.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.slide3}>
        <Image
          source={require('../../../assets/images/hiw-octopus.png')}
          style={{ width: '100%', height: '90%' }}
        />
        <Button
          buttonStyle={styles.onboardingButton}
          titleStyle={{ color: '#fff', fontWeight: 'bold' }}
          title='Vamos!'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  onboardingButton: {
    borderRadius: 5,
    padding: 15,
    width: 300,
    backgroundColor: '#e981e4',
    borderStyle: 'solid',
    borderColor: '#aedcff',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapper: {},
  slide1: {},
  slide2: {},
  slide3: {},
  text: {},
});

export default Onboarding;
