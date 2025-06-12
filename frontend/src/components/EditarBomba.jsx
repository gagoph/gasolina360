import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditarBombaModal({ show, onHide, bombaData }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        rif: '',
        nombre: '',
        ubicacion: '',
        telefono: '',
        horario_apertura: '',
        horario_cierre: '',
        cantidad_dispensadores: ''
    });

    useEffect(() => {
        if (show && bombaData) {
            // Extraer horario_apertura y horario_cierre del string horario_operacion
            let horario_apertura = '';
            let horario_cierre = '';
            if (bombaData.horario_operacion) {
                const partes = bombaData.horario_operacion.split(' - ');
                horario_apertura = partes[0] || '';
                horario_cierre = partes[1] || '';
            }
            setFormData({
                rif: bombaData.rif || '',
                nombre: bombaData.nombre || '',
                ubicacion: bombaData.ubicacion || '',
                telefono: bombaData.telefono || '',
                horario_apertura,
                horario_cierre,
                cantidad_dispensadores: bombaData.cantidad_dispensadores || ''
            });
        }
    }, [show, bombaData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Validar RIF: máximo 10 caracteres, empieza por J/G/V/E y 9 dígitos
        if (!/^[JGVE]\d{9}$/.test(formData.rif) || formData.rif.length > 10) {
            errors.rif = 'RIF inválido. Use el formato J123456789 (10 caracteres máximo)';
        }

        // Validar teléfono: solo números, 11 dígitos, empieza por 0
        if (!/^0\d{10}$/.test(formData.telefono)) {
            errors.telefono = 'Teléfono inválido. Use el formato 04121234567 (solo números)';
        }

        if (parseInt(formData.cantidad_dispensadores) <= 0) {
            errors.cantidad_dispensadores = 'Debe ser un número positivo';
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Combina los horarios antes de enviar
        const dataToSend = {
            ...formData,
            horario_operacion: `${formData.horario_apertura} - ${formData.horario_cierre}`,
            id_encargado_registro: 1 // ID fijo temporal
        };
        delete dataToSend.horario_apertura;
        delete dataToSend.horario_cierre;

        try {
            const response = await fetch(`http://localhost:8000/api/estaciones/${bombaData.id}/`, {
                method: 'PUT', // o 'PATCH' si solo quieres actualizar algunos campos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                let errorMsg = 'Error al editar la bomba';
                try {
                    const errorData = await response.json();
                    errorMsg = JSON.stringify(errorData);
                } catch (e) {}
                throw new Error(errorMsg);
            }

            alert('Bomba actualizada exitosamente!');
            onHide();
        } catch (error) {
            alert('Error al actualizar la bomba: ' + error.message);
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
                            placeholder="J123456789"
                            pattern="^[JGVE]\d{9}$"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese un RIF válido (formato: J123456789)
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
                            placeholder="04121234567"
                            pattern="^0\d{10}$"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese un teléfono válido (formato: 04121234567)
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