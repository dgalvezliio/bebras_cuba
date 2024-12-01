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
        Schema::create('escuelas', function (Blueprint $table) {
            $table->id();
            $table->string('codigo',10)->nullable();
            $table->string('nombre', 50);
            $table->string('telefono', 15)->nullable();
            $table->integer('cdgo_municipio');
            $table->string('poblado', 50)->nullable();
            $table->string('subsistema', 25)->nullable();
            $table->boolean('validado')->default(false);
            // Llave foranea
            $table->foreign('cdgo_municipio')->references('codigo')->on('municipios')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('escuelas');
    }
};
