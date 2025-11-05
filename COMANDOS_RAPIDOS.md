# 🚀 Comandos Rápidos - Hotel Lool Beh

## Comandos para Desarrollo Local

### Iniciar el proyecto
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm run dev
```
Abre: http://localhost:5173

### Detener el servidor
Presiona `Ctrl + C` en la terminal

### Instalar dependencias (si es necesario)
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm install
```

### Crear build de producción
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm run build
```

## Comandos de Git (Subir a GitHub)

### Primera vez (Inicializar repositorio)
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
git init
git add .
git commit -m "Initial commit: Sistema de reservas Hotel Lool Beh"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sistema-reservas-hotel.git
git push -u origin main
```

### Actualizaciones posteriores
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
git add .
git commit -m "Descripción de los cambios"
git push
```

### Ver estado actual
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

## Verificar Archivos del Proyecto

### Ver estructura de carpetas
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
tree -L 3
```

### Contar fotos por habitación
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend/public/images/habitaciones
ls -R | grep ".jpg" | wc -l
```

### Ver todas las fotos
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend/public/images/habitaciones
find . -name "*.jpg" -o -name "*.jpeg" -o -name "*.png"
```

## Comandos de Optimización

### Limpiar cache de npm
```bash
npm cache clean --force
```

### Reinstalar dependencias
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
rm -rf node_modules package-lock.json
npm install
```

### Verificar versión de Node
```bash
node --version
npm --version
```

## Atajos de Terminal (Mac)

- `Cmd + T` - Nueva pestaña
- `Cmd + K` - Limpiar terminal
- `Ctrl + C` - Detener proceso
- `Ctrl + L` - Limpiar pantalla
- `↑` - Comando anterior
- `Tab` - Autocompletar

## Rutas Importantes

### Proyecto
```
/Users/josel.diaz/sistema-reservas-hotel
```

### Frontend
```
/Users/josel.diaz/sistema-reservas-hotel/frontend
```

### Fotos de Habitaciones
```
/Users/josel.diaz/sistema-reservas-hotel/frontend/public/images/habitaciones
```

### Componentes
```
/Users/josel.diaz/sistema-reservas-hotel/frontend/src/components
```

### Páginas
```
/Users/josel.diaz/sistema-reservas-hotel/frontend/src/pages
```

## Verificación Rápida del Proyecto

### ✅ Checklist antes de subir a GitHub
```bash
# 1. Verificar que el proyecto funciona
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm run dev

# 2. Verificar que las fotos están en su lugar
ls frontend/public/images/habitaciones/*/

# 3. Verificar que no hay errores
npm run build

# 4. Ver qué archivos se van a subir
git status
```

## Abrir el Proyecto en Editores

### Visual Studio Code
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
code .
```

### Abrir en Finder
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
open .
```

## Comandos de Mantenimiento

### Actualizar dependencias
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm update
```

### Ver versiones de dependencias
```bash
npm list --depth=0
```

### Buscar vulnerabilidades
```bash
npm audit
```

### Corregir vulnerabilidades
```bash
npm audit fix
```

## Solución de Problemas Comunes

### Puerto ya en uso
```bash
# Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9
```

### Error de permisos
```bash
sudo chown -R $USER /Users/josel.diaz/sistema-reservas-hotel
```

### Node modules corrupto
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
rm -rf node_modules package-lock.json
npm install
```

## Comandos de Despliegue

### Vercel (después de conectar GitHub)
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm install -g vercel
vercel login
vercel
```

### Netlify
```bash
cd /Users/josel.diaz/sistema-reservas-hotel/frontend
npm run build
# Luego arrastra la carpeta 'dist' a netlify.com
```

---

## 📱 Accesos Rápidos

**Localhost**: http://localhost:5173
**GitHub**: https://github.com/TU-USUARIO/sistema-reservas-hotel

---

**💡 Tip**: Guarda este archivo en tu escritorio o en marcadores para acceso rápido!
