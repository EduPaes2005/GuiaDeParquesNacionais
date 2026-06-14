// theme/styles.js
import { StyleSheet, Dimensions } from 'react-native';

export const COLORS = {
  background: '#070a0e',
  surfaceGlass: 'rgba(12, 22, 16, 0.45)',
  borderGlass: 'rgba(57, 255, 20, 0.25)',
  neonGreen: '#39FF14',
  neonDark: '#149414',
  textPrincipal: '#ffffff',
  textMuted: '#8a99ad',
  dangerNeon: '#ff3366',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.neonGreen,
    textShadowColor: 'rgba(57, 255, 20, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  // Fusão de Glassmorphism (transparência/blur) e Neumorphism (brilho interno simulado e sombra externa)
  glassCard: {
    backgroundColor: COLORS.surfaceGlass,
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.borderGlass,
    shadowColor: COLORS.neonGreen,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: COLORS.textPrincipal,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(57, 255, 20, 0.15)',
    fontSize: 16,
    marginBottom: 15,
  },
  buttonNeon: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.neonGreen,
    shadowColor: COLORS.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  buttonNeonText: {
    color: COLORS.textPrincipal,
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: COLORS.neonGreen,
    textShadowRadius: 5,
  },
  textRegular: {
    color: COLORS.textPrincipal,
    fontSize: 15,
    lineHeight: 22,
  },
  textMuted: {
    color: COLORS.textMuted,
    fontSize: 13,
  }
});