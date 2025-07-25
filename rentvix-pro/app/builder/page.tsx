// 'use client';
// import { useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/sidebar';

// export default function CrudBuilderPage() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [entity, setEntity] = useState('');
//   const [fields, setFields] = useState([
//     { name: '', type: 'string', required: true },
//   ]);

//   const dataTypes = ['string', 'integer', 'text', 'boolean', 'date'];

//   const addField = () => {
//     setFields([...fields, { name: '', type: 'string', required: true }]);
//   };

//   const updateField = (index: number, key: string, value: any) => {
//     const newFields = [...fields];
//     newFields[index][key] = value;
//     setFields(newFields);
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = { entity, fields };
//       const res = await axios.post('http://localhost:8000/api/builder/generate', payload);
//       alert('Generate berhasil ✅');
//     } catch (err) {
//       alert('Gagal generate ❌');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//           {/* Main Content */}
//           <div className="flex-1 p-8">
//       <h1 className="text-2xl font-bold mb-4">🔧 CRUD Builder</h1>

//       <div className="mb-4">
//         <label className="block mb-1">Nama Entity</label>
//         <input
//           className="border p-2 w-full"
//           placeholder="Contoh: mobil"
//           value={entity}
//           onChange={(e) => setEntity(e.target.value)}
//         />
//       </div>

//       <h2 className="text-lg font-semibold mb-2">Fields:</h2>
//       {fields.map((field, index) => (
//         <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
//           <div className="flex gap-4 mb-2">
//             <div className="flex-1">
//               <label className="block text-sm">Nama Kolom</label>
//               <input
//                 className="border p-2 w-full"
//                 placeholder="nama"
//                 value={field.name}
//                 onChange={(e) => updateField(index, 'name', e.target.value)}
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm">Tipe Data</label>
//               <select
//                 className="border p-2 w-full"
//                 value={field.type}
//                 onChange={(e) => updateField(index, 'type', e.target.value)}
//               >
//                 {dataTypes.map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-end">
//               <label className="inline-flex items-center mt-5">
//                 <input
//                   type="checkbox"
//                   checked={field.required}
//                   onChange={(e) => updateField(index, 'required', e.target.checked)}
//                   className="mr-2"
//                 />
//                 Required
//               </label>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addField}
//         className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
//       >
//         + Tambah Field
//       </button>

//       <br />

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         🚀 Generate CRUD
//       </button>
//     </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Sidebar from "../components/sidebar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CrudBuilderPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [entity, setEntity] = useState("");
  const [fields, setFields] = useState([
    {
      name: "",
      type: "string",
      required: true,
      relation: "",
      references: "",
      options: "",
    },
  ]);
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/builder/list-tables")
      .then((res) => setTables(res.data))
      .catch(() => setTables([]));
  }, []);

  const addField = () => {
    setFields([
      ...fields,
      {
        name: "",
        type: "string",
        required: true,
        relation: "",
        references: "",
        options: "",
      },
    ]);
  };

  const updateField = (index: number, key: string, value: string | boolean) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        entity,
        fields: fields.map((f) => ({
          ...f,
          required: !!f.required,
          options:
            f.type === "enum"
              ? f.options.split(",").map((v) => v.trim())
              : undefined,
        })),
      };
      await axios.post("http://localhost:8000/api/builder/generate", payload);
      alert("CRUD berhasil digenerate");
    } catch (err: any) {
      alert(
        "Gagal generate: " + (err.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>CRUD Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Entity Name</Label>
              <Input
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                placeholder="Contoh: Kendaraan"
              />
            </div>

            <div className="space-y-6">
              {fields.map((field, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Field Name</Label>
                      <Input
                        value={field.name}
                        onChange={(e) =>
                          updateField(idx, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Tipe Data</Label>
                      <Select
                        value={field.type}
                        onValueChange={(val) => updateField(idx, "type", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Tipe" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "string",
                            "integer",
                            "text",
                            "boolean",
                            "date",
                            "datetime",
                            "enum",
                            "float",
                            "double",
                            "foreignId",
                          ].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {field.type === "enum" && (
                      <div className="col-span-2">
                        <Label>Options (pisahkan dengan koma)</Label>
                        <Input
                          value={field.options}
                          onChange={(e) =>
                            updateField(idx, "options", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div>
                      <Label>Relasi</Label>
                      <Select
                        value={field.relation || "_none"}
                        onValueChange={(val) =>
                          updateField(
                            idx,
                            "relation",
                            val === "_none" ? "" : val
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="(Optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_none">-</SelectItem>
                          <SelectItem value="belongsTo">belongsTo</SelectItem>
                          <SelectItem value="hasOne">hasOne</SelectItem>
                          <SelectItem value="hasMany">hasMany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {field.relation &&
                      ["belongsTo", "hasOne", "hasMany"].includes(
                        field.relation
                      ) && (
                        <div>
                          <Label>Referensi Tabel</Label>
                          <Select
                            value={field.references || ""}
                            onValueChange={(val) =>
                              updateField(idx, "references", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tabel" />
                            </SelectTrigger>
                            <SelectContent>
                              {tables.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    <div>
                      <Label>Required</Label>
                      <Select
                        value={field.required ? "true" : "false"}
                        onValueChange={(val) =>
                          updateField(idx, "required", val === "true")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Ya</SelectItem>
                          <SelectItem value="false">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addField} variant="outline">
                + Tambah Field
              </Button>
            </div>

            <div>
              <Button onClick={submit} disabled={loading}>
                {loading ? "Membuat..." : "Generate CRUD"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
