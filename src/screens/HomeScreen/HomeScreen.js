import React, { useEffect, useState } from "react"
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Touchable
} from "react-native"
import styles from "./styles"
import { firebase } from "../../../config/Firebase"
import Modal from 'react-native-modal'
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import PomodoroTimer from '../TimeScreen/PomodoroTimer';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen(props) {
  // const [entityText, setEntityText] = useState("")
  // const [entities, setEntities] = useState([])
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding')
    } catch(e) {
      console.log('Error @clearOnboarding:', e)
    }
  }
  const [isModalVisible, setModalVisible] = useState(false)
  const entityRef = firebase.firestore().collection("entities")
  const userID = props.extraData.id
  console.log("HomeScreen props",props)
    // useEffect(() => {
    //   entityRef
    //     .where("authorID", "==", userID)
    //     .orderBy("createdAt", "desc")
    //     .onSnapshot(
    //       querySnapshot => {
    //         const newEntities = []
    //         querySnapshot.forEach(doc => {
    //           const entity = doc.data()
    //           entity.id = doc.id
    //           newEntities.push(entity)
    //         })
    //         setEntities(newEntities)
    //       },
    //       error => {
    //         console.log(error)
    //       }
    //     )
    // }, [])

    // const onAddButtonPress = () => {
    //   if (entityText && entityText.length > 0) {
    //     const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    //     const data = {
    //       text: entityText,
    //       authorID: userID,
    //       createdAt: timestamp
    //     }
    //     entityRef
    //       .add(data)
    //       .then(_doc => {
    //         setEntityText("")
    //         Keyboard.dismiss()
    //       })
    //       .catch(error => {
    //         alert(error)
    //       })
    //   }
    // }

    // const renderEntity = ({ item, index }) => {
    //   return (
    //     <View style={styles.entityContainer}>
    //       <Text style={styles.entityText}>
    //         {index}. {item.text}
    //       </Text>
    //     </View>
    //   )
    // }



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [flexDirection, setflexDirection] = useState("column")
  const signOut=()=>{
    firebase
      .auth()
      .signOut()
      .then(()=>{
      props.navigation.navigate("Login")})
  }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container_timer}>
          {/* <Header /> */}
          <PomodoroTimer />
        </ScrollView>
        <View style={styles.listContainer}>
          <Button title="Category" onPress={toggleModal} />
          <Modal
            isVisible={isModalVisible}
            testID={'modal'}
            backdropColor="#5cffff"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View style={{flex:1}}>
            <PreviewLayout
              label="Category"
              values={["Work", "Sport", "Rest", "Social", "Study", "Other", "Entertainment", "Unset", "Coding", "Yoga", "Play", "Read", 'activity1', 'activity2']}
              selectedValue={flexDirection}
              setSelectedValue={setflexDirection}
            >
            </PreviewLayout>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={()=>signOut()}>
          <Text>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearOnboarding}>
          <Text>Clear onboarding</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            styles.button_cat,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

