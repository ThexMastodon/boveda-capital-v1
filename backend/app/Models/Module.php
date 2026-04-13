<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Module extends Model
{
  protected $fillable =[
    'name',
    'slug',
    'icon',
    'permission',
    'parent_id',
    'order',
    'is_active',
  ];

  public function submodules(): HasMany
  {
    return $this->hasMany(Module::class, 'parent_id')->orderBy('order');
  }

  public function parent(): BelongsTo
  {
    return $this->belongsTo(Module::class, 'parent_id');
  }
}