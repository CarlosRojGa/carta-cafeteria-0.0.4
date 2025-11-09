import { useState } from "react";

export default function EntradaProducto({
  categoriaId,
  setProductosPorCategoria,
  setRecargarProductos
}) {
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "" });

  async function incluirProducto() {
    if (!categoriaId) {
      console.error("❌ Error: categoriaId no está definido");
      return;
    }

    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${categoriaId}`;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: "7110",
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio)
      })
    });

    if (!res.ok) throw new Error("Error al añadir producto en el servidor");

    await res.json();

    setRecargarProductos(prev => !prev);
    setNuevoProducto({ nombre: "", precio: "" });
  }

  return (
    <div className="entrada-producto">
      <input
        type="text"
        placeholder="Nombre del producto..."
        value={nuevoProducto.nombre}
        onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio..."
        value={nuevoProducto.precio}
        onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
      />
      <button onClick={incluirProducto}>Añadir producto</button>
    </div>
  );
}








