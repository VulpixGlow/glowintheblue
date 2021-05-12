import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { Card, ListItem, Button, Icon} from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Success({ navigate }) {
  return (
      <ImageBackground style={styles.image}>
         <View >
      <Card >
        <Card.Title>Success!</Card.Title>
        <Card.Divider />
        <Card.Image 
          style={styles.text} 
        >
          <Text style={{ marginBottom: 10, backgroundColor: "#aedcff" }}>
            You've successfully finished a session!
          </Text>
          <Button
           
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 70,
              backgroundColor: "#fec4fc",
            }}
            title="Yay!"
            onPress={() => navigation.navigate("PomodoroTimer")}
          />
        </Card.Image>
      </Card>
      </View>
      </ImageBackground>
  );
}

export default Success;

const styles = StyleSheet.create({
  container: {
    marginTop: "7%",
    marginBottom: "10%",
    marginLeft: "7%",
    marginRight: "7%",
    padding: "20%",
    alignItems: "center",
    // backgroundColor: "#8cffde",
  },
  textStyle: {
    color: "white",
    fontSize: 50,
    fontWeight: "400",
  },
image: {
  flex: 1,
  resizeMode: "contain",
  justifyContent: "center",
  width: 400,
  height: 800,
  backgroundColor:  "#8cffde"
},
text: {
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  backgroundColor: "#aedcff",
}
})
