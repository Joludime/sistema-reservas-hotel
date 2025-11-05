// src/pages/Habitaciones.jsx
import React, { useState } from 'react';
import { habitaciones } from '../data/habitaciones';
import ModalReserva from '../components/ModalReserva';
import ModalConfirmacion from '../components/ModalConfirmacion';
import GaleriaHabitacion from '../components/GaleriaHabitacion';

function Habitaciones({ onNuevaReserva }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [reservaActual, setReservaActual] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [filtroCapacidad, setFiltroCapacidad] = useState('');
  const [galeriaAbierta, setGaleriaAbierta] = useState(null);

  // Abrir modal de reserva
  const abrirModal = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setModalAbierto(true);
  };

  // Cerrar modal de reserva
  const cerrarModal = () => {
    setModalAbierto(false);
    setHabitacionSeleccionada(null);
  };

  // Confirmar reserva
  const confirmarReserva = (reserva) => {
    onNuevaReserva(reserva);
    setReservaActual(reserva);
    setModalAbierto(false);
    setHabitacionSeleccionada(null);
    setMostrarConfirmacion(true);
  };

  // Cerrar modal de confirmación
  const cerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    setReservaActual(null);
  };

  // Filtrar habitaciones
  const habitacionesFiltradas = habitaciones.filter(hab => {
    // Filtro por tipo
    if (filtroTipo && !hab.tipo.toLowerCase().includes(filtroTipo.toLowerCase())) {
      return false;
    }
    
    // Filtro por precio
    if (filtroPrecio && hab.precio > parseInt(filtroPrecio)) {
      return false;
    }
    
    // Filtro por capacidad
    if (filtroCapacidad) {
      const capacidadFiltro = parseInt(filtroCapacidad);
      if (capacidadFiltro === 4) {
        // 4+ personas
        if (hab.capacidad < 4) return false;
      } else {
        if (hab.capacidad !== capacidadFiltro) return false;
      }
    }
    
    return true;
  });

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroTipo('');
    setFiltroPrecio('');
    setFiltroCapacidad('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen */}
      <div 
        className="relative bg-cover bg-center h-80 flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1920&q=80)'
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Nuestras Habitaciones
          </h1>
          <p className="text-xl md:text-2xl">
            {habitacionesFiltradas.length} {habitacionesFiltradas.length === 1 ? 'habitación disponible' : 'habitaciones disponibles'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filtros mejorados */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              🔍 Filtrar Habitaciones
            </h2>
            {(filtroTipo || filtroPrecio || filtroCapacidad) && (
              <button
                onClick={limpiarFiltros}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Limpiar filtros ✕
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de habitación
              </label>
              <select 
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                <option value="loto">Loto</option>
                <option value="dhalia">Dhalia</option>
                <option value="camelia">Camelia</option>
                <option value="magnolia">Magnolia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio máximo por noche
              </label>
              <select 
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sin límite</option>
                <option value="100">Hasta $100</option>
                <option value="110">Hasta $110</option>
                <option value="120">Hasta $120</option>
                <option value="150">Hasta $150</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad de huéspedes
              </label>
              <select 
                value={filtroCapacidad}
                onChange={(e) => setFiltroCapacidad(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Cualquiera</option>
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4+ personas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mensaje si no hay resultados */}
        {habitacionesFiltradas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron habitaciones
            </h2>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button
              onClick={limpiarFiltros}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        {/* Grid de habitaciones con imágenes reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {habitacionesFiltradas.map((habitacion) => (
            <div 
              key={habitacion.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Imagen grande de la habitación */}
              <div className="relative h-80 overflow-hidden group cursor-pointer">
                <img 
                  src={habitacion.imagen}
                  alt={habitacion.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onClick={() => setGaleriaAbierta(habitacion)}
                />
                {/* Overlay con botón de ver galería */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => setGaleriaAbierta(habitacion)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold transform scale-90 group-hover:scale-100 transition-all duration-300 flex items-center gap-2"
                  >
                    📷 Ver {habitacion.galeria.length} Fotos
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {habitacion.icono} ${habitacion.precio}/noche
                </div>
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                  {habitacion.galeria.length} fotos
                </div>
              </div>
              
              {/* Contenido de la card */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  {habitacion.icono} {habitacion.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {habitacion.descripcion}
                </p>
                
                {/* Amenidades destacadas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {habitacion.amenidades.slice(0, 4).map((amenidad, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                    >
                      ✓ {amenidad}
                    </span>
                  ))}
                  {habitacion.amenidades.length > 4 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      +{habitacion.amenidades.length - 4} más
                    </span>
                  )}
                </div>
                
                {/* Info rápida */}
                <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b">
                  <span className="text-gray-600">
                    👥 Hasta {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'personas'}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    ✓ Disponible
                  </span>
                </div>
                
                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setGaleriaAbierta(habitacion)}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    Ver Fotos
                  </button>
                  <button 
                    onClick={() => abrirModal(habitacion)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold transform hover:scale-105"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Galería */}
      {galeriaAbierta && (
        <GaleriaHabitacion
          habitacion={galeriaAbierta}
          onClose={() => setGaleriaAbierta(null)}
          onReservar={abrirModal}
        />
      )}

      {/* Modal de Reserva */}
      {modalAbierto && habitacionSeleccionada && (
        <ModalReserva
          habitacion={habitacionSeleccionada}
          onClose={cerrarModal}
          onReservar={confirmarReserva}
        />
      )}

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && reservaActual && (
        <ModalConfirmacion
          reserva={reservaActual}
          onClose={cerrarConfirmacion}
        />
      )}
    </div>
  );
}

export default Habitaciones;
