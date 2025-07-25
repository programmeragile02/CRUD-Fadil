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

export default function PenggunaPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [activeTab, setActiveTab] = useState("pengguna");

  const [newItem, setNewItem] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:8000/api/pengguna");
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
      await axios.post("http://localhost:8000/api/pengguna", newItem);
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
      await axios.put("http://localhost:8000/api/pengguna/" + editingItem.id, editingItem);
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
      await axios.delete("http://localhost:8000/api/pengguna/" + id);
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
          <h1 className="text-3xl font-bold text-slate-800">Data Pengguna</h1>
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
              <div className="space-y-4 py-4">                <div className="space-y-2">
                  <Label htmlFor="nama">Nama</Label>
                  <Input
                    id="nama"
                    value={newItem.nama || ""}
                    onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })}
                  />
                </div>                <div className="space-y-2">
                  <Label htmlFor="telepon">Telepon</Label>
                  <Input
                    id="telepon"
                    value={newItem.telepon || ""}
                    onChange={(e) => setNewItem({ ...newItem, telepon: e.target.value })}
                  />
                </div>              </div>
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
              <tr><th className="p-3 font-semibold text-slate-600">nama</th><th className="p-3 font-semibold text-slate-600">telepon</th>                <th className="p-3 font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-slate-50"><td className='p-3'>{item.nama}</td><td className='p-3'>{item.telepon}</td>                  <td className="p-3 space-x-2">
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
                  <td colSpan="3" className="p-4 text-center text-slate-500">
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
              <div className="space-y-4 py-4">                <div className="space-y-2">
                  <Label htmlFor="edit_nama">Nama</Label>
                  <Input
                    id="edit_nama"
                    value={editingItem.nama || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nama: e.target.value })
                    }
                  />
                </div>                <div className="space-y-2">
                  <Label htmlFor="edit_telepon">Telepon</Label>
                  <Input
                    id="edit_telepon"
                    value={editingItem.telepon || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, telepon: e.target.value })
                    }
                  />
                </div>              </div>
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