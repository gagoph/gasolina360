import React, { useEffect, useState } from "react";
import Tabla from "../components/Tabla";

export default function TablaView() {
    const [bombas, setBombas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/estaciones/")
            .then(res => res.json())
            .then(data => setBombas(data));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Tabla de Bombas</h1>
            </div>
            <h4 style={{ color: "gray" }}>Listado de estaciones de servicio</h4>
            <Tabla bombas={bombas} />
        </div>
    );
}