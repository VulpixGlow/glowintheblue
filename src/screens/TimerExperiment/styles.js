import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonsView: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 20,
  },
  dropdownView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  pickerView: {
    marginTop: 20,
    flexDirection: 'column',
  },
  pickerViewText: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  countdownView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerN: {
    margin: 10,
    backgroundColor: '#ffd893',
  },
  buttonContainerF: {
    margin: 10,
    backgroundColor: '#ffd893',
  },
  pointsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8cffdf',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 10,
  },
  homeButton: {
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: 100,
    backgroundColor: '#fec4fc',
    borderStyle: 'solid',
    borderColor: '#aedcff',
  },
  inviteNotif: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // margin: 10,
  },
});
