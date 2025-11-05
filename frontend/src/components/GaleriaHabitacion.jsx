// src/components/GaleriaHabitacion.jsx
import React, { useState } from 'react';

function GaleriaHabitacion({ habitacion, onClose, onReservar }) {
  const [imagenActual, setImagenActual] = useState(0);

  const siguienteImagen = () => {
    setImagenActual((prev) => 
      prev === habitacion.galeria.length - 1 ? 0 : prev + 1
    );
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => 
      prev === 0 ? habitacion.galeria.length - 1 : prev - 1
    );
  };

  const irAImagen = (index) => {
    setImagenActual(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              {habitacion.icono} {habitacion.nombre}
            </h2>
            <p className="text-gray-600 mt-1">
              Explora todas las fotos de esta habitación
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>

        {/* Carrusel principal */}
        <div className="relative bg-gray-900">
          <img 
            src={habitacion.galeria[imagenActual]}
            alt={`${habitacion.nombre} - Foto ${imagenActual + 1}`}
            className="w-full h-[500px] object-cover"
          />
          
          {/* Contador de imágenes */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
            {imagenActual + 1} / {habitacion.galeria.length}
          </div>

          {/* Botones de navegación */}
          {habitacion.galeria.length > 1 && (
            <>
              <button
                onClick={imagenAnterior}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg"
              >
                ←
              </button>
              <button
                onClick={siguienteImagen}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Miniaturas */}
        <div className="px-8 py-4 bg-gray-50 border-b">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {habitacion.galeria.map((imagen, index) => (
              <button
                key={index}
                onClick={() => irAImagen(index)}
                className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${
                  imagenActual === index 
                    ? 'border-blue-600 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <img 
                  src={imagen}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información de la habitación */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Descripción</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {habitacion.descripcion}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">${habitacion.precio}</div>
                  <div className="text-sm text-gray-600">Por noche</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{habitacion.capacidad}</div>
                  <div className="text-sm text-gray-600">Huéspedes máximo</div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Amenidades</h3>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {habitacion.amenidades.map((amenidad, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="font-medium">{amenidad}</span>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span className="text-2xl">✓</span>
                  <span>Habitación Disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de reserva */}
          <button
            onClick={() => {
              onClose();
              onReservar(habitacion);
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-6"
          >
            Reservar esta Habitación Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default GaleriaHabitacion;
