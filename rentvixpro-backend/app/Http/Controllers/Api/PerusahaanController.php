<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Perusahaan;

class PerusahaanController extends Controller
{
    public function index()
    {
        return response()->json(Perusahaan::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nomor' => 'required'
        ]);
        $data = Perusahaan::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(Perusahaan::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nomor' => 'required'
        ]);
        $data = Perusahaan::findOrFail($id);
        $data->update($validated);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = Perusahaan::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}