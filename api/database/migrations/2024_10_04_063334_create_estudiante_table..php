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
        Schema::create('estudiante', function (Blueprint $table) { 
            $table->id();
            $table->string('nro_ci');  
            $table->string('nombre');  
            $table->string('grado');  
            $table->string('genero');  
            $table->string('puntuacion');  
            $table->string('cdgo_profesor');  
            $table->string('cdgo_escuela');  
            $table->timestamps();  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
