<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('sepeda', function (Blueprint $table) {
            $table->id();
            $table->string('merek');
            
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('sepeda');
    }
};