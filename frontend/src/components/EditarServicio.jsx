import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditarServicio({ show, onHide, servicioId }) {
    // Simulación de datos de servicios (esto luego vendrá del backend)
    const serviciosMock = [
        {
            id: 1,
            nombre: 'Lavado de autos premium',
            horario_apertura: '08:00',
            horario_cierre: '18:00',
            contacto: '555-1234'
        },
        {
            id: 2,
            nombre: 'Cambio de aceite rápido',
            horario_apertura: '09:00',
            horario_cierre: '17:00',
            contacto: '555-5678'
        },
        {
            id: 3,
            nombre: 'Servicio de mecánica',
            horario_apertura: '07:30',
            horario_cierre: '19:00',
            contacto: '555-9999'
        }
    ];

    const [formData, setFormData] = useState({
        nombre: '',
        horario_apertura: '',
        horario_cierre: '',
        contacto: ''
    });

    const [errors, setErrors] = useState({});

    // Cargar datos del servicio seleccionado
    useEffect(() => {
        if (show && servicioId) {
            const servicio = serviciosMock.find(s => String(s.id) === String(servicioId));
            if (servicio) {
                setFormData({
                    nombre: servicio.nombre,
                    horario_apertura: servicio.horario_apertura,
                    horario_cierre: servicio.horario_cierre,
                    contacto: servicio.contacto
                });
            }
        }
    }, [show, servicioId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.horario_apertura || !formData.horario_cierre) newErrors.horario = 'El horario es requerido';
        if (!formData.contacto) newErrors.contacto = 'El contacto es requerido';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Aquí iría la lógica para actualizar el servicio
        console.log('Servicio actualizado:', formData);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                            placeholder="Ingrese el nombre del servicio"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Horario de Operación</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Control
                                required
                                type="time"
                                name="horario_apertura"
                                value={formData.horario_apertura}
                                onChange={handleChange}
                                placeholder="Apertura"
                                isInvalid={!!errors.horario}
                            />
                            <Form.Control
                                required
                                type="time"
                                name="horario_cierre"
                                value={formData.horario_cierre}
                                onChange={handleChange}
                                placeholder="Cierre"
                                isInvalid={!!errors.horario}
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.horario}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            type="text"
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                            isInvalid={!!errors.contacto}
                            placeholder="Número de teléfono o correo electrónico"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.contacto}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}