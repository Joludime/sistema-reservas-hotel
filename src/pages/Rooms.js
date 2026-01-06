import React, { useState } from 'react';
import { rooms, MIN_NIGHTS } from '../data/rooms';
import RoomCard from '../components/RoomCard';
import ReservationModal from '../components/ReservationModal';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleReserve = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Nuestras Habitaciones</h1>
      <p className="text-center text-gray-600 mb-2">
        Todas las habitaciones a <span className="font-bold text-blue-600">$500 MXN</span> por noche
      </p>
      <p className="text-center text-gray-600 mb-12">
        Estancia mínima: <span className="font-bold">{MIN_NIGHTS} noches</span>
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onReserve={handleReserve} />
        ))}
      </div>

      {showModal && selectedRoom && (
        <ReservationModal
          room={selectedRoom}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Rooms;