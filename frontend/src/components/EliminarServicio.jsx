import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EliminarServicio({ show, onHide, servicioId, onConfirm }) {
    // Simulación de nombres de servicios (esto luego vendrá del backend o props)
    const serviciosMock = [
        { id: 1, nombre: 'Lavado de autos premium' },
        { id: 2, nombre: 'Cambio de aceite rápido' },
        { id: 3, nombre: 'Servicio de mecánica' }
    ];

    const servicio = serviciosMock.find(s => String(s.id) === String(servicioId));

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {servicio
                    ? <>¿Está seguro que desea eliminar el servicio <strong>{servicio.nombre}</strong>?</>
                    : <>Seleccione un servicio para eliminar.</>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={!servicio}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}