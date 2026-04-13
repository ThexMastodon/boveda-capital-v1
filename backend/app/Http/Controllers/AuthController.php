<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  protected $authService;

  /**
   * Inyeccion de Dependencia (DIP - SOLID)
   */
  public function __construct(AuthService $authService)
  {
    $this->authService = $authService;
  }

  public function login(LoginRequest $request): JsonResponse
  {
    try {
      $result = $this->authService->login($request->validated());

      return response()->json([
        'status' => 'success',
        'message' => 'Acceso concedido.',
        'data' => $result
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => 'error',
        'message' => $e->getMessage(),
      ], 422);
    }
  }

  public function logout(Request $request): JsonResponse
  {
    $this->authService->logout($request->user());

    return response()->json([
      'status' => 'success',
      'message' => 'Sesión cerrada correctamente.',
    ], 200);
  }
}