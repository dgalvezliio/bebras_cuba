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
            $table->id(); // id auto-incremental
            $table->integer('edicion');
            $table->string('ci',11);
            // Llave foranea
            $table->foreign('ci')->references('nro_ci')->on('profesores')->onDelete('cascade'); // Relación con el profesor
            $table->foreign('edicion')->references('id')->on('ediciones')->onDelete('cascade');
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
