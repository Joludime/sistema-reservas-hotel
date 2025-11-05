# 📤 Guía para Subir el Proyecto a GitHub

## Pasos para Subir el Proyecto

### 1. Verificar que Git esté instalado
Abre la terminal y ejecuta:
```bash
git --version
```

Si no está instalado, descárgalo de: https://git-scm.com/

### 2. Inicializar el repositorio Git (si no está inicializado)
```bash
cd /Users/josel.diaz/sistema-reservas-hotel
git init
```

### 3. Configurar tu usuario de Git (si no lo has hecho)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 4. Agregar todos los archivos al staging
```bash
git add .
```

### 5. Hacer el primer commit
```bash
git commit -m "Initial commit: Sistema de reservas Hotel Lool Beh con fotos de habitaciones"
```

### 6. Crear un repositorio en GitHub

1. Ve a https://github.com
2. Inicia sesión en tu cuenta
3. Click en el botón "+" en la esquina superior derecha
4. Selecciona "New repository"
5. Nombre del repositorio: `sistema-reservas-hotel` o `hotel-lool-beh`
6. Descripción: "Sistema de gestión de reservas para Hotel Lool Beh en Mérida, Yucatán"
7. Selecciona "Private" (para que sea privado) o "Public" (para que sea público)
8. NO marques "Initialize this repository with a README" (ya tenemos uno)
9. Click en "Create repository"

### 7. Conectar tu repositorio local con GitHub

GitHub te mostrará comandos, pero aquí están los pasos:

```bash
git remote add origin https://github.com/TU-USUARIO/sistema-reservas-hotel.git
git branch -M main
git push -u origin main
```

**Reemplaza** `TU-USUARIO` con tu nombre de usuario de GitHub.

### 8. Verificar que se subió correctamente

Ve a tu repositorio en GitHub:
```
https://github.com/TU-USUARIO/sistema-reservas-hotel
```

Deberías ver todos los archivos, incluyendo:
- ✅ Carpeta `frontend/` con el código
- ✅ Carpeta `frontend/public/images/habitaciones/` con las 4 carpetas de fotos
- ✅ README.md con la documentación
- ✅ .gitignore

## 📦 Contenido del Repositorio

El repositorio incluye:
- **28 fotos** en total de las 4 habitaciones
- Código completo del frontend
- Componentes React (Navbar, Modales, Galería, etc.)
- Estilos con Tailwind CSS
- Documentación completa

## 🔄 Para Futuras Actualizaciones

Cuando hagas cambios al proyecto:

```bash
# 1. Verificar qué archivos cambiaron
git status

# 2. Agregar los cambios
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# 4. Subir los cambios a GitHub
git push
```

## ⚠️ Notas Importantes

1. **Tamaño de las imágenes**: GitHub tiene un límite de 100MB por archivo. Verifica que ninguna foto sea muy pesada.

2. **Imágenes grandes**: Si las fotos son muy pesadas, considera optimizarlas antes de subirlas:
   - Usa herramientas como TinyPNG, ImageOptim, o Squoosh
   - Tamaño recomendado: máximo 500KB por foto

3. **Repositorio privado**: Si quieres que sea privado (recomendado al inicio), selecciona "Private" al crear el repo.

4. **Colaboradores**: Puedes agregar colaboradores en Settings > Collaborators

5. **.gitignore**: Ya está configurado para no subir:
   - node_modules/
   - archivos de configuración local
   - archivos del sistema (.DS_Store)

## 🚀 Desplegar el Proyecto en Producción

Una vez en GitHub, puedes desplegarlo en:

### Vercel (Recomendado para React)
1. Ve a https://vercel.com
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `sistema-reservas-hotel`
4. Configura el directorio raíz como `frontend`
5. Click en "Deploy"

### Netlify
1. Ve a https://netlify.com
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio
4. Build command: `npm run build`
5. Publish directory: `frontend/dist`
6. Click en "Deploy"

## 📞 Ayuda

Si tienes problemas:
1. Verifica que estás en el directorio correcto
2. Revisa que Git esté configurado correctamente
3. Asegúrate de tener permisos en GitHub
4. Si hay conflictos, usa `git status` para ver el estado

---

**¡Listo!** Tu proyecto está ahora en GitHub y puede ser compartido, clonado o desplegado en producción. 🎉
