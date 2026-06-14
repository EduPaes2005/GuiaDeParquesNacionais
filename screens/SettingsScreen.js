import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { globalStyles, COLORS } from '../theme/styles';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { signed, user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Configurações</Text>
      
      <View style={globalStyles.glassCard}>
        <View style={styles.row}>
          <View style={styles.iconText}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={22} color={COLORS.neonGreen} />
            <Text style={[globalStyles.textRegular, { marginLeft: 10, fontWeight: 'bold' }]}>
              Modo Escuro (Dark Mode)
            </Text>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: COLORS.borderGlass }}
            thumbColor={isDarkMode ? COLORS.neonGreen : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={globalStyles.glassCard}>
        <View style={[styles.iconText, { marginBottom: 15 }]}>
          <Ionicons name="person-circle-outline" size={24} color={COLORS.neonGreen} />
          <Text style={[globalStyles.textRegular, { marginLeft: 10, fontWeight: 'bold' }]}>Perfil do Autenticado</Text>
        </View>
        
        {signed ? (
          <>
            <Text style={[globalStyles.textRegular, { marginBottom: 15 }]}>Usuário Ativo: {user?.name}</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={{ color: '#fff', marginLeft: 8, fontWeight: 'bold' }}>Desconectar (Sair)</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={globalStyles.textMuted}>Você está navegando como visitante. Acesse a aba Galeria para Login.</Text>
        )}
      </View>
      
      <View style={styles.footer}>
        <Ionicons name="leaf" size={18} color={COLORS.neonGreen} />
        <Text style={[globalStyles.textMuted, { marginLeft: 5 }]}>EcoParques Mobile v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconText: { flexDirection: 'row', alignItems: 'center' },
  logoutBtn: { backgroundColor: COLORS.dangerNeon, padding: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footer: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 30 }
});