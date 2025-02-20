# 🎬 Netflix Clone

🚀 [Ver Demo](https://netflix-clone-ten-bice.vercel.app/)

## Descripción General
Este proyecto es una réplica funcional de Netflix, desarrollada como ejercicio de aprendizaje y demostración de habilidades en desarrollo web moderno. La aplicación replica la experiencia visual y funcional de Netflix, incorporando características clave como navegación fluida, gestión de favoritos y una interfaz de usuario responsive.

## ✨ Características Clave

### Interfaz de Usuario
- Diseño fiel al estilo Netflix con tema oscuro y acentos en rojo
- Carruseles dinámicos por categorías de películas
- Sistema de grid para presentación de miniaturas con efectos hover
- Animaciones fluidas en transiciones y efectos de usuario
- Página detallada de películas con información completa

### Funcionalidad
- Búsqueda avanzada de películas con filtros múltiples
- Sistema de favoritos con persistencia local
- Navegación intuitiva entre páginas y secciones
- Carruseles personalizados por categorías
- Integración con API real de películas (TMDb)

## 📸 Capturas de Pantalla

### Página Principal
![Página Principal](/public/screenshots/aaimage.png)
*Vista general de la página principal con carruseles y grid de películas*

### Detalles de Película
![Detalles de Película](/public/screenshots/aaimage4.png)
*Página de detalles mostrando información completa de la película*

### Búsqueda y Filtros
![Búsqueda](/public/screenshots/aaimage3.png)
*Sistema de búsqueda con filtros activos*

### Mi Lista
![Mi Lista](/public/screenshots/aaimage5.png)
*Sección de películas favoritas guardadas*

## 🛠 Tecnologías Utilizadas

### Frontend
- **React + Next.js**: Framework principal para SSR e ISR
- **Tailwind CSS**: Sistema de estilos
- **Zustand**: Gestión de estado
- **Framer Motion**: Biblioteca de animaciones
- **React-Slick**: Componente de carrusel

### Integración y Datos
- **TMDb API**: Fuente de datos de películas
- **LocalStorage**: Persistencia de datos locales

## 💡 Desafíos y Aprendizajes

### Desafíos Superados
- Implementación de carruseles personalizados manteniendo el rendimiento
- Gestión eficiente del estado global con Zustand
- Optimización de rendimiento con SSR e ISR
- Desarrollo de una interfaz fluida y responsive
- Manejo de caché y estados locales para favoritos

### Aprendizajes Clave
- Profundización en Next.js y sus estrategias de renderizado
- Mejores prácticas en la gestión de estado global
- Optimización de rendimiento en aplicaciones React
- Implementación de animaciones complejas
- Desarrollo de componentes reutilizables

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone [https://github.com/AlexCodeNow/Netflix-Clon.git]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Añadir tu API key de TMDb

# Iniciar el servidor de desarrollo
npm run dev
```

## 📝 Requisitos Previos
- Node.js 16.x o superior
- API key de TMDb
- npm o yarn

## 🤝 Contribución
Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📜 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.