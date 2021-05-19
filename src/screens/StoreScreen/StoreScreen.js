import React, { useState } from 'react'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

export function Buy() {
  return (
    <View>
      <Button
        buttonStyle={styles.buttonCTA}
        title='✅'
        onPress={() => navigation.navigate('Store')}
      />
    </View>
  )
}

function Store() {
  const navigation = useNavigation()

  return (
    <View>
      <Card>
        <View style={styles.buttonContainer}>
          <Text h1>SHOP</Text>
        </View>
      </Card>
      <Buy />
    </View>
  )
}

export default Store

const styles = StyleSheet.create({
  card: {
    borderRadius: 20
  },
  // container: {
  //   marginTop: '7%',
  //   marginBottom: '10%',
  //   marginLeft: '7%',
  //   marginRight: '7%',
  //   padding: '20%',
  //   alignItems: 'center',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontSize: 50,
  //   fontWeight: '400',
  // },
  text: {
    marginBottom: 10,
    backgroundColor: '#aedcff',
    borderRadius: 50
  },
  buttonCTA: {
    borderRadius: 50,
    padding: 15,
    margin: 40,
    marginLeft: 185,
    marginRight: 185,
    backgroundColor: '#fec4fc',
    borderStyle: 'solid',
    borderColor: '#aedcff'
  },
  buttonContainer: {
    borderRadius: 50,
    padding: 150,
    marginTop: 220,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }
})
