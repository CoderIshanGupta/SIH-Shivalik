import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SeventhScreen = () => {
  const handleVoicePress = () => {
    Alert.alert('AI Assistant', 'Voice Assistant button pressed!');
    // later you can integrate speech recognition here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <TouchableOpacity style={styles.voiceButton} onPress={handleVoicePress}>
        <Text style={styles.voiceText}>🎤 Speak to Assistant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeventhScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  voiceButton: {
    backgroundColor: '#f97316',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  voiceText: { fontSize: 18, color: '#fff', fontWeight: '600' },
});
