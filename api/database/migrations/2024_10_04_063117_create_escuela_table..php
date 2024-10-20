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
        Schema::create('escuela', function (Blueprint $table) { 
            $table->id();
            $table->string('codigo');  
            $table->string('nombre_escuela');  
            $table->string('telefono');  
            $table->string('subsistema');  
            $table->string('municipio');  
            $table->string('poblado');
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
