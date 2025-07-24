<?php

namespace App\Http\Controllers;

use App\Models\AsetMobil;
use Illuminate\Http\Request;

class AsetMobilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $asetMobil = AsetMobil::all();
            return response()->json([
                'success' => true,
                'message' => 'Show all aset mobil',
                'data' => $asetMobil,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mendapatkan data ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'plat-nomor' => 'required|string|max:255',
                'merek' => 'required|string|max:100',
                'tahun-pembuatan' => 'required|int|min:0',
                'warna' => 'required|string|max:100',
                'no-rangka' => 'required|int|min:0',
                'no-mesin' => 'required|int|min:0',
                'stnk' => 'required|string|max:255',
                'nilai-beli' => 'required|numeric|min:0',
                'penyusutan-aset' => 'required|numeric|min:0',
                'tanggal-pembelian' => 'required|date',
            ]);

            $asetMobil = AsetMobil::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Berhasil menambahkan data',
                'data' => $asetMobil,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AsetMobil $asetMobil)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AsetMobil $asetMobil)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AsetMobil $asetMobil)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsetMobil $asetMobil)
    {
        //
    }
}
