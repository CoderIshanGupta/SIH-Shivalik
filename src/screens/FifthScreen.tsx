import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, Modal, FlatList, Alert
} from 'react-native';
import { getBuses, findRoute } from '../api';
import { Bus } from '../types';
import { useLanguage } from '../LanguageContext';

export default function FifthScreen() {
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);
  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    setFromStop(t("from"));
    setToStop(t("to"));
  }, [t]);

  useEffect(() => {
    (async () => {
      try {
        const buses: Bus[] = await getBuses();
        const allStops: string[] = [];
        buses.forEach(bus => {
          if (bus.route) {
            const splitStops = bus.route.split('-').map(s => s.trim());
            allStops.push(...splitStops);
          }
        });
        setStops([...new Set(allStops)]);
      } catch (err) {
        console.error('Error fetching stops', err);
      }
    })();
  }, []);

  const handleFind = async () => {
    if (fromStop === t("from") || toStop === t("to")) {
      Alert.alert(t("selectStops"));
      return;
    }
    try {
      const data = await findRoute(fromStop, toStop);
      setRoutes(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", t("noData"));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration} resizeMode="contain" />

      {/* From stop */}
      <TouchableOpacity style={styles.selectCard} onPress={() => setFromVisible(true)}>
        <Text style={styles.iconText}>📍</Text>
        <Text style={styles.selectText}>{fromStop}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* To stop */}
      <TouchableOpacity style={styles.selectCard} onPress={() => setToVisible(true)}>
        <Text style={styles.iconText}>⚫</Text>
        <Text style={styles.selectText}>{toStop}</Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.findBtn} onPress={handleFind}>
        <Text style={styles.findText}>{t("find")}</Text>
      </TouchableOpacity>

      <View style={styles.routesCard}>
        <Text style={styles.routesTitle}>{t("routesAvailable")}</Text>
        {routes.length > 0 ? (
          routes.map((route, idx) => (
            <View key={idx} style={styles.routeOption}>
              <View style={styles.routeLeft}>
                <Text style={styles.busBadge}>{route.bus}</Text>
                <View>
                  <Text style={styles.routeType}>{route.type}</Text>
                  <Text style={styles.routeSub}>ETA: {route.eta}</Text>
                </View>
              </View>
              <Text style={styles.price}>₹{route.price}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 10 }}>{t("noData")}</Text>
        )}
      </View>

      {/* From Modal */}
      <Modal visible={fromVisible} transparent animationType="slide"
        onRequestClose={() => setFromVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("selectStop")}</Text>
            <FlatList
              data={stops}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.stopItem} onPress={() => {
                  setFromStop(item); setFromVisible(false);
                }}>
                  <Text style={styles.stopText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* To Modal */}
      <Modal visible={toVisible} transparent animationType="slide"
        onRequestClose={() => setToVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("selectStop")}</Text>
            <FlatList
              data={stops}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.stopItem} onPress={() => {
                  setToStop(item); setToVisible(false);
                }}>
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
  illustration: { width: '100%', height: 160, marginTop: 10 },
  selectCard: { flexDirection: 'row', marginHorizontal: 20, marginTop: 15,
    backgroundColor: '#fff', borderRadius: 16, padding: 15, elevation: 4 },
  iconText: { fontSize: 20, marginRight: 8 },
  selectText: { flex: 1, fontSize: 16, fontWeight: '600' },
  dropdownArrow: { fontSize: 20, color: '#666' },
  findBtn: { alignSelf: 'center', marginTop: 20, backgroundColor: '#f97316',
    borderRadius: 20, paddingHorizontal: 30, paddingVertical: 10 },
  findText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  routesCard: { backgroundColor: '#fff', margin: 20, borderRadius: 16,
    padding: 20, elevation: 4 },
  routesTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  routeOption: { flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#f97316', borderRadius: 12,
    padding: 12, marginBottom: 12 },
  routeLeft: { flexDirection: 'row', alignItems: 'center' },
  busBadge: { backgroundColor: '#fff', color: '#f97316', borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 2, marginRight: 10, fontWeight: '700' },
  routeType: { color: '#fff', fontWeight: '700' },
  routeSub: { color: '#fff' },
  price: { color: '#fff', fontWeight: '700', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 16,
    width: '80%', maxHeight: '60%', padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  stopItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  stopText: { fontSize: 16 }
});