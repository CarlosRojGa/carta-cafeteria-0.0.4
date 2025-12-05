import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapaBoton() {
  const [mostrarMapa, setMostrarMapa] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title={mostrarMapa ? "Ocultar Mapa" : "Mostrar Mapa"}
        onPress={() => setMostrarMapa(prev => !prev)}
      />

      {mostrarMapa && (
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: 28.128058,
            longitude: -15.446713,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: 28.128058, longitude: -15.446713 }}
            title="Camper Cafe"
            description="Aquí está el Camper Cafe"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  mapa: {
    width: '90%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
