<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kendaraan;

class KendaraanController extends Controller
{
    public function index()
    {
        return response()->json(Kendaraan::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'perusahaan_id' => 'required'
        ]);
        $data = Kendaraan::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(Kendaraan::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'perusahaan_id' => 'required'
        ]);
        $data = Kendaraan::findOrFail($id);
        $data->update($validated);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = Kendaraan::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}