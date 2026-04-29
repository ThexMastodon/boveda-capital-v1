<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));
        $search = $request->query('search');

        $result = $this->userService->paginate($perPage, is_string($search) ? trim($search) : null);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuarios cargados correctamente.',
            'data' => $result->items(),
            'meta' => [
                'current_page' => $result->currentPage(),
                'last_page' => $result->lastPage(),
                'per_page' => $result->perPage(),
                'total' => $result->total(),
            ],
        ]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario creado correctamente.',
            'data' => $user,
        ], 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Usuario cargado correctamente.',
            'data' => $user->load('roles:id,name'),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $updatedUser = $this->userService->update($user, $request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario actualizado correctamente.',
            'data' => $updatedUser,
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->delete($user);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario eliminado correctamente.',
        ]);
    }

    public function roles(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Roles cargados correctamente.',
            'data' => $this->userService->getRoleOptions(),
        ]);
    }
}
