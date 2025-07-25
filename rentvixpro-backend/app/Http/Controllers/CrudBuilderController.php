<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class CrudBuilderController extends Controller
{
//     public function generate(Request $request)
//     {
//         $request->validate([
//             'entity' => 'required|string',
//             'fields' => 'required|array',
//         ]);

//         $entity = ucfirst($request->entity);
//         $table = strtolower($request->entity);
//         $fields = $request->fields;

//         // Tipe data Laravel
//         $mapTypes = [
//             'string' => 'string',
//             'integer' => 'integer',
//             'int' => 'integer',
//             'text' => 'text',
//             'boolean' => 'boolean',
//             'date' => 'date',
//             'datetime' => 'dateTime',
//             'enum' => 'enum',
//             'float' => 'float',
//             'double' => 'double',
//             'foreignId' => 'foreignId',
//         ];

//         // ==== MIGRATION ====
//         $columns = "";
//         $relationMethods = "";

//         foreach ($fields as $field) {
//             $type = strtolower($field['type']);
//             $name = $field['name'];
//             $nullable = empty($field['required']) ? '->nullable()' : '';

//             if (!isset($mapTypes[$type])) {
//                 return response()->json(["error" => "Tipe data '{$type}' tidak dikenali Laravel."], 422);
//             }

//             if ($type === 'enum' && isset($field['options'])) {
//                 $options = "['" . implode("','", $field['options']) . "']";
//                 $columns .= "\$table->enum('$name', $options)$nullable;\n            ";
//             } elseif ($type === 'foreignId' && isset($field['references'])) {
//                 $columns .= "\$table->foreignId('$name')->constrained('{$field['references']}')$nullable;\n            ";

//                 // Relasi di model
//                 $relationName = rtrim($name, '_id');
//                 $relationMethods .= "\n    public function $relationName()
//     {
//         return \$this->belongsTo(\\App\\Models\\" . ucfirst($relationName) . "::class);
//     }\n";
//             } else {
//                 $columns .= "\$table->{$mapTypes[$type]}('$name')$nullable;\n            ";
//             }
//         }

//         $migrationContent = <<<MIG
// <?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration {
//     public function up(): void {
//         Schema::create('$table', function (Blueprint \$table) {
//             \$table->id();
//             $columns
//             \$table->timestamps();
//         });
//     }

//     public function down(): void {
//         Schema::dropIfExists('$table');
//     }
// };
// MIG;

//         $migrationFile = database_path("migrations/" . date('Y_m_d_His') . "_create_{$table}_table.php");
//         File::put($migrationFile, $migrationContent);

//         // ==== MODEL ====
//         Artisan::call("make:model $entity");
//         $fillable = implode(", ", array_map(fn($f) => "'{$f['name']}'", $fields));

//         $modelContent = <<<MODEL
// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class $entity extends Model
// {
//     use HasFactory;

//     protected \$table = '$table';
//     protected \$fillable = [$fillable];

// $relationMethods
// }
// MODEL;
//         File::put(app_path("Models/{$entity}.php"), $modelContent);

//         // ==== CONTROLLER ====
//         Artisan::call("make:controller Api/{$entity}Controller --api");
//         $rules = implode(",\n            ", array_map(
//             fn($f) => "'{$f['name']}' => '" . (empty($f['required']) ? 'nullable' : 'required') . "'",
//             $fields
//         ));

//         $controllerContent = <<<CONTROLLER
// <?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\\$entity;

// class {$entity}Controller extends Controller
// {
//     public function index()
//     {
//         return response()->json($entity::all());
//     }

//     public function store(Request \$request)
//     {
//         \$validated = \$request->validate([
//             $rules
//         ]);
//         \$data = $entity::create(\$validated);
//         return response()->json(\$data, 201);
//     }

//     public function show(\$id)
//     {
//         return response()->json($entity::findOrFail(\$id));
//     }

//     public function update(Request \$request, \$id)
//     {
//         \$validated = \$request->validate([
//             $rules
//         ]);
//         \$data = $entity::findOrFail(\$id);
//         \$data->update(\$validated);
//         return response()->json(\$data);
//     }

//     public function destroy(\$id)
//     {
//         \$data = $entity::findOrFail(\$id);
//         \$data->delete();
//         return response()->json(null, 204);
//     }
// }
// CONTROLLER;
//         File::put(app_path("Http/Controllers/Api/{$entity}Controller.php"), $controllerContent);

//         // ==== ROUTE ====
//         File::append(base_path('routes/api.php'), "\nRoute::apiResource('$table', App\\Http\\Controllers\\Api\\{$entity}Controller::class);");

//         // ==== MIGRATE ====
//         Artisan::call('migrate');

//         // ==== FRONTEND PAGE ====
//         $this->generateFrontend($table, $fields);
//         $this->updateFrontendMenu($table);

//         return response()->json(['message' => "CRUD untuk $entity berhasil dibuat."]);
//     }

// public function generate(Request $request)
//     {
//         $request->validate([
//             'entity' => 'required|string',
//             'fields' => 'required|array',
//         ]);

//         $entity = ucfirst($request->entity);
//         $table = strtolower($request->entity);
//         $fields = $request->fields;

//         // Tipe data Laravel
//         $mapTypes = [
//             'string' => 'string',
//             'integer' => 'integer',
//             'int' => 'integer',
//             'text' => 'text',
//             'boolean' => 'boolean',
//             'date' => 'date',
//             'datetime' => 'dateTime',
//             'enum' => 'enum',
//             'float' => 'float',
//             'double' => 'double',
//             'foreignId' => 'foreignId',
//         ];

//         // ==== MIGRATION ====
//         $columns = "";
//         $relationMethods = "";

//         foreach ($fields as $field) {
//             $type = strtolower($field['type']);
//             $name = $field['name'];
//             $nullable = empty($field['required']) ? '->nullable()' : '';

//             if (!isset($mapTypes[$type])) {
//                 return response()->json(["error" => "Tipe data '{$type}' tidak dikenali Laravel."], 422);
//             }

//             if ($type === 'enum' && isset($field['options'])) {
//                 $options = "['" . implode("','", $field['options']) . "']";
//                 $columns .= "\$table->enum('$name', $options)$nullable;\n            ";
//             } elseif ($type === 'foreignId' && isset($field['relation']) && $field['relation'] === 'belongsTo') {
//                 $columns .= "\$table->foreignId('$name')->constrained('{$field['references']}')$nullable;\n            ";
//                 $relationName = rtrim($name, '_id');
//                 $relationMethods .= "\n    public function $relationName()
//     {
//         return \$this->belongsTo(\\App\\Models\\" . ucfirst($relationName) . "::class);
//     }\n";
//             } elseif (in_array($field['relation'] ?? '', ['hasMany', 'hasOne']) && isset($field['references'])) {
//                 $relationModel = ucfirst($field['references']);
//                 $relationName = strtolower($field['references']);
//                 $relationMethods .= "\n    public function {$relationName}()
//     {
//         return \$this->{$field['relation']}(\\App\\Models\\$relationModel::class);
//     }\n";
//             } elseif ($type !== 'relation') {
//                 $columns .= "\$table->{$mapTypes[$type]}('$name')$nullable;\n            ";
//             }
//         }

//         $migrationContent = <<<MIG
// <?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration {
//     public function up(): void {
//         Schema::create('$table', function (Blueprint \$table) {
//             \$table->id();
//             $columns
//             \$table->timestamps();
//         });
//     }

//     public function down(): void {
//         Schema::dropIfExists('$table');
//     }
// };
// MIG;

//         $migrationFile = database_path("migrations/" . date('Y_m_d_His') . "_create_{$table}_table.php");
//         File::put($migrationFile, $migrationContent);

//         // ==== MODEL ====
//         Artisan::call("make:model $entity");
//         $fillable = implode(", ", array_map(fn($f) => "'{$f['name']}'", $fields));

//         $modelContent = <<<MODEL
// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class $entity extends Model
// {
//     use HasFactory;

//     protected \$table = '$table';
//     protected \$fillable = [$fillable];

// $relationMethods
// }
// MODEL;
//         File::put(app_path("Models/{$entity}.php"), $modelContent);

//         // ==== CONTROLLER ====
//         Artisan::call("make:controller Api/{$entity}Controller --api");
//         $rules = implode(",\n            ", array_map(
//             fn($f) => "'{$f['name']}' => '" . (empty($f['required']) ? 'nullable' : 'required') . "'",
//             $fields
//         ));

//         $controllerContent = <<<CONTROLLER
// <?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\\$entity;

// class {$entity}Controller extends Controller
// {
//     public function index()
//     {
//         return response()->json($entity::all());
//     }

//     public function store(Request \$request)
//     {
//         \$validated = \$request->validate([
//             $rules
//         ]);
//         \$data = $entity::create(\$validated);
//         return response()->json(\$data, 201);
//     }

//     public function show(\$id)
//     {
//         return response()->json($entity::findOrFail(\$id));
//     }

//     public function update(Request \$request, \$id)
//     {
//         \$validated = \$request->validate([
//             $rules
//         ]);
//         \$data = $entity::findOrFail(\$id);
//         \$data->update(\$validated);
//         return response()->json(\$data);
//     }

//     public function destroy(\$id)
//     {
//         \$data = $entity::findOrFail(\$id);
//         \$data->delete();
//         return response()->json(null, 204);
//     }
// }
// CONTROLLER;
//         File::put(app_path("Http/Controllers/Api/{$entity}Controller.php"), $controllerContent);

//         // ==== ROUTE ====
//         File::append(base_path('routes/api.php'), "\nRoute::apiResource('$table', App\\Http\\Controllers\\Api\\{$entity}Controller::class);");

//         // ==== MIGRATE ====
//         Artisan::call('migrate');

//         // ==== FRONTEND PAGE ==== (generateFrontend method must be defined)
//         $this->generateFrontend($table, $fields);
//         $this->updateFrontendMenu($table);

//         return response()->json(['message' => "CRUD untuk $entity berhasil dibuat."]);
//     }

    public function listTables()
    {
        $tables = \DB::select('SHOW TABLES');
        $key = 'Tables_in_' . env('DB_DATABASE');
        $list = array_map(fn($t) => $t->$key, $tables);
        return response()->json($list);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'entity' => 'required|string',
            'fields' => 'required|array',
        ]);

        $entity = ucfirst($request->entity);
        $table = strtolower($request->entity);
        $fields = $request->fields;

        // Map ke Laravel migration type
        $mapTypes = [
            'string' => 'string',
            'integer' => 'integer',
            'int' => 'integer',
            'text' => 'text',
            'boolean' => 'boolean',
            'date' => 'date',
            'datetime' => 'dateTime',
            'float' => 'float',
            'double' => 'double',
            'enum' => 'enum',
            'foreignId' => 'foreignId',
        ];

        // ===== MIGRATION ====
        $columns = '';
        foreach ($fields as $field) {
            $type = strtolower($field['type']);
            $name = $field['name'];
            $required = $field['required'] ?? false;
            $nullable = !$required ? '->nullable()' : '';
            $options = $field['options'] ?? null;
            $relation = $field['relation'] ?? null;
            $references = $field['references'] ?? null;

            if (!isset($mapTypes[$type])) {
                return response()->json(["error" => "Tipe data '{$type}' tidak dikenali Laravel."], 422);
            }

            if ($type === 'enum' && is_array($options)) {
                $opts = implode("', '", $options);
                $columns .= "\$table->enum('$name', ['$opts'])$nullable;\n            ";
            } elseif ($type === 'foreignId' && $references) {
                $columns .= "\$table->foreignId('$name')->constrained('$references')->onDelete('cascade');\n            ";
            } else {
                $columns .= "\$table->{$mapTypes[$type]}('$name')$nullable;\n            ";
            }
        }

        $migrationContent = <<<PHP
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('$table', function (Blueprint \$table) {
            \$table->id();
            $columns
            \$table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('$table');
    }
};
PHP;

        $migrationFile = database_path("migrations/" . date('Y_m_d_His') . "_create_{$table}_table.php");
        File::put($migrationFile, $migrationContent);

        // ===== MODEL ====
        Artisan::call("make:model $entity");

        $fillable = implode(", ", array_map(fn($f) => "'{$f['name']}'", $fields));
        $relations = '';
        foreach ($fields as $f) {
            if (!empty($f['relation']) && !empty($f['references'])) {
                $func = $f['relation'];
                $target = ucfirst($f['references']);
                $fnName = lcfirst($target);
                $relations .= <<<PHP

    public function $fnName()
    {
        return \$this->$func($target::class);
    }
PHP;
            }
        }

        $modelContent = <<<PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class $entity extends Model
{
    use HasFactory;

    protected \$table = '$table';

    protected \$fillable = [$fillable];$relations
}
PHP;
        File::put(app_path("Models/{$entity}.php"), $modelContent);

        // ===== CONTROLLER ====
        Artisan::call("make:controller Api/{$entity}Controller --api");

        $rules = implode(",\n            ", array_map(
            fn($f) => "'{$f['name']}' => '" . ($f['required'] ? 'required' : 'nullable') . "'",
            $fields
        ));

        $controllerContent = <<<PHP
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\\$entity;

