<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sepeda extends Model
{
    use HasFactory;

    protected $table = 'sepeda';

    protected $fillable = ['merek'];
}