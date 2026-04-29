<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserService
{
    public function paginate(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        $query = User::query()
            ->with('roles:id,name')
            ->orderByDesc('id');

        if ($search) {
            $this->applySearchFilter($query, $search);
        }

        return $query->paginate($perPage);
    }

    public function create(array $payload): User
    {
        return DB::transaction(function () use ($payload) {
            $role = $payload['role'] ?? null;

            $user = User::create([
                'username' => $payload['username'],
                'name' => $payload['name'],
                'last_name' => $payload['last_name'],
                'second_last_name' => $payload['second_last_name'] ?? null,
                'phone' => $payload['phone'],
                'email' => $payload['email'],
                'address' => $payload['address'],
                'password' => Hash::make($payload['password']),
            ]);

            if ($role) {
                $user->syncRoles([$role]);
            }

            return $user->load('roles:id,name');
        });
    }

    public function update(User $user, array $payload): User
    {
        return DB::transaction(function () use ($user, $payload) {
            $role = $payload['role'] ?? null;

            $updateData = [
                'username' => $payload['username'],
                'name' => $payload['name'],
                'last_name' => $payload['last_name'],
                'second_last_name' => $payload['second_last_name'] ?? null,
                'phone' => $payload['phone'],
                'email' => $payload['email'],
                'address' => $payload['address'],
            ];

            if (!empty($payload['password'])) {
                $updateData['password'] = Hash::make($payload['password']);
            }

            $user->update($updateData);

            if ($role) {
                $user->syncRoles([$role]);
            }

            return $user->refresh()->load('roles:id,name');
        });
    }

    public function delete(User $user): void
    {
        DB::transaction(function () use ($user) {
            $user->syncRoles([]);
            $user->delete();
        });
    }

    public function getRoleOptions()
    {
        return Role::query()->orderBy('name')->pluck('name');
    }

    private function applySearchFilter(Builder $query, string $search): void
    {
        $query->where(function (Builder $subQuery) use ($search) {
            $subQuery->where('name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('second_last_name', 'like', "%{$search}%")
                ->orWhere('username', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");
        });
    }
}
