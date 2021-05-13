import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    image: {
      flex: 0.7,
      justifyContent: "center"
    },
    title: {
      fontWeight: '800',
      fontSize: 28,
      marginBottom: 10,
      color: "#493d8a",
      textAlign: "center"
    },
    description: {
      fontWeight: '300',
      color: "#62656b",
      textAlign: "center",
      paddingHorizontal: 64
    },
    dot: {
      height: 10,
      borderRadius: 5,
      backgroundColor: '#493d8a',
      marginHorizontal: 8
    },
    button: {
      position: 'absolute',
      backgroundColor: '#f4338f',
      borderRadius: 100,
      padding: 20
    }
})
