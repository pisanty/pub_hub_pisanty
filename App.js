import React from "react";
import { StyleSheet } from "react-native";
import styles from "./components/Styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./components/LoginScreen";
import ContactsScreen from "./components/ContactsScreen";
import FavoritesScreen from "./components/FavoritesScreen";
import MapScreen from "./components/MapScreen";
import { Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStack() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        // Navigator can be customized using screenOptions
        tabBarIcon: ({ focused, color, size }) => {
          // Function tabBarIcon is given the focused state,
          // color and size params
          let iconName;
          if (route.name === "Contacts") {
            iconName = "contacts";
            //color="#ff9800";
          } else if (route.name === "Favorites") {
            iconName = "favorite";
            //color="#ff9800";
          } else if (route.name === "Map") {
            iconName = "map";
            //color="#ff9800";
          }
          return (
            <Icon type="material" name={iconName} size={size} color={color} />
          ); //it returns an icon component
        },
        tabBarActiveBackgroundColor: "#ff9800",
        tabBarInactiveBackgroundColor: "black",
        tabBarInactiveTintColor: "#ff9800",
        tabBarActiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackVisible: false }}>
        <Stack.Screen
          name="LoginStack"
          component={LoginScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="MapStack"
          component={LoginStack}
          options={{ title: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
