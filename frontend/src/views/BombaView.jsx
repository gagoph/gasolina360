import { useState } from 'react';
import MainCard from "../components/MainCard";
import CrearBomba from '../components/CrearBomba';
import EditarBomba from '../components/EditarBomba';
import DisponibilidadBomba from '../components/DisponibilidadBomba';

export default function BombaView() {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDisponibilidadModal, setShowDisponibilidadModal] = useState(false);
    const bombaData = {
        id: 1,  // identificador único
        rif: "J-12345678-9",
        nombre: "Estación de servicio \"El Manantial\"",
        ubicacion: "Av. Principal El Carmen, Calle 5, Barquisimeto, Estado Lara",
        telefono: "0251-1234567",
        horario_apertura: "06:00",
        horario_cierre: "22:00",
        cantidad_dispensadores: "4"
    };

    return (
        <>
            <div className='bomba-header'>
                <h1>Estación de servicio "El Manantial"</h1>
                <svg 
                    className="delete-icon" 
                    width="30" 
                    height="30" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="red" 
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        if(window.confirm('¿Estás seguro de que quieres eliminar esta bomba?')) {
                            // Aca va la logica para eliminar
                            console.log('Eliminando bomba...');
                        }
                    }}
                >
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
            </div>
            
            <h4 style={{color: "gray"}}>Gestión de bomba</h4>

            <MainCard 
                icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"/>
                    </svg>}
                title="Crear bomba"
                text="Registrar nueva bomba de gasolina"
                buttonText="Crear"
                buttonColor="green"
                onButtonClick={() => setShowCreateModal(true)}
            />
            <CrearBomba
                show={showCreateModal} 
                onHide={() => setShowCreateModal(false)}
            />
            <MainCard 
                icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"stroke="white" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>}
                title="Editar bomba"
                text="Editar información de bomba"
                buttonText="Editar"
                buttonColor="#0d6efd"
                onButtonClick={() => setShowEditModal(true)}
            />
            <EditarBomba 
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                bombaData={bombaData}
            />
            <MainCard 
                icon={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="6" width="20" height="12" rx="6" />
                        <circle cx="16" cy="12" r="4" />
                    </svg>}
                title="Cambiar disponibilidad"
                text="Cambiar disponiblidad de gasolina"
                buttonText="Cambiar"
                buttonColor="#F59E0B"
                onButtonClick={() => setShowDisponibilidadModal(true)}
            />
            <DisponibilidadBomba
                show={showDisponibilidadModal}
                onHide={() => setShowDisponibilidadModal(false)}
                bombaData={bombaData}
            />
            
        </>
    );
};