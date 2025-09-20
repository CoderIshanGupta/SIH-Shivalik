//#1
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
export default function Onboarding() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // 'en' = English, 'hi' = Hindi, 'pa' = Punjabi
  const [language, setLanguage] = useState<'en' | 'hi' | 'pa'>('en');

  // Translate strings
  const translations = {
    en: {
      title: 'BusEase',
      tagline: 'Track buses in real time and never miss your ride again!',
      start: 'Click to Start',
    },
    hi: {
      title: 'बसEase',
      tagline: 'बसों को रियल टाइम में ट्रैक करें और कभी भी अपनी सवारी न चूकें!',
      start: 'शुरू करने के लिए स्वाइप करें',
    },
    pa: {
      title: 'ਬੱਸEase',
      tagline: 'ਬੱਸਾਂ ਨੂੰ ਰੀਅਲ ਟਾਈਮ ਵਿੱਚ ਟ੍ਰੈਕ ਕਰੋ ਅਤੇ ਆਪਣੀ ਸਵਾਰੀ ਕਦੇ ਨਾ ਖੋਵੋ!',
      start: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸਵਾਈਪ ਕਰੋ',
    },
  };

  const { title, tagline, start } = translations[language];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        {title.slice(0, 3)}
        <Text style={styles.titleHighlight}>{title.slice(3)}</Text>
      </Text>

      {/* Illustration */}
      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Tagline */}
      <Text style={styles.subtitle}>{tagline}</Text>

      {/* Language Toggle */}
      <View style={styles.langSwitch}>
        {['en', 'hi', 'pa'].map(lng => (
          <TouchableOpacity
            key={lng}
            style={[styles.langBtn, language === lng && styles.langBtnActive]}
            onPress={() => setLanguage(lng as 'en' | 'hi' | 'pa')}
          >
            <Text
              style={[
                styles.langText,
                language === lng && styles.langTextActive,
              ]}
            >
              {lng === 'en' ? 'English' : lng === 'hi' ? 'हिन्दी' : 'ਪੰਜਾਬੀ'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('SecondScreen')}
      >
        <Text style={styles.startButtonText}>{start}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#d97706', // orange
    marginBottom: 8,
  },
  titleHighlight: {
    color: '#1e3a8a', // blue
  },
  illustration: {
    width: '80%',
    height: 220,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 25,
    marginVertical: 20,
  },
  langBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  langBtnActive: {
    backgroundColor: '#d97706',
  },
  langText: {
    fontSize: 16,
    color: '#555',
  },
  langTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
