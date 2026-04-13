<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

/**
 * SOLID - Responsabilidad Única: Población de la estructura de navegación del sistema.
 * Organiza los 14 puntos de gestión en una jerarquía de Módulos y Submódulos.
 */
class ModuleSeeder extends Seeder
{
  public function run(): void
  {
    // --- 1. DASHBOARD GLOBAL ---
    Module::updateOrCreate([
      'name'       => 'Dashboard',
      'slug'       => '/dashboard',
      'icon'       => 'LayoutDashboard',
      'permission' => 'dashboard.view',
      'order'      => 1
    ]);

    // --- 2. ADMINISTRACIÓN DE ACCESOS ---
    $access = Module::updateOrCreate([
      'name'       => 'Administración',
      'slug'       => 'access',
      'icon'       => 'ShieldLock',
      'permission' => 'settings.view',
      'order'      => 2
    ]);

    Module::updateOrCreate([
      'name'       => 'Gestión de Personal',
      'slug'       => '/access/users',
      'icon'       => 'Users',
      'permission' => 'access.user.list',
      'parent_id'  => $access->id,
      'order'      => 1
    ]);

    Module::updateOrCreate([
      'name'       => 'Roles y Permisos',
      'slug'       => '/access/roles',
      'icon'       => 'Key',
      'permission' => 'access.role.list',
      'parent_id'  => $access->id,
      'order'      => 2
    ]);

    Module::updateOrCreate([
      'name'       => 'Seguridad (Logs)',
      'slug'       => '/access/logs',
      'icon'       => 'Activity',
      'permission' => 'log.security.view',
      'parent_id'  => $access->id,
      'order'      => 3
    ]);

    // --- 3. CONFIGURACIÓN DE NEGOCIO ---
    $config = Module::updateOrCreate([
      'name'       => 'Configuración',
      'slug'       => 'settings',
      'icon'       => 'Settings',
      'permission' => 'settings.view',
      'order'      => 3
    ]);

    Module::updateOrCreate([
      'name'      => 'Impuestos',
      'slug'      => '/settings/taxes',
      'icon'      => 'Percent',
      'permission'=> 'access.tax.list',
      'parent_id' => $config->id,
      'order'     => 1
    ]);

    Module::updateOrCreate([
      'name'      => 'Plazos',
      'slug'      => '/settings/terms',
      'icon'      => 'CalendarClock',
      'permission'=> 'access.term.list',
      'parent_id' => $config->id,
      'order'     => 2
    ]);

    Module::updateOrCreate([
      'name'      => 'Moras',
      'slug'      => '/settings/late-fees',
      'icon'      => 'AlertCircle',
      'permission'=> 'access.latefee.list',
      'parent_id' => $config->id,
      'order'     => 3
    ]);

    // --- 4. MÓDULO DE CARTERA ---
    $portfolio = Module::updateOrCreate([
      'name'       => 'Cartera',
      'slug'       => 'portfolio',
      'icon'       => 'Briefcase',
      'permission' => 'portafolio.view',
      'order'      => 4
    ]);

    Module::updateOrCreate([
      'name'      => 'Registro de Clientes',
      'slug'      => '/portfolio/clients',
      'icon'      => 'UserPlus',
      'permission'=> 'access.client.list',
      'parent_id' => $portfolio->id,
      'order'     => 1
    ]);

    Module::updateOrCreate([
      'name'      => 'Gestión de Créditos',
      'slug'      => '/portfolio/loans',
      'icon'      => 'Banknote',
      'permission'=> 'portafolio.view',
      'parent_id' => $portfolio->id,
      'order'     => 2
    ]);

    // --- 5. REPORTES Y FINANZAS ---
    $reports = Module::updateOrCreate([
      'name'       => 'Reportes y Finanzas',
      'slug'       => 'reports',
      'icon'       => 'BarChart3',
      'permission' => 'access.report.list',
      'order'      => 5
    ]);

    Module::updateOrCreate([
      'name'      => 'Balance General',
      'slug'      => '/reports/accounting',
      'icon'      => 'FileSpreadsheet',
      'permission'=> 'access.report.list',
      'parent_id' => $reports->id,
      'order'     => 1
    ]);

    Module::updateOrCreate([
      'name'      => 'Auditoría',
      'slug'      => '/reports/audit',
      'icon'      => 'SearchCheck',
      'permission'=> 'access.audit.list',
      'parent_id' => $reports->id,
      'order'     => 2
    ]);
  }
}