// src/components/ModalReserva.jsx
import React, { useState } from 'react';

function ModalReserva({ habitacion, onClose, onReservar }) {
  const [formData, setFormData] = useState({
    nombreHuesped: '',
    email: '',
    telefono: '',
    fechaEntrada: '',
    fechaSalida: '',
    numeroHuespedes: 1
  });

  const [errores, setErrores] = useState({});

  // Obtener fecha mínima (hoy)
  const fechaMinima = new Date().toISOString().split('T')[0];

  // Calcular número de noches y precio total
  const calcularNoches = () => {
    if (formData.fechaEntrada && formData.fechaSalida) {
      const entrada = new Date(formData.fechaEntrada);
      const salida = new Date(formData.fechaSalida);
      const diferencia = salida - entrada;
      const noches = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      return noches > 0 ? noches : 0;
    }
    return 0;
  };

  const noches = calcularNoches();
  const precioTotal = noches * habitacion.precio;

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombreHuesped.trim()) {
      nuevosErrores.nombreHuesped = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'Email no válido';
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.fechaEntrada) {
      nuevosErrores.fechaEntrada = 'Selecciona la fecha de entrada';
    }

    if (!formData.fechaSalida) {
      nuevosErrores.fechaSalida = 'Selecciona la fecha de salida';
    }

    if (formData.fechaEntrada && formData.fechaSalida) {
      if (new Date(formData.fechaSalida) <= new Date(formData.fechaEntrada)) {
        nuevosErrores.fechaSalida = 'La fecha de salida debe ser posterior a la entrada';
      }
    }

    if (formData.numeroHuespedes > habitacion.capacidad) {
      nuevosErrores.numeroHuespedes = `Máximo ${habitacion.capacidad} huéspedes`;
    }

    if (formData.numeroHuespedes < 1) {
      nuevosErrores.numeroHuespedes = 'Mínimo 1 huésped';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const reserva = {
        ...formData,
        habitacion: habitacion,
        noches: noches,
        precioTotal: precioTotal,
        fecha: new Date().toISOString()
      };
      
      onReservar(reserva);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header del modal con imagen */}
        <div className="relative">
          <img 
            src={habitacion.imagen}
            alt={habitacion.nombre}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-xl" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  {habitacion.icono} {habitacion.nombre}
                </h2>
                <p className="text-blue-200 mt-1 text-lg">${habitacion.precio} por noche</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 text-4xl leading-none bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center transition"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna izquierda - Formulario */}
            <div>
              {/* Información del huésped */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📋 Información del Huésped
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombreHuesped"
                      value={formData.nombreHuesped}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errores.nombreHuesped ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Juan Pérez"
                    />
                    {errores.nombreHuesped && (
                      <p className="text-red-500 text-sm mt-1">{errores.nombreHuesped}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errores.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                    {errores.email && (
                      <p className="text-red-500 text-sm mt-1">{errores.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errores.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+52 999 123 4567"
                    />
                    {errores.telefono && (
                      <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Fechas de la reserva */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📅 Fechas de Estancia
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de entrada *
                    </label>
                    <input
                      type="date"
                      name="fechaEntrada"
                      value={formData.fechaEntrada}
                      onChange={handleChange}
                      min={fechaMinima}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errores.fechaEntrada ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errores.fechaEntrada && (
                      <p className="text-red-500 text-sm mt-1">{errores.fechaEntrada}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de salida *
                    </label>
                    <input
                      type="date"
                      name="fechaSalida"
                      value={formData.fechaSalida}
                      onChange={handleChange}
                      min={formData.fechaEntrada || fechaMinima}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errores.fechaSalida ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errores.fechaSalida && (
                      <p className="text-red-500 text-sm mt-1">{errores.fechaSalida}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Número de huéspedes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  👥 Número de huéspedes *
                </label>
                <input
                  type="number"
                  name="numeroHuespedes"
                  value={formData.numeroHuespedes}
                  onChange={handleChange}
                  min="1"
                  max={habitacion.capacidad}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errores.numeroHuespedes ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Capacidad máxima: {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'personas'}
                </p>
                {errores.numeroHuespedes && (
                  <p className="text-red-500 text-sm mt-1">{errores.numeroHuespedes}</p>
                )}
              </div>
            </div>

            {/* Columna derecha - Resumen */}
            <div>
              {/* Descripción de la habitación */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Sobre esta habitación
                </h3>
                <p className="text-gray-600 mb-4">
                  {habitacion.descripcion}
                </p>
                <div className="space-y-2">
                  {habitacion.amenidades.slice(0, 5).map((amenidad, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>{amenidad}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen de la reserva */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  💰 Resumen de Reserva
                </h3>
                {noches > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Habitación:</span>
                      <span className="font-medium">{habitacion.tipo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precio por noche:</span>
                      <span className="font-medium">${habitacion.precio}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Número de noches:</span>
                      <span className="font-medium">{noches} {noches === 1 ? 'noche' : 'noches'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Huéspedes:</span>
                      <span className="font-medium">{formData.numeroHuespedes} {formData.numeroHuespedes === 1 ? 'persona' : 'personas'}</span>
                    </div>
                    <div className="border-t-2 border-blue-300 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-bold text-lg">Total a pagar:</span>
                        <span className="text-3xl font-bold text-blue-600">${precioTotal}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    Selecciona las fechas para ver el total
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold text-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalReserva;
