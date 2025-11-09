import React, { useState } from 'react';
import './Product.css';

function Product({ id, name, price, categoriaID, onDelete, onEdit }) {
  const [editable, setEditable] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(name);
  const [nuevoPrecio, setNuevoPrecio] = useState(price);

  const precio = parseFloat(nuevoPrecio);

  const guardarCambios = () => {
    onEdit(id, { nombre: nuevoNombre, precio: parseFloat(nuevoPrecio) });
    setEditable(false);
  };

  return (
    <li className="product-item">
      {editable ? (
        <>
          <input
            type="text"
            value={nuevoNombre}
            onChange={e => setNuevoNombre(e.target.value)}
          />
          <input
            type="number"
            value={nuevoPrecio}
            onChange={e => setNuevoPrecio(e.target.value)}
          />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditable(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span className="product-name">{nuevoNombre}</span>
          <span className="product-price">
            {!isNaN(precio) ? precio.toFixed(2) : "0.00"} €
          </span>
          <button onClick={() => setEditable(true)}>Modificar</button>
          <button onClick={() => onDelete(id)}>Borrar</button>
        </>
      )}
    </li>
  );
}

export default Product;


