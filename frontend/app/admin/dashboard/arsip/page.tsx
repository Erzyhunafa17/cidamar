'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, FileText, Calendar, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL, formatDate } from '@/lib/utils/constants';

export default function AdminArsipPage() {
  const [arsip, setArsip] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArsip = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/arsip`); // public endpoint ok for now
      const data = await res.json();
      if (data.success) {
        setArsip(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArsip();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus arsip dokumen ini?')) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/arsip/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer DUMMY', 'X-Mock-Admin': 'true' }
      });
      if (res.ok) fetchArsip();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Arsip Surat</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dokumen, surat, dan proposal publik desa.</p>
        </div>
        <Link href="/admin/dashboard/arsip/buat">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Dokumen
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Dokumen</th>
                <th className="px-6 py-4">Link GDrive</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : arsip.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center flex flex-col items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-200 mb-3" />
                    <span className="text-gray-500 block">Belum ada dokumen arsip.</span>
                  </td>
                </tr>
              ) : (
                arsip.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{item.judul}</p>
                      {item.deskripsi && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-sm">{item.deskripsi}</p>
                      )}
                      {item.tahun && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          Tahun {item.tahun}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Buka Link
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
