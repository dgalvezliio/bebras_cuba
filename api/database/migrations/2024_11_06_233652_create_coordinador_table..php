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
        // Tabla de migración para coordinadores 
        Schema::create('coordinadores', function (Blueprint $table) {
            $table->id(); // 
            $table->foreignId('id_profesor')->references('id')->on('profesores')->onDelete('cascade'); // Relación con el profesor
            $table->string('categoria', 50); // Tipo de medalla o reconocimiento
            $table->integer('edicion');
            // Llave foranea
            $table->foreign('edicion')->references('n_edicion')->on('ediciones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 
        Schema::dropIfExists('coordinadores');
    }
};
