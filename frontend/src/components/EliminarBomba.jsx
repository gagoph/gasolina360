import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EliminarBomba({ show, onHide, bombaId, onConfirm }) {
    const handleDelete = async () => {
        try {
            const resp = await fetch(`http://localhost:8000/api/estaciones/${bombaId}/`, {
                method: 'DELETE'
            });
            if (!resp.ok) {
                const errorData = await resp.json();
                alert("Error al eliminar la bomba: " + JSON.stringify(errorData));
                return;
            }
            alert('¡Bomba eliminada exitosamente!');
            onConfirm();
            onHide();
        } catch (error) {
            alert('No se pudo eliminar la bomba');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Bomba</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro que desea eliminar esta estación de servicio?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={!bombaId}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}