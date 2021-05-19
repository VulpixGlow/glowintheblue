import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, Input, Text, Button } from 'react-native-elements';
import FooterScreen from '../FooterScreen/FooterScreen';
import { useNavigation } from '@react-navigation/native';

export default function InviteScreen() {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  console.log(email);
  const handleSubmit = (evt) => {
    // evt.preventDefault();
    // console.log(email);
    alert(`Invite Sent!`);
  };
  return (
    <View>
      <Card>
        <View style={{ marginBottom: 160 }}>
          <Text h1>Invite your friends!</Text>
          <Input
            placeholder='Email'
            // button={    <Button title='➕' type="outline" style={{width: 50, marginLeft: 300}}></Button>}>
            rightIcon={{ name: 'add', size: 24, color: 'green' }}></Input>
          <Input
            placeholder='Email'
            onHandleSubmit={(value) => this.setState({ email: value })}
            rightIcon={{ name: 'add', size: 24, color: 'green' }}
          />
          <Input placeholder='Email' rightIcon={{ name: 'add', size: 24, color: 'green' }} />
          <Input placeholder='Email' rightIcon={{ name: 'add', size: 24, color: 'green' }} />
        </View>
        <Button title='Send' onPress={handleSubmit}></Button>
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
