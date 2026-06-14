import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { globalStyles, COLORS } from '../theme/styles';
import { PARQUES_DATABASE } from '../data/parques';

export default function MapaScreen({ navigation }) {
  // Posição inicial no centro do Brasil
  const initialRegion = {
    latitude: -14.2350,
    longitude: -51.9253,
    latitudeDelta: 25.0,
    longitudeDelta: 25.0,
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={initialRegion}
        userInterfaceStyle="dark"
      >
        {PARQUES_DATABASE.map(park => (
          <Marker
            key={park.id}
            coordinate={{ latitude: park.latitude, longitude: park.longitude }}
            pinColor={COLORS.neonGreen}
          >
            <Callout tooltip onPress={() => navigation.navigate('Detalhes', { parkData: park })}>
              <View style={[globalStyles.glassCard, styles.calloutBox]}>
                <Text style={styles.calloutTitle}>{park.nome}</Text>
                <Text style={styles.calloutText}>📍 Toque para explorar</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* Top Header Flutuante */}
      <View style={styles.floatingHeader}>
        <Text style={[globalStyles.title, { marginBottom: 0 }]}>Mapa de Parques</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  floatingHeader: {
    position: 'absolute', top: 40, left: 20, right: 20,
    backgroundColor: 'rgba(5, 8, 12, 0.85)',
    padding: 15, borderRadius: 15,
    borderWidth: 1, borderColor: COLORS.borderGlass,
  },
  calloutBox: {
    width: 220, padding: 12, backgroundColor: 'rgba(5, 8, 12, 0.95)'
  },
  calloutTitle: { color: COLORS.neonGreen, fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
  calloutText: { color: '#ffffff', fontSize: 12 }
});