import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, FlatList } from 'react-native';
import { getBuses } from '../api';
import { Bus } from '../types';
import { useLanguage } from '../LanguageContext';

export default function DashboardScreen() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      try {
        const data = await getBuses();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses", err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Bus<Text style={styles.logoAccent}>Ease</Text></Text>
      </View>

      <ImageBackground source={require('../assets/images/mapIMG.jpg')} style={styles.mapArea}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder={t("searchRoutes")}
            placeholderTextColor="#555"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.nearbyCard}>
          <Text style={styles.nearbyText}>{t("routesAvailable")}</Text>
        </View>

        <FlatList
          data={buses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.busCard}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text>{item.route}</Text>
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#d97706',
    borderBottomLeftRadius: 80, borderBottomRightRadius: 80,
    paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  logoText: { fontSize: 36, color: '#fff', fontWeight: '700' },
  logoAccent: { color: '#60a5fa' },
  mapArea: { flex: 1, padding: 10 },
  searchWrapper: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30,
    paddingHorizontal: 15, paddingVertical: 10, elevation: 4, marginTop: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  nearbyCard: { backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 15, alignSelf: 'center',
    marginTop: 25, elevation: 4 },
  nearbyText: { fontSize: 16, fontWeight: '600' },
  busCard: { backgroundColor: '#f3f4f6', marginHorizontal: 15,
    marginTop: 10, padding: 10, borderRadius: 10 },
});