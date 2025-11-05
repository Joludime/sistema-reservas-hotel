// src/components/ModalConfirmacion.jsx
import React from 'react';

function ModalConfirmacion({ reserva, onClose }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Icono de éxito */}
        <div className="bg-green-600 text-white p-6 rounded-t-lg text-center">
          <div className="text-6xl mb-2">✓</div>
          <h2 className="text-2xl font-bold">¡Reserva Confirmada!</h2>
        </div>

        {/* Detalles de la reserva */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Tu reserva ha sido confirmada exitosamente. Recibirás un correo de confirmación en breve.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="font-medium">{reserva.nombreHuesped}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-sm">{reserva.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Habitación:</span>
              <span className="font-medium">{reserva.habitacion.tipo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Entrada:</span>
              <span className="font-medium">{formatearFecha(reserva.fechaEntrada)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Salida:</span>
              <span className="font-medium">{formatearFecha(reserva.fechaSalida)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Huéspedes:</span>
              <span className="font-medium">{reserva.numeroHuespedes}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">Total pagado:</span>
                <span className="text-2xl font-bold text-green-600">€{reserva.precioTotal}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
