"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Fuel,
  Settings,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Sidebar from "./components/sidebar";
import CarManagement from "./components/car-management";
import axios from "axios";

interface CarData {
  id: string;
  "plat-nomor": string;
  merek: string;
  "tahun-pembuatan": number;
  warna: string;
  "no-rangka": string;
  "no-mesin": string;
  stnk: string;
  "nilai-beli": number;
  "penyusutan-aset": number;
  "tanggal-pembelian": string;
  [key: string]: any;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cars, setCars] = useState<CarData[]>([]);

  const API = "http://localhost:8000/api/aset-mobils";

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get(API);
      setCars(res.data.data || []);
    } catch (err) {
      console.error("Gagal fetch data", err);
    }
  };

  const totalCars = cars.length

  const stats = [
    {
      title: "Pelanggan Aktif",
      value: "1,429",
      change: "+8%",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 2.4M",
      change: "+23%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Tingkat Okupansi",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentBookings = [
    {
      id: "RV001",
      customer: "Ahmad Rizki",
      car: "Toyota Avanza 2023",
      duration: "3 hari",
      status: "active",
      amount: "Rp 450,000",
    },
    {
      id: "RV002",
      customer: "Sari Dewi",
      car: "Honda CR-V 2024",
      duration: "7 hari",
      status: "pending",
      amount: "Rp 1,750,000",
    },
    {
      id: "RV003",
      customer: "Budi Santoso",
      car: "Mitsubishi Xpander 2023",
      duration: "2 hari",
      status: "completed",
      amount: "Rp 320,000",
    },
  ];

  const popularCars = [
    {
      name: "Toyota Avanza",
      bookings: 45,
      revenue: "Rp 6.8M",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Honda CR-V",
      bookings: 38,
      revenue: "Rp 9.5M",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Mitsubishi Xpander",
      bookings: 42,
      revenue: "Rp 5.2M",
      image: "/placeholder.svg?height=80&width=120",
    },
  ];

  if (activeTab === "cars") {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <CarManagement />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard RentVix Pro
              </h1>
              <p className="text-gray-600 mt-2">
                Selamat datang kembali! Berikut ringkasan bisnis rental Anda
                hari ini.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <div
              className={`absolute inset-0 bg-gradient-to-r opacity-5 from-cyan-500 to-blue-500`}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Kendaraan
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500`}
              >
                <Car className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {totalCars}
              </div>
              {/* <p className="text-xs text-green-600 font-medium mt-1">
                   dari bulan lalu
                </p> */}
            </CardContent>
          </Card>
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}
              />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {stat.change} dari bulan lalu
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Booking Terbaru
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
                  >
                    Lihat Semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {booking.customer}
                          </p>
                          <p className="text-sm text-gray-600">{booking.car}</p>
                          <p className="text-xs text-gray-500">
                            {booking.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {booking.amount}
                        </p>
                        <Badge
                          variant={
                            booking.status === "active"
                              ? "default"
                              : booking.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            booking.status === "active"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {booking.status === "active"
                            ? "Aktif"
                            : booking.status === "pending"
                            ? "Pending"
                            : "Selesai"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Cars */}
          <div>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Mobil Terpopuler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularCars.map((car, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50 border border-gray-100"
                    >
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {car.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {car.bookings} booking
                        </p>
                        <p className="text-sm font-bold text-purple-600">
                          {car.revenue}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 h-16 flex-col gap-2"
                >
                  <Car className="w-6 h-6" />
                  <span className="text-sm">Tambah Mobil</span>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 h-16 flex-col gap-2"
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Kelola Pelanggan</span>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 h-16 flex-col gap-2"
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Jadwal Booking</span>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 h-16 flex-col gap-2"
                >
                  <Settings className="w-6 h-6" />
                  <span className="text-sm">Pengaturan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
