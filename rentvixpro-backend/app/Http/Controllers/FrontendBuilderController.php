<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontendBuilderController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'entity_name' => 'required|string',
            'title' => 'nullable|string',
        ]);

        $entity = strtolower($request->entity_name); // ex: 'mobil'
        $title = $request->title ?? ucfirst($entity);

        $nextJsAppPath = base_path('../rentvix-pro/app'); // Sesuaikan dengan path folder frontend Next.js
        $folderPath = "{$nextJsAppPath}/{$entity}";

        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0755, true);
        }

        $pageTsx = <<<TSX
export default function {$title}Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data {$title}</h1>
      <p>Ini adalah halaman otomatis untuk manajemen data {$entity}.</p>
    </div>
  );
}
TSX;

        file_put_contents("{$folderPath}/page.tsx", $pageTsx);

        return response()->json([
            'success' => true,
            'message' => "File Next.js untuk '$entity' berhasil dibuat.",
            'path' => "{$folderPath}/page.tsx"
        ]);
    }
}
