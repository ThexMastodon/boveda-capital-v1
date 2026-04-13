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
<p align="center">
<a href="https://nextjs.org"><img src="https://camo.githubusercontent.com/4bef23a1a1689acb39f94f4c6825652d0ed4cd6dcb036c45b937b450b1df2add/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6578742e6a732d3030303030303f7374796c653d666c6174266c6f676f3d6e657874646f746a73266c6f676f436f6c6f723d7768697465" alt="Next.js" /></a>
<a href="https://laravel.com"><img src="https://camo.githubusercontent.com/ef1a47276589247efdac6efd0565c453aca43ffe33e335c5b197952fb565f33e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c61726176656c2d4646324432303f7374796c653d666c6174266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465" alt="Laravel" /></a>
<a href="https://www.postgresql.org/"><img src="https://camo.githubusercontent.com/5794ccb4a02205d87eff2d4743c7e63b63f5b6ba67b8821b1ccf7108d2a25e03/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3431363945313f7374796c653d666c6174266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465" alt="PostgreSQL" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://camo.githubusercontent.com/88bfa9b403be10c356cf83cf1442ec12359f294d36cb6826f1254ac126a718f3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465" alt="TypeScript" /></a>
</p>
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
