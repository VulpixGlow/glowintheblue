import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';

// export function Store() {
//   return (
//     <View >

//     {/* <Button
//     buttonStyle={styles.buttonCTA}
//     title='🎁'
//     onPress={() => navigation.navigate('Store')}
//   /> */}
//   </View>
//   )
// }

function Points(props) {
  const navigation = useNavigation();
  console.log('POINTS FUNCTION', props);
  const dataForTimeLine = props.route.params.userData;
  return (
    <View>
      <Card>
        <View style={styles.buttonContainer}>
          <Text h1>POINTS! </Text>
        </View>
      </Card>
      <FooterScreen
        // userSession={props}
        // userPoints={points}
        // userTime={selectedValue}
        // userEmail={props.userData.extraData.email}
        userData={dataForTimeLine}
      />
    </View>
  );
}

export default Points;

const styles = StyleSheet.create({
  container: {
    // marginTop: 7,
    // marginBottom: 7,
    // marginLeft: 7,
    // marginRight: 7,
    // padding: 20,
    alignItems: 'center',
  },
  // textStyle: {
  //   color: 'white',
  //   fontSize: 50,
  //   fontWeight: '400',
  // },
  text: {
    // marginBottom: 10,
    backgroundColor: '#aedcff',
    // justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonCTA: {
    borderRadius: 50,
    padding: 15,
    margin: 40,
    marginLeft: 185,
    marginRight: 185,
    backgroundColor: '#fec4fc',
    borderStyle: 'solid',
    borderColor: '#aedcff',
  },
  buttonContainer: {
    borderRadius: 50,
    padding: 150,
    marginTop: 120,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});
