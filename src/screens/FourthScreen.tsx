import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { getBuses } from '../api';
import { Bus } from '../types';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function FourthScreen() {
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string>('Select Stop');
  const [stops, setStops] = useState<string[]>([]);

  // Instead of fixed, we’ll show backend ETA
  const [date, setDate] = useState('16 Sep 2025');
  const [time, setTime] = useState('20 : 00');

  // Load stops dynamically
  useEffect(() => {
    const loadStops = async () => {
      try {
        const buses: Bus[] = await getBuses();
        const allStops: string[] = [];
        buses.forEach((bus) => {
          if (bus.route) {
            const routeStops = bus.route.split('-').map((s) => s.trim());
            allStops.push(...routeStops);
          }
        });
        setStops(Array.from(new Set(allStops)));
      } catch (err) {
        console.error('Error fetching stops', err);
        setStops(['Main Square', 'City Center', 'College Gate', 'Mall Road']); // fallback
      }
    };
    loadStops();
  }, []);

  const handleStopSelect = async (stop: string) => {
    setSelectedStop(stop);
    setStopModalVisible(false);

    try {
      const res = await axios.post(`${BASE_URL}/predict`, {
        stop: stop,
        date: date,
      });
      if (res.data?.eta) {
        setTime(res.data.eta);
      }
    } catch {
      // fallback if backend fails
      setTime('20 : 00');
    }
  };

  return (
    <View style={styles.container}>
      {/* Orange header bar */}
      <View style={styles.header} />

      {/* Illustration */}
      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Select Stop card */}
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => setStopModalVisible(true)}
      >
        <Text style={styles.locationEmoji}>📍</Text>
        <Text style={styles.selectText}>{selectedStop}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* Date & Time card */}
      <View style={styles.dateTimeCard}>
        <View style={styles.dateTimeInner}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.dateTimeInner}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
      </View>

      {/* Modal for stop selection */}
      <Modal
        visible={stopModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStopModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a Stop</Text>
            <FlatList
              data={stops}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => handleStopSelect(item)}
                >
                  <Text style={styles.stopText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 20,
    backgroundColor: '#d97706',
  },

  illustration: {
    width: '100%',
    height: 180,
    marginTop: 10,
  },

  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 4,
  },
  locationEmoji: { fontSize: 20, marginRight: 8 },
  selectText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333' },
  dropdownArrow: { fontSize: 20, color: '#999' },

  dateTimeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    elevation: 4,
  },
  dateTimeInner: { flex: 1, alignItems: 'center' },
  label: { fontSize: 14, color: '#666', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: '#333' },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '80%',
    maxHeight: '60%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  stopItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  stopText: { fontSize: 16 },
});