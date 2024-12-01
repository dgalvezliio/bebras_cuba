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
        Schema::create('recursos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100); // Nombre del recurso
            $table->string('descripcion', 255)->nullable(); // Descripción opcional del recurso
            $table->string('archivo_path'); // Ruta al archivo PDF
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('recursos');
    }
};
