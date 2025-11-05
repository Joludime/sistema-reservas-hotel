// src/pages/Inicio.jsx
import React, { useState } from 'react';
import { habitaciones } from '../data/habitaciones';
import ModalReserva from '../components/ModalReserva';
import ModalConfirmacion from '../components/ModalConfirmacion';
import GaleriaHabitacion from '../components/GaleriaHabitacion';

function Inicio({ onNuevaReserva }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [reservaActual, setReservaActual] = useState(null);
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

  return (
    <div>
      {/* Hero Banner con imagen de fondo */}
      <div 
        className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Lool Beh Hotel
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-light">
            Tu destino perfecto en Mérida, Yucatán
          </p>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Experimenta la comodidad y el lujo en el corazón de la ciudad. 
            Habitaciones elegantes inspiradas en flores con todas las amenidades que necesitas.
          </p>
          <button
            onClick={() => document.getElementById('habitaciones').scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-xl"
          >
            Explorar Habitaciones
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Características destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Servicio Premium</h3>
            <p className="text-gray-600">
              Atención personalizada las 24 horas del día para hacer tu estancia inolvidable
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Decoración Única</h3>
            <p className="text-gray-600">
              Habitaciones temáticas inspiradas en flores, cada una con su propio encanto
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Ubicación Privilegiada</h3>
            <p className="text-gray-600">
              En el centro de Mérida, cerca de los mejores restaurantes y atracciones
            </p>
          </div>
        </div>

        {/* Sección de habitaciones */}
        <div id="habitaciones" className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            Nuestras Habitaciones
          </h2>
          <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
            Cada habitación ha sido diseñada pensando en tu comodidad y bienestar, 
            con decoración inspirada en flores emblemáticas
          </p>
        </div>

        {/* Grid de habitaciones con imágenes reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {habitaciones.map((habitacion) => (
            <div 
              key={habitacion.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Imagen de la habitación */}
              <div className="relative h-56 overflow-hidden group cursor-pointer">
                <img 
                  src={habitacion.imagen}
                  alt={habitacion.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onClick={() => setGaleriaAbierta(habitacion)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setGaleriaAbierta(habitacion)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm transform scale-90 group-hover:scale-100 transition-all duration-300"
                  >
                    📷 Ver Fotos
                  </button>
                </div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {habitacion.icono}
                </div>
                <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {habitacion.galeria.length} fotos
                </div>
              </div>
              
              {/* Contenido de la card */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {habitacion.tipo}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {habitacion.descripcion}
                </p>
                
                {/* Amenidades */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {habitacion.amenidades.slice(0, 2).map((amenidad, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {amenidad}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{habitacion.amenidades.length - 2}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3 text-xs text-gray-600 pb-3 border-b">
                  <span>👥 {habitacion.capacidad} pers.</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    ✓ Disponible
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${habitacion.precio}
                    </div>
                    <div className="text-xs text-gray-500">por noche</div>
                  </div>
                  
                  <button 
                    onClick={() => abrirModal(habitacion)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 font-semibold text-sm"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de estadísticas */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Miles de huéspedes confían en nosotros para sus viajes
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">2,500+</div>
                <div className="text-lg opacity-90">Huéspedes Satisfechos</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">4.9★</div>
                <div className="text-lg opacity-90">Calificación Promedio</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Atención Continua</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-lg opacity-90">Satisfacción Garantizada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action final */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Reserva ahora y disfruta de nuestras habitaciones únicas. ¡Te esperamos en Lool Beh!
          </p>
          <button
            onClick={() => document.getElementById('habitaciones').scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-xl"
          >
            Ver Todas las Habitaciones
          </button>
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

export default Inicio;
