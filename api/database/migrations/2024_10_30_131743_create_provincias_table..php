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
        // Tabla de provincia
        Schema::create('provincias', function (Blueprint $table) {
            $table->id();  // Campo autoincremental
            $table->integer('codigo')->unique();  // Campo único
            $table->string('nombre', 25); // Nombre de provincia con tamaño de 25 caracteres
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provincias');
    }
};
