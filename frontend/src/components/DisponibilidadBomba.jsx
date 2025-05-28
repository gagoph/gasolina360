import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function DisponibilidadBomba({ show, onHide, bombaData }) {
    const [activa, setActiva] = useState(bombaData?.activa || false);

    const handleSubmit = async () => {
        try {
            // Aca va la llamada de la API
            console.log('Nuevo estado:', activa);
            console.log('ID de la bomba:', bombaData?.id);
            
            onHide();
            alert('Estado actualizado exitosamente!');
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            alert('Error al actualizar el estado');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Estado de la Bomba</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{bombaData?.nombre}</h5>
                <Form.Check
                    type="switch"
                    id="estado-switch"
                    label={activa ? "Activa" : "Inactiva"}
                    checked={activa}
                    onChange={(e) => setActiva(e.target.checked)}
                    className="mt-3"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}