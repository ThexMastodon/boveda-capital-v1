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

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['Credenciales invalidas.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'second_last_name' => $user->second_last_name,
                'username' => $user->username,
                'email' => $user->email,
            ],
        ];
    }

    public function logout(?User $user): void
    {
        if ($user) {
            $user->currentAccessToken()?->delete();
        }
    }
}