"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car, Plus, Edit, Trash2, DollarSign, Calendar, TrendingUp, Search, MapPin } from "lucide-react"

interface CarData {
  id: string
  "plat-nomor": string
  merek: string
  "tahun-pembuatan": number
  warna: string
  "no-rangka": string
  "no-mesin": string
  stnk: string
  "nilai-beli": number
  "penyusutan-aset": number
  "tanggal-pembelian": string
  [key: string]: any
}

export default function ModernCarManagement() {
  const [cars, setCars] = useState<CarData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newCar, setNewCar] = useState<any>({
    "plat-nomor": "",
    merek: "",
    "tahun-pembuatan": new Date().getFullYear(),
    warna: "",
    "no-rangka": "",
    "no-mesin": "",
    stnk: "",
    "nilai-beli": 0,
    "penyusutan-aset": 0,
    "tanggal-pembelian": new Date().toISOString().split("T")[0],
  })
  const [editingCar, setEditingCar] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards")

  const API = "http://localhost:8000/api/aset-mobils"

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const res = await axios.get(API)
      setCars(res.data.data || [])
    } catch (err) {
      console.error("Gagal fetch data", err)
    }
  }

  const handleAddCar = async () => {
    try {
      const res = await axios.post(API, newCar)
      setCars([...cars, res.data.data])
      resetForm()
    } catch (err) {
      console.error("Gagal tambah mobil", err)
    }
  }

  const handleUpdateCar = async () => {
    try {
      if (!editingCar?.id) return
      const res = await axios.put(`${API}/${editingCar.id}`, editingCar)
      setCars(cars.map((car) => (car.id === editingCar.id ? res.data.data : car)))
      setEditingCar(null)
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Gagal update", err)
    }
  }

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus mobil ini?")) return

    try {
      await axios.delete(`${API}/${id}`)
      setCars(cars.filter((car) => car.id !== id))
    } catch (err) {
      console.error("Gagal hapus", err)
    }
  }

  const resetForm = () => {
    setNewCar({
      "plat-nomor": "",
      merek: "",
      "tahun-pembuatan": new Date().getFullYear(),
      warna: "",
      "no-rangka": "",
      "no-mesin": "",
      stnk: "",
      "nilai-beli": 0,
      "penyusutan-aset": 0,
      "tanggal-pembelian": new Date().toISOString().split("T")[0],
    })
    setIsDialogOpen(false)
  }

  // Filter cars based on search
  const filteredCars = cars.filter(
    (car) =>
      car.merek.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car["plat-nomor"].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate statistics
  const totalCars = cars.length
  const totalValue = cars.reduce((sum, car) => sum + (car["nilai-beli"] || 0), 0)
  const totalDepreciation = cars.reduce((sum, car) => sum + (car["penyusutan-aset"] || 0), 0)
  const currentValue = totalValue - totalDepreciation

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getFieldLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      "plat-nomor": "Plat Nomor",
      merek: "Merek",
      "tahun-pembuatan": "Tahun Pembuatan",
      warna: "Warna",
      "no-rangka": "No. Rangka",
      "no-mesin": "No. Mesin",
      stnk: "STNK",
      "nilai-beli": "Nilai Beli (Rp)",
      "penyusutan-aset": "Penyusutan Aset (Rp)",
      "tanggal-pembelian": "Tanggal Pembelian",
    }
    return labels[key] || key
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Manajemen Aset Mobil
          </h1>
          <p className="text-gray-600">Kelola semua aset kendaraan dalam armada rental Anda</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Kendaraan</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <Car className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalCars}</div>
              <p className="text-xs text-gray-500 mt-1">unit kendaraan</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Nilai Aset</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalValue)}</div>
              <p className="text-xs text-gray-500 mt-1">nilai pembelian</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Nilai Saat Ini</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(currentValue)}</div>
              <p className="text-xs text-gray-500 mt-1">setelah penyusutan</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Penyusutan</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalDepreciation)}</div>
              <p className="text-xs text-gray-500 mt-1">akumulasi penyusutan</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan merek atau plat nomor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 shadow-md bg-white/80"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              onClick={() => setViewMode("cards")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Car className="w-4 h-4 mr-2" />
              Cards
            </Button>
            <Button variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}>
              Table
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  onClick={() => setEditingCar(null)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Mobil
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {editingCar ? "Edit Mobil" : "Tambah Mobil Baru"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCar ? "Ubah informasi mobil yang dipilih" : "Masukkan informasi lengkap mobil baru"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {Object.keys(newCar).map((key) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">{getFieldLabel(key)}</Label>
                      <Input
                        type={typeof newCar[key] === "number" ? "number" : key.includes("tanggal") ? "date" : "text"}
                        value={editingCar ? (editingCar[key] ?? "") : newCar[key]}
                        onChange={(e) => {
                          const value =
                            typeof newCar[key] === "number" ? Number.parseFloat(e.target.value) || 0 : e.target.value

                          if (editingCar) {
                            setEditingCar({ ...editingCar, [key]: value })
                          } else {
                            setNewCar({ ...newCar, [key]: value })
                          }
                        }}
                        className="border-gray-200 focus:border-cyan-500"
                        placeholder={`Masukkan ${getFieldLabel(key).toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setEditingCar(null)
                      resetForm()
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={editingCar ? handleUpdateCar : handleAddCar}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    {editingCar ? "Simpan Perubahan" : "Tambah Mobil"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content */}
        {viewMode === "cards" ? (
          /* Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card
                key={car.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                    <Car className="w-16 h-16 text-cyan-600" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-green-100 text-green-700 hover:bg-green-100">Aktif</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {car.merek} ({car["tahun-pembuatan"]})
                      </CardTitle>
                      <p className="text-sm text-gray-600">{car["plat-nomor"]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-cyan-600">{formatCurrency(car["nilai-beli"])}</p>
                      <p className="text-xs text-gray-500">nilai beli</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {car.warna}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(car["tanggal-pembelian"]).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <div className="mb-4 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">No. Rangka:</span> {car["no-rangka"]}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">No. Mesin:</span> {car["no-mesin"]}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">STNK:</span> {car.stnk}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-cyan-200 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                      onClick={() => {
                        setEditingCar(car)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Table View */
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
                      <th className="text-left p-4 font-semibold text-gray-700">Plat Nomor</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Merek</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Tahun</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Warna</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Nilai Beli</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCars.map((car, index) => (
                      <tr
                        key={car.id}
                        className={`border-b hover:bg-blue-50/50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="p-4 font-medium text-gray-900">{car["plat-nomor"]}</td>
                        <td className="p-4 text-gray-700">{car.merek}</td>
                        <td className="p-4 text-gray-700">{car["tahun-pembuatan"]}</td>
                        <td className="p-4 text-gray-700">{car.warna}</td>
                        <td className="p-4 font-semibold text-cyan-600">{formatCurrency(car["nilai-beli"])}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                              onClick={() => {
                                setEditingCar(car)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                              onClick={() => handleDeleteCar(car.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? "Tidak ada mobil ditemukan" : "Belum ada data mobil"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Coba ubah kata kunci pencarian atau tambah mobil baru"
                : "Mulai dengan menambahkan mobil pertama Anda"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Mobil Pertama
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
