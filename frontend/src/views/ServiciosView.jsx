import React, { useState, useEffect } from 'react';
import MainCard from '../components/MainCard';
import AddServicio from '../components/AddServicio';
import EditarServicio from '../components/EditarServicio';
import EliminarServicio from '../components/EliminarServicio';
import { Form } from 'react-bootstrap';

export default function ServiciosView() {
    const [showAddServicioModal, setShowAddServicioModal] = useState(false);
    const [showEditServicioModal, setShowEditServicioModal] = useState(false);
    const [showDeleteServicioModal, setShowDeleteServicioModal] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState('');
    const [selectedServicioEliminar, setSelectedServicioEliminar] = useState('');
    const [serviciosDisponibles, setServiciosDisponibles] = useState([]);

    // Cargar servicios desde el backend
    const fetchServicios = () => {
        fetch('http://localhost:8000/api/servicios/')
            .then(res => res.json())
            .then(data => setServiciosDisponibles(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchServicios();
    }, []);

    const handleEditClick = () => {
        if (!selectedServicio) {
            alert('Por favor seleccione un servicio para editar');
            return;
        }
        setShowEditServicioModal(true);
    };
    const handleDeleteClick = () => {
        if (!selectedServicioEliminar) {
            alert('Por favor seleccione un servicio para eliminar');
            return;
        }
        setShowDeleteServicioModal(true);
    };

    const handleConfirmDelete = () => {
        fetchServicios();
        setShowDeleteServicioModal(false);
        setSelectedServicioEliminar('');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Servicios</h1>
            </div>
                    
            <h4 style={{color: "gray"}}>Gestión de servicios</h4>
            <div className="d-flex flex-column">
                <MainCard 
                    icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"/>
                        </svg>}
                    title="Añadir Servicio"
                    text="Añadir nuevo servicio a la estación de servicio"
                    buttonText="Añadir"
                    buttonColor="green"
                    onButtonClick={() => setShowAddServicioModal(true)}
                />
                <AddServicio 
                    show={showAddServicioModal}
                    onHide={() => { setShowAddServicioModal(false); fetchServicios(); }}
                />

                <MainCard 
                    icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                    title="Editar Servicio"
                    text="Modificar información de un servicio existente"
                    buttonText="Editar"
                    buttonColor="#0d6efd"
                    onButtonClick={handleEditClick}
                    customContent={
                        <Form.Select 
                            value={selectedServicio}
                            onChange={(e) => setSelectedServicio(e.target.value)}
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #dee2e6',
                                width: '100%'
                            }}
                        >
                            <option value="">Seleccione un servicio</option>
                            {serviciosDisponibles.map(servicio => (
                                <option key={servicio.id} value={servicio.id}>
                                    {servicio.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    }
                />
                <EditarServicio 
                    show={showEditServicioModal}
                    onHide={() => { setShowEditServicioModal(false); fetchServicios(); }}
                    servicioId={selectedServicio} 
                />
            </div>
            <MainCard 
                icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
                title="Eliminar Servicio"
                text="Eliminar un servicio existente de la estación"
                buttonText="Eliminar"
                buttonColor="#dc3545"
                onButtonClick={handleDeleteClick}
                customContent={
                    <Form.Select
                        value={selectedServicioEliminar}
                        onChange={(e) => setSelectedServicioEliminar(e.target.value)}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #dee2e6',
                            width: '100%'
                        }}
                    >
                        <option value="">Seleccione un servicio</option>
                        {serviciosDisponibles.map(servicio => (
                            <option key={servicio.id} value={servicio.id}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </Form.Select>
                }
            />
            <EliminarServicio 
                show={showDeleteServicioModal}
                onHide={() => setShowDeleteServicioModal(false)}
                servicioId={selectedServicioEliminar}
                onConfirm={handleConfirmDelete}
                servicios={serviciosDisponibles}
            />
        </>
    );
}