import { Arrow } from "@radix-ui/react-tooltip";
import { ArrowRight, Bell, Book, Clock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold">👋 Selamat Datang di TEMPE</h1>
        <p className="mt-2 ms-2 text-neutral-600">Tugas Emang Perlu Dikerjain - Akses Informasi tugas kuliahmu dengan lebih mudah</p>
      </div>

      <div>
        {/* Tugas Mendesak dan Materi Terbaru */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-neutral-200 shadow"> {/* Tugas Mendesak */}
            <div className="p-6">
              <div className="flex justify-between">
                <h2 className="font-medium text-xl mb-4">Tugas Mendesak</h2>
                <Bell className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4" >3</h2>
              <p className="text-base text-neutral-600">Perlu diselesaikan minggu ini</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 shadow"> {/* Tugas Materi terbaru */}
            <div className="p-6">
              <div className="flex justify-between">
                <h2 className="font-medium text-xl mb-4">Tugas Mendesak</h2>
                <Book className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4" >5</h2>
              <p className="text-base text-neutral-600">Materi telah diupload</p>
            </div>
          </div>

        </div>

        {/* TUGAS TERBARU */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow mb-6">
          <div className="p-6 ">
            <div className="flex justify-between">
              <div>
                <h2 className="font-medium text-xl mb-4">🚀 Tugas Terbaru</h2>
             </div>
            <div className="flex">
              <Link href="/tugas" className="flex">
                  
                 <span>Lihat Semua</span>
                 <ArrowRight className="text-neutral-600" />
              </Link>
            </div>

            </div>

            <div className="bg-white rounded-lg border border-neutral-200  flex p-4 mb-4">
              <div>
                <h3 className="text-base font-medium">Laporan Pendahuluan Konsep Data Mining</h3>
                <p className="text-sm text-neutral-600">Konsep Data Mining</p>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Clock className="text-neutral-600"/>
                <p className="text-sm text-neutral-600">28 November 2024</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200  flex p-4 mb-4">
              <div>
                <h3 className="text-base font-medium">Laporan Akhir Konsep Data Mining</h3>
                <p className="text-sm text-neutral-600">Konsep Data Mining</p>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Clock className="text-neutral-600"/>
                <p className="text-sm text-neutral-600">28 November 2024</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200  flex p-4">
              <div>
                <h3 className="text-base font-medium">Project Website</h3>
                <p className="text-sm text-neutral-600">Pemrograman Berbasis Web</p>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Clock className="text-neutral-600"/>
                <p className="text-sm text-neutral-600">09 Desember 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pengumuman */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow mb-6 p-4">
          
          <div>
          <h2 className="font-medium text-xl mb-4">📢 Pengumuman</h2>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200  flex p-4 mb-4">
              <div>
                <h3 className="text-base font-medium">UAS Sebentar Lagi!...</h3>
                <p className="text-sm text-neutral-600">Persiapkan diri untuk Ujian Akhir Semester yang akan dimulai dalam 3 minggu</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200  flex p-4 mb-4">
              <div>
                <h3 className="text-base font-medium">Maintenance Website</h3>
                <p className="text-sm text-neutral-600">Website akan maintenance pada tanggal 30 November 2024</p>
              </div>
            </div>
        </div>

        <footer className="text-left py-5 text-sm text-gray-600">
          <div className="w-full h-px bg-neutral-200 mb-3"></div>
          <p className="text-sm text-black">© 2024 by IMK Team</p>
        </footer>

      </div>
    </div>
  );
}
