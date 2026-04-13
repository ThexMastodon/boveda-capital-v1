<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

/**
 * SOLID - Responsabilidad Única: Definición de perfiles y asignación de capacidades.
 * Este Seeder organiza los permisos en roles funcionalidades para el negocio.
 */

class RoleSeeder extends Seeder
{
  public function run(): void
  {
    //1. Super Administrador: Control total sobre el sistema.
    $admin = Role::updateOrCreate([
      'name'       => 'Super Admin',
      'guard_name' => 'web',
    ]);
    $admin->syncPermissions(Permission::all());

    // 2. ASESOR DE CARTERA: Gestión operativa y registro de clientes
    $asesor = Role::firstOrCreate([
      'name'       => 'asesor',
      'guard_name' => 'web'
    ]);
    $asesor->syncPermissions([
      'dashboard.view',
      'portafolio.view',
      'access.client.list',
      'access.client.create',
      'access.client.edit',
      'finance.transaction.view',
      'access.report.list',
      'access.term.list',
    ]);

    // 3. AUDITOR: Especializado en seguridad, logs y validación financiera
    $auditor = Role::firstOrCreate([
      'name'       => 'auditor',
      'guard_name' => 'web'
    ]);
    $auditor->syncPermissions([
      'dashboard.view',
      'log.view',
      'log.security.view',
      'access.audit.list',
      'access.report.list',
      'access.report.edit',
      'finance.transaction.view',
    ]);

    // 4. CONFIGURADOR FINANCIERO (Opcional): Especialista en tasas e impuestos
    $configurador = Role::firstOrCreate([
      'name'       => 'config_manager',
      'guard_name' => 'web'
    ]);
    $configurador->syncPermissions([
      'settings.view',
      'access.tax.list',
      'access.tax.create',
      'access.tax.edit',
      'access.term.list',
      'access.term.edit',
      'access.latefee.list',
      'access.latefee.edit',
    ]);

    // 5. CLIENTE: Acceso de consulta sobre su propia situación crediticia
    $cliente = Role::firstOrCreate([
      'name'       => 'cliente',
      'guard_name' => 'web'
    ]);
    $cliente->syncPermissions([
      'dashboard.view',
      'portafolio.view',
    ]);
  }
}