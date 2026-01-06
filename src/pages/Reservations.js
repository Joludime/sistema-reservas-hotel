import React, { useState, useEffect } from 'react';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('reservations');
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = reservations.filter(r => r.id !== id);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  if (reservations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Mis Reservas</h1>
        <p className="text-gray-600 text-xl">No tienes reservas registradas</p>
        <a href="/rooms" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Ver Habitaciones
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Mis Reservas</h1>

      <div className="space-y-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{reservation.roomName}</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Cliente:</strong> {reservation.guestName}</p>
                  <p><strong>Email:</strong> {reservation.email}</p>
                  <p><strong>Teléfono:</strong> {reservation.phone}</p>
                  <p><strong>Check-in:</strong> {reservation.checkIn}</p>
                  <p><strong>Check-out:</strong> {reservation.checkOut}</p>
                  <p><strong>Noches:</strong> {reservation.nights}</p>
                  <p className="text-xl font-bold text-blue-600">
                    <strong>Total:</strong> ${reservation.total} MXN
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(reservation.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;