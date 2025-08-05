<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {   //tabla para coordinadores y representantes de nivel provincial y municipal, por eso el id rol para poder distinguir despues.
        //tabla para coordinadores y representantes de nivel provincial y municipal, por eso el id de provincia obligado y el id de municipio nullable
        Schema::create('coord_prov_mcpal', function (Blueprint $table) {
            $table->id(); // id incremental
            
            // Llaves foráneas
            $table->foreignId('rol_id')->constrained('roles')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Campos adicionales
            $table->text('descripcion')->nullable(); // Descripción opcional
            $table->date('fecha_inicio'); // Fecha obligatoria de inicio
            $table->date('fecha_fin')->nullable(); // Fecha opcional de finalización
            $table->foreignId('provincia_id')->constrained('provincias')->onDelete('cascade');
            $table->foreignId('municipio_id')->constrained('municipios')->onDelete('cascade')->nullable();
            // Timestamps automáticos
            $table->timestamps();
            
            // Índices para optimización
            $table->index('fecha_inicio');
            $table->index('fecha_fin');
        });
    }

    public function down()
    {
        Schema::dropIfExists('coord_prov_mcpal');
    }
};