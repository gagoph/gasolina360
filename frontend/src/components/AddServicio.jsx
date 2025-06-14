import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddServicio({ show, onHide }) {
    const [formData, setFormData] = useState({
        estacion: '',
        tipo_servicio: '',
        nombre: '',
        descripcion: '',
        horario_apertura: '',
        horario_cierre: '',
        contacto: '',
        activo: true
    });

    const [errors, setErrors] = useState({});
    const [estaciones, setEstaciones] = useState([]);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/estaciones/')
            .then(res => res.json())
            .then(data => setEstaciones(data));
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
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.estacion) newErrors.estacion = "Seleccione una estación";
        if (!formData.tipo_servicio) newErrors.tipo_servicio = "Seleccione un tipo de servicio";
        if (!formData.nombre) newErrors.nombre = "Ingrese el nombre del servicio";
        if (!formData.horario_apertura) newErrors.horario_apertura = "Ingrese la hora de apertura";
        if (!formData.horario_cierre) newErrors.horario_cierre = "Ingrese la hora de cierre";
        if (!formData.contacto) newErrors.contacto = "Ingrese el contacto";
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 1. Crear el Servicio
        let servicioId = null;
        try {
            const servicioResponse = await fetch('http://localhost:8000/api/servicios/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo_servicio: Number(formData.tipo_servicio),
                    nombre: formData.nombre,
                    descripcion: formData.descripcion || ''
                })
            });
            if (!servicioResponse.ok) {
                const errorData = await servicioResponse.json();
                alert("Error al crear el servicio: " + JSON.stringify(errorData));
                return;
            }
            const servicioData = await servicioResponse.json();
            servicioId = servicioData.id;
        } catch (error) {
            alert('No se pudo crear el servicio');
            return;
        }

        // 2. Crear la relación EstacionServicio
        try {
            const estacionServicioResponse = await fetch('http://localhost:8000/api/servicios/estacion-servicios/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    estacion: Number(formData.estacion),
                    servicio: servicioId,
                    horario: `${formData.horario_apertura} - ${formData.horario_cierre}`,
                    contacto: formData.contacto,
                    activo: formData.activo
                })
            });
            if (!estacionServicioResponse.ok) {
                const errorData = await estacionServicioResponse.json();
                alert("Error al asociar el servicio a la estación: " + JSON.stringify(errorData));
                return;
            }
            alert('¡Servicio creado y asociado exitosamente!');
            onHide();
        } catch (error) {
            alert('No se pudo asociar el servicio a la estación');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Estación</Form.Label>
                        <Form.Select
                            name="estacion"
                            value={formData.estacion}
                            onChange={handleChange}
                            isInvalid={!!errors.estacion}
                        >
                            <option value="">Seleccione una estación</option>
                            {estaciones.map(e => (
                                <option key={e.id} value={e.id}>{e.nombre}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.estacion}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Servicio</Form.Label>
                        <Form.Select
                            name="tipo_servicio"
                            value={formData.tipo_servicio}
                            onChange={handleChange}
                            isInvalid={!!errors.tipo_servicio}
                        >
                            <option value="">Seleccione un tipo de servicio</option>
                            {tipos.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.tipo_servicio}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Servicio</Form.Label>
                        <Form.Control
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
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
                                isInvalid={!!errors.horario_apertura}
                                placeholder="Apertura"
                            />
                            <Form.Control
                                required
                                type="time"
                                name="horario_cierre"
                                value={formData.horario_cierre}
                                onChange={handleChange}
                                isInvalid={!!errors.horario_cierre}
                                placeholder="Cierre"
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.horario_apertura || errors.horario_cierre}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                            isInvalid={!!errors.contacto}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.contacto}
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
                            Crear Servicio
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}