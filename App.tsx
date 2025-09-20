import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import Onboarding from './src/screens/Onboarding';
import SecondScreen from './src/screens/SecondScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FourthScreen from './src/screens/FourthScreen';
import FifthScreen from './src/screens/FifthScreen';
import SixthScreen from './src/screens/SixthScreen';
import SeventhScreen from './src/screens/SeventhScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  SecondScreen: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Fourth"
        component={FourthScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🚌</Text>,
        }}
      />
      <Tab.Screen
        name="Fifth"
        component={FifthScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>📍</Text>,
        }}
      />
      <Tab.Screen
        name="Sixth"
        component={SixthScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>📲</Text>,
        }}
      />
      <Tab.Screen
        name="Seventh"
        component={SeventhScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🎤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          {/* 👇 Main bottom tab navigator */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
