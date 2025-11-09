import { useState } from "react";

export default function EntradaCategoria({ categorias, setCategorias }) {
    const [nuevaCategoria, setNuevaCategoria] = useState("");

    async function incluirCategoria() {
        const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "usuario_id": "7110",
                "nombre": nuevaCategoria
            })
        });
        if (!res.ok) {
            throw new Error("Error al añadir categoría en el servidor");
        }
        const categoriaCreada = await res.json();

        // Si la API responde correctamente, actualizar el estado local
        let categoriasCopia = [ ...categorias ];
        
        // Obtener el último id (si no hay, empieza en 0)
        /*let ultimoId = 0;
        
        if (menu.length > 0) {
            ultimoId = menu[menu.length - 1].id;
        }*/

        // Crear nueva categoría con id + 1
        const categoria = {
            id: categoriaCreada.categoria_id,
            nombre: nuevaCategoria,

        };

        // Añadir la nueva categoría
        categoriasCopia.push(categoria);

        setCategorias(categoriasCopia);
    }

    function onNuevaCategoria(nuevaCategoria) {
        setNuevaCategoria(nuevaCategoria);
    }

    return (
        <div className="entrada-categoria">
            <input placeholder="Categoria..." type="text"
                onChange={(e) => onNuevaCategoria(e.target.value)} />
            <button onClick={incluirCategoria}>Añadir categoría</button>
        </div>

    );
}

