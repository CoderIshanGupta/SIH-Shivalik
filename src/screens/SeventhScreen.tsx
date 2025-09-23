import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { askAssistant } from '../api';
import { useLanguage } from '../LanguageContext';

export default function SeventhScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleVoicePress = async () => {
    try {
      setLoading(true);
      const res = await askAssistant("When is the next bus to Jalandhar from Ludhiana?");
      Alert.alert(t("assistant"), res.reply || t("noData"));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not connect!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Correct translation key */}
      <Text style={styles.title}>{t("aiAssistant")}</Text>
      <TouchableOpacity style={styles.voiceButton} onPress={handleVoicePress}>
        <Text style={styles.voiceText}>
          {loading ? "…" : "🎤"}{" "}
          {loading ? t("loading") : t("pressToSpeak")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  voiceButton: { backgroundColor: "#f97316", padding: 15, paddingHorizontal: 30, borderRadius: 30 },
  voiceText: { color: "#fff", fontSize: 18, fontWeight: "600" }
});