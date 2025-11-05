# 🏨 Sistema de Reservas Hotel Lool Beh

Sistema de gestión de reservas de hotel desarrollado con React y Vite, diseñado específicamente para el Hotel Lool Beh en Mérida, Yucatán.

## ✨ Características

- **4 Habitaciones Temáticas** con galerías de fotos reales:
  - 🪷 **Loto** (9 fotos) - $120/noche
  - 🌸 **Dhalia** (7 fotos) - $100/noche
  - 🌺 **Camelia** (7 fotos) - $110/noche
  - 🏵️ **Magnolia** (5 fotos) - $95/noche

- **Galería de Fotos Interactiva** con carrusel de imágenes
- **Sistema de Reservas** completo con validación de formularios
- **Filtros de Búsqueda** por tipo, precio y capacidad
- **Responsive Design** optimizado para todos los dispositivos
- **Interfaz Moderna** con Tailwind CSS

## 🚀 Instalación

### Prerrequisitos
- Node.js v16 o superior
- npm o yarn

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/sistema-reservas-hotel.git
cd sistema-reservas-hotel
```

2. Instalar dependencias:
```bash
cd frontend
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
sistema-reservas-hotel/
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── habitaciones/
│   │           ├── Loto/         # 9 fotos
│   │           ├── Dhalia/       # 7 fotos
│   │           ├── Camelia/      # 7 fotos
│   │           └── Magnolia/     # 5 fotos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ModalReserva.jsx
│   │   │   ├── ModalConfirmacion.jsx
│   │   │   ├── GaleriaHabitacion.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Inicio.jsx
│   │   │   ├── Habitaciones.jsx
│   │   │   └── MisReservas.jsx
│   │   ├── data/
│   │   │   └── habitaciones.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Componentes Principales

### Inicio (HomePage)
- Hero banner con imagen de fondo
- Grid de las 4 habitaciones con fotos reales
- Características destacadas del hotel
- Sección de estadísticas
- Call to action

### Habitaciones
- Filtros avanzados (tipo, precio, capacidad)
- Cards de habitaciones con galerías
- Vista previa con hover effects
- Botón de "Ver Fotos" para abrir galería completa

### Galería de Habitación
- Carrusel de imágenes a pantalla completa
- Navegación con flechas
- Miniaturas clickeables
- Información detallada de la habitación
- Botón directo para reservar

### Modal de Reserva
- Formulario completo con validación
- Campos: nombre, email, teléfono, fechas, huéspedes
- Cálculo automático de noches y precio total
- Vista previa de la habitación seleccionada
- Resumen detallado de la reserva

### Mis Reservas
- Lista de todas las reservas realizadas
- Información detallada de cada reserva
- Opción para cancelar reservas
- Persistencia de datos en localStorage

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de JavaScript
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Framework de CSS
- **React Hooks** - useState para gestión de estado
- **LocalStorage** - Persistencia de reservas

## 📸 Gestión de Imágenes

Las imágenes de las habitaciones están organizadas en:
```
/public/images/habitaciones/[NombreHabitacion]/
```

Cada habitación tiene su propia carpeta con múltiples fotos que incluyen:
- Vistas generales de la habitación
- Detalles del baño
- Vistas del balcón (cuando aplica)
- Amenidades

## 🔧 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Crear build de producción
npm run build

# Previsualizar build
npm run preview

# Lint del código
npm run lint
```

## 📝 Funcionalidades Futuras

- [ ] Backend con Node.js y Express
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Sistema de pagos
- [ ] Envío de correos de confirmación
- [ ] Calendario de disponibilidad en tiempo real
- [ ] Integración con sistemas de pago

## 👨‍💻 Desarrollo

Proyecto desarrollado para el Hotel Lool Beh en Mérida, Yucatán.

## 📄 Licencia

Este proyecto es privado y está protegido por derechos de autor.

---

**Hotel Lool Beh** - Mérida, Yucatán, México 🇲🇽
