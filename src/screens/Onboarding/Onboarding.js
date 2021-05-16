import React, { useRef } from "react"
import { View } from "react-native"
import ViewPager from "@react-native-community/viewpager"
import Page from "./components/Page"
import Footer from "./components/Footer"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Determine if the user has already viewed app if so, no onboarding screens should show.

const Onboarding = () => {
  const navigation = useNavigation()
  const pagerRef = useRef(null)
  const handlePageChange = pageNumber => {
    pagerRef.current.setPage(pageNumber)
  }
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#ffc93c"
            iconName="sun"
            title="Welcome to Glow in the blue"
          />
          <Footer
            backgroundColor="#ffc93c"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1)
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#aedcff"
            iconName="anchor"
            title="Anchor yourself"
          />
          <Footer
            backgroundColor="#aedcff"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2)
            }}
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(0)}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#5cffff"
            iconName="battery-charging"
            title="Recharge"
          />
          <Footer
            backgroundColor="#5cffff"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(3)
            }}
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(1)}
          />
        </View>
        <View key="4">
          <Page
            backgroundColor="#07689f"
            iconName="link"
            title="Disconnect to connect"
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => handlePageChange(2)}
            rightButtonLabel="Continue"
            rightButtonPress={() => navigation.navigate("Home")}
          />
        </View>
      </ViewPager>
    </View>
  )
}

export default Onboarding
