import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Compass, Map as MapIcon, Bookmark, Camera, Settings } from 'lucide-react-native';

import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

import ExplorarScreen from './screens/ExplorarScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import MapaScreen from './screens/MapaScreen';
import VisitadosScreen from './screens/VisitadosScreen';
import MinhasFotosScreen from './screens/MinhasFotosScreen';
import SettingsScreen from './screens/SettingsScreen';
import SparklesBackground from './components/Sparkles';
import { COLORS } from './theme/styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExplorarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExplorarLista" component={ExplorarScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

function MapaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapaView" component={MapaScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

// Sub-Componente para ler o estado do Tema e renderizar a Navigation
function AppRoutes() {
  const { isDarkMode } = useContext(ThemeContext);
  const bgColor = isDarkMode ? COLORS.background : '#1c2e22';

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar barStyle="light-content" backgroundColor={bgColor} />
      <SparklesBackground />
      
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Explorar') return <Compass size={size} color={color} />;
              if (route.name === 'Mapa') return <MapIcon size={size} color={color} />;
              if (route.name === 'Visitados') return <Bookmark size={size} color={color} />;
              if (route.name === 'Galeria') return <Camera size={size} color={color} />;
              if (route.name === 'Config') return <Settings size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.neonGreen,
            tabBarInactiveTintColor: '#6b8277',
            tabBarStyle: {
              backgroundColor: '#05080c',
              borderTopColor: COLORS.borderGlass,
              borderTopWidth: 1.5,
              elevation: 0, height: 60, paddingBottom: 5,
            },
            headerShown: false
          })}
        >
          <Tab.Screen name="Explorar" component={ExplorarStack} />
          <Tab.Screen name="Mapa" component={MapaStack} />
          <Tab.Screen name="Visitados" component={VisitadosScreen} />
          <Tab.Screen name="Galeria" component={MinhasFotosScreen} />
          <Tab.Screen name="Config" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}