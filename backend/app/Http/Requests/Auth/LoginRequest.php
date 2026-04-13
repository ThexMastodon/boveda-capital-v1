<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'login'    => 'required|string',
      'password' => 'required|string|min:8',
    ];
  }

  public function messages(): array
  {
    return [
      'login.required'    => 'El correo o nombre de usuario es obligatorio.',
      'password.required' => ' La contraseña es obligatoria.',
      'password.min'      => 'La contraseña debe tener al menos 8 caracteres.',
    ];
  }
}