import { useEffect, useState } from 'react';
import './App.css';
import Contenedor from './Contenedor/Contenedor';

function App() {
  const [menu, setMenu] = useState([]); // categorías
  const [productosPorCategoria, setProductosPorCategoria] = useState({}); // productos por categoría

  useEffect(() => {
    // Cargar categorías
    fetch('https://jlorenzo.ddns.net/carta_restaurante/categorias/?usuario_id=7110')
      .then(res => res.json())
      .then(data => {
        const categorias = data.data || [];
        setMenu(categorias);

        // Por cada categoría, cargar productos
        categorias.forEach(cat => {
          fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${cat.id}?usuario_id=7110`)
            .then(res => res.json())
            .then(dataProd => {
              // dataProd.data contiene el array de productos
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
    <div className="contenedor">
      <Contenedor
        categorias={menu}
        setCategorias={setMenu}
        productosPorCategoria={productosPorCategoria}
        setProductosPorCategoria={setProductosPorCategoria}
      />
    </div>
  );
}

export default App;




