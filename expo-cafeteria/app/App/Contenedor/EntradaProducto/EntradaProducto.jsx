import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function EntradaProducto({
  categoriaId,
  setProductosPorCategoria,
  setRecargarProductos
}) {
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "" });

  async function incluirProducto() {
    if (!categoriaId) {
      console.error("Error: categoriaId no está definido");
      return;
    }

    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${categoriaId}`;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: "7110",
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio)
      })
    });

    if (!res.ok) throw new Error("Error al añadir producto en el servidor");

    await res.json();

    setRecargarProductos(prev => !prev);
    setNuevoProducto({ nombre: "", precio: "" });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto..."
        value={nuevoProducto.nombre}
        onChangeText={text => setNuevoProducto({ ...nuevoProducto, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio..."
        keyboardType="numeric"
        value={nuevoProducto.precio}
        onChangeText={text => setNuevoProducto({ ...nuevoProducto, precio: text })}
      />
      <TouchableOpacity style={styles.button} onPress={incluirProducto}>
        <Text style={styles.buttonText}>Añadir producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 4,
    padding: 8,
    marginVertical: 6,
  },
  button: {
    backgroundColor: "burlywood",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});








