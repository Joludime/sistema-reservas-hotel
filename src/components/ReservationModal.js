import React, { useState } from 'react';
import { MIN_NIGHTS } from '../data/rooms';

const ReservationModal = ({ room, onClose }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const total = nights * room.pricePerNight;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.guestName || !formData.email || !formData.phone || !formData.checkIn || !formData.checkOut) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (nights < MIN_NIGHTS) {
      setError(`La estancia mínima es de ${MIN_NIGHTS} noches`);
      return;
    }

    const reservation = {
      id: Date.now(),
      roomName: room.name,
      ...formData,
      nights,
      total
    };

    const existing = JSON.parse(localStorage.getItem('reservations') || '[]');
    existing.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(existing));

    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/reservations';
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Reservar {room.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl"
            >
              ×
            </button>
          </div>

          {success ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                ¡Reserva Confirmada!
              </h3>
              <p className="text-gray-600">Redirigiendo a tus reservas...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="999-123-4567"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-in *</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Check-out *</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    min={formData.checkIn}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {nights > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Noches:</span>
                    <span className="font-bold">{nights}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Precio por noche:</span>
                    <span className="font-bold">${room.pricePerNight} MXN</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-blue-600 pt-2 border-t">
                    <span>Total:</span>
                    <span>${total} MXN</span>
                  </div>
                  {nights < MIN_NIGHTS && (
                    <p className="text-red-600 text-sm mt-2">
                      ⚠️ Mínimo {MIN_NIGHTS} noches requeridas
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;