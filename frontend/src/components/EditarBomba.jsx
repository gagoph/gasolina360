import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditarBombaModal({ show, onHide, bombaData }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(bombaData || {
        rif: '',
        nombre: '',
        ubicacion: '',
        telefono: '',
        horario_apertura: '',
        horario_cierre: '',
        cantidad_dispensadores: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        
        if (!/^[JGVE]-\d{8}-\d$/.test(formData.rif)) {
            errors.rif = 'RIF inválido. Use el formato J-12345678-9';
        }

        if (!/^0[24][12]\d{2}-\d{7}$/.test(formData.telefono)) {
            errors.telefono = 'Teléfono inválido. Use el formato 0XXX-1234567';
        }

        if (parseInt(formData.cantidad_dispensadores) <= 0) {
            errors.cantidad_dispensadores = 'Debe ser un número positivo';
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            return;
        }

        try {
            // Aca va la llamada de la API
            console.log('Datos a actualizar:', formData);

            onHide();

            alert('Bomba actualizada exitosamente!');

        } catch (error) {
            console.error('Error al actualizar la bomba:', error);
            alert('Error al actualizar la bomba. Por favor intente de nuevo.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editar Bomba</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>RIF</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="rif"
                            value={formData.rif}
                            onChange={handleChange}
                            placeholder="J-12345678-9"
                            pattern="^[JGVE]-\d{8}-\d$"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese un RIF válido (formato: J-12345678-9)
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre de la bomba"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre es requerido
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Dirección completa"
                        />
                        <Form.Control.Feedback type="invalid">
                            La ubicación es requerida
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="0XXX-1234567"
                            pattern="^0[24][12]\d{2}-\d{7}$"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese un teléfono válido (formato: 0XXX-1234567)
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
                        <Form.Label>Cantidad de Dispensadores</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="cantidad_dispensadores"
                            value={formData.cantidad_dispensadores}
                            onChange={handleChange}
                            min="1"
                            placeholder="Cantidad"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese un número válido de dispensadores
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