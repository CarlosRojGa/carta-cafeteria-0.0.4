import { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Contenedor from './Contenedor/Contenedor';

function App() {
  const [menu, setMenu] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState({});

  useEffect(() => {
    fetch('https://jlorenzo.ddns.net/carta_restaurante/categorias/?usuario_id=7110')
      .then(res => res.json())
      .then(data => {
        const categorias = data.data || [];
        setMenu(categorias);

        categorias.forEach(cat => {
          fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${cat.id}?usuario_id=7110`)
            .then(res => res.json())
            .then(dataProd => {
              const productosArray = Array.isArray(dataProd.data) ? dataProd.data : [];
              setProductosPorCategoria(prev => ({
                ...prev,
                [String(cat.id)]: productosArray
              }));
            })
            .catch(err => console.error(`Error al cargar productos de categoría ${cat.id}:`, err));
        });
      })
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg' }}
      style={styles.background}
    >
      <View style={styles.contenedor}>
        <Contenedor
          categorias={menu}
          setCategorias={setMenu}
          productosPorCategoria={productosPorCategoria}
          setProductosPorCategoria={setProductosPorCategoria}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  contenedor: {
    width: '100%',
    height: '90%',
    backgroundColor: 'burlywood',
    alignSelf: 'center',
    marginTop: '5%',
  },
});

export default App;




