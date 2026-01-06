import React, { useState } from 'react';

const RoomCard = ({ room, onReserve }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-2">🏨</div>
            <p className="text-sm">Imagen de {room.name}</p>
          </div>
        </div>
        
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              →
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {room.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Capacidad: {room.capacity} persona(s)</p>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-3xl font-bold text-blue-600">${room.pricePerNight}</p>
            <p className="text-sm text-gray-500">por noche</p>
          </div>
          <button
            onClick={() => onReserve(room)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;