class {$entity}Controller extends Controller
{
    public function index()
    {
        return response()->json($entity::with([])->get());
    }

    public function store(Request \$request)
    {
        \$validated = \$request->validate([
            $rules
        ]);
        \$data = $entity::create(\$validated);
        return response()->json(\$data, 201);
    }

    public function show(\$id)
    {
        return response()->json($entity::findOrFail(\$id));
    }

    public function update(Request \$request, \$id)
    {
        \$validated = \$request->validate([
            $rules
        ]);
        \$data = $entity::findOrFail(\$id);
        \$data->update(\$validated);
        return response()->json(\$data);
    }

    public function destroy(\$id)
    {
        \$data = $entity::findOrFail(\$id);
        \$data->delete();
        return response()->json(null, 204);
    }
}
PHP;
        File::put(app_path("Http/Controllers/Api/{$entity}Controller.php"), $controllerContent);

        // ===== ROUTE ====
        File::append(base_path('routes/api.php'), "\nRoute::apiResource('$table', App\\Http\\Controllers\\Api\\{$entity}Controller::class);");

        // ===== MIGRATE ====
        Artisan::call('migrate');

        // ===== FRONTEND AUTO PAGE + MENU ====
        $this->generateFrontend($table, $fields);
        $this->updateFrontendMenu($table);

        return response()->json(['message' => "CRUD untuk $entity berhasil dibuat."]);
    }


    private function generateFrontend($entity, $fields)
    {
        $fieldCount = count($fields);
        $colSpan = $fieldCount + 1;
        $title = ucfirst($entity);
        $tsx = <<<TSX
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Sidebar from "../components/sidebar";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Database,
  FileText,
  Loader2,
  Grid3X3,
  List,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function {$title}Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [activeTab, setActiveTab] = useState("$entity");

  const [newItem, setNewItem] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:8000/api/$entity");
      setData(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = async () => {
    try {
      setSubmitting(true);
      await axios.post("http://localhost:8000/api/$entity", newItem);
      setNewItem({});
      setIsAddDialogOpen(false);
      fetchData();
    } catch (err) {
      setError("Gagal menambahkan data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editingItem) return;
    try {
      setSubmitting(true);
      await axios.put("http://localhost:8000/api/$entity/" + editingItem.id, editingItem);
      setEditingItem(null);
      setIsEditDialogOpen(false);
      fetchData();
    } catch (err) {
      setError("Gagal mengubah data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await axios.delete("http://localhost:8000/api/$entity/" + id);
      fetchData();
    } catch (err) {
      setError("Gagal menghapus data");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Data {$title}</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Tambah
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Data</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
TSX;

// Tambahkan dynamic field builder
foreach ($fields as $field) {
    $name = $field['name'];
    $label = ucfirst(str_replace('_', ' ', $name));
    $tsx .= <<<TSX
                <div className="space-y-2">
                  <Label htmlFor="$name">$label</Label>
                  <Input
                    id="$name"
                    value={newItem.$name || ""}
                    onChange={(e) => setNewItem({ ...newItem, $name: e.target.value })}
                  />
                </div>
TSX;
}

// Dialog Footer
$tsx .= <<<TSX
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAdd} disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Mode */}
        <div className="overflow-x-auto rounded-lg border bg-white shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100">
              <tr>
TSX;

foreach ($fields as $field) {
    $tsx .= "<th className=\"p-3 font-semibold text-slate-600\">{$field['name']}</th>";
}
$tsx .= <<<TSX
                <th className="p-3 font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
TSX;
foreach ($fields as $field) {
    $tsx .= "<td className='p-3'>{item.{$field['name']}}</td>";
}
$tsx .= <<<TSX
                  <td className="p-3 space-x-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setEditingItem(item);
                      setIsEditDialogOpen(true);
                    }}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="{$colSpan}" className="p-4 text-center text-slate-500">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dialog Edit */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Data</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4 py-4">
TSX;
foreach ($fields as $field) {
    $name = $field['name'];
    $label = ucfirst(str_replace('_', ' ', $name));
    $tsx .= <<<TSX
                <div className="space-y-2">
                  <Label htmlFor="edit_$name">$label</Label>
                  <Input
                    id="edit_$name"
                    value={editingItem.$name || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, $name: e.target.value })
                    }
                  />
                </div>
TSX;
}
$tsx .= <<<TSX
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleEdit} disabled={submitting}>
                {submitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
TSX;


        $folder = base_path("../rentvix-pro/app/$entity");
        if (!File::exists($folder)) {
            File::makeDirectory($folder, 0755, true);
        }
        File::put("$folder/page.tsx", $tsx);
    }

    private function updateFrontendMenu($entity)
    {
        $menuFile = base_path("../rentvix-pro/data/menu.json");
        $menus = [];

        if (File::exists($menuFile)) {
            $menus = json_decode(File::get($menuFile), true);
        }

        $found = collect($menus)->firstWhere('path', "/$entity");
        if (!$found) {
            $menus[] = [
                'name' => ucfirst($entity),
                'path' => "/$entity"
            ];
            File::put($menuFile, json_encode($menus, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }
}
