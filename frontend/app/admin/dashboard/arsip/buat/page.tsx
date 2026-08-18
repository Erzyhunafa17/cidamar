'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Link2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function BuatArsipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: '',
    file_url: '',
    tanggal_surat: '',
    keterangan: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/arsip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/dashboard/arsip');
      } else {
        alert('Gagal menyimpan data: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan arsip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/arsip">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Arsip Dokumen</h1>
          <p className="text-sm text-gray-500 mt-1">Tambahkan tautan Google Drive untuk dokumen desa.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Dokumen / Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={255}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder="Contoh: Proposal Pembangunan Jalan RT 01"
              value={formData.judul}
              onChange={(e) => setFormData({...formData, judul: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tautan Google Drive (URL) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link2 className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="url"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="https://drive.google.com/..."
                value={formData.file_url}
                onChange={(e) => setFormData({...formData, file_url: e.target.value})}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Pastikan akses *link* Google Drive disetel ke <strong>"Siapa saja yang memiliki tautan (Viewer)"</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Surat / Dokumen
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                value={formData.tanggal_surat}
                onChange={(e) => setFormData({...formData, tanggal_surat: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan Singkat (Opsional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="Contoh: Dokumen RAB tahun 2024"
                value={formData.keterangan}
                onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
              />
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} className="flex items-center gap-2 shadow-md">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? 'Menyimpan...' : 'Simpan Dokumen'}
          </Button>
        </div>

      </form>
    </div>
  );
}
