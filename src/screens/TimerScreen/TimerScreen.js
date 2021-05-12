// import React, { useEffect, useState } from "react"
// import { Text, View, Button, StyleSheet } from "react-native"

// //import { firebase } from "../../firebase/config"

// export default TimerScreen = () => {
//   const [mins, setMins] = useState(2)
//   const [secs, setSecs] = useState(2)

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       if (secs <= 0) {
//         if (mins <= 0) {
//           ;<Text>You completed your task</Text>
//         } else {
//           setMins(m => m - 1)
//           setSecs(59)
//         }
//       } else setSecs(s => s - 1)
//     }, 1000)
//     return () => clearInterval(timerId)
//   }, [secs, mins])

//   return (
//     <View style={styles.container}>
//       <View style={styles.hamburgerIcon}>
//         <Text>SlideM</Text>
//       </View>
//       <View style={styles.pointsIcon}>
//         <Text>Points</Text>
//       </View>
//       <View style={styles.circleBackgroundIcon}>
//         <Text>Image w/ slider to set timer</Text>
//         {/* <Text style={styles.timerIcon}>
//           {mins}:{secs < 10 && 0}
//           {secs}
//         </Text> */}
//       </View>

//       <Button title="Tags Button" style={styles.tagIcon}></Button>

//       <View>
//         <Text style={styles.timerIcon}>
//           {mins}:{secs < 10 && 0}
//           {secs}
//         </Text>
//       </View>
//       <Button title="Start Button" style={styles.startTimerIcon}>
//         Stop Timer
//       </Button>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   circleBackgroundIcon: {
//     width: 200,
//     height: 200,
//     backgroundColor: "green",
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center"
//     // zIndex: 1
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   hamburgerIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: "lightblue",
//     position: "absolute",
//     top: 40,
//     left: 30
//   },
//   pointsIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: "gold",
//     position: "absolute",
//     top: 40,
//     right: 30
//   },
//   timer: {
//     fontSize: 40,
//     position: "absolute",
//     alignItems: "center"
//     // zIndex: 2
//   }
// })
