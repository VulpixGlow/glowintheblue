import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class TimerButtons extends React.Component {
  state = {};

  //renders pause, play and reset buttons
  render() {
    if (this.props.running === true) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.props.pause}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.props.reset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.props.play}
          >
            <Text style={[styles.buttonText, styles.textGlowing]}>Start</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#e885e3',
    padding: 20,
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: 'hotpink',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '300',
  },
});

export default TimerButtons;
