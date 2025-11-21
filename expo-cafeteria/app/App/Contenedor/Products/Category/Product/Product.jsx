import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

function Product({ id, name, price, categoriaID, onDelete, onEdit }) {
  const [editable, setEditable] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(name);
  const [nuevoPrecio, setNuevoPrecio] = useState(String(price));

  const precio = parseFloat(nuevoPrecio);

  const guardarCambios = () => {
    onEdit(id, { nombre: nuevoNombre, precio: parseFloat(nuevoPrecio) });
    setEditable(false);
  };

  return (
    <View style={styles.productItem}>
      {editable ? (
        <>
          <TextInput
            style={styles.input}
            value={nuevoNombre}
            onChangeText={text => setNuevoNombre(text)}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={nuevoPrecio}
            onChangeText={text => setNuevoPrecio(text)}
            placeholder="Precio"
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={guardarCambios}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setEditable(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.row}>
          <Text style={styles.productName}>{nuevoNombre}</Text>
          <Text style={styles.productPrice}>
            {!isNaN(precio) ? precio.toFixed(2) : "0.00"} €
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => setEditable(true)}>
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onDelete(id)}>
              <Text style={styles.buttonText}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 4,
    padding: 6,
    marginVertical: 4,
    width: "80%",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    backgroundColor: "burlywood",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Product;



