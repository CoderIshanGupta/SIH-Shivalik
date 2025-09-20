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
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../components/BottomNav';

type RouteItem = {
  stop: string;
  routes: { id: string; eta: string }[];
};

const SixthScreen = () => {
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOfflineRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      // Dummy data until API connected
      const fakeData: RouteItem[] = [
        {
          stop: 'City Hospital Stop',
          routes: [
            { id: '5C', eta: '4 min' },
            { id: '9C', eta: '14 min' },
          ],
        },
        {
          stop: 'Railway Station Circle',
          routes: [
            { id: '8B', eta: '7 min' },
            { id: '21B', eta: '19 min' },
          ],
        },
        {
          stop: 'Market Square',
          routes: [
            { id: '10B', eta: '11 min' },
            { id: '15A', eta: '20 min' },
          ],
        },
      ];

      await AsyncStorage.setItem('offlineRoutes', JSON.stringify(fakeData));
      const now = new Date().toLocaleTimeString();
      await AsyncStorage.setItem('lastUpdated', now);

      setRoutes(fakeData);
      setLastUpdated(now);

      Alert.alert('Saved', 'Routes are updated for offline use.');
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch routes.');
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
      console.log('Error loading offline data', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top orange bar */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Offline Routes</Text>
      </View>

      {/* Offline button */}
      <TouchableOpacity style={styles.offlineBtn} onPress={fetchRoutes}>
        <Text style={styles.offlineText}>
          {loading ? 'Updating…' : 'Offline Mode'}
        </Text>
      </TouchableOpacity>

      {/* Connectivity card */}
      <View style={styles.connectivityCard}>
        <Text style={styles.connectivityTitle}>Limited Connectivity</Text>
        <Text style={styles.connectivitySub}>Delayed Updates</Text>
      </View>

      {/* Nearby Stops */}
      <View style={styles.stopsCard}>
        <Text style={styles.stopsTitle}>📍 Nearby Stops</Text>
        <FlatList
          data={routes}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.stopBlock}>
              <Text style={styles.stopName}>{item.stop}</Text>
              {item.routes.map((r, i) => (
                <Text key={i} style={styles.routeText}>
                  Route {r.id} → {r.eta}
                </Text>
              ))}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No offline data yet.</Text>
          }
        />
        {lastUpdated && (
          <View style={styles.updatedBadge}>
            <Text style={styles.updatedText}>Last updated: {lastUpdated}</Text>
          </View>
        )}
      </View>

      {/* ✅ Only ONE BottomNav here */}
    </View>
  );
};

export default SixthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    backgroundColor: '#d97706',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontWeight: '700', fontSize: 18 },

  offlineBtn: {
    backgroundColor: '#f97316',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    margin: 20,
  },
  offlineText: { color: '#fff', fontWeight: '700' },

  connectivityCard: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  connectivityTitle: { fontWeight: '700', fontSize: 16 },
  connectivitySub: { fontSize: 12, color: '#777', marginTop: 4 },

  stopsCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  stopsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  stopBlock: { marginBottom: 15 },
  stopName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  routeText: { fontSize: 13, color: '#444' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },

  updatedBadge: {
    marginTop: 10,
    backgroundColor: '#f97316',
    borderRadius: 16,
    padding: 8,
    alignSelf: 'center',
  },
  updatedText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
