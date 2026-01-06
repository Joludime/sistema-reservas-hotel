export const rooms = [
  {
    id: 1,
    name: "Habitación Individual",
    description: "Perfecta para viajeros solitarios, cuenta con cama individual, baño privado y escritorio.",
    pricePerNight: 500,
    capacity: 1,
    images: [
      "/images/room1-1.jpg",
      "/images/room1-2.jpg",
      "/images/room1-3.jpg"
    ],
    amenities: ["WiFi", "TV", "Aire Acondicionado", "Baño Privado", "Escritorio"]
  },
  {
    id: 2,
    name: "Habitación Doble",
    description: "Espaciosa habitación con cama matrimonial, ideal para parejas que buscan comodidad.",
    pricePerNight: 500,
    capacity: 2,
    images: [
      "/images/room2-1.jpg",
      "/images/room2-2.jpg",
      "/images/room2-3.jpg"
    ],
    amenities: ["WiFi", "TV", "Aire Acondicionado", "Baño Privado", "Minibar", "Balcón"]
  },
  {
    id: 3,
    name: "Suite Familiar",
    description: "Amplia suite con dos camas matrimoniales, sala de estar y espacio para toda la familia.",
    pricePerNight: 500,
    capacity: 4,
    images: [
      "/images/room3-1.jpg",
      "/images/room3-2.jpg",
      "/images/room3-3.jpg"
    ],
    amenities: ["WiFi", "TV", "Aire Acondicionado", "Baño Privado", "Minibar", "Sala de Estar", "Cocina"]
  },
  {
    id: 4,
    name: "Suite de Lujo",
    description: "La mejor opción para una experiencia premium con jacuzzi, vista panorámica y servicios exclusivos.",
    pricePerNight: 500,
    capacity: 2,
    images: [
      "/images/room4-1.jpg",
      "/images/room4-2.jpg",
      "/images/room4-3.jpg"
    ],
    amenities: ["WiFi", "TV Smart", "Aire Acondicionado", "Baño Privado", "Jacuzzi", "Vista Panorámica", "Servicio a Habitación 24/7"]
  }
];

export const MIN_NIGHTS = 2;
export const PRICE_PER_NIGHT = 500;