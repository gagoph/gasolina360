import React from "react";

export default function Tabla({ bombas }) {
    return (
        <div className="tabla-bombas table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Teléfono</th>
                        <th>Horario Apertura</th>
                        <th>Horario Cierre</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bombas.map(bomba => {
                        let horarioApertura = "";
                        let horarioCierre = "";
                        if (bomba.horario_operacion) {
                            const partes = bomba.horario_operacion.split(" - ");
                            horarioApertura = partes[0] || "";
                            horarioCierre = partes[1] || "";
                        }
                        return (
                            <tr key={bomba.id}>
                                <td>{bomba.id}</td>
                                <td>{bomba.nombre}</td>
                                <td>{bomba.ubicacion}</td>
                                <td>{bomba.telefono}</td>
                                <td>{horarioApertura}</td>
                                <td>{horarioCierre}</td>
                                <td>{bomba.activa ? "Activa" : "Inactiva"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}