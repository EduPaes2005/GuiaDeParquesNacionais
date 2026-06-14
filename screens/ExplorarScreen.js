// screens/ExplorarScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, COLORS } from '../theme/styles';
import ParqueCard from '../components/ParqueCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { PARQUES_DATABASE } from '../data/parques';

export default function ExplorarScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const { isVisited } = useContext(FavoritesContext);

  const filterOptions = ['Todos', 'Montanha', 'Floresta', 'Praia'];

  const filteredParks = PARQUES_DATABASE.filter(park => {
    const matchesSearch = park.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedType === 'Todos' || park.tipo === selectedType;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Explorar Parques</Text>
      
      <TextInput
        style={globalStyles.input}
        placeholder="Buscar por nome do parque..."
        placeholderTextColor={COLORS.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        {filterOptions.map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[
              styles.filterTab,
              selectedType === type && styles.filterTabActive
            ]}
          >
            <Text style={[
              styles.filterTabText,
              selectedType === type && styles.filterTabTextActive
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredParks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ParqueCard
            parque={item}
            isVisited={isVisited(item.id)}
            onPress={() => navigation.navigate('Detalhes', { parkData: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={[globalStyles.textMuted, { textAlign: 'center', marginTop: 30 }]}>
            Nenhum parque nacional localizado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterTabActive: {
    backgroundColor: 'rgba(57, 255, 20, 0.08)',
    borderColor: COLORS.neonGreen,
  },
  filterTabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: COLORS.neonGreen,
  }
});