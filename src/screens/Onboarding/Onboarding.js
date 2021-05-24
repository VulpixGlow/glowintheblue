import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import { useAccessibilityInfo } from '@react-native-community/hooks';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const navigation = useNavigation();

  return (
    <Swiper style={styles.wrapper}>
      <View
        style={styles.slide1}
        accessible={true}
        accessibilityLabel='Onboarding View Slide 1'
        accessibilityHint='Swiping me will move to the next slide'
        accessibilityRole='adjustable'>
        <Image
          accessibilityRole='image'
          source={require('../../../assets/images/main-splash.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View
        style={styles.slide2}
        accessible={true}
        accessibilityLabel='Onboarding View Slide 2'
        accessibilityHint='Swiping me will move to the next slide'
        accessibilityRole='adjustable'>
        <Image
          accessibilityRole='image'
          source={require('../../../assets/images/hiw-seahorse.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View
        style={styles.slide3}
        accessible={true}
        accessibilityLabel='Onboarding View Slide 3'
        accessibilityHint='Swiping me will move to the next slide'
        accessibilityRole='adjustable'>
        <Image
          accessibilityRole='image'
          source={require('../../../assets/images/hiw-squid.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View
        style={styles.slide3}
        accessible={true}
        accessibilityLabel='Onboarding View Slide 4'
        accessibilityHint='Swiping me will move to the next slide'
        accessibilityRole='adjustable'>
        <Image
          accessibilityRole='image'
          source={require('../../../assets/images/hiw-octopus.png')}
          style={{ width: '100%', height: '90%' }}
        />
        <Button
          buttonStyle={styles.onboardingButton}
          accessible={true}
          accessibilityLabel='Onboarding View Slide 4'
          accessibilityHint='Swiping me will move to the next slide'
          accessibilityRole='button'
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
    marginRight: 'auto'
  },
  wrapper: {},
  slide1: {},
  slide2: {},
  slide3: {},
  text: {}
});

export default Onboarding;
