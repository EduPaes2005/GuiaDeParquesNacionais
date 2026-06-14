// components/ParqueCard.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { COLORS } from '../theme/styles';
import { CheckCircle2, TreePine, Mountain, Waves, MapPin } from 'lucide-react-native';

const typeIcons = {
  floresta: <TreePine size={12} color={COLORS.neonGreen} />,
  montanha: <Mountain size={12} color={COLORS.neonGreen} />,
  costa: <Waves size={12} color={COLORS.neonGreen} />,
  canyon: <MapPin size={12} color={COLORS.neonGreen} />
};

export default function ParqueCard({ parque, onPress, isVisited }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.9}>
      <ImageBackground source={{ uri: parque.image }} style={styles.imageBg} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.gradientOverlay}>
          <View style={styles.headerRow}>
            <Text style={styles.parkName} numberOfLines={2}>{parque.name}</Text>
            {isVisited && <CheckCircle2 size={24} color={COLORS.neonGreen} strokeWidth={2.5} />}
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <MapPin size={14} color="#aaaaaa" />
            <Text style={styles.locationText}>{parque.location}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              {typeIcons[parque.type]}
              <Text style={styles.badgeText}>{parque.type}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }]}>
              <Text style={[styles.badgeText, { color: '#fff' }]}>{parque.difficulty}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 220, marginBottom: 18, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden', backgroundColor: '#000',
  },
  imageBg: { flex: 1, justifyContent: 'flex-end' },
  gradientOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Efeito do gradient da web
    padding: 16,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  parkName: { fontSize: 18, fontWeight: '700', color: '#ffffff', flex: 1 },
  locationText: { color: '#aaaaaa', fontSize: 13, marginLeft: 6 },
  badgeRow: { flexDirection: 'row', marginTop: 12 },
  badge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(57, 255, 20, 0.1)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8,
    borderWidth: 1, borderColor: 'rgba(57, 255, 20, 0.3)',
  },
  badgeText: { color: COLORS.neonGreen, fontSize: 11, fontWeight: '600', textTransform: 'capitalize', marginLeft: 4 },
});