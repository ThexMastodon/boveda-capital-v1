<a id="readme-top"></a>

<div align="center">
<h1 align="center">💰 Bóveda Capital</h1>

<p align="center">
<strong>Sistema Integral de Gestión de Préstamos</strong>
<br />
Plataforma de alto rendimiento para la administración de créditos financieros.
<br />
<br />
<a href="#-stack-tecnológico-detallado">Explorar Stack</a>
·
<a href="#-arquitectura-y-principios-solid">Ver Arquitectura</a>
·
<a href="#-soporte-y-contacto">Soporte</a>
</p>
</div>

<!-- PROJECT SHIELDS -->

<div align="center">
<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Laravel-11-FF2D20%3Fstyle%3Dfor-the-badge%26logo%3Dlaravel%26logoColor%3Dwhite" alt="Laravel">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/PostgreSQL-15%2B-316192%3Fstyle%3Dfor-the-badge%26logo%3Dpostgresql%26logoColor%3Dwhite" alt="PostgreSQL">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/TypeScript-5-007ACC%3Fstyle%3Dfor-the-badge%26logo%3Dtypescript%26logoColor%3Dwhite" alt="TypeScript">
</div>
<br />

📖 Acerca de Bóveda Capital

Bóveda Capital es una plataforma integral diseñada para optimizar y asegurar la administración de créditos financieros. Permite una gestión granular de roles, permisos dinámicos y ofrece a los clientes una interfaz altamente intuitiva para monitorear el progreso de sus préstamos en tiempo real.

🚀 Stack Tecnológico Detallado

Nuestra arquitectura está dividida en dos aplicaciones principales que se comunican mediante una API RESTful segura.

💻 Frontend (Interfaz de Usuario)

Next.js 14: Framework de React para el renderizado del lado del servidor (SSR) y optimización de rutas.

TypeScript: Tipado estático para reducir errores en el manejo de montos y cálculos financieros.

Tailwind CSS & Shadcn UI: Sistema de diseño moderno basado en componentes reutilizables y utilitarios.

Framer Motion: Animaciones fluidas para mejorar la experiencia de usuario en transiciones de dashboards.

TanStack Query: Gestión eficiente del estado del servidor, caché y sincronización de datos de préstamos.

React Hook Form + Zod: Validación estricta y segura de formularios de solicitud de crédito.

Sonner: Sistema de notificaciones elegante para avisos de pagos y aprobaciones.

⚙️ Backend (API & Lógica)

Laravel 11: Framework robusto que implementa el patrón MVC y una capa de servicios (Service Layer).

Sanctum: Autenticación ligera para proteger las rutas de la API mediante tokens o cookies.

Spatie Permissions: Gestión de roles (Admin, Asesor, Cliente) y permisos específicos de acción.

Service Layer (SOLID): Lógica de negocio desacoplada para cálculos de tablas de amortización e intereses.

🗄️ Base de Datos (Persistencia)

PostgreSQL: Motor de base de datos relacional de nivel empresarial para garantizar la integridad de las transacciones.

Estructura Relacional: Manejo complejo de usuarios, préstamos, cuotas e historial de pagos mediante claves foráneas y transacciones atómicas.

📂 Estructura del Ecosistema

El proyecto está organizado como un monorepo lógico, separando claramente las responsabilidades del cliente y del servidor:

```text
boveda-capital-v1/
├── 💻 frontend/   # Aplicación Next.js (Client-side UI)
└── ⚙️ backend/    # API RESTful Laravel (Server-side Logic)
```

🛠️ Requisitos del Entorno

Para ejecutar este proyecto en tu entorno local, asegúrate de contar con lo siguiente:

PHP:<code> >= 8.2</code> (con extensiones habilitadas para PostgreSQL).

Node.js:<code> >= 18.x.</code>

Composer: Gestor de dependencias para PHP.

Base de Datos:<code> PostgreSQL 15</code> o superior.

🛡️ Arquitectura y Principios (SOLID)

Este proyecto aplica estrictamente los principios SOLID para garantizar un código limpio, mantenible y escalable a largo plazo:

Responsabilidad Única (SRP): Los controladores únicamente gestionan peticiones HTTP (entrada/salida); la lógica de negocio reside exclusivamente en los Services.

Abierto/Cerrado (OCP): La arquitectura permite añadir nuevos métodos de pago o tipos de préstamos sin alterar el flujo principal del código existente.

Inversión de Dependencias (DIP): Uso extensivo de interfaces (Contracts) para conectar de forma flexible con proveedores externos, como servicios de email o pasarelas de pago.

📧 Soporte y Contacto

Para dudas sobre la integración, despliegue o la lógica financiera:

La documentación técnica detallada de la API está disponible en el directorio <br> <code>backend/docs</code>.
<div style="margin-top:100px;">
</div>
🤝 Top Contributors

<div align="left">
<a href="https://github.com/ThexMastodon">
<img src="https://avatars.githubusercontent.com/u/143536035?s=400&u=5891b1a7a550ac0904751bc94e2132730546c992&v=4" width="80" height="80" style="border-radius: 50%; margin-bottom: 10px;" alt="ThexMastodon Perfil" />
<br />
</a>
</div>

<p align="center">Desarrollado por <strong>Valle Silicon</strong> 💻 para <b>Bóveda Capital</b></p>
