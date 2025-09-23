import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, Modal, FlatList
} from 'react-native';
import { getBuses, predictETA } from '../api';
import { Bus } from '../types';
import { useLanguage } from '../LanguageContext';

export default function FourthScreen() {
  const [stops, setStops] = useState<string[]>([]);
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const { t } = useLanguage();
  const [selectedStop, setSelectedStop] = useState<string>(t("selectStop"));
  const [date] = useState("16 Sep 2025");
  const [time, setTime] = useState("20:00");

  useEffect(() => {
    (async () => {
      try {
        const buses: Bus[] = await getBuses();
        const allStops: string[] = [];
        buses.forEach(b => {
          if (b.route) allStops.push(...b.route.split('-').map(s => s.trim()));
        });
        setStops([...new Set(allStops)]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [t]); // re-run if language changes

  const handleStopSelect = async (stop: string) => {
    setSelectedStop(t(stop as any)); // translate key to text
    setStopModalVisible(false);
    try {
      const res = await predictETA(stop, date);
      if (res?.eta) setTime(res.eta);
    } catch {
      setTime("20:00");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image
        source={require('../assets/images/onboard-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Select Stop Button */}
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => setStopModalVisible(true)}
      >
        <Text style={styles.locationEmoji}>📍</Text>
        <Text style={styles.selectText}>
          {selectedStop || t("selectStop")}
        </Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {/* Date/ETA Card */}
      <View style={styles.dateTimeCard}>
        <View>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.label}>ETA</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
      </View>

      {/* Stops Modal */}
      <Modal
        visible={stopModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStopModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("selectStop")}</Text>
            <FlatList
              data={stops}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stopItem}
                  onPress={() => handleStopSelect(item)}
                >
                  {/* Translate each stop key into current language */}
                  <Text style={styles.stopText}>{t(item as any)}</Text>
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: { height: 20, backgroundColor: "#d97706" },
  illustration: { width: "100%", height: 180, marginTop: 10 },
  selectCard: {
    flexDirection: 'row', backgroundColor: "#fff", borderRadius: 16,
    margin: 20, padding: 15, elevation: 4
  },
  locationEmoji: { fontSize: 20, marginRight: 8 },
  selectText: { flex: 1, fontSize: 16, fontWeight: "600" },
  dropdownArrow: { fontSize: 20 },
  dateTimeCard: {
    flexDirection: "row", margin: 20, backgroundColor: "#fff",
    borderRadius: 16, padding: 20, elevation: 4, justifyContent: "space-between"
  },
  divider: { width: 1, backgroundColor: "#ddd" },
  label: { color: "#666" },
  value: { fontWeight: "700", fontSize: 16 },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center", alignItems: "center"
  },
  modalContainer: {
    backgroundColor: "#fff", borderRadius: 16,
    width: "80%", maxHeight: "60%", padding: 20
  },
  modalTitle: {
    fontSize: 18, fontWeight: '700',
    marginBottom: 10, textAlign: 'center'
  },
  stopItem: {
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "#eee"
  },
  stopText: { fontSize: 16 }
});