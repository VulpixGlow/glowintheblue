import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SelectDropdownComponent(props) {
  console.log('SELECT DROPDOWN PROPS', props);
  const [selectCat, setSelectedCat] = useState();
  const userEmail = props.userSession.userData.extraData.email;
  console.log('userEmail in SelectDropdown-->', userEmail);

  const updateUserSessionData = async () => {
    try {
      // console.log('userpoints', props.userPoints)
      // console.log('usertime', props.userTime)
      // console.log('category', selectCat)
      await axios.put('https://glowintheblue.herokuapp.com/api/sessions/update', props.userPoints);
    } catch (error) {
      console.log('Unable to update user information');
    }
  };
  // unable to capture the category on change in order to pass it to the axios call.
  // when comment out setSelectedCat() inside of the useEffect and then put it back it it updates to the current cat.
  useEffect(() => {
    updateUserSessionData();
    setSelectedCat();
  }, []);

  const categories = ['Focus', 'Meditate', 'Move', 'Connect', 'Other'];

  return (
    <SelectDropdown
      email={userEmail}
      data={categories}
      defaultButtonText='Choose a category'
      buttonStyle={{
        backgroundColor: '#42397d',
        borderRadius: 50,
        borderColor: '#42397d',
        borderWidth: 2,
        outerHeight: 40,
      }}
      renderDropdownIcon={() => {
        return <FontAwesome name='chevron-down' color={'#fff'} size={14} />;
      }}
      dropdownIconPosition={'right'}
      buttonTextStyle={{ color: '#fff' }}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        setSelectedCat(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#42397d',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#fff', textAlign: 'left' },
});
