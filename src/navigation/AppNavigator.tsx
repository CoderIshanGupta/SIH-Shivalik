import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 👇 import vector icons from react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// --- Screens ---
import Onboarding from '../screens/Onboarding';
import SecondScreen from '../screens/SecondScreen';
import Welcome from '../screens/Welcome';
import DashboardScreen from '../screens/DashboardScreen';
import FourthScreen from '../screens/FourthScreen';
import FifthScreen from '../screens/FifthScreen';
import SixthScreen from '../screens/SixthScreen';

// --- TYPES ---
export type RootStackParamList = {
  Onboarding: undefined;
  Second: undefined;
  Welcome: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  DashboardScreen: undefined;
  FourthScreen: undefined;
  FifthScreen: undefined;
  SixthScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// --- Bottom Tabs with Vector Icons ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: '#d97706', // active icon color
        tabBarInactiveTintColor: '#999',  // inactive icon color

        // ✅ icons logic
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'DashboardScreen') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'FourthScreen') {
            return <MaterialIcons name="directions-bus" size={size} color={color} />;
          } else if (route.name === 'FifthScreen') {
            return <Ionicons name="location-sharp" size={size} color={color} />;
          } else if (route.name === 'SixthScreen') {
            return <Ionicons name="cloud-download-sharp" size={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="FourthScreen"
        component={FourthScreen}
        options={{ title: 'Buses' }}
      />
      <Tab.Screen
        name="FifthScreen"
        component={FifthScreen}
        options={{ title: 'Routes' }}
      />
      <Tab.Screen
        name="SixthScreen"
        component={SixthScreen}
        options={{ title: 'Offline' }}
      />
    </Tab.Navigator>
  );
}

// --- Root Navigator ---
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        {/* 👇 After onboarding, user enters tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}