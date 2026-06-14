// screens/MinhasFotosScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert, StyleSheet, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles, COLORS } from '../theme/styles';
import { AuthContext } from '../context/AuthContext';

export default function MinhasFotosScreen() {
  const { signed, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [photos, setPhotos] = useState([]);

  // --- Estados do Modal de Edição (PUT) ---
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [fotoEditandoId, setFotoEditandoId] = useState(null);
  const [novaLegenda, setNovaLegenda] = useState('');

  // --- Estados do Modal de Exclusão (DELETE) ---
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [fotoDeletandoId, setFotoDeletandoId] = useState(null);

  // Fluxo de Autenticação
  const handleLogin = () => {
    if(!login(username, '1234')) {
      Alert.alert('Erro', 'Por favor insira um usuário válido.');
    }
  };

  // --- Operação POST ---
  const handlePostPhoto = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      Alert.alert('Permissão', 'Acesso à câmera é obrigatório para registrar as paisagens.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const novaFoto = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        legenda: 'Nova foto do parque'
      };

      // Simulação da Requisição POST
      console.log('REQUEST: POST /api/v1/photos -> Body:', novaFoto);
      setPhotos(current => [novaFoto, ...current]);
    }
  };

  // --- Operação PUT (Abrir Modal e Salvar) ---
  const abrirModalEdicao = (foto) => {
    setFotoEditandoId(foto.id);
    setNovaLegenda(foto.legenda);
    setModalEditVisible(true);
  };

  const confirmarEdicao = () => {
    if (fotoEditandoId) {
      console.log(`REQUEST: PUT /api/v1/photos/${fotoEditandoId} -> Data:`, { legenda: novaLegenda });
      setPhotos(current => 
        current.map(img => img.id === fotoEditandoId ? { ...img, legenda: novaLegenda } : img)
      );
      setModalEditVisible(false);
      setFotoEditandoId(null);
    }
  };

  // --- Operação DELETE (Abrir Modal e Apagar) ---
  const abrirModalDelete = (id) => {
    setFotoDeletandoId(id);
    setModalDeleteVisible(true);
  };

  const confirmarDelete = () => {
    if (fotoDeletandoId) {
      console.log(`REQUEST: DELETE /api/v1/photos/${fotoDeletandoId}`);
      setPhotos(current => current.filter(img => img.id !== fotoDeletandoId));
      setModalDeleteVisible(false);
      setFotoDeletandoId(null);
    }
  };

  // Tela de Bloqueio se não estiver logado
  if (!signed) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center' }]}>
        <View style={globalStyles.glassCard}>
          <Text style={[globalStyles.title, { textAlign: 'center' }]}>Galeria Restrita</Text>
          <Text style={[globalStyles.textRegular, { textAlign: 'center', marginBottom: 20, color: COLORS.textMuted }]}>
            Autentique-se para interagir com o gerenciamento de fotos.
          </Text>

          <TextInput
            style={globalStyles.input}
            placeholder="Nome de Usuário"
            placeholderTextColor={COLORS.textMuted}
            value={username}
            onChangeText={setUsername}
          />
          
          <TouchableOpacity style={globalStyles.buttonNeon} onPress={handleLogin}>
            <Text style={globalStyles.buttonNeonText}>Desbloquear com Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Renderização principal da Galeria
  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={globalStyles.title}>Minhas Fotos</Text>
        <TouchableOpacity onPress={logout} style={{ padding: 10 }}>
          <Text style={{ color: COLORS.dangerNeon, fontWeight: 'bold' }}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={globalStyles.buttonNeon} onPress={handlePostPhoto}>
        <Text style={globalStyles.buttonNeonText}>📸 Capturar Paisagem (POST)</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={[globalStyles.glassCard, styles.photoCard]}>
            <Image source={{ uri: item.uri }} style={styles.imageBox} />
            <Text style={styles.legendaText} numberOfLines={1}>{item.legenda}</Text>
            
            <View style={styles.actionRow}>
              {/* Botão de Editar */}
              <TouchableOpacity onPress={() => abrirModalEdicao(item)} style={styles.actionButton}>
                <Text style={styles.btnEditText}>Editar</Text>
              </TouchableOpacity>
              
              {/* Botão de Excluir */}
              <TouchableOpacity onPress={() => abrirModalDelete(item.id)} style={styles.actionButton}>
                <Text style={styles.btnDeleteText}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[globalStyles.textMuted, { textAlign: 'center', marginTop: 40 }]}>
            Nenhuma foto registrada. Use a câmera acima!
          </Text>
        }
      />

      {/* --- MODAL DE EDIÇÃO (PUT) --- */}
      <Modal visible={modalEditVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[globalStyles.glassCard, styles.modalContent]}>
            <Text style={[globalStyles.title, { fontSize: 20 }]}>Editar Legenda</Text>
            
            <TextInput
              style={globalStyles.input}
              value={novaLegenda}
              onChangeText={setNovaLegenda}
              placeholder="Digite a nova legenda..."
              placeholderTextColor={COLORS.textMuted}
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalEditVisible(false)} style={styles.modalButton}>
                <Text style={{ color: COLORS.textMuted, fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarEdicao} style={styles.modalButton}>
                <Text style={{ color: COLORS.neonGreen, fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL DE EXCLUSÃO (DELETE) --- */}
      <Modal visible={modalDeleteVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[globalStyles.glassCard, styles.modalContent, { borderColor: 'rgba(255, 51, 102, 0.4)' }]}>
            <Text style={[globalStyles.title, { fontSize: 20, color: COLORS.dangerNeon }]}>Atenção!</Text>
            
            <Text style={[globalStyles.textRegular, { marginBottom: 20 }]}>
              Tem certeza que deseja apagar esta foto permanentemente?
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalDeleteVisible(false)} style={styles.modalButton}>
                <Text style={{ color: COLORS.textMuted, fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarDelete} style={styles.modalButton}>
                <Text style={{ color: COLORS.dangerNeon, fontWeight: 'bold', fontSize: 16 }}>Sim, Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  photoCard: {
    flex: 0.5,
    margin: 5,
    padding: 8,
    alignItems: 'center',
  },
  imageBox: {
    width: '100%',
    height: 110,
    borderRadius: 12,
  },
  legendaText: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12, 
  },
  btnEditText: {
    color: COLORS.neonGreen,
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnDeleteText: {
    color: COLORS.dangerNeon,
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    padding: 25,
    backgroundColor: 'rgba(10, 18, 14, 0.95)',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  }
});