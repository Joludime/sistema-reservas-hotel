// src/components/Toast.jsx
import React, { useEffect } from 'react';

function Toast({ mensaje, tipo = 'success', onClose, duracion = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion, onClose]);

  const estilosPorTipo = {
    success: {
      bg: 'bg-green-500',
      icono: '✓',
      borde: 'border-green-600'
    },
    error: {
      bg: 'bg-red-500',
      icono: '✕',
      borde: 'border-red-600'
    },
    warning: {
      bg: 'bg-yellow-500',
      icono: '⚠',
      borde: 'border-yellow-600'
    },
    info: {
      bg: 'bg-blue-500',
      icono: 'ℹ',
      borde: 'border-blue-600'
    }
  };

  const estilo = estilosPorTipo[tipo] || estilosPorTipo.success;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${estilo.bg} text-white px-6 py-4 rounded-lg shadow-lg border-2 ${estilo.borde} flex items-center gap-3 max-w-md`}>
        <span className="text-2xl font-bold">{estilo.icono}</span>
        <p className="flex-1 font-medium">{mensaje}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
