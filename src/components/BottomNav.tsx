import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  DashboardScreen: undefined;
  FourthScreen: undefined;
  FifthScreen: undefined;
  SixthScreen: undefined;
};

const BottomNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
        <Text style={styles.navEmoji}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FifthScreen')}>
        <Text style={styles.navEmoji}>🚌</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.navEmoji}>📍</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SixthScreen')}>
        <Text style={styles.navEmoji}>📱</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.navEmoji}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navEmoji: {
    fontSize: 24,
  },
});

export default BottomNav;
