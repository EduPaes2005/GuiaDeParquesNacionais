// screens/MapaScreen.web.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, COLORS } from '../theme/styles';
import { Ionicons } from '@expo/vector-icons';

export default function MapaScreenWeb() {
  return (
    <View style={[globalStyles.container, styles.center]}>
      <Ionicons name="map-outline" size={80} color={COLORS.neonGreen} />
      <Text style={[globalStyles.title, { textAlign: 'center', marginTop: 20 }]}>
        Mapa Indisponível na Web
      </Text>
      <Text style={[globalStyles.textRegular, { textAlign: 'center' }]}>
        A biblioteca de mapas nativa exige um celular para funcionar. 
        Por favor, abra este aplicativo no Expo Go (Android/iOS) ou emulador para interagir com o mapa.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  }
});