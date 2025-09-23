import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../LanguageContext';

export default function Onboarding() {
  const navigation = useNavigation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("appName")}</Text>
      <Text style={styles.subtitle}>{t("tagline")}</Text>

      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Language Toggle */}
      <View style={styles.langSwitch}>
        {["en", "hi", "pa"].map(lng => (
          <TouchableOpacity
            key={lng}
            style={[styles.langBtn, language === lng && styles.langBtnActive]}
            onPress={() => setLanguage(lng as any)}
          >
            <Text
              style={[
                styles.langText,
                language === lng && styles.langTextActive,
              ]}
            >
              {lng === "en" ? "English" : lng === "hi" ? "हिन्दी" : "ਪੰਜਾਬੀ"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("MainTabs" as never)}
      >
        <Text style={styles.startButtonText}>{t("start")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 40, fontWeight: '700', color: '#d97706', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginVertical: 10 },
  illustration: { width: '80%', height: 220, marginVertical: 20 },
  langSwitch: { flexDirection: 'row', backgroundColor: '#eee', borderRadius: 25, marginVertical: 20 },
  langBtn: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 25 },
  langBtnActive: { backgroundColor: '#d97706' },
  langText: { fontSize: 16, color: '#555' },
  langTextActive: { color: '#fff', fontWeight: '600' },
  startButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    paddingHorizontal: 40,    // consistent padding
    borderRadius: 30,
    marginTop: 30,
    minWidth: 180,             // ensures button isn't tiny
    alignItems: "center",      // center text inside
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: "center",
  },
});