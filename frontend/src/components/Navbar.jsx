// src/components/Navbar.jsx
import React from 'react';

function Navbar({ paginaActual, cambiarPagina, cantidadReservas = 0 }) {
  const paginas = [
    { id: 'inicio', nombre: 'Inicio', icono: '🏠' },
    { id: 'habitaciones', nombre: 'Habitaciones', icono: '🛏️' },
    { id: 'mis-reservas', nombre: 'Mis Reservas', icono: '📋', badge: cantidadReservas }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Título */}
          <button 
            onClick={() => cambiarPagina('inicio')}
            className="text-2xl font-bold hover:text-blue-200 transition"
          >
            🏨 Hotel Reservas
          </button>
          
          {/* Menú de navegación */}
          <div className="flex gap-2">
            {paginas.map(pagina => (
              <button
                key={pagina.id}
                onClick={() => cambiarPagina(pagina.id)}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 relative ${
                  paginaActual === pagina.id
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'hover:bg-blue-500'
                }`}
              >
                <span>{pagina.icono}</span>
                <span className="hidden sm:inline">{pagina.nombre}</span>
                
                {/* Badge de notificación */}
                {pagina.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {pagina.badge > 9 ? '9+' : pagina.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
