<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengguna;

class PenggunaController extends Controller
{
    public function index()
    {
        return response()->json(Pengguna::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'telepon' => 'required'
        ]);
        $data = Pengguna::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(Pengguna::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'telepon' => 'required'
        ]);
        $data = Pengguna::findOrFail($id);
        $data->update($validated);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = Pengguna::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}