import { useState } from "react";

export default function CategoriaEscritura({ name, nuevaCategoria, setNuevaCategoria }) {
    

    function onNuevaCategoria(nuevaCategoria) {
        setNuevaCategoria(nuevaCategoria);
    }


    return (
        <input type="text" value={nuevaCategoria}
            onChange={(e) => onNuevaCategoria(e.target.value)}/>
    );
}