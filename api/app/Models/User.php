<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Profesor;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    
    protected $fillable = [
        'ci',
        'nombre',
        'apellidos',
        'telefono',
        'correo',
        'contrasenia',
        'pin',
    ];

    protected $hidden = [
        'contrasenia',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'correo_verified_at' => 'datetime',
            'contrasenia' => 'hashed',
        ];
    }
    
    public function profesor()
    {
        // users.ci -> profesores.nro_ci
        return $this->hasOne(Profesor::class, 'nro_ci', 'ci');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'rol_id');
    }

    public function hasRole(string $roleName): bool
    {
        return $this->roles()->where('rol', $roleName)->exists();
    }

    public function hasAnyRole(array $roleNames): bool
    {
        return $this->roles()->whereIn('rol', $roleNames)->exists();
    }
}
