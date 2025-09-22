// App.tsx
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
import { LanguageProvider, useLanguage } from './src/LanguageContext';

export type RootStackParamList = {
  Onboarding: undefined;
  SecondScreen: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { t } = useLanguage();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: t("home"), tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen
        name="Fourth"
        component={FourthScreen}
        options={{ tabBarLabel: "🚌" }}
      />
      <Tab.Screen
        name="Fifth"
        component={FifthScreen}
        options={{ tabBarLabel: "📍" }}
      />
      <Tab.Screen
        name="Sixth"
        component={SixthScreen}
        options={{ tabBarLabel: t("offline") }}
      />
      <Tab.Screen
        name="Seventh"
        component={SeventhScreen}
        options={{ tabBarLabel: t("assistant") }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="SecondScreen" component={SecondScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}