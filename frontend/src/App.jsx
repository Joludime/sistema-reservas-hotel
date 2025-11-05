// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Inicio from './pages/Inicio';
import Habitaciones from './pages/Habitaciones';
import MisReservas from './pages/MisReservas';

function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [reservas, setReservas] = useState([]);
  const [toast, setToast] = useState(null);

  // Cargar reservas desde localStorage al iniciar
  useEffect(() => {
    const reservasGuardadas = localStorage.getItem('reservasHotel');
    if (reservasGuardadas) {
      try {
        const reservasParseadas = JSON.parse(reservasGuardadas);
        setReservas(reservasParseadas);
        console.log('Reservas cargadas desde localStorage:', reservasParseadas.length);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
      }
    }
  }, []);

  // Guardar reservas en localStorage cuando cambien
  useEffect(() => {
    if (reservas.length > 0) {
      localStorage.setItem('reservasHotel', JSON.stringify(reservas));
      console.log('Reservas guardadas en localStorage:', reservas.length);
    }
  }, [reservas]);

  // Mostrar toast
  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
  };

  // Cerrar toast
  const cerrarToast = () => {
    setToast(null);
  };

  // Cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Scroll hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Agregar nueva reserva
  const agregarReserva = (nuevaReserva) => {
    // Agregar ID único a la reserva
    const reservaConId = {
      ...nuevaReserva,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setReservas(prevReservas => [...prevReservas, reservaConId]);
    console.log('Nueva reserva agregada:', reservaConId);
    
    // Mostrar notificación
    mostrarToast('¡Reserva confirmada exitosamente! 🎉', 'success');
  };

  // Cancelar reserva
  const cancelarReserva = (reservaACancelar) => {
    setReservas(prevReservas => 
      prevReservas.filter(r => r.id !== reservaACancelar.id)
    );
    console.log('Reserva cancelada:', reservaACancelar.id);
    
    // Mostrar notificación
    mostrarToast('Reserva cancelada correctamente', 'warning');
  };

  // Renderizar página actual
  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'inicio':
        return <Inicio onNuevaReserva={agregarReserva} />;
      
      case 'habitaciones':
        return <Habitaciones onNuevaReserva={agregarReserva} />;
      
      case 'mis-reservas':
        return (
          <MisReservas 
            reservas={reservas} 
            onCancelarReserva={cancelarReserva}
          />
        );
      
      default:
        return <Inicio onNuevaReserva={agregarReserva} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast de notificaciones */}
      {toast && (
        <Toast 
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onClose={cerrarToast}
        />
      )}

      {/* Barra de navegación */}
      <Navbar 
        paginaActual={paginaActual}
        cambiarPagina={cambiarPagina}
        cantidadReservas={reservas.length}
      />
      
      {/* Badge de notificación en desarrollo */}
      {reservas.length > 0 && (
        <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm">
          <span className="font-semibold">{reservas.length}</span> {reservas.length === 1 ? 'reserva guardada' : 'reservas guardadas'} en tu cuenta
        </div>
      )}
      
      {/* Contenido principal */}
      <main>
        {renderizarPagina()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🏨 Hotel Reservas</h3>
              <p className="text-gray-400 text-sm">
                Tu destino perfecto para una estancia inolvidable. 
                Comodidad, calidad y servicio excepcional.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 +52 999 123 4567</p>
                <p>📧 info@hotelreservas.com</p>
                <p>📍 Mérida, Yucatán, México</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
              <div className="space-y-2 text-sm">
                <button 
                  onClick={() => cambiarPagina('inicio')}
                  className="block text-gray-400 hover:text-white transition"
                >
                  Inicio
                </button>
                <button 
                  onClick={() => cambiarPagina('habitaciones')}
                  className="block text-gray-400 hover:text-white transition"
                >
                  Habitaciones
                </button>
                <button 
                  onClick={() => cambiarPagina('mis-reservas')}
                  className="block text-gray-400 hover:text-white transition"
                >
                  Mis Reservas
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Hotel Reservas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
