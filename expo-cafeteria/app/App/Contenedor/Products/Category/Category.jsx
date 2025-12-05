import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import Product from "./Product/Product";
import EntradaProducto from "../../EntradaProducto/EntradaProducto";
import CategoriaLectura from "./CategoriaLectura";
import CategoriaEscritura from "./CategoriaEscritura";
import * as ImagePicker from "expo-image-picker";

export default function Category({
  name,
  id,
  estadoCategorias,
  setCategorias,
  productosPorCategoria,
  setProductosPorCategoria,
}) {
  const [editable, setEditable] = useState(false);
  const [nombreBotonModificar, setNombreBotonModificar] = useState("Modificar");
  const [nuevaCategoria, setNuevaCategoria] = useState(name);
  const [mostrarEntradaProducto, setMostrarEntradaProducto] = useState(false);
  const [recargarProductos, setRecargarProductos] = useState(false);
  const [imagenCategoria, setImagenCategoria] = useState(null);

  async function modificarCategoria() {
    const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
    if (editable) {
      const res = await fetch(API_URL + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: 7110, nombre: nuevaCategoria }),
      });
      if (!res.ok) throw new Error("Error al modificar la categoría");

      const categoriasCopia = [...estadoCategorias];
      const categoria = categoriasCopia.find((cat) => cat.id === id);
      if (categoria) categoria.nombre = nuevaCategoria;
      setCategorias(categoriasCopia);
      setNombreBotonModificar("Modificar");
    } else {
      setNombreBotonModificar("Guardar");
    }
    setEditable(!editable);
  }

  async function borrarCategoria() {
    const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
    const res = await fetch(API_URL + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: "7110" }),
    });
    const data = await res.json();
    if (data.status === "error") {
      alert(data.message);
    } else {
      const categoriasCopia = estadoCategorias.filter((cat) => cat.id !== id);
      setCategorias(categoriasCopia);

      setProductosPorCategoria((prev) => {
        const copia = { ...prev };
        delete copia[String(id)];
        return copia;
      });
    }
  }

  async function EliminarProducto(productId) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${productId}`;
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: "7110" }),
    });
    const data = await res.json();

    if (data.status === "error") {
      alert(data.message);
    } else {
      setProductosPorCategoria((prev) => {
        const copia = { ...prev };
        if (Array.isArray(copia[String(id)])) {
          copia[String(id)] = copia[String(id)].filter((p) => p.id !== productId);
        }
        return copia;
      });
    }
  }

  async function ModificarProducto(productId, { nombre, precio }) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${productId}`;
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: 7110, nombre, precio }),
    });

    if (!res.ok) {
      alert("Error al modificar el producto");
      return;
    }

    setProductosPorCategoria((prev) => {
      const copia = { ...prev };
      if (Array.isArray(copia[String(id)])) {
        copia[String(id)] = copia[String(id)].map((p) =>
          p.id === productId ? { ...p, nombre, precio } : p
        );
      }
      return copia;
    });
  }

  function toggleEntradaProducto() {
    setMostrarEntradaProducto(!mostrarEntradaProducto);
  }

  async function seleccionarImagenCategoria() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImagenCategoria(uri);
      setCategorias(prev =>
        prev.map(cat => (cat.id === id ? { ...cat, imagen: uri } : cat))
      );
    }
  }

  async function quitarImagenCategoria() {
    setImagenCategoria(null);

    setCategorias(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, imagen: null } : cat))
    );
  }

  useEffect(() => {
    fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${id}?usuario_id=7110`)
      .then((res) => res.json())
      .then((data) => {
        setProductosPorCategoria((prev) => ({
          ...prev,
          [String(id)]: data.data || [],
        }));
      })
      .catch((err) => console.error("Error recargando productos:", err));
  }, [recargarProductos]);

  const listaProductos = productosPorCategoria?.[String(id)] || [];

  const content = editable ? (
    <CategoriaEscritura
      name={name}
      nuevaCategoria={nuevaCategoria}
      setNuevaCategoria={setNuevaCategoria}
    />
  ) : (
    <CategoriaLectura name={name} />
  );

  return (
    <View style={styles.container}>
      {imagenCategoria && (
        <Image
          source={{ uri: imagenCategoria }}
          style={styles.imagenCategoria}
        />
      )}
      {content}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={borrarCategoria}>
          <Text style={styles.buttonText}>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={modificarCategoria}>
          <Text style={styles.buttonText}>{nombreBotonModificar}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleEntradaProducto}>
          <Text style={styles.buttonText}>
            {mostrarEntradaProducto ? "Cancelar" : "Añadir producto"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={seleccionarImagenCategoria}>
          <Text style={styles.buttonText}>
            {imagenCategoria ? "Cambiar imagen" : "Seleccionar imagen"}
          </Text>
        </TouchableOpacity>
        {imagenCategoria && (
          <TouchableOpacity style={styles.button} onPress={quitarImagenCategoria}>
            <Text style={styles.buttonText}>Quitar imagen</Text>
          </TouchableOpacity>
        )}
      </View>
      {mostrarEntradaProducto && (
        <EntradaProducto
          categoriaId={id}
          productosPorCategoria={productosPorCategoria}
          setProductosPorCategoria={setProductosPorCategoria}
          setRecargarProductos={setRecargarProductos}
        />
      )}

      <FlatList
        data={listaProductos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            key={item.id}
            name={item.nombre}
            price={parseFloat(item.precio)}
            id={item.id}
            categoriaID={id}
            onDelete={EliminarProducto}
            onEdit={ModificarProducto}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "burlywood",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 4,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  imagenCategoria: {
    width: 100,
    height: 100,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 8,
    resizeMode: "cover",
  },
});





