import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import styles from "./Styles";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  const sendSms = async () => {
    const isSMSAvailable = await SMS.isAvailableAsync();
    if (isSMSAvailable && phoneNumber && message) {
      await SMS.sendSMSAsync(phoneNumber.toString(), message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Phone Book</Text>
      <Text>{contacts.name}</Text>
      <FlatList
        style={styles.list}
        data={contacts}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            {item.phoneNumbers ? (
              <Text> {item.phoneNumbers[0].number} </Text>
            ) : (
              <Text> No number available </Text>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={getContacts} style={styles.button}>
          <Text style={styles.buttonText}>Get Contacts!</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Write a message here!"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={sendSms}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Invite them for a drink!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactsScreen;
