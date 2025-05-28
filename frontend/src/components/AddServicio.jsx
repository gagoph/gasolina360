import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddServicio({ show, onHide }) {
    const [formData, setFormData] = useState({
        tipo_servicio: '',
        nombre: '',
        descripcion: '',
        horario_apertura: '',
        horario_cierre: '',
        contacto: ''
    });

    const [errors, setErrors] = useState({});

    const tiposServicio = [
        'Lavado de autos',
        'Cambio de aceite',
        'Aire para neumáticos',
        'Tienda de conveniencia',
        'Mecánica rápida',
        'Calibración de neumáticos',
        'Servicio de grúa',
        'Otro'
    ];

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
        
        if (!formData.tipo_servicio) {
            newErrors.tipo_servicio = 'Seleccione un tipo de servicio';
        }
        if (!formData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
        }
        if (!formData.descripcion) {
            newErrors.descripcion = 'La descripción es requerida';
        }
        if (!formData.horario_apertura || !formData.horario_cierre) {
            newErrors.horario = 'El horario es requerido';
        }
        if (!formData.contacto) {
            newErrors.contacto = 'El contacto es requerido';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Aquí iría la lógica para guardar el servicio
        console.log('Datos del servicio:', formData);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nuevo Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Servicio</Form.Label>
                        <Form.Select
                            name="tipo_servicio"
                            value={formData.tipo_servicio}
                            onChange={handleChange}
                            isInvalid={!!errors.tipo_servicio}
                        >
                            <option value="">Seleccione un tipo de servicio</option>
                            {tiposServicio.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.tipo_servicio}
                        </Form.Control.Feedback>
                    </Form.Group>

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
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            isInvalid={!!errors.descripcion}
                            placeholder="Ingrese una descripción del servicio"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
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
                    Crear Servicio
                </Button>
            </Modal.Footer>
        </Modal>
    );
}