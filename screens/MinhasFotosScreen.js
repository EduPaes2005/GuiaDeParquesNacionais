// screens/MinhasFotosScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Trash2, Edit3, Image as ImageIcon, Lock } from 'lucide-react-native';
import { globalStyles, COLORS } from '../theme/styles';
import { AuthContext } from '../context/AuthContext';

export default function MinhasFotosScreen() {
  const { signed, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [photos, setPhotos] = useState([]);

  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [fotoEditandoId, setFotoEditandoId] = useState(null);
  const [novaLegenda, setNovaLegenda] = useState('');

  const handleLogin = () => {
    if(!login(username, '1234')) {
      Alert.alert('Acesso Negado', 'Insira um usuário válido para acessar a câmera.');
    }
  };

  const handlePostPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para registrar a paisagem.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const novaFoto = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        legenda: 'Registro da Trilha'
      };
      setPhotos(current => [novaFoto, ...current]);
    }
  };

  const confirmarEdicao = () => {
    if (fotoEditandoId) {
      setPhotos(current => 
        current.map(img => img.id === fotoEditandoId ? { ...img, legenda: novaLegenda } : img)
      );
      setModalEditVisible(false);
      setFotoEditandoId(null);
    }
  };

  const handleDeletePhoto = (id) => {
    setPhotos(current => current.filter(img => img.id !== id));
  };

  // TELA DE AUTENTICAÇÃO (AuthSim do Repositório Web)
  if (!signed) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center' }]}>
        <View style={globalStyles.card}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={styles.iconCircle}>
              <Lock size={32} color={COLORS.emerald500} />
            </View>
            <Text style={[globalStyles.title, { marginTop: 15, marginBottom: 5 }]}>Acesso Restrito</Text>
            <Text style={[globalStyles.textRegular, { textAlign: 'center' }]}>
              Faça login para acessar a câmera e salvar suas recordações dos parques.
            </Text>
          </View>

          <TextInput
            style={globalStyles.input}
            placeholder="Seu nome de aventureiro..."
            placeholderTextColor={COLORS.textMuted}
            value={username}
            onChangeText={setUsername}
          />
          
          <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleLogin}>
            <Text style={globalStyles.buttonPrimaryText}>Entrar na Galeria</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // TELA DA CÂMERA E GALERIA (CameraSim do Repositório Web)
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>Câmera & Diário</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Simulador do Viewfinder da Câmera */}
      <View style={styles.cameraViewfinder}>
        <Camera size={48} color={COLORS.textMuted} style={{ marginBottom: 10 }} />
        <Text style={globalStyles.textRegular}>Visor da Câmera Pronto</Text>
        <TouchableOpacity style={[globalStyles.buttonPrimary, { marginTop: 20, paddingHorizontal: 30 }]} onPress={handlePostPhoto}>
          <Camera size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={globalStyles.buttonPrimaryText}>Capturar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.galleryHeader}>
        <ImageIcon size={20} color={COLORS.emerald500} />
        <Text style={styles.galleryTitle}>Meus Registros</Text>
      </View>

      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.photoCard}>
            <Image source={{ uri: item.uri }} style={styles.imageBox} />
            <View style={styles.photoInfo}>
              <Text style={styles.legendaText} numberOfLines={1}>{item.legenda}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  onPress={() => {
                    setFotoEditandoId(item.id);
                    setNovaLegenda(item.legenda);
                    setModalEditVisible(true);
                  }} 
                  style={styles.actionBtn}
                >
                  <Edit3 size={16} color={COLORS.emerald500} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePhoto(item.id)} style={styles.actionBtn}>
                  <Trash2 size={16} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[globalStyles.textRegular, { textAlign: 'center', marginTop: 20 }]}>
            Nenhuma foto registrada ainda.
          </Text>
        }
      />

      {/* Modal de Edição (Estilo Tailwind) */}
      <Modal visible={modalEditVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={globalStyles.card}>
            <Text style={[globalStyles.title, { fontSize: 20 }]}>Editar Legenda</Text>
            <TextInput
              style={globalStyles.input}
              value={novaLegenda}
              onChangeText={setNovaLegenda}
              placeholder="Nova legenda..."
              placeholderTextColor={COLORS.textMuted}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalEditVisible(false)} style={[globalStyles.buttonPrimary, { backgroundColor: COLORS.darkBorder, flex: 1, marginRight: 10 }]}>
                <Text style={globalStyles.buttonPrimaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarEdicao} style={[globalStyles.buttonPrimary, { flex: 1 }]}>
                <Text style={globalStyles.buttonPrimaryText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  logoutBtn: { backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  logoutText: { color: COLORS.danger, fontWeight: 'bold' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.emerald900, justifyContent: 'center', alignItems: 'center' },
  cameraViewfinder: { backgroundColor: '#000', borderRadius: 16, height: 200, justifyContent: 'center', alignItems: 'center', marginBottom: 25, borderWidth: 1, borderColor: COLORS.darkBorder },
  galleryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  galleryTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight, marginLeft: 8 },
  photoCard: { flex: 0.5, backgroundColor: COLORS.darkCard, margin: 5, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.darkBorder },
  imageBox: { width: '100%', height: 120 },
  photoInfo: { padding: 10 },
  legendaText: { color: COLORS.textLight, fontSize: 14, fontWeight: '500', marginBottom: 8 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  actionBtn: { padding: 6, marginLeft: 10, backgroundColor: COLORS.darkBg, borderRadius: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', padding: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});