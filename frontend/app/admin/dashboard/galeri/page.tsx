'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Search, Settings, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function AdminGaleriPage() {
  const [fotos, setFotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pengaturan
  const [showSettings, setShowSettings] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settings, setSettings] = useState({
    galeri_gdrive_link: '',
    galeri_display_limit: '10'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      // Ambil foto
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/galeri`);
      const data = await res.json();
      if (data.success) setFotos(data.data);

      // Ambil pengaturan
      const resSet = await fetch(`${API_BASE_URL}/api/pengaturan`);
      const dataSet = await resSet.json();
      if (dataSet.success) {
        setSettings({
          galeri_gdrive_link: dataSet.data.galeri_gdrive_link || '',
          galeri_display_limit: dataSet.data.galeri_display_limit || '10'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus foto ini dari galeri?')) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/galeri/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const payload = {
        galeri_gdrive_link: settings.galeri_gdrive_link,
        galeri_display_limit: parseInt(settings.galeri_display_limit, 10)
      };

      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/pengaturan`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Pengaturan galeri berhasil disimpan!');
        setShowSettings(false);
      } else {
        alert('Gagal: ' + data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSettingsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola foto-foto yang tampil di halaman publik galeri.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 flex-1 sm:flex-none justify-center"
          >
            <Settings className="w-4 h-4" />
            Pengaturan
          </Button>
          <Link href="/admin/dashboard/galeri/buat" className="flex-1 sm:flex-none">
            <Button className="flex items-center gap-2 w-full justify-center">
              <Plus className="w-4 h-4" />
              Upload Foto
            </Button>
          </Link>
        </div>
      </div>

      {/* Panel Pengaturan */}
      {showSettings && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-all">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Pengaturan Galeri Web
          </h2>
          <form onSubmit={handleSaveSettings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batas Foto Ditampilkan (Limit)
                </label>
                <input
                  type="number"
                  required min="1" max="100"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  value={settings.galeri_display_limit}
                  onChange={(e) => setSettings({...settings, galeri_display_limit: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Jumlah maksimal foto yang akan dirender di web agar tidak membebani server.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Google Drive (Tombol "Lebih Banyak")
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  value={settings.galeri_gdrive_link}
                  onChange={(e) => setSettings({...settings, galeri_gdrive_link: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Tautan eksternal tempat seluruh arsip foto desa disimpan.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={settingsLoading} className="flex items-center gap-2">
                {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan Pengaturan
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Foto */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Memuat foto...</div>
        ) : fotos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Belum ada foto di galeri.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotos.map(foto => (
              <div key={foto.id} className="group relative rounded-xl overflow-hidden border border-gray-200 aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={foto.foto_url} 
                  alt={foto.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="text-white text-xs font-medium truncate">
                    {foto.judul}
                  </div>
                  <div className="flex justify-end gap-1">
                    <button 
                      onClick={() => handleDelete(foto.id)}
                      className="p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-md transition-colors"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
