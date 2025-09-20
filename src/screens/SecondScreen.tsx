import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function SecondScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // language state: 'en' | 'hi' | 'pa'
  const [language, setLanguage] = useState<'en' | 'hi' | 'pa'>('en');

  const translations = {
    en: {
      heading: 'Real-Time Bus Tracking',
      description:
        'See live bus locations, estimated arrival times, and plan your trip with ease.',
      next: 'Continue',
    },
    hi: {
      heading: 'रियल-टाइम बस ट्रैकिंग',
      description:
        'लाइव बस लोकेशन और अनुमानित आगमन समय देखें और अपनी यात्रा आसानी से योजना बनाएं।',
      next: 'आगे बढ़ें',
    },
    pa: {
      heading: 'ਰੀਅਲ-ਟਾਈਮ ਬੱਸ ਟ੍ਰੈਕਿੰਗ',
      description:
        'ਲਾਈਵ ਬੱਸ ਸਥਾਨ, ਅੰਦਾਜ਼ੇ ਨਾਲ ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ ਵੇਖੋ ਅਤੇ ਆਪਣੀ ਯਾਤਰਾ ਆਸਾਨੀ ਨਾਲ ਯੋਜਨਾ ਬਣਾਓ।',
      next: 'ਅੱਗੇ ਵੱਧੋ',
    },
  };

  const { heading, description, next } = translations[language];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.description}>{description}</Text>

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

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.nextButtonText}>{next}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 25,
    marginBottom: 30,
  },
  langBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  langBtnActive: {
    backgroundColor: '#1e3a8a',
  },
  langText: {
    fontSize: 16,
    color: '#555',
  },
  langTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  illustration: {
    width: '80%',
    height: 220,
    marginVertical: 20,
  },
});
