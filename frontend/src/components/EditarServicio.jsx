import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditarServicio({ show, onHide, servicioId, estacionServicioId }) {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo_servicio: '',
        descripcion: '',
        horario_apertura: '',
        horario_cierre: '',
        contacto: '',
        activo: true
    });
    const [tipos, setTipos] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (show && servicioId && estacionServicioId) {
            // Cargar datos del servicio
            fetch(`http://localhost:8000/api/servicios/${servicioId}/`)
                .then(res => res.json())
                .then(servicio => {
                    setFormData(prev => ({
                        ...prev,
                        nombre: servicio.nombre || '',
                        tipo_servicio: servicio.tipo_servicio || '',
                        descripcion: servicio.descripcion || ''
                    }));
                });
            // Cargar datos de la relación EstacionServicio
            fetch(`http://localhost:8000/api/servicios/estacion-servicios/${estacionServicioId}/`)
                .then(res => res.json())
                .then(rel => {
                    let horario_apertura = '';
                    let horario_cierre = '';
                    if (rel.horario) {
                        const partes = rel.horario.split(' - ');
                        horario_apertura = partes[0] || '';
                        horario_cierre = partes[1] || '';
                    }
                    setFormData(prev => ({
                        ...prev,
                        horario_apertura,
                        horario_cierre,
                        contacto: rel.contacto || '',
                        activo: rel.activo
                    }));
                });
        }
    }, [show, servicioId, estacionServicioId]);

    useEffect(() => {
        fetch('http://localhost:8000/api/servicios/tipos-servicio/')
            .then(res => res.json())
            .then(data => setTipos(data));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        // 1. Actualizar Servicio
        await fetch(`http://localhost:8000/api/servicios/${servicioId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: formData.nombre,
                tipo_servicio: Number(formData.tipo_servicio),
                descripcion: formData.descripcion
            })
        });

        // 2. Actualizar EstacionServicio
        await fetch(`http://localhost:8000/api/servicios/estacion-servicios/${estacionServicioId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                horario: `${formData.horario_apertura} - ${formData.horario_cierre}`,
                contacto: formData.contacto,
                activo: formData.activo
            })
        });

        alert('Servicio actualizado exitosamente!');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Servicio</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del servicio"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre es requerido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Servicio</Form.Label>
                        <Form.Select
                            required
                            name="tipo_servicio"
                            value={formData.tipo_servicio}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un tipo de servicio</option>
                            {tipos.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Seleccione un tipo de servicio
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción del servicio"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Horario de Atención</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Control
                                required
                                type="time"
                                name="horario_apertura"
                                value={formData.horario_apertura}
                                onChange={handleChange}
                                placeholder="Apertura"
                            />
                            <Form.Control
                                required
                                type="time"
                                name="horario_cierre"
                                value={formData.horario_cierre}
                                onChange={handleChange}
                                placeholder="Cierre"
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            El horario es requerido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                            placeholder="Contacto"
                        />
                        <Form.Control.Feedback type="invalid">
                            El contacto es requerido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Activo"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                            Guardar Cambios
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}