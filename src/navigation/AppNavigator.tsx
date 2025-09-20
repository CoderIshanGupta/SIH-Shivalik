import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
  MainTabs: undefined; // 👈 Tab navigator lives inside stack
};

export type MainTabParamList = {
  DashboardScreen: undefined;
  FourthScreen: undefined;
  FifthScreen: undefined;
  SixthScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// --- Bottom Tabs with Emojis ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
        tabBarLabelStyle: { fontSize: 22 }, // emojis big
      }}
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ tabBarLabel: '🏠' }}
      />
      <Tab.Screen
        name="FourthScreen"
        component={FourthScreen}
        options={{ tabBarLabel: '🚌' }}
      />
      <Tab.Screen
        name="FifthScreen"
        component={FifthScreen}
        options={{ tabBarLabel: '📍' }}
      />
      <Tab.Screen
        name="SixthScreen"
        component={SixthScreen}
        options={{ tabBarLabel: '📥' }}
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
        {/* 👇 After onboarding/Second/Welcome, user enters tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
