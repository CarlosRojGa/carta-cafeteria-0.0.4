import { useState } from 'react';
import './Contenedor.css';
import EntradaCategoria from './EntradaCategoria/EntradaCategoria';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Category from './Products/Category/Category';
import Spacer from './Spacer/Spacer';

function Contenedor({ categorias, setCategorias, productosPorCategoria, setProductosPorCategoria }) {
  return (
    <>
      <EntradaCategoria categorias={categorias} setCategorias={setCategorias} />
      <Header />
      <Spacer />
      <ul>
        {categorias.map(cat => (
          <Category
          key={cat.id}
          name={cat.nombre}
          id={cat.id}
          estadoCategorias={categorias}
          setCategorias={setCategorias}
          productosPorCategoria={productosPorCategoria}
          setProductosPorCategoria={setProductosPorCategoria}
          />

        ))}
      </ul>
      <Spacer />
      <Footer />
    </>
  );
}

export default Contenedor;


