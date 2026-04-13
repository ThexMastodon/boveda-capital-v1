<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Servicio encargado de la logica de negocio de autenticacion.
 * Implementa la busqueda dual por email o username.
 */
class AuthService
{
    /**
     * Intenta autenticar al usuario usando email o username.
     */
    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['login'])
            ->orWhere('username', $credentials['login'])
            ->first();

            if (!$user || !Hash::check($credentials['password'], $user->))
    }
}