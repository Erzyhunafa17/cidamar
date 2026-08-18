'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, UploadCloud, X, ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function BuatGaleriPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    tahun: new Date().getFullYear().toString(),
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validasi ukuran (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const uploadToStorage = async (fileToUpload: File): Promise<string> => {
    const fileName = `galeri_${Date.now()}_${fileToUpload.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const { supabase } = await import('@/lib/supabase/client');
    
    const { data, error } = await supabase.storage
      .from('galeri')
      .upload(fileName, fileToUpload);
      
    if (error) {
      throw error;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('galeri')
      .getPublicUrl(data.path);
      
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Harap pilih foto terlebih dahulu');
      return;
    }

    setLoading(true);
    setUploadingImage(true);

    try {
      // 1. Upload ke Storage
      const foto_url = await uploadToStorage(file);
      setUploadingImage(false);

      // 2. Simpan ke Database
      const payload = {
        judul: formData.judul,
        kategori: formData.kategori || null,
        tahun: formData.tahun ? parseInt(formData.tahun, 10) : null,
        foto_url
      };

      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/galeri`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/dashboard/galeri');
      } else {
        alert('Gagal menyimpan data: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengunggah foto.');
      setUploadingImage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/galeri">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Upload Foto Galeri</h1>
          <p className="text-sm text-gray-500 mt-1">Tambahkan dokumentasi foto baru ke dalam galeri website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Foto <span className="text-red-500">*</span>
            </label>
            
            {!previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500 font-medium">Klik untuk memilih file foto</p>
                  <p className="text-xs text-gray-400">JPG, PNG atau WebP (Maks 5MB)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative w-full rounded-xl overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[400px] object-contain bg-gray-50" />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreviewUrl(null); }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Foto / Deskripsi Singkat
              </label>
              <input
                type="text"
                maxLength={255}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="Contoh: Kerja Bakti Warga RT 02"
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori (Opsional)
              </label>
              <input
                type="text"
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="Contoh: Kegiatan Desa"
                value={formData.kategori}
                onChange={(e) => setFormData({...formData, kategori: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahun
              </label>
              <input
                type="number"
                min="2000"
                max="2100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                value={formData.tahun}
                onChange={(e) => setFormData({...formData, tahun: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} className="flex items-center gap-2 shadow-md">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {uploadingImage ? 'Mengunggah Foto...' : (loading ? 'Menyimpan...' : 'Upload & Simpan')}
          </Button>
        </div>

      </form>
    </div>
  );
}
