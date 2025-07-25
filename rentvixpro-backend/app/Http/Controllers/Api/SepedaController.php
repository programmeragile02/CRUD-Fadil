<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sepeda;

class SepedaController extends Controller
{
    public function index()
    {
        return response()->json(Sepeda::with([])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'merek' => 'required'
        ]);
        $data = Sepeda::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(Sepeda::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'merek' => 'required'
        ]);
        $data = Sepeda::findOrFail($id);
        $data->update($validated);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = Sepeda::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}