import { useState, useEffect } from 'react';
import Product from './Product/Product';
import EntradaProducto from '../../EntradaProducto/EntradaProducto';
import './Category.css';
import CategoriaLectura from './CategoriaLectura';
import CategoriaEscritura from './CategoriaEscritura';

function Category({ name, id, estadoCategorias, setCategorias, productosPorCategoria, setProductosPorCategoria }) {
    const [editable, setEditable] = useState(false);
    const [nombreBotonModificar, setNombreBotonModificar] = useState("Modificar");
    const [nuevaCategoria, setNuevaCategoria] = useState(name);
    const [mostrarEntradaProducto, setMostrarEntradaProducto] = useState(false);
    const [recargarProductos, setRecargarProductos] = useState(false);

    async function modificarCategoria() {
        const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
        if (editable) {
            const res = await fetch(API_URL + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario_id: 7110, nombre: nuevaCategoria })
            });
            if (!res.ok) throw new Error("Error al modificar la categoría");

            const categoriasCopia = [...estadoCategorias];
            const categoria = categoriasCopia.find(cat => cat.id === id);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: "7110" })
        });
        const data = await res.json();
        if (data.status === "error") {
            alert(data.message);
        } else {
            const categoriasCopia = estadoCategorias.filter(cat => cat.id !== id);
            setCategorias(categoriasCopia);

            setProductosPorCategoria(prev => {
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: "7110" })
        });
        const data = await res.json();

        if (data.status === "error") {
            alert(data.message);
        } else {
            setProductosPorCategoria(prev => {
                const copia = { ...prev };
                if (Array.isArray(copia[String(id)])) {
                    copia[String(id)] = copia[String(id)].filter(p => p.id !== productId);
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
            body: JSON.stringify({ usuario_id: 7110, nombre, precio })
        });

        if (!res.ok) {
            alert("Error al modificar el producto");
            return;
        }

        setProductosPorCategoria(prev => {
            const copia = { ...prev };
            if (Array.isArray(copia[String(id)])) {
                copia[String(id)] = copia[String(id)].map(p =>
                    p.id === productId ? { ...p, nombre, precio } : p
                );
            }
            return copia;
        });
    }

    function toggleEntradaProducto() {
        setMostrarEntradaProducto(!mostrarEntradaProducto);
    }

    useEffect(() => {
        fetch(`https://jlorenzo.ddns.net/carta_restaurante/productos/${id}?usuario_id=7110`)
          .then(res => res.json())
          .then(data => {
            setProductosPorCategoria(prev => ({
                ...prev,
                [String(id)]: data.data || []
            }));
          })
          .catch(err => console.error("Error recargando productos:", err));
    }, [recargarProductos]);

    const listaProductos = Array.isArray(productosPorCategoria?.[String(id)])
        ? productosPorCategoria[String(id)].map(prod => (
            <Product 
                key={prod.id}
                name={prod.nombre}
                price={parseFloat(prod.precio)}
                id={prod.id}
                categoriaID={id}
                onDelete={EliminarProducto}
                onEdit={ModificarProducto}
            />
        ))
        : null;

    const content = editable 
        ? <CategoriaEscritura name={name} nuevaCategoria={nuevaCategoria} setNuevaCategoria={setNuevaCategoria} />
        : <CategoriaLectura name={name} />;

    return (
        <li>
            <div className="contenedor-categoria">
                {content}
                <button className="borrar" onClick={borrarCategoria}>Borrar</button>
                <button className="modificar" onClick={modificarCategoria}>{nombreBotonModificar}</button>

                <button className="añadir-producto" onClick={toggleEntradaProducto}>
                    {mostrarEntradaProducto ? "Cancelar" : "Añadir producto"}
                </button>

                {mostrarEntradaProducto && (
                    <EntradaProducto 
                        categoriaId={id} 
                        productosPorCategoria={productosPorCategoria}
                        setProductosPorCategoria={setProductosPorCategoria}
                        setRecargarProductos={setRecargarProductos}
                    />
                )}
                <ul>
                    {listaProductos}
                </ul>
            </div>
        </li>
    );
}

export default Category;



