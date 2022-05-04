import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';

const MapScreen = () => {

    const navigation = useNavigation();

    const SignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.navigate("Login")
        })
        .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Text>Hello, {auth.currentUser?.email}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={SignOut}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#0782F9",
      width: "35%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 40,
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
});
  