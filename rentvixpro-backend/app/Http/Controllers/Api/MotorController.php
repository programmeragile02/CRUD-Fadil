<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Motor;

class MotorController extends Controller
{
    public function index()
    {
        return response()->json(Motor::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bahan_bakar' => 'required'
        ]);
        $data = Motor::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(Motor::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'bahan_bakar' => 'required'
        ]);
        $data = Motor::findOrFail($id);
        $data->update($validated);
        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = Motor::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}