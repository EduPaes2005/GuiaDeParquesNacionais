// screens/DetalhesScreen.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { globalStyles, COLORS } from '../theme/styles';
import { FavoritesContext } from '../context/FavoritesContext';
import { ArrowLeft, MapPin, Scale, Footprints, ShieldAlert, Check, CheckCircle2 } from 'lucide-react-native';

export default function DetalhesScreen({ route, navigation }) {
  const { parkData } = route.params;
  const { toggleVisited, isVisited } = useContext(FavoritesContext);
  const checked = isVisited(parkData.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }} bounces={false}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: parkData.image }} style={{ width: '100%', height: '100%' }} />
        <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[globalStyles.title, { width: '80%' }]}>{parkData.name}</Text>
          {checked && <CheckCircle2 size={30} color={COLORS.neonGreen} />}
        </View>

        {/* Informações Básicas (Chips) */}
        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <MapPin size={16} color={COLORS.neonGreen} />
            <Text style={styles.chipText}>{parkData.location}</Text>
          </View>
          <View style={styles.chip}>
            <Scale size={16} color={COLORS.neonGreen} />
            <Text style={styles.chipText}>Dificuldade {parkData.difficulty}</Text>
          </View>
        </View>
        
        <Text style={[globalStyles.textRegular, { marginBottom: 25, lineHeight: 24 }]}>
          {parkData.description}
        </Text>

        {/* Lista de Atrações */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Footprints size={22} color={COLORS.neonGreen} />
            <Text style={styles.sectionTitle}>Atrações e Atividades</Text>
          </View>
          {parkData.attractions.map((attr, index) => (
            <View key={index} style={styles.listItem}>
              <Check size={16} color={COLORS.neonGreen} style={{ marginTop: 2 }} />
              <Text style={styles.listText}>{attr}</Text>
            </View>
          ))}
        </View>

        {/* Lista de Regras */}
        <View style={[styles.sectionBox, { borderColor: 'rgba(255, 51, 102, 0.3)', backgroundColor: 'rgba(255, 51, 102, 0.05)' }]}>
          <View style={styles.sectionHeader}>
            <ShieldAlert size={22} color={COLORS.dangerNeon} />
            <Text style={[styles.sectionTitle, { color: COLORS.dangerNeon }]}>Regras de Preservação</Text>
          </View>
          {parkData.rules.map((rule, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.listText}>{rule}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[globalStyles.buttonNeon, checked && styles.buttonChecked]} 
          onPress={() => toggleVisited(parkData)}
        >
          <Text style={[globalStyles.buttonNeonText, checked && { color: '#22aa22' }]}>
            {checked ? 'Desmarcar Visita' : 'Marcar como Visitado'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: { width: '100%', height: 350, position: 'relative' },
  floatingBackBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  contentContainer: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: COLORS.background },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(57, 255, 20, 0.08)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(57, 255, 20, 0.2)' },
  chipText: { color: COLORS.neonGreen, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  sectionBox: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 16, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginLeft: 10 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  listText: { color: '#dddddd', fontSize: 15, marginLeft: 8, flex: 1, lineHeight: 22 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.dangerNeon, marginTop: 8 },
  buttonChecked: { borderColor: '#22aa22', backgroundColor: 'transparent' }
});