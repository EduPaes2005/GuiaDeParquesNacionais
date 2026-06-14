// theme/styles.js
import { StyleSheet } from 'react-native';

// Paleta exata do Tailwind usada no EcoParques
export const COLORS = {
  emerald500: '#10b981', // Verde principal
  emerald600: '#059669', // Verde escuro (hover)
  emerald100: '#d1fae5', // Verde claro (fundo de ícones light)
  emerald900: 'rgba(16, 185, 129, 0.1)', // Verde transparente (fundo de ícones dark)
  
  darkBg: '#111827',     // Fundo principal escuro
  darkCard: '#1f2937',   // Fundo de cards escuro
  darkBorder: '#374151', // Bordas no dark mode
  
  textLight: '#f9fafb',  // Texto branco/claro
  textMuted: '#9ca3af',  // Texto cinza
  
  danger: '#ef4444',     // Vermelho para exclusão/regras
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.darkCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.darkBorder,
  },
  input: {
    backgroundColor: COLORS.darkBg,
    color: COLORS.textLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.darkBorder,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonPrimary: {
    backgroundColor: COLORS.emerald500,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimaryText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textRegular: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  }
});