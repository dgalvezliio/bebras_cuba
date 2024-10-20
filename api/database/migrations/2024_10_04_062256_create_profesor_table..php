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
        Schema::create('profesor', function (Blueprint $table) { 
            $table->id();
            $table->string('ci');  
            $table->string('nombre');  
            $table->string('apellidos');  
            $table->string('correo');  
            $table->string('telefono');  
            $table->string('provincia');  
            $table->string('municipio');  
            $table->string('escuela');  
            $table->string('contrasenia');  
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
