import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function DisponibilidadBomba({ show, onHide, bombaData }) {
    const [activa, setActiva] = useState(true);

    useEffect(() => {
        if (bombaData) {
            setActiva(!!bombaData.activa);
        }
    }, [bombaData, show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bombaData) return;

        try {
            const response = await fetch(`http://localhost:8000/api/estaciones/${bombaData.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ activa })
            });

            if (!response.ok) {
                let errorMsg = 'Error al actualizar disponibilidad';
                try {
                    const errorData = await response.json();
                    errorMsg = JSON.stringify(errorData);
                } catch (e) {}
                throw new Error(errorMsg);
            }

            alert('Disponibilidad actualizada exitosamente!');
            onHide();
        } catch (error) {
            alert('Error al actualizar disponibilidad: ' + error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar Disponibilidad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bombaData ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                ¿La estación <strong>{bombaData.nombre}</strong> está activa?
                            </Form.Label>
                            <Form.Check
                                type="switch"
                                id="activa-switch"
                                label={activa ? "Activa" : "Inactiva"}
                                checked={activa}
                                onChange={e => setActiva(e.target.checked)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Guardar
                        </Button>
                    </Form>
                ) : (
                    <div>Seleccione una estación para cambiar disponibilidad.</div>
                )}
            </Modal.Body>
        </Modal>
    );
}