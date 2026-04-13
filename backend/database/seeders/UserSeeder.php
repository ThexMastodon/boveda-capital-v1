<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  public function run(): void
  {
    //1. Super Admin: Usuario con acceso total al sistema.
    $admin = User::updateOrCreate(
      ['email' => 'administrador.capital@bovedacapital.com'],
      [
        'name'     => 'Administrador',
        'last_name' => 'Capital',
        'username' => 'admin_boveda',
        'phone' => '3000000001',
        'address' => 'Oficina Principal Boveda Capital',
        'password' => Hash::make('Admin@1234'),
        'email_verified_at' => now()
      ]
    );
    $admin->assignRole('Super Admin');

    // 2. ASESOR DE CARTERA
    $asesor = User::updateOrCreate(
      ['email' => 'asesor@bovedacapital.com'],
      [
        'name'              => 'Carlos',
        'last_name'         => 'Asesor',
        'username'          => 'carlos_cartera',
        'phone'             => '3000000002',
        'address'           => 'Sede Comercial Centro',
        'password'          => Hash::make('asesor@1234'),
        'email_verified_at' => now(),
      ]
    );
    $asesor->assignRole('asesor');

    // 3. AUDITOR DE SEGURIDAD
    $auditor = User::updateOrCreate(
      ['email' => 'auditoria@bovedacapital.com'],
        [
          'name'              => 'Control',
          'last_name'         => 'Calidad',
          'username'          => 'auditor_boveda',
          'phone'             => '3000000003',
          'address'           => 'Sede Auditoria Interna',
          'password'          => Hash::make('auditor@1234'),
          'email_verified_at' => now(),
        ]
    );
    $auditor->assignRole('auditor');

    // 4. CONFIGURADOR FINANCIERO
    $configManager = User::updateOrCreate(
      ['email' => 'config@bovedacapital.com'],
      [
        'name'              => 'Gestor',
        'last_name'         => 'Tasas',
        'username'          => 'config_master',
        'phone'             => '3000000004',
        'address'           => 'Area de Configuracion Financiera',
        'password'          => Hash::make('config@1234'),
        'email_verified_at' => now(),
      ]
    );
    $configManager->assignRole('config_manager');

    // 5. CLIENTE DE PRUEBA
    $cliente = User::updateOrCreate(
      ['email' => 'cliente@ejemplo.com'],
      [
        'name'              => 'Juan',
        'last_name'         => 'Perez',
        'username'          => 'juanperez88',
        'phone'             => '3000000005',
        'address'           => 'Calle 100 # 10-00',
        'password'          => Hash::make('cliente@1234'),
        'email_verified_at' => now(),
      ]
    );
    $cliente->assignRole('cliente');
  }
}
