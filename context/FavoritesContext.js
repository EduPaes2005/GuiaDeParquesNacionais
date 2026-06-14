// context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext({});

export const FavoritesProvider = ({ children }) => {
  const [visitedParks, setVisitedParks] = useState([]);

  useEffect(() => {
    loadVisitedParks();
  }, []);

  const loadVisitedParks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@GuiaParques:visited');
      if (stored) {
        setVisitedParks(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Erro ao carregar dados locais:', error);
    }
  };

  const toggleVisited = async (park) => {
    try {
      let updatedList = [...visitedParks];
      const index = updatedList.findIndex(p => p.id === park.id);

      if (index >= 0) {
        updatedList.splice(index, 1);
      } else {
        updatedList.push(park);
      }

      setVisitedParks(updatedList);
      await AsyncStorage.setItem('@GuiaParques:visited', JSON.stringify(updatedList));
    } catch (error) {
      console.log('Erro ao salvar dados locais:', error);
    }
  };

  const isVisited = (parkId) => {
    return visitedParks.some(p => p.id === parkId);
  };

  return (
    <FavoritesContext.Provider value={{ visitedParks, toggleVisited, isVisited }}>
      {children}
    </FavoritesContext.Provider>
  );
};