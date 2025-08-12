<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('universidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 120);  
            $table->foreignId('provincia_id')->constrained('provincias');
            $table->index('provincia_id');  // Índice para la columna provincia_id
            $table->string('siglas', 10)->nullable();   // Siglas de la universidad
            $table->string('sitio_web', 120)->nullable();
            $table->string('logo', 120)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('universidades');
    }
};
