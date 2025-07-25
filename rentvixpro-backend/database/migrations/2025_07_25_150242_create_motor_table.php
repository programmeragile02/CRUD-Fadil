<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('motor', function (Blueprint $table) {
            $table->id();
            $table->enum('bahan_bakar', ['bensin','listrik','solar']);
            
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('motor');
    }
};