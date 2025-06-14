import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EliminarServicio({ show, onHide, servicioId, estacionServicioId, onConfirm, servicios }) {
    const [deleting, setDeleting] = React.useState(false);
    const servicio = servicios.find(s => String(s.id) === String(servicioId));

    const handleDelete = async () => {
        setDeleting(true);
        try {
            // 1. Eliminar la relación EstacionServicio primero
            if (estacionServicioId) {
                const respRel = await fetch(`http://localhost:8000/api/servicios/estacion-servicios/${estacionServicioId}/`, {
                    method: 'DELETE'
                });
                if (!respRel.ok) {
                    const errorData = await respRel.json();
                    alert("Error al eliminar la relación estación-servicio: " + JSON.stringify(errorData));
                    return;
                }
            }
            // 2. Eliminar el Servicio (opcional, solo si no está relacionado con otras estaciones)
            const respServ = await fetch(`http://localhost:8000/api/servicios/${servicioId}/`, {
                method: 'DELETE'
            });
            if (!respServ.ok) {
                const errorData = await respServ.json();
                alert("Error al eliminar el servicio: " + JSON.stringify(errorData));
                return;
            }
            alert('¡Servicio eliminado exitosamente!');
            onConfirm();
            onHide();
        } catch (error) {
            alert('No se pudo eliminar el servicio');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {servicio
                    ? <>¿Está seguro que desea eliminar el servicio <strong>{servicio.nombre}</strong> y su relación con la estación?</>
                    : <>Seleccione un servicio para eliminar.</>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={!servicio || deleting}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}