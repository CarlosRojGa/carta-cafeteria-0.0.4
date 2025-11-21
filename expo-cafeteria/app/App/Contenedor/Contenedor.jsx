import { View, FlatList, StyleSheet } from 'react-native';
import EntradaCategoria from './EntradaCategoria/EntradaCategoria';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Category from './Products/Category/Category';
import Spacer from './Spacer/Spacer';

function Contenedor({ categorias, setCategorias, productosPorCategoria, setProductosPorCategoria }) {
  return (
    <View style={styles.container}>
      <EntradaCategoria categorias={categorias} setCategorias={setCategorias} />
      <Header />
      <Spacer />

      <FlatList
        data={categorias}
        keyExtractor={(cat) => cat.id.toString()}
        renderItem={({ item }) => (
          <Category
            key={item.id}
            name={item.nombre}
            id={item.id}
            estadoCategorias={categorias}
            setCategorias={setCategorias}
            productosPorCategoria={productosPorCategoria}
            setProductosPorCategoria={setProductosPorCategoria}
          />
        )}
        ListFooterComponent={<Spacer />}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Contenedor;




