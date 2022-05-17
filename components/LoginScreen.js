import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, database } from "../firebase";
import styles from "./Styles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";

const LoginScreen = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("MapStack");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const Register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = userCredential.user.uid;
        const data = {
          email,
          favorites,
        };
        set(ref(database, "users/" + uid), data);
        setSignedIn(true);
        navigation.navigate("MapStack");
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Error", errorCode);
      });
  };

  const Login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("MapStack");
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Error", errorCode);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={Login} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Register}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
