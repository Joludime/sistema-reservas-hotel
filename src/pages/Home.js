import React from 'react';
import { Link } from 'react-router-dom';
import { MIN_NIGHTS, PRICE_PER_NIGHT } from '../data/rooms';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Bienvenido a Hotel Reservas
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Tu destino perfecto para una estancia inolvidable
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold mb-2">Precio por Noche</h3>
          <p className="text-3xl font-bold text-blue-600">${PRICE_PER_NIGHT} MXN</p>
          <p className="text-gray-600 mt-2">Todas las habitaciones al mismo precio</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-bold mb-2">Estancia Mínima</h3>
          <p className="text-3xl font-bold text-blue-600">{MIN_NIGHTS} noches</p>
          <p className="text-gray-600 mt-2">Reserva mínima requerida</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4">🏨</div>
          <h3 className="text-xl font-bold mb-2">Habitaciones</h3>
          <p className="text-3xl font-bold text-blue-600">4 tipos</p>
          <p className="text-gray-600 mt-2">Para todos los gustos</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/rooms"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition inline-block"
        >
          Ver Habitaciones Disponibles
        </Link>
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <span className="text-2xl mr-4">✅</span>
            <div>
              <h4 className="font-bold mb-2">Precio Justo</h4>
              <p className="text-gray-600">Todas las habitaciones a solo $500 MXN por noche</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✅</span>
            <div>
              <h4 className="font-bold mb-2">Ubicación Céntrica</h4>
              <p className="text-gray-600">En el corazón de Mérida, Yucatán</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✅</span>
            <div>
              <h4 className="font-bold mb-2">Servicio de Calidad</h4>
              <p className="text-gray-600">Atención personalizada las 24 horas</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-4">✅</span>
            <div>
              <h4 className="font-bold mb-2">Instalaciones Modernas</h4>
              <p className="text-gray-600">Habitaciones equipadas con todo lo necesario</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;