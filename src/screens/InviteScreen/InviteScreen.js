import React, { useState } from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';
import { GrAdd } from 'react-icons/gr';

export default function InviteScreen() {
  // const navigation = useNavigation();

  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160 }}>
          <Text h1>Invite your friends!</Text>
          <Input 
          placeholder='Email' 
          // button={    <Button title='➕' type="outline" style={{width: 50, marginLeft: 300}}></Button>}>
          rightIcon={{ name: "add", size: 24, color: "green" }}
 >
          </Input>

          <Input placeholder='Email' 
           rightIcon={{ name: "add", size: 24, color: "green" }}/>
          <Input placeholder='Email' 
           rightIcon={{ name: "add", size: 24, color: "green" }}/>
          <Input placeholder='Email' 
           rightIcon={{ name: "add", size: 24, color: "green" }}/>
          <Input placeholder='Email' 
           rightIcon={{ name: "add", size: 24, color: "green" }}/>
        </View>
      </Card>
      <FooterScreen />
    </View>
  );
}

// export default InviteScreen

// style={styles.buttonContainer}

const styles = StyleSheet.create({
  buttonContainer: {
    // marginTop: 7,
    // marginBottom: 7,
    
    marginRight: 7,
    // padding: 20,
    // alignItems: 'center'
  },
});
