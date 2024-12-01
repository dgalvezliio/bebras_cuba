<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('profesores', function (Blueprint $table) {
            $table->id();
            $table->string('nro_ci', 11)->unique();
            $table->string('nombre', 30);
            $table->string('apellidos', 50);
            $table->string('correo', 50);
            $table->string('telefono', 15);
            $table->boolean('es_nuevo')->default(true);
            $table->boolean('perfil_editado')->default(false);
            $table->boolean('esta_activo')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('profesores');
    }
};
