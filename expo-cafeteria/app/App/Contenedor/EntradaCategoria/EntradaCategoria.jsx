import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function EntradaCategoria({ categorias, setCategorias }) {
  const [nuevaCategoria, setNuevaCategoria] = useState("");

async function incluirCategoria() {
  if (!nuevaCategoria.trim()) {
    alert("El nombre de la categoría no puede estar vacío");
    return;
  }

  const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: "7110",
      nombre: nuevaCategoria
    })
  });

  if (!res.ok) {
    throw new Error("Error al añadir categoría en el servidor");
  }

  const categoriaCreada = await res.json();

  let categoriasCopia = [...categorias];

  const categoria = {
    id: categoriaCreada.categoria_id,
    nombre: nuevaCategoria,
  };

  categoriasCopia.push(categoria);
  setCategorias(categoriasCopia);

  setNuevaCategoria("");
}


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Categoria..."
        value={nuevaCategoria}
        onChangeText={text => setNuevaCategoria(text)}
      />
      <TouchableOpacity style={styles.button} onPress={incluirCategoria}>
        <Text style={styles.buttonText}>Añadir categoría</Text>
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

