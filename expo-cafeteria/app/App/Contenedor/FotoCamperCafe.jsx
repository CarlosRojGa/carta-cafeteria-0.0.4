import React, { useState, useEffect, useRef } from 'react'; 
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';

export default function FotoCamperCafe() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [foto, setFoto] = useState(null);
  const [tipoCamara, setTipoCamara] = useState('back');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const abrirCerrarCamara = () => setCameraOpen(!cameraOpen);

  const tomarFoto = async () => {
    if (cameraRef.current) {
      try {
        const fotoTomada = await cameraRef.current.takePictureAsync();
        setFoto(fotoTomada.uri);
        setCameraOpen(false);
      } catch (error) {
        Alert.alert('Error', 'No se pudo tomar la foto');
      }
    }
  };

  const cambiarCamara = () => {
    setTipoCamara(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const quitarFoto = () => setFoto(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} onPress={abrirCerrarCamara}>
        <Text style={styles.textoBoton}>
          {cameraOpen ? 'Cerrar cámara' : 'Abrir cámara'}
        </Text>
      </TouchableOpacity>

      {cameraOpen && hasPermission && (
        <View style={styles.camContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camara}
            facing={tipoCamara}
          >
            <View style={styles.botonesFlotantes}>
              <TouchableOpacity style={styles.botonCamaraFlotante} onPress={tomarFoto}>
                <Text style={styles.textoBoton}>📸</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonCamaraFlotante} onPress={cambiarCamara}>
                <Text style={styles.textoBoton}>🔄</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
      {foto && (
        <View style={styles.fotoPreviewContainer}>
          <Image source={{ uri: foto }} style={styles.fotoPreview} />
          <TouchableOpacity style={styles.botonQuitar} onPress={quitarFoto}>
            <Text style={styles.textoBoton}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10
  },
  boton: { 
    backgroundColor: 'burlywood',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  textoBoton: { 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  camContainer: {
    width: 300,
    height: 400
  },
  camara: { 
    flex: 1,
    borderRadius: 10
  },
  botonesFlotantes: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botonCamaraFlotante: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 12,
    borderRadius: 50,
  },
  imagen: { 
    width: 300,
    height: 400,
    marginTop: 10,
    borderRadius: 10
  },

  fotoPreviewContainer: { 
    marginTop: 2,
    position: 'relative',
    alignItems: 'center'
  },
  fotoPreview: { 
    width: 80,
    height: 80,
    borderRadius: 8
  },
  botonQuitar: { 
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'tomato',
    borderRadius: 20,
    padding: 5
  },
});























