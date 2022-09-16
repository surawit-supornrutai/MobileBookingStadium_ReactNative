import React, { useState, useEffect } from "react";
import firebase from "../database/firebaseDB";
import { StyleSheet, Button, View } from "react-native";
import { useDispatch } from "react-redux";

// import library ที่จำเป็น
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import screen ที่เกี่ยวข้อง
import StartAppScreen from "../screens/StartApp";
import RegisterScreen from "../screens/Register";
import SearchScreen from "../screens/Search";

// UserProfile
import ProfileScreen from "../screens/UserProfile/Profile";

// Stadium
import Stadium_queueScreen from "../screens/Stadium/Stadium_queue";
import BookingScreen from "../screens/Stadium/Booking";

// Admin
import AdminProfileScreen from "../screens/Admin/AdminProfile";
import SearchAdminScreen from "../screens/Admin/Search";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
// import {
//   user,
//   admin,
//   dbuser,
//   dbstadium,
//   dbbooking,
//   userbooking,
// } from "../store/actions/Action";
import { dbuser, dbstadium, dbbooking } from "../store/actions/Action";
import { getBooking, getStadium, getUser } from "../data/test";
// สร้าง navigator ตามโจทย์กำหนด
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserProfile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function mainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#65656B",
        tabBarActiveTintColor: "#246BFD",
        tabBarStyle: { backgroundColor: "#181829" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={stadium}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function stadium() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStadium"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StadiumQueue"
        component={Stadium_queueScreen}
        options={({ route }) => ({
          title: route.params.StadiumName + " Stadium",
          headerStyle: { backgroundColor: "#181829" },
          headerTintColor: "#FFFFFF",
          headerRight: () => (
            <View style={styles.button_booking}>
              <Button
                onPress={() =>
                  route.params.Navigate.navigate("Booking", {
                    stadiumID: route.params.stadiumID,
                    stadiumName: route.params.StadiumName,
                  })
                }
                title="จองสนาม"
                color="#000"
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AdminTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#65656B",
        tabBarActiveTintColor: "#246BFD",
        tabBarStyle: { backgroundColor: "#181829" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={adminStadium}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="user" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function adminStadium() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeAdminStadium"
        component={SearchAdminScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StadiumQueue"
        component={Stadium_queueScreen}
        options={({ route }) => ({
          title: route.params.StadiumName,
          headerStyle: { backgroundColor: "#181829" },
          headerTintColor: "#FFFFFF",
        })}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// async function getDB() {
//   var count = 0;
//   const dispatch = useDispatch();
//   const Stadium = await getStadium();
//   const User = await getUser();
//   const Booking = await getBooking();
//   await dispatch(dbstadium(Stadium));
//   await dispatch(dbuser(User));
//   await dispatch(dbbooking(Booking));
//   console.log({ count: count, user: User });
//   count++;
// }

export default function MyNavigator() {
  // getDB();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartApp">
        <Stack.Screen
          name="StartApp"
          component={StartAppScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerStyle: { backgroundColor: "#181829" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="mainTab"
          component={mainTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="adminTab"
          component={AdminTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#222232",
    flex: 1,
  },
  color_red: {
    backgroundColor: "#FF2525",
  },
  color_blue: {
    backgroundColor: "#246BFD",
  },
  color_white: {
    color: "#FFF",
  },
  button_booking: {
    backgroundColor: "#F4A58A",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
});
