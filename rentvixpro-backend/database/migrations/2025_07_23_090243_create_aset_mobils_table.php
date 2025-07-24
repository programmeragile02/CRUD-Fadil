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
        Schema::create('aset_mobils', function (Blueprint $table) {
            $table->id();
            $table->string('plat-nomor');
            $table->string('merek');
            $table->integer('tahun-pembuatan');
            $table->string('warna');
            $table->integer('no-rangka');
            $table->integer('no-mesin');
            $table->string('stnk');
            $table->float('nilai-beli');
            $table->float('penyusutan-aset');
            $table->date('tanggal-pembelian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aset_mobils');
    }
};
