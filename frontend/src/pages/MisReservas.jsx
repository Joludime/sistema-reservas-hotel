// src/pages/MisReservas.jsx
import React, { useState } from 'react';

function MisReservas({ reservas, onCancelarReserva }) {
  const [reservaACancelar, setReservaACancelar] = useState(null);
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('todas'); // 'todas', 'proxima', 'activa', 'pasada'
  const [busqueda, setBusqueda] = useState('');
  const [reservaExpandida, setReservaExpandida] = useState(null);

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Formatear fecha corta
  const formatearFechaCorta = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calcular días restantes hasta la reserva
  const diasHastaReserva = (fechaEntrada) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const entrada = new Date(fechaEntrada);
    entrada.setHours(0, 0, 0, 0);
    const diferencia = entrada - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };

  // Determinar estado de la reserva
  const obtenerEstadoReserva = (fechaEntrada, fechaSalida) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const entrada = new Date(fechaEntrada);
    entrada.setHours(0, 0, 0, 0);
    const salida = new Date(fechaSalida);
    salida.setHours(0, 0, 0, 0);

    if (hoy < entrada) {
      return 'proxima';
    } else if (hoy >= entrada && hoy <= salida) {
      return 'activa';
    } else {
      return 'pasada';
    }
  };

  // Abrir modal de cancelación
  const abrirModalCancelar = (reserva) => {
    setReservaACancelar(reserva);
    setMostrarModalCancelar(true);
  };

  // Confirmar cancelación
  const confirmarCancelacion = () => {
    if (reservaACancelar) {
      onCancelarReserva(reservaACancelar);
      setMostrarModalCancelar(false);
      setReservaACancelar(null);
    }
  };

  // Cerrar modal de cancelación
  const cerrarModalCancelar = () => {
    setMostrarModalCancelar(false);
    setReservaACancelar(null);
  };

  // Expandir/contraer detalles de reserva
  const toggleExpandir = (reservaId) => {
    setReservaExpandida(reservaExpandida === reservaId ? null : reservaId);
  };

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(reserva => {
    // Filtro por estado
    if (filtroEstado !== 'todas') {
      const estado = obtenerEstadoReserva(reserva.fechaEntrada, reserva.fechaSalida);
      if (estado !== filtroEstado) return false;
    }

    // Filtro por búsqueda
    if (busqueda.trim() !== '') {
      const terminoBusqueda = busqueda.toLowerCase();
      const coincideNombre = reserva.nombreHuesped.toLowerCase().includes(terminoBusqueda);
      const coincideEmail = reserva.email.toLowerCase().includes(terminoBusqueda);
      const coincideHabitacion = reserva.habitacion.tipo.toLowerCase().includes(terminoBusqueda);
      
      if (!coincideNombre && !coincideEmail && !coincideHabitacion) return false;
    }

    return true;
  });

  // Ordenar reservas: próximas primero, luego activas, luego pasadas
  const reservasOrdenadas = [...reservasFiltradas].sort((a, b) => {
    const estadoA = obtenerEstadoReserva(a.fechaEntrada, a.fechaSalida);
    const estadoB = obtenerEstadoReserva(b.fechaEntrada, b.fechaSalida);
    
    const prioridad = { proxima: 1, activa: 2, pasada: 3 };
    
    if (prioridad[estadoA] !== prioridad[estadoB]) {
      return prioridad[estadoA] - prioridad[estadoB];
    }
    
    return new Date(a.fechaEntrada) - new Date(b.fechaEntrada);
  });

  // Exportar a CSV
  const exportarCSV = () => {
    if (reservas.length === 0) return;

    const headers = ['Nombre', 'Email', 'Teléfono', 'Habitación', 'Entrada', 'Salida', 'Noches', 'Huéspedes', 'Total'];
    const csvContent = [
      headers.join(','),
      ...reservas.map(r => [
        r.nombreHuesped,
        r.email,
        r.telefono,
        r.habitacion.tipo,
        r.fechaEntrada,
        r.fechaSalida,
        r.noches,
        r.numeroHuespedes,
        r.precioTotal
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reservas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Mis Reservas
            </h1>
            <p className="text-gray-600">
              Gestiona todas tus reservas de habitaciones
            </p>
          </div>
          
          {reservas.length > 0 && (
            <button
              onClick={exportarCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
            >
              📥 Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      {reservas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-blue-600 text-2xl font-bold">
              {reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'proxima').length}
            </div>
            <div className="text-blue-800 text-sm font-medium">Próximas reservas</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-green-600 text-2xl font-bold">
              {reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'activa').length}
            </div>
            <div className="text-green-800 text-sm font-medium">Reservas activas</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="text-gray-600 text-2xl font-bold">
              {reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'pasada').length}
            </div>
            <div className="text-gray-800 text-sm font-medium">Reservas completadas</div>
          </div>
        </div>
      )}

      {/* Barra de búsqueda y filtros */}
      {reservas.length > 0 && (
        <div className="mb-6 space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre, email o tipo de habitación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              🔍
            </span>
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros por estado */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroEstado('todas')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filtroEstado === 'todas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas ({reservas.length})
            </button>
            <button
              onClick={() => setFiltroEstado('proxima')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filtroEstado === 'proxima'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Próximas ({reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'proxima').length})
            </button>
            <button
              onClick={() => setFiltroEstado('activa')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filtroEstado === 'activa'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Activas ({reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'activa').length})
            </button>
            <button
              onClick={() => setFiltroEstado('pasada')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filtroEstado === 'pasada'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completadas ({reservas.filter(r => obtenerEstadoReserva(r.fechaEntrada, r.fechaSalida) === 'pasada').length})
            </button>
          </div>
        </div>
      )}

      {/* Lista de reservas */}
      {reservas.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No tienes reservas aún
          </h2>
          <p className="text-gray-600 mb-6">
            Explora nuestras habitaciones y haz tu primera reserva
          </p>
        </div>
      ) : reservasOrdenadas.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No se encontraron reservas
          </h2>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o filtros
          </p>
          <button
            onClick={() => {
              setBusqueda('');
              setFiltroEstado('todas');
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reservasOrdenadas.map((reserva) => {
            const estado = obtenerEstadoReserva(reserva.fechaEntrada, reserva.fechaSalida);
            const diasRestantes = diasHastaReserva(reserva.fechaEntrada);
            const estaExpandida = reservaExpandida === reserva.id;

            return (
              <div 
                key={reserva.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Contenido principal */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Información principal */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {/* Badge de estado */}
                        {estado === 'proxima' && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Próxima
                          </span>
                        )}
                        {estado === 'activa' && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                            En curso
                          </span>
                        )}
                        {estado === 'pasada' && (
                          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Completada
                          </span>
                        )}

                        {/* Días restantes para próximas reservas */}
                        {estado === 'proxima' && diasRestantes >= 0 && (
                          <span className="text-sm text-gray-500">
                            {diasRestantes === 0 ? '¡Hoy!' : diasRestantes === 1 ? 'Mañana' : `En ${diasRestantes} días`}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">{reserva.habitacion.icono}</span>
                      {reserva.habitacion.tipo}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">👤 Huésped:</span>
                          <span className="font-medium ml-2">{reserva.nombreHuesped}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600">📧 Email:</span>
                          <span className="font-medium ml-2">{reserva.email}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600">📅 Entrada:</span>
                          <span className="font-medium ml-2">{formatearFechaCorta(reserva.fechaEntrada)}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600">📅 Salida:</span>
                          <span className="font-medium ml-2">{formatearFechaCorta(reserva.fechaSalida)}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600">🌙 Noches:</span>
                          <span className="font-medium ml-2">{reserva.noches}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600">👥 Huéspedes:</span>
                          <span className="font-medium ml-2">{reserva.numeroHuespedes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Precio y acciones */}
                    <div className="lg:text-right space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-blue-600">
                          €{reserva.precioTotal}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total pagado
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => toggleExpandir(reserva.id)}
                          className="flex-1 lg:w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                        >
                          {estaExpandida ? '▲ Ocultar' : '▼ Ver más'}
                        </button>

                        {estado === 'proxima' && (
                          <button
                            onClick={() => abrirModalCancelar(reserva)}
                            className="flex-1 lg:w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalles expandidos */}
                {estaExpandida && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Detalles completos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Código de reserva:</span>
                          <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 inline-block mt-1">
                            {reserva.id}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 block">Teléfono de contacto:</span>
                          <span className="font-medium">{reserva.telefono}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 block">Tipo de habitación:</span>
                          <span className="font-medium">{reserva.habitacion.tipo}</span>
                        </div>

                        <div>
                          <span className="text-gray-600 block">Capacidad:</span>
                          <span className="font-medium">{reserva.habitacion.capacidad} personas máx.</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 block">Precio por noche:</span>
                          <span className="font-medium">€{reserva.habitacion.precio}</span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 block">Amenidades incluidas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {reserva.habitacion.amenidades.map((amenidad, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {amenidad}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-600 block">Check-in:</span>
                          <span className="font-medium">14:00 hrs</span>
                        </div>

                        <div>
                          <span className="text-gray-600 block">Check-out:</span>
                          <span className="font-medium">12:00 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de confirmación de cancelación */}
      {mostrarModalCancelar && reservaACancelar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Cancelar reserva?
            </h2>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas cancelar la reserva de <strong>{reservaACancelar.habitacion.tipo}</strong> para el {formatearFecha(reservaACancelar.fechaEntrada)}?
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                ⚠️ Esta acción no se puede deshacer. Se reembolsará el monto de €{reservaACancelar.precioTotal} según nuestra política de cancelación.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cerrarModalCancelar}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                No, mantener
              </button>
              <button
                onClick={confirmarCancelacion}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MisReservas;
