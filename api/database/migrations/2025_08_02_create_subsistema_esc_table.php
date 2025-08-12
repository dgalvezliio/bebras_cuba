<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('subsistema_esc', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Nombre del subsistema
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subsistema_esc');
    }
};