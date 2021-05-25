import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  graphButtonsView: {
    flexDirection: 'row'
  },
  dropdownView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  pickerView: {
    marginTop: -50,
    fontSize: 20,
    marginBottom: -20,
    flexDirection: 'column'
  },
  pickerViewText: {
    color: 'white',
    fontWeight: '900',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20
  },
  countdownView: {
    justifyContent: 'center',
    alignItems: 'center'
    // flexDirection: 'row',
  },
  pointsBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    borderRadius: 10
  },
  homeButton: {
    borderRadius: 10
  },
  pointsBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  playPauseButtons: {
    borderRadius: 50,
    padding: 20,
    margin: 10,
    marginTop: 10,
    backgroundColor: '#e785e2',
    borderStyle: 'solid',
    borderColor: '#aedcff',
    width: 60,
    height: 60
    // paddingBottom: -5,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeLineButton: {
    borderRadius: 50,
    padding: 15,
    marginLeft: 10,
    // marginTop: 40,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    color: '#8cffde'
  }
});
