import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

export default function FooterScreen() {
  const navigation = useNavigation();
  // console.log('navigation', navigation);

  return (
    <View style={styles.buttonContainer}>
      <Button
        buttonStyle={styles.buttonCTA}
        title='Home'
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        buttonStyle={styles.buttonCTA}
        title='💎'
        onPress={() => navigation.navigate('Points')}
      />
      <Button
        buttonStyle={styles.buttonCTA}
        title='📈'
        onPress={() => navigation.navigate('Graph')}
      />
      <Button
        buttonStyle={styles.buttonCTA}
        title='🎁'
        onPress={() => navigation.navigate('Store')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: '7%',
    // marginBottom: '10%',
    // marginLeft: '7%',
    // marginRight: '7%',
    // padding: '20%',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  // textStyle: {
  //   color: 'white',
  //   fontSize: 50,
  //   fontWeight: '400',
  // },
  // text: {
  //   marginBottom: 10,
  //   backgroundColor: '#aedcff',
  // },
  buttonCTA: {
    borderRadius: 10,
    padding: 15,
    margin: 20,
    backgroundColor: '#fec4fc',
    borderStyle: 'solid',
    borderColor: '#aedcff',
  },
  buttonContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
