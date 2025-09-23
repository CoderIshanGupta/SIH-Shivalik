// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BottomNav from '../components/BottomNav';

// const SixthScreen = () => {
//   const [routes, setRoutes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Load cached data when screen opens
//   useEffect(() => {
//     loadOfflineRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     try {
//       setLoading(true);
//       // Replace with real API when ready
//       const res = await fetch('https://example.com/api/busRoutes.json');
//       const data = await res.json();

//       setRoutes(data);
//       await AsyncStorage.setItem('offlineRoutes', JSON.stringify(data));

//       Alert.alert('Saved', 'Routes are now available offline inside the app.');
//     } catch (err) {
//       Alert.alert('Error', 'Could not fetch routes.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadOfflineRoutes = async () => {
//     try {
//       const cached = await AsyncStorage.getItem('offlineRoutes');
//       if (cached) {
//         setRoutes(JSON.parse(cached));
//       }
//     } catch (err) {
//       console.log('Error reading cache', err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Title */}
//       <Text style={styles.title}>Offline Routes & Maps</Text>

//       {/* Download button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={fetchRoutes}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Downloading…' : 'Download for Offline Use'}
//         </Text>
//       </TouchableOpacity>

//       {/* Routes list */}
//       <FlatList
//         data={routes}
//         keyExtractor={(item, idx) => idx.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.routeItem}>
//             <Text style={styles.routeName}>{item.name}</Text>
//             <Text style={styles.routeDetail}>{item.detail}</Text>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text style={{ marginTop: 20 }}>No offline data yet.</Text>
//         }
//       />

//       {/* ✅ Reusable Bottom Navigation */}
//       <BottomNav />
//     </View>
//   );
// };

// export default SixthScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#f57c00',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   routeItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   routeName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   routeDetail: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, FlatList, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRoutes } from '../api';
import { useLanguage } from '../LanguageContext';

type RouteItem = {
  stop: string; // now contains a translation key!
  routes: { id: string; eta: string }[];
};

export default function SixthScreen() {
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => { loadOfflineRoutes(); }, []);

  const fetchRoutesData = async () => {
    try {
      setLoading(true);
      const data = await getRoutes();
      await AsyncStorage.setItem('offlineRoutes', JSON.stringify(data));
      const now = new Date().toLocaleTimeString();
      await AsyncStorage.setItem('lastUpdated', now);

      setRoutes(data);
      setLastUpdated(now);
      Alert.alert("✅", t("offline"));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", t("noData"));
    } finally {
      setLoading(false);
    }
  };

  const loadOfflineRoutes = async () => {
    try {
      const cached = await AsyncStorage.getItem('offlineRoutes');
      const updated = await AsyncStorage.getItem('lastUpdated');
      if (cached) setRoutes(JSON.parse(cached));
      if (updated) setLastUpdated(updated);
    } catch (err) {
      console.warn("Error loading offline routes", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("offline")}</Text>
      </View>

      <TouchableOpacity style={styles.offlineBtn} onPress={fetchRoutesData}>
        <Text style={styles.offlineText}>
          {loading ? t("loading") : t("offline")}
        </Text>
      </TouchableOpacity>

      <View style={styles.stopsCard}>
        <FlatList
          data={routes}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.stopBlock}>
              {/* ✅ Translate stop key here */}
              <Text style={styles.stopName}>{t(item.stop as any)}</Text>
              {item.routes.map((r, i) => (
                <Text key={i} style={styles.routeText}>
                  Route {r.id} → {r.eta}
                </Text>
              ))}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>{t("noData")}</Text>}
        />
        {lastUpdated && (
          <Text style={styles.updatedText}>{t("lastUpdated")}: {lastUpdated}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60, backgroundColor: '#d97706',
    justifyContent: 'center', alignItems: 'center'
  },
  headerText: { color: "#fff", fontWeight: '700', fontSize: 18 },
  offlineBtn: {
    backgroundColor: "#f97316", borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 8,
    alignSelf: 'flex-start', margin: 20
  },
  offlineText: { color: "#fff", fontWeight: "700" },
  stopsCard: {
    flex: 1, margin: 20, borderRadius: 16, padding: 20, elevation: 2
  },
  stopBlock: { marginBottom: 15 },
  stopName: { fontWeight: "600", marginBottom: 4 },
  routeText: { color: "#444" },
  emptyText: { color: "#888", textAlign: "center", marginTop: 20 },
  updatedText: { color: "#f97316", textAlign: "center", marginTop: 10 }
});