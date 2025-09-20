import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { getBuses } from '../api';
import { Bus } from '../types';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function FifthScreen() {
  // Modal states
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);
  const [fromStop, setFromStop] = useState<string>('From');
  const [toStop, setToStop] = useState<string>('To');

  // Backend data
  const [stops, setStops] = useState<string[]>([]);
  const [routes, setRoutes] = useState<any[]>([]); // will hold backend response for routes

  // Fetch stops from backend (based on bus routes)
  useEffect(() => {
    const loadStops = async () => {
      try {
        const buses: Bus[] = await getBuses();
        const allStops: string[] = [];
        buses.forEach((bus) => {
          if (bus.route) {
            // assume route is a string like "StopA-StopB-StopC"
            const routeStops = bus.route.split('-').map((s) => s.trim());
            allStops.push(...routeStops);
          }
        });
        const uniqueStops = Array.from(new Set(allStops));
        setStops(uniqueStops);
      } catch (err) {
        console.error('Error fetching stops', err);
      }
    };
    loadStops();
  }, []);

  const selectFrom = (stop: string) => {
    setFromStop(stop);
    setFromVisible(false);
  };

  const selectTo = (stop: string) => {
    setToStop(stop);
    setToVisible(false);
  };

  const handleFind = async () => {
    if (fromStop === 'From' || toStop === 'To') {
      Alert.alert('Select both stops', 'Please choose From and To stops.');
      return;
    }

    try {
      // Call backend: ideally you’ll add a /findRoute endpoint in FastAPI
      // For now, let’s fetch all buses and filter those containing both stops
      const res = await axios.post(`${BASE_URL}/findRoute`, {
        from: fromStop,
        to: toStop,
      });

      setRoutes(res.data); // backend should return [{bus, type, eta, price}]
    } catch (err) {
      console.error(err);
      Alert.alert(
        'Searching Routes',
        `Finding routes from ${fromStop} to ${toStop}...`
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top orange bar */}
      <View style={styles.header} />

      {/* Illustration */}
      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* From selector */}
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => setFromVisible(true)}
      >
        <Text style={styles.iconText}>📍</Text>
        <Text style={styles.selectText}>{fromStop}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* To selector */}
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => setToVisible(true)}
      >
        <Text style={styles.iconText}>⚫</Text>
        <Text style={styles.selectText}>{toStop}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* Find button */}
      <TouchableOpacity style={styles.findBtn} onPress={handleFind}>
        <Text style={styles.findText}>Find</Text>
      </TouchableOpacity>

      {/* Routes Available */}
      <View style={styles.routesCard}>
        <Text style={styles.routesTitle}>Routes Available</Text>

        {/* ✅ Dynamically render backend routes if available */}
        {routes.length > 0 ? (
          routes.map((route, idx) => (
            <View key={idx} style={styles.routeOption}>
              <View style={styles.routeLeft}>
                <Text style={styles.busBadge}>{route.bus}</Text>
                <View>
                  <Text style={styles.routeType}>{route.type}</Text>
                  <Text style={styles.routeSub}>
                    next in {route.eta} min
                  </Text>
                </View>
              </View>
              <Text style={styles.price}>₹{route.price}</Text>
            </View>
          ))
        ) : (
          <>
            {/* Keep your original static cards as fallback */}
            <View style={styles.routeOption}>
              <View style={styles.routeLeft}>
                <Text style={styles.busBadge}>15 A</Text>
                <View>
                  <Text style={styles.routeType}>Direct</Text>
                  <Text style={styles.routeSub}>next in 5 min</Text>
                </View>
              </View>
              <Text style={styles.price}>₹20</Text>
            </View>

            <View style={styles.routeOption}>
              <View style={styles.routeLeft}>
                <Text style={styles.busBadge}>15→118</Text>
                <View>
                  <Text style={styles.routeType}>Via Transfer</Text>
                  <Text style={styles.routeSub}>next in 2 min</Text>
                </View>
              </View>
              <Text style={styles.price}>₹25</Text>
            </View>
          </>
        )}
      </View>

      {/* From modal */}
      <Modal
        visible={fromVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFromVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select From Stop</Text>
            <FlatList
              data={stops}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => selectFrom(item)}
                >
                  <Text style={styles.stopText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* To modal */}
      <Modal
        visible={toVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setToVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select To Stop</Text>
            <FlatList
              data={stops}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => selectTo(item)}
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
  header: { height: 20, backgroundColor: '#d97706' },
  illustration: { width: '100%', height: 180, marginTop: 10 },
  selectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 4,
  },
  iconText: { fontSize: 20, marginRight: 8 },
  selectText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333' },
  dropdownArrow: { fontSize: 20, color: '#999' },
  findBtn: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 8,
    elevation: 3,
  },
  findText: { fontSize: 16, fontWeight: '600' },
  routesCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  routesTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  routeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f97316',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  routeLeft: { flexDirection: 'row', alignItems: 'center' },
  busBadge: {
    backgroundColor: '#fff',
    color: '#f97316',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
    fontWeight: '700',
  },
  routeType: { color: '#fff', fontWeight: '700', fontSize: 16 },
  routeSub: { color: '#fff', fontSize: 12 },
  price: { color: '#fff', fontWeight: '700', fontSize: 16 },
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