"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Car, Users, Calendar, BarChart3, Settings, LogOut, Zap, Circle } from 'lucide-react'
import menuDinamis from '@/data/menu.json';
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: '/' },
    { id: "cars", label: "Kelola Mobil", icon: Car, path: '/cars' },
    { id: "builder", label: "Master Builder", icon: Circle, path: '/builder' },
    // { id: "customers", label: "Pelanggan", icon: Users, path: '/customers' },
    // { id: "bookings", label: "Booking", icon: Calendar, path: '/bookings' },
    // { id: "analytics", label: "Analitik", icon: BarChart3, path: '/analytics' },
    // { id: "settings", label: "Pengaturan", icon: Settings, path: '/settings' },
    ...menuDinamis.map((menu) => ({
      id: menu.path.replace('/', ''),
      label: menu.name,
      icon: Circle,
      path: menu.path,
    }))
  ]

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              RentVix Pro
            </h2>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto max-h-[30rem]">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              variant={pathname === item.path ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                pathname === item.path
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@rentvix.com</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-3 text-gray-600 hover:text-red-600 hover:border-red-200">
          <LogOut className="w-4 h-4" />
          Keluar
        </Button>
      </div>
    </div>
  )
}
