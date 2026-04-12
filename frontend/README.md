💻 Bóveda Capital - Frontend (Next.js)

Este es el cliente del sistema de gestión de préstamos, desarrollado con un enfoque en interfaces de usuario modernas, animaciones fluidas y validaciones estrictas de datos.

🚀 Stack Tecnológico

🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el entorno de desarrollo:

1. Clonación y Dependencias

cd frontend
npm install


2. Variables de Entorno

Crea un archivo .env.local en la raíz de esta carpeta:

NEXT_PUBLIC_API_URL=http://localhost:8000/api


3. Ejecución

npm run dev


La aplicación se ejecutará en http://localhost:3000.

📂 Estructura de Carpetas

Siguiendo el modelo SOLID, el código se organiza de la siguiente manera:

app/: Rutas, layouts y páginas principales (App Router).

components/: Componentes de UI reutilizables (Shadcn UI + Custom).

hooks/: Lógica de validación con react-hook-form y estado de UI.

lib/: Configuraciones de Axios para Sanctum y esquemas de Zod.

services/: Capa de comunicación con la API (Peticiones asíncronas).

types/: Interfaces de TypeScript para Préstamos, Usuarios y Pagos.

✨ Características Principales

Validación de Campos: Implementada con Zod y React Hook Form para asegurar que los datos financieros sean correctos antes de enviarlos.

Experiencia Visual: Transiciones suaves y dashboards dinámicos creados con Framer Motion.

Gestión de Datos: Sincronización en tiempo real del estado de los préstamos mediante TanStack Query.

Notificaciones: Feedback instantáneo mediante Sonner para acciones exitosas o errores.

🧪 Scripts Disponibles

npm run dev: Inicia el servidor de desarrollo.

npm run build: Prepara la aplicación para producción.

npm run start: Inicia la aplicación compilada.

npm run lint: Ejecuta el análisis de código estático.

🎨 Guía de Estilo

Se utiliza Tailwind CSS para un diseño responsivo. Los componentes base se encuentran en la carpeta components/ui/, gestionados por Shadcn.
