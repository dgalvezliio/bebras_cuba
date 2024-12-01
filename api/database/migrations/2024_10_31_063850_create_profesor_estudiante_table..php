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
        Schema::create('profesor_estudiante', function (Blueprint $table) {
            $table->id();
            $table->integer('edicion');
            // Llaves foraneas
            $table->foreign('edicion')->references('n_edicion')->on('ediciones')->onDelete('cascade');
            $table->foreignId('id_profesor')->references('id')->on('profesores')->onDelete('cascade');
            $table->foreignId('id_estudiante')->references('id')->on('estudiantes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('profesor_estudiante');
    }
};
