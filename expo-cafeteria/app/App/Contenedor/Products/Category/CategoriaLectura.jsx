import { Text, StyleSheet } from "react-native";

export default function CategoriaLectura({ name }) {
  return <Text style={styles.categoryName}>{name}</Text>;
}

const styles = StyleSheet.create({
  categoryName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 4,
  },
});
