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
  const categories = ['Work', 'Study', 'Gym', 'Rest', 'Social', 'Coding', 'Reading'];

  return (
    <SelectDropdown
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
