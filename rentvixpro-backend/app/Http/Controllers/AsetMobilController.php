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
        } catch (error) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mendapatkan data',
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
        } catch(error) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $asetMobil = AsetMobil::findOrFail($id);
            
            return response()->json([
                'success' => true,
                // 'message' => `Berhasil mendapatkan data dengan id {$id}`,
                'data' => $asetMobil,
            ], 200);
        } catch (error) {
            return response()->json([
                'success' => false,
                // 'message' => `Gagal mendapatkan data dengan id $id`,
                'data' => $asetMobil,
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $asetMobil = AsetMobil::findOrFail($id);

            $request->validate([
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

            $asetMobil->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Berhasil mengedit data',
                'data' => $asetMobil,
            ], 201);
        } catch (error) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengedit data',
                'data' => $asetMobil,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $asetMobil = AsetMobil::findOrFail($id);
        $asetMobil->delete();

        return response()->json([
                'success' => true,
                'message' => 'Berhasil menghapus data',
        ], 200);
    }
}
