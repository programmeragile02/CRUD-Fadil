<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsetMobil extends Model
{
    use HasFactory;

    protected $fillable = [
        'plat-nomor',
        'merek',
        'tahun-pembuatan',
        'warna',
        'no-rangka',
        'no-mesin',
        'stnk',
        'nilai-beli',
        'penyusutan-aset',
        'tanggal-pembelian'
    ];
}
