import React from 'react';
import Product from './Category/Product/Product';
import EntradaProducto from '../EntradaProducto/EntradaProducto';
export default function ProductsCategory({ categoriaId, products, setProductosPorCategoria }) {
  return (
    <div className="products-category">
      <ul>
        {products.map(prod => (
          <Product
            key={prod.id}
            id={prod.id}
            name={prod.nombre || "Sin nombre"}
            price={prod.precio || 0}
            categoriaID={categoriaId}
            setProductosPorCategoria={setProductosPorCategoria}
          />
        ))}
      </ul>

      <EntradaProducto
        categoriaId={categoriaId}
        setProductosPorCategoria={setProductosPorCategoria}
      />
    </div>
  );
}



