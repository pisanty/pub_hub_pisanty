import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { auth, database } from "../firebase";
import { set, get, ref, child, push, onValue } from "firebase/database";
import styles from "./Styles";

const FavoriteScreen = () => {
  const uid = auth.currentUser.uid;
  ref(database, "users/" + uid + "/favorites/");

  const [userFav, setUserFav] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [favorites, setFavorites] = useState([]);

  // useEffect(() => {
  //   const uid = auth.currentUser.uid;
  //   const favRef = ref(database, "users/" + uid + "/favorites/");
  //   onValuechange(favRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setFavorites(Object.values(data));
  //   });
  // }, []);

  const saveFav = (favorite) => {
    if (name && address && rating) {
      push(ref(database, "users/" + uid + "/favorites/"), {
        name: name,
        address: address,
        rating: rating,
      });
    } else {
      Alert.alert("Error", "All the fields should be filled!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites Pubs</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Rating"
          value={rating}
          onChangeText={(text) => setRating(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={saveFav} style={styles.button}>
          <Text style={styles.buttonText}>Add to Favorites</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={favorites}
            renderItem={({ data }) => (
              <Text style={{ fontSize: 18 }}>
                {data.name}, {data.address}, {data.rating}
              </Text>
            )}
            keyExtractor={(favorite, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default FavoriteScreen;
