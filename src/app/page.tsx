import { Bell, Book } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold">👋 Selamat Datang di TEMPE</h1>
        <p className="mt-2 ms-2 text-neutral-600">Tugas Emang Perlu Dikerjain - Akses Informasi tugas kuliahmu dengan lebih mudah</p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-6 ">
          
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
      </div>
    </div>
  );
}
