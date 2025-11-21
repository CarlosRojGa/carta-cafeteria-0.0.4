import { TextInput, StyleSheet } from "react-native";

export default function CategoriaEscritura({ name, nuevaCategoria, setNuevaCategoria }) {
  
  function onNuevaCategoria(text) {
    setNuevaCategoria(text);
  }

  return (
    <TextInput
      style={styles.input}
      value={nuevaCategoria}
      placeholder="Escribe la categoría..."
      onChangeText={onNuevaCategoria}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 4,
    padding: 8,
    marginVertical: 6,
    width: "80%",
    alignSelf: "center",
  },
});