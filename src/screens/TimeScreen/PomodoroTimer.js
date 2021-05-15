import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation, navigation, navigate } from '@react-navigation/native';
import Timer from './Timer';
import Success from '../Success/Success';
import Modal from 'react-native-modal';
// import { useNavigation } from '@react-navigation/native';

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 0.1,
      completed: 0,
      intervalType: 'Working',
    };
  }

  handleTimerCompleted = () => {
    if (this.state.intervalType === 'Working') {
      navigation.navigate('Success');
    }
  };

  // gets triggered on change of worktimer text
  handleWorkTime = (text) => {
    if (text >= 0) {
      this.setState({
        workTime: text,
      });
    } else {
      alert('Time invalid. Setting value to default. Please enter valid time');
      this.setState({
        workTime: 25,
      });
    }
  };

  // called to set the timer's time
  handleTime = () => {
    if (this.state.intervalType === 'Working') {
      return this.state.workTime;
    }
  };

  render() {
    const { navigation } = this.props;
    let time = this.handleTime();
    return (
      <ScrollView style={styles.mainView}>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <Text style={styles.textStyle}>WorkTime</Text>
            <TextInput
              style={styles.textStyle}
              keyboardType={'numeric'}
              defaultValue={'' + this.state.workTime}
              placeholder='workTime in mins'
              onChangeText={this.handleWorkTime}
            />
          </View>
        </View>
        <Timer
          intervalType={this.state.intervalType}
          Oncomplete={this.handleTimerCompleted}
          period={time}
        />
      </ScrollView>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <PomodoroTimer {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  mainView: {
    // backgroundColor: '#2d2660',
    backgroundColor: 'blue',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrap: {
    flex: 1,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: 1.5,
    // fontFamily: Platform.OS == 'android' ? 'notoserif' : 'system',
    marginTop: 40,
    padding: 20,
  },
});
