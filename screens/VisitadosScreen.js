// screens/VisitadosScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '../theme/styles';
import { FavoritesContext } from '../context/FavoritesContext';
import ParqueCard from '../components/ParqueCard';

export default function VisitadosScreen({ navigation }) {
  const { visitedParks } = useContext(FavoritesContext);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Meus Parques Visitados</Text>
      <Text style={[globalStyles.textMuted, { marginBottom: 15 }]}>
        Sua coleção pessoal de conquistas em áreas de preservação nacional.
      </Text>

      <FlatList
        data={visitedParks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ParqueCard
            parque={item}
            isVisited={true}
            onPress={() => navigation.navigate('Detalhes', { parkData: item })}
          />
        )}
        ListEmptyComponent={
          <View style={globalStyles.glassCard}>
            <Text style={[globalStyles.textRegular, { textAlign: 'center' }]}>
              Você ainda não marcou nenhum parque visitado. Comece a explorar suas trilhas!
            </Text>
          </View>
        }
      />
    </View>
  );
}