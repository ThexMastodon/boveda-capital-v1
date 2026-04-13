<div align="center">
<a href="https://laravel.com" target="_blank">
<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" alt="Laravel Logo" width="200">
</a>

<h3 align="center">⚙️ Bóveda Capital - Backend API</h3>

<p align="center">
Núcleo del sistema encargado de la lógica financiera, seguridad mediante roles y persistencia de datos.
<br />
Construido con Laravel 11 y arquitectura orientada a servicios (SOLID).
<br />
<br />
<a href="#instalación-y-configuración"><strong>Empezar »</strong></a>
·
<a href="#arquitectura-de-carpetas">Ver Arquitectura</a>
</p>
</div>

<!-- PROJECT SHIELDS (TÉCNICA INFALIBLE HTML) -->

<p align="center">
<a href="https://laravel.com"><img src="https://camo.githubusercontent.com/ef1a47276589247efdac6efd0565c453aca43ffe33e335c5b197952fb565f33e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c61726176656c2d4646324432303f7374796c653d666c6174266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465" alt="Laravel" /></a>
<a href="https://www.postgresql.org/"><img src="https://camo.githubusercontent.com/5794ccb4a02205d87eff2d4743c7e63b63f5b6ba67b8821b1ccf7108d2a25e03/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3431363945313f7374796c653d666c6174266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465" alt="PostgreSQL" /></a>
<a href="https://www.php.net/"><img src="https://camo.githubusercontent.com/bbeaca4ecdd74d3fde840f711ebb8a5def2ff801187623f9bc365761b3b66f86/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7068702d2532333737374242342e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d706870266c6f676f436f6c6f723d7768697465" alt="PHP" /></a>
</p>
<br />

📖 Acerca del Backend

El backend de Bóveda Capital es una API RESTful robusta que actúa como el motor principal del sistema de préstamos. Se encarga de procesar cálculos financieros complejos, gestionar la autenticación de usuarios y asegurar que todas las transacciones cumplan con las reglas de negocio establecidas.

Arquitectura Limpia: Implementación de Service Pattern para desacoplar la lógica de negocio de los controladores.

Seguridad: Autenticación basada en tokens con Laravel Sanctum y control de acceso granular con Spatie Permissions.

Integridad de Datos: Uso de migraciones, transacciones de base de datos y claves foráneas estrictas en PostgreSQL.

🛠️ Instalación y Configuración

Sigue estos pasos para levantar el servidor de la API en tu entorno local.

Requisitos Previos

PHP: versión <code>>= 8.2</code> con las extensiones <code>pdo_pgsql</code> y <code>mbstring</code> habilitadas.

Composer: Gestor de dependencias de PHP.

PostgreSQL: Base de datos instalada y en ejecución.
<div style="margin-top:100px;"/>
<br>
<br>
<br> 
<b>💻 Instalación</b>
    
Navega al directorio del backend
```sh
cd backend
```

Instala las dependencias de PHP mediante Composer
```sh
composer install
```

Crea tu archivo de entorno a partir del ejemplo proporcionado
```sh
cp .env.example .env
```

Genera la clave de encriptación de la aplicación
```sh
php artisan key:generate
```

Configura tu conexión a la base de datos en el archivo <code>.env</code>. Asegúrate de que los valores coincidan con tu servidor PostgreSQL:
```text
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=boveda_capital_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

Ejecuta las migraciones (y opcionalmente los seeders para datos de prueba)
```sh
php artisan migrate --seed
```

Inicia el servidor de desarrollo local
```sh
php artisan serve
```
<br>
<br>
<br>
💡 La API estará disponible en <code>http://localhost:8000</code>.
<br>
<br>
<br>
📂 Arquitectura de Carpetas

La estructura interna se ha adaptado para separar claramente las responsabilidades, siguiendo principios SOLID:

```text
backend/
├── app/
│   ├── Contracts/        # Interfaces (Contratos) para los servicios.
│   ├── Services/         # Lógica de negocio (Cálculos de intereses, amortizaciones).
│   ├── Http/
│   │   ├── Controllers/  # Controladores ligeros (solo delegan a los Services).
│   │   └── Requests/     # Form Requests para validación de entrada.
│   └── Models/           # Modelos de Eloquent con relaciones financieras.
├── database/
│   ├── migrations/       # Estructura y evolución de la base de datos.
│   └── seeders/          # Datos semilla (roles iniciales, admin por defecto).
├── routes/
│   └── api.php           # Único punto de entrada para el frontend Next.js.
└── tests/                # Pruebas unitarias y de integración (PHPUnit).
```

<br>
<br>
<br>
🛡️ Seguridad y Permisos

Utilizamos Spatie Laravel Permission para gestionar el acceso basado en roles (RBAC). El sistema contempla por defecto:

Administrador: Acceso total al sistema, gestión de usuarios, aprobación/rechazo de préstamos y configuración de tasas.

Asesor: Gestión de solicitudes de préstamos de clientes asignados y seguimiento de pagos.

Cliente: Acceso restringido únicamente a la consulta del estado de sus propios créditos e historial de pagos.

<br>
<br>
<br>
🧪 Comandos Útiles

Tabla de referencia rápida para el desarrollo diario:
| Comando | Descripción |
|--------|------------|
| php artisan migrate | Aplica nuevas migraciones a la base de datos. |
| php artisan migrate:fresh --seed | Borra todas las tablas, migra de cero y carga los datos de prueba. |
| php artisan make:service LoanService | (Custom) Genera una nueva clase de servicio en app/Services. |
| php artisan route:list | Muestra la lista completa de endpoints registrados en la API. |
| php artisan optimize:clear | Limpia la caché de configuración, rutas y vistas. |

<br>
<br>
🤝 Top Contributors

<div align="left">
<a href="https://github.com/ThexMastodon">
<img src="https://avatars.githubusercontent.com/u/143536035?s=400&u=5891b1a7a550ac0904751bc94e2132730546c992&v=4" width="80" height="80" style="border-radius: 50%; margin-bottom: 10px;" alt="ThexMastodon Perfil" />
<br />
</a>
</div>

<p align="center">Desarrollado por <strong>Valle Silicon</strong> 💻 para <b>Bóveda Capital</b></p>
