'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Save, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL, KATEGORI_PRESTASI, TINGKAT_PRESTASI } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';
import { supabase } from '@/lib/supabase/client';

export default function BuatPrestasiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    nama_prestasi: '',
    tahun: new Date().getFullYear().toString(),
    tingkat: 'kabupaten',
    kategori: 'lainnya',
    deskripsi: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('prestasi')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw new Error('Gagal mengupload gambar prestasi');
    }

    const { data } = supabase.storage.from('prestasi').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let foto_url = null;
      if (file) {
        foto_url = await uploadImage();
      }

      const payload = {
        ...formData,
        tahun: parseInt(formData.tahun, 10),
        foto_url,
      };

      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/prestasi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert('Data prestasi berhasil ditambahkan!');
        router.push('/admin/dashboard/prestasi');
      } else {
        alert('Gagal: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/prestasi">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Prestasi Baru</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Prestasi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
            placeholder="Contoh: Juara 1 Lomba Desa Tingkat Provinsi"
            value={formData.nama_prestasi}
            onChange={(e) => setFormData({...formData, nama_prestasi: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1945"
              max="2100"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
              value={formData.tahun}
              onChange={(e) => setFormData({...formData, tahun: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all bg-white"
              value={formData.tingkat}
              onChange={(e) => setFormData({...formData, tingkat: e.target.value})}
            >
              {TINGKAT_PRESTASI.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all bg-white"
              value={formData.kategori}
              onChange={(e) => setFormData({...formData, kategori: e.target.value})}
            >
              {KATEGORI_PRESTASI.map(k => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Penghargaan/Dokumentasi
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-secondary transition-colors bg-gray-50/50">
            <div className="space-y-2 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer rounded-md font-medium text-green-secondary hover:text-green-primary focus-within:outline-none">
                  <span>Pilih file foto</span>
                  <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP (Maksimal 2MB)</p>
              {file && (
                <p className="text-sm font-semibold text-green-600 mt-2">
                  Terpilih: {file.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keterangan Singkat
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all resize-y"
            placeholder="Opsional: Tuliskan keterangan mengenai prestasi ini..."
            value={formData.deskripsi}
            onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
          />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button type="submit" disabled={loading} className="flex items-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </Button>
        </div>

      </form>
    </div>
  );
}
