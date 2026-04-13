<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

/**
 * SOLID - Responsabilidad Única: Gestión exclusiva de la definición de permisos.
 */
class PermissionSeeder extends Seeder
{
  public function run(): void
  {
    app()[PermissionRegistrar::class]->forgetCachedPermissions();

    $permissions = [
      // 1. Dashboard Global
      'dashboard.view',

      // 2. Configuración
      'settings.view',

      // 3. Administración de usuarios
      'access.user.list',
      'access.user.create',
      'access.user.edit',
      'access.user.delete',

      // 4. Administración de roles
      'access.role.list',
      'access.role.create',
      'access.role.edit',
      'access.role.delete',

      // 5. Log
      'log.view',

      // 6. Log de movimientos
      'log.security.view',

      // 7. Finanzas - Transacciones
      'finance.transaction.view',

      // 8. Impuestos
      'access.tax.list',
      'access.tax.create',
      'access.tax.edit',
      'access.tax.delete',

      // 9. Plazos
      'access.term.list',
      'access.term.create',
      'access.term.edit',
      'access.term.delete',

      // 10. Mora
      'access.latefee.list',
      'access.latefee.create',
      'access.latefee.edit',
      'access.latefee.delete',

      // 11. Carteras
      'portafolio.view',

      // 12. Clientes
      'access.client.list',
      'access.client.create',
      'access.client.edit',
      'access.client.delete',

      // 13. Reportes
      'access.report.list',
      'access.report.create',
      'access.report.edit',
      'access.report.delete',

      // 14. Auditoría
      'access.audit.list',
      'access.audit.create',
      'access.audit.edit',
      'access.audit.delete',
    ];

    foreach ($permissions as $permission) {
      Permission::firstOrCreate([
        'name'       => $permission,
        'guard_name' => 'web',
      ]);
    }
  }
}