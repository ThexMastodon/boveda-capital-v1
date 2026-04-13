<a id="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
<a href="https://nextjs.org" target="_blank">
<img src="https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/templates/app/app/favicon.ico" alt="Logo" width="80" height="80">
</a>

<h3 align="center">💻 Bóveda Capital - Frontend</h3>

<p align="center">
Interfaz de usuario de alto rendimiento para la gestión de préstamos.
<br />
Construida con Next.js 14 y una arquitectura basada en principios <i>SOLID</i>.
<br />
<br />
<a href="#instalación-y-uso"><strong>Empezar »</strong></a>
·
<a href="#arquitectura-de-carpetas">Ver Arquitectura</a>
</p>
</div>

<!-- PROJECT SHIELDS -->

<div align="center">
<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
<img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React">
<img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</div>
<br />

🚀 Acerca del Proyecto

Este cliente ha sido desarrollado para ofrecer una experiencia de usuario (UX) excepcional en el sector financiero. Se enfoca en la claridad de los datos, la validación estricta y animaciones fluidas para el seguimiento de créditos.

Navegación Intuitiva: Sistema de rutas optimizado con App Router.

Validación Robusta: Uso de Zod y React Hook Form para garantizar la integridad de datos financieros.

Estado Asíncrono: Gestión inteligente de caché mediante TanStack Query para una interfaz sin tiempos de carga innecesarios.

Diseño Responsivo: Componentes adaptables y accesibles construidos con Shadcn UI.

🛠️ Instalación y Uso

Sigue estos sencillos pasos para configurar una copia local del proyecto y ponerla en marcha.

Requisitos Previos

Lista de herramientas que necesitas tener instaladas en tu entorno local.

npm
```sh
npm install npm@latest -g
```

Instalación

Clona el repositorio (Ajusta la URL a tu repositorio real)
```sh
git clone https://github.com/tu_usuario/boveda-capital-v1.git
```

Navega al directorio del frontend
```sh
cd frontend
```

Instala los paquetes de NPM
```sh
npm install
```

Configura tus variables de entorno creando un archivo .env.local
```sh
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Inicia el servidor de desarrollo
```sh
npm run dev
```


📂 Arquitectura de Carpetas

El proyecto sigue una estructura modular diseñada para escalar de forma limpia:
```text
frontend/
├── app/                # App Router: Rutas, Layouts globales y Páginas
├── components/         # Componentes UI (React)
│   ├── ui/             # Componentes atómicos e independientes (Shadcn UI)
│   └── shared/         # Componentes de negocio reutilizables
├── hooks/              # Custom hooks y lógica de validación
├── lib/                # Utilidades, configuración de Axios y esquemas
├── services/           # Capa de servicios: peticiones HTTP (API Laravel)
├── types/              # Interfaces y tipos globales de TypeScript
└── public/             # Recursos estáticos (imágenes, SVG)
```

🎨 Estética y Diseño

Mantenemos una estética minimalista y profesional utilizando Tailwind CSS.
Las micro-interacciones se gestionan con Framer Motion y las notificaciones globales del sistema con Sonner, asegurando un feedback constante, claro y elegante hacia el usuario final.
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
