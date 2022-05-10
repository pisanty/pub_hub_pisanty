import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { auth } from "../firebase";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.032,
    longitudeDelta: 0.02,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const showAddress = () => {
    if (address) {
      const url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=AIzaSyAGKtrsU6gelADNlJQHrofZgsjktDaSAkw";
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          const lat = responseData.results[0].geometry.location.lat;
          const lon = responseData.results[0].geometry.location.lng;
          setRegion({
            ...region,
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.0312,
            longitudeDelta: 0.0211,
          });
        })
        .then(() => showPubs())
        .catch((error) =>
          Alert.alert("Error", "Something is wrong with the fetch")
        );
    }

    const showPubs = () => {
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        region.latitude +
        "," +
        region.longitude +
        "&radius=500&type=bar&key=AIzaSyAGKtrsU6gelADNlJQHrofZgsjktDaSAkw";
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => setPubs(responseData.results))
        .catch((error) =>
          Alert.alert("Error", "Something is wrong with the fetch")
        );
    };
  };

  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginStack");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 40 }}>Hello, {auth.currentUser?.email}</Text>
      <MapView style={styles.map} region={region}>
        {pubs.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={marker.name}
            description={marker.vicinity}
          />
        ))}
      </MapView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter address"
          style={styles.input}
          onChangeText={(address) => setAddress(address)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={showAddress}>
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={SignOut}
        >
          <Text style={styles.buttonOutlineText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;
