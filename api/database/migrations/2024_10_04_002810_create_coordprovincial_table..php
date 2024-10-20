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
        Schema::create('coordprovincial', function (Blueprint $table) { 
            $table->id();
            $table->string('ci');  
            $table->string('nombre');  
            $table->string('apellidos');  
            $table->string('correo');  
            $table->string('contacto');  
            $table->string('contrasenia');  
            $table->integer('cdgo_provincia');  
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
