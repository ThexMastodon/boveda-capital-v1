<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();

    $modules = Module::whereNull('parent_id')
      ->where('is_active', true)
      ->with(['submodules' => function ($query) {
        $query->where('is_active', true);
      }])
      ->orderBy('order')
      ->get();

    $filteredModules = $modules->filter(function ($module) use ($user) {
      if (!$module->permission) return true;
      return $user->hasPermissionTo($module->permission);
    })->map(function ($module) use ($user) {
      $module->setRelation('submodules', $module->submodules->filter(function ($sub) use ($user) {
        if (!$sub->permission) return true;
        return $user->hasPermissionTo($sub->permission);
      }));

      return $module;
    })->values();

    return response()->json([
      'status' => 'success',
      'data' => $filteredModules
    ], 200);
  }
}