import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🏨 Hotel Reservas
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>
            <Link to="/rooms" className="hover:text-blue-200 transition">
              Habitaciones
            </Link>
            <Link to="/reservations" className="hover:text-blue-200 transition">
              Mis Reservas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;