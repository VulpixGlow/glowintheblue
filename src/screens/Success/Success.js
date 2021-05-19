import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import Modal from 'react-native-modal'

function Success({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Card>
        <Card.Title>Success!</Card.Title>
        <Card.Divider />
        <Card.Image style={styles.cardText}>
          <Text style={styles.text}>You've successfully finished a session!</Text>
          <Button
            buttonStyle={styles.buttonCTA}
            title='Yay!'
            onPress={() => navigation.navigate('PomodoroTimer')}
          />
        </Card.Image>
      </Card>
    </View>
  )
}

export default Success

const styles = StyleSheet.create({
  container: {
    marginTop: '7%',
    marginBottom: '10%',
    marginLeft: '7%',
    marginRight: '7%',
    padding: '20%',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 50,
    fontWeight: '400'
  },
  cardText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aedcff'
  },
  text: {
    marginBottom: 10,
    backgroundColor: '#aedcff'
  },
  buttonCTA: {
    borderRadius: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
    backgroundColor: '#fec4fc'
  }
})
