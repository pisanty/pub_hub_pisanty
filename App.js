import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./components/LoginScreen";
import ContactsScreen from "./components/ContactsScreen";
import FavoritesScreen from "./components/FavoritesScreen";
import MapScreen from "./components/MapScreen";
import { Header, Icon } from "react-native-elements";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Header
          leftComponent={{ text: "PubHub", style: { color: "#fff" } }}
          rightComponent={{
            icon: "logout",
            color: "#fff",
            onPress: { LoginScreen },
          }}
        />
        screenOptions=
        {({ route }) => ({
          // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => {
            // Function tabBarIcon is given the focused state,
            // color and size params
            let iconName;
            if (route.name === "Contacts") {
              iconName = "contacts";
            } else if (route.name === "Favorites") {
              iconName = "favorite";
            } else if (route.name === "Map") {
              iconName = "map";
            }
            return (
              <Icon type="material" name={iconName} size={size} color={color} />
            ); //it returns an icon component
          },
        })}
        <Tab.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
*/
