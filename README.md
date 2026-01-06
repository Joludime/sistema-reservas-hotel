# 🏨 Sistema de Reservas para Hoteles

Sistema web desarrollado con **React** y **TailwindCSS** para gestionar reservas de hotel con interfaz moderna e intuitiva.

## ✨ Características Implementadas

- ✅ **Precio único:** Todas las habitaciones a **$500 MXN por noche**
- ✅ **Estancia mínima:** Se requieren al menos **2 noches** para realizar una reserva
- ✅ 4 tipos de habitaciones disponibles (Individual, Doble, Suite Familiar, Suite de Lujo)
- ✅ Galería de imágenes para cada habitación
- ✅ Formulario de reservas con validación
- ✅ Cálculo automático del total según las noches
- ✅ Gestión de reservas (crear y cancelar)
- ✅ Diseño responsivo para móviles y tablets
- ✅ Navegación con React Router

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| ⚛️ **React** | Librería para interfaces interactivas |
| ⚡ **Vite/Create React App** | Herramienta de desarrollo |
| 🎨 **TailwindCSS** | Framework CSS moderno |
| 🧭 **React Router** | Navegación entre páginas |
| 💾 **LocalStorage** | Almacenamiento de reservas |

---

## ⚙️ Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Joludime/sistema-reservas-hotel.git

# 2. Entrar a la carpeta del proyecto
cd sistema-reservas-hotel

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm start
```

Abre tu navegador en: 👉 **http://localhost:3000**

---

## 🏗️ Estructura del Proyecto

```
sistema-reservas-hotel/
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.js       # Barra de navegación
│   │   ├── RoomCard.js     # Tarjeta de habitación
│   │   └── ReservationModal.js  # Modal de reserva
│   │
│   ├── pages/              # Páginas principales
│   │   ├── Home.js         # Página de inicio
│   │   ├── Rooms.js        # Catálogo de habitaciones
│   │   └── Reservations.js # Gestión de reservas
│   │
│   ├── data/
│   │   └── rooms.js        # Datos de habitaciones
│   │
│   ├── App.js              # Componente principal con rutas
│   └── index.js            # Punto de entrada
│
├── public/
│   └── images/             # Imágenes de habitaciones
│
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 💰 Configuración de Precios

El sistema está configurado con:
- **Precio por noche:** $500 MXN (todas las habitaciones)
- **Estancia mínima:** 2 noches

Estos valores están definidos en `src/data/rooms.js`:

```javascript
export const MIN_NIGHTS = 2;
export const PRICE_PER_NIGHT = 500;
```

Para modificarlos, edita estos valores en el archivo mencionado.

---

## 🖥️ Páginas del Sistema

### 1. **Inicio** (`/`)
- Información general del hotel
- Destacado de precio y políticas
- Botón para ver habitaciones

### 2. **Habitaciones** (`/rooms`)
- Catálogo de 4 tipos de habitaciones
- Galería de imágenes navegable
- Detalles de amenidades
- Botón de reserva

### 3. **Mis Reservas** (`/reservations`)
- Lista de todas las reservas
- Detalles completos de cada reserva
- Opción para cancelar reservas

---

## 📋 Proceso de Reserva

1. Usuario navega al catálogo de habitaciones
2. Selecciona la habitación deseada
3. Completa el formulario con:
   - Nombre completo
   - Email
   - Teléfono
   - Fechas de entrada y salida
4. El sistema valida:
   - Que todos los campos estén completos
   - Que la estancia sea de **al menos 2 noches**
5. Se muestra el cálculo del total
6. Al confirmar, la reserva se guarda localmente
7. Redirección a la página de reservas

---

## 🎨 Habitaciones Disponibles

| Habitación | Capacidad | Precio/Noche |
|------------|-----------|--------------|
| Individual | 1 persona | $500 MXN |
| Doble | 2 personas | $500 MXN |
| Suite Familiar | 4 personas | $500 MXN |
| Suite de Lujo | 2 personas | $500 MXN |

---

## 🌐 Despliegue

Para desplegar el proyecto en producción:

### Opción 1: Netlify
```bash
npm run build
# Arrastra la carpeta 'build' a Netlify
```

### Opción 2: Vercel
```bash
npm install -g vercel
vercel
```

### Opción 3: GitHub Pages
```bash
npm install gh-pages --save-dev
# Agregar en package.json:
# "homepage": "https://Joludime.github.io/sistema-reservas-hotel"
npm run build
npm run deploy
```

---

## 🔄 Próximas Mejoras

- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB/Firebase)
- [ ] Panel de administración
- [ ] Integración con pagos
- [ ] Sistema de autenticación
- [ ] Imágenes reales de habitaciones
- [ ] Disponibilidad en tiempo real
- [ ] Notificaciones por email

---

## 👨‍💻 Autor

**José L. Díaz** (Joludime)  
📍 Mérida, Yucatán, México  
🔗 [GitHub](https://github.com/Joludime)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.  
Puedes usarlo, modificarlo y distribuirlo libremente.

---

✨ **Desarrollado con pasión por José L. Díaz**
