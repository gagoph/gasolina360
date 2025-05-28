import React, { useState } from 'react';
import MainCard from '../components/MainCard';
import AddServicio from '../components/AddServicio';

export default function ServiciosView() {
    const [showAddServicioModal, setShowAddServicioModal] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Estación de servicio "El Manantial"</h1>
            </div>
                    
            <h4 style={{color: "gray"}}>Gestión de servicios</h4>

            <div className="d-flex gap-4">
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
            </div>
            
            <AddServicio 
                show={showAddServicioModal}
                onHide={() => setShowAddServicioModal(false)}
            />
        </>
    );
}