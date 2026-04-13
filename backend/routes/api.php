<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavigationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/**
 * API Routes - Rutas para autenticación y otras funcionalidades relacionadas.
 */

//Rutas publicas (Huespedes)
Route::post('/login', [AuthController::class, 'login']);

//Rutas protegidas (Usuarios autenticados)
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/navigation', [NavigationController::class, 'index']);

  Route::get('/user', function (Request $request) {
    return $request->user();
  });
});