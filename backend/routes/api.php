<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\UserController;
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
  Route::get('/users/roles', [UserController::class, 'roles'])->middleware('can:access.user.list');
  Route::get('/users', [UserController::class, 'index'])->middleware('can:access.user.list');
  Route::get('/users/{user}', [UserController::class, 'show'])->middleware('can:access.user.list');
  Route::post('/users', [UserController::class, 'store'])->middleware('can:access.user.create');
  Route::put('/users/{user}', [UserController::class, 'update'])->middleware('can:access.user.edit');
  Route::delete('/users/{user}', [UserController::class, 'destroy'])->middleware('can:access.user.delete');

  Route::get('/user', function (Request $request) {
    return $request->user();
  });
});