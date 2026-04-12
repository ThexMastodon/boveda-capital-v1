💰 Bóveda Capital - Sistema de Gestión de Préstamos

Bóveda Capital es una plataforma integral de alto rendimiento diseñada para la administración de créditos financieros. Permite la gestión granular de roles, permisos dinámicos y ofrece a los clientes una interfaz intuitiva para monitorear el progreso de sus préstamos en tiempo real.

🚀 Stack Tecnológico Detallado

💻 Frontend (Interfaz de Usuario)

Next.js 14: Framework de React para el renderizado del lado del servidor (SSR) y optimización de rutas.

TypeScript: Tipado estático para reducir errores en el manejo de montos y cálculos financieros.

Tailwind CSS & Shadcn UI: Sistema de diseño moderno basado en componentes reutilizables y utilitarios.

Framer Motion: Animaciones para mejorar la experiencia de usuario en transiciones de dashboards.

TanStack Query: Gestión eficiente del estado del servidor, caché y sincronización de datos de préstamos.

React Hook Form + Zod: Validación estricta de formularios de solicitud de crédito.

Sonner: Sistema de notificaciones elegante para avisos de pagos y aprobaciones.

⚙️ Backend (API & Lógica)

Laravel 11: Framework robusto que implementa el patrón MVC y una capa de servicios (Service Layer).

Sanctum: Autenticación ligera para proteger las rutas de la API mediante tokens o cookies.

Spatie Permissions: Gestión de roles (Admin, Asesor, Cliente) y permisos específicos de acción.

Service Layer (SOLID): Lógica de negocio desacoplada para cálculos de tablas de amortización.

🗄️ Base de Datos (Persistencia)

PostgreSQL: Motor de base de datos relacional de nivel empresarial para garantizar la integridad de las transacciones financieras.

Estructura Relacional: Manejo complejo de usuarios, préstamos, cuotas e historial de pagos mediante claves foráneas y transacciones.

📂 Estructura del Ecosistema

boveda-capital-v1/
├── 💻 frontend/   # Aplicación Next.js (Client-side)
└── ⚙️ backend/    # API RESTful Laravel (Server-side)


🛠️ Requisitos del Entorno

PHP: >= 8.2 con extensiones para PostgreSQL.

Node.js: >= 18.x.

Composer: Gestión de paquetes PHP.

Base de Datos: PostgreSQL 15+.

🛡️ Arquitectura y Principios (SOLID)

Este proyecto aplica los principios SOLID para garantizar escalabilidad:

Responsabilidad Única: Los controladores solo gestionan la entrada/salida; la lógica reside en servicios.

Abierto/Cerrado: Posibilidad de añadir nuevos métodos de pago sin alterar el flujo principal.

Inversión de Dependencias: Uso de interfaces para conectar con proveedores externos (emails, pasarelas de pago).

📧 Soporte y Contacto

Documentación técnica disponible en el directorio backend/docs.
