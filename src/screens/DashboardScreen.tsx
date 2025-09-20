import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import { getBuses } from '../api';   // our API helper
import { Bus } from '../types';     // Bus type definition

export default function DashboardScreen() {
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBuses();   // call backend
        setBuses(data);                  // store in state
        console.log("Fetched buses:", data);  // debug log only
      } catch (error) {
        console.error("Error loading buses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Orange header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Bus
          <Text style={styles.logoAccent}>Ease</Text>
        </Text>
      </View>

      {/* Map background */}
      <ImageBackground
        source={require('../assets/images/mapIMG.jpg')}
        style={styles.mapArea}
      >
        {/* Search bar */}
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search routes"
            placeholderTextColor="#555"
            style={styles.searchInput}
          />
        </View>

        {/* Nearby stops card */}
        <View style={styles.nearbyCard}>
          <Text style={styles.nearbyText}>Nearby Stops</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#d97706',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoText: { fontSize: 36, color: '#fff', fontWeight: '700' },
  logoAccent: { color: '#60a5fa' },

  mapArea: { flex: 1, resizeMode: 'cover', padding: 10 },

  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 4,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },

  nearbyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    elevation: 4,
  },
  nearbyText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
});