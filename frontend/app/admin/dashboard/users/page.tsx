'use client';

import { useState, useEffect } from 'react';
import { fetchWithAuth, getUser } from '@/lib/api/auth';
import { API_BASE_URL } from '@/lib/utils/constants';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Trash2, UserPlus, Shield, User, Key } from 'lucide-react';

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', nama: '', role: 'admin' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUser = getUser();

  const fetchAdmins = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/users`);
      const data = await res.json();
      setAdmins(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Gagal menambahkan admin');
      }
      setForm({ username: '', password: '', nama: '', role: 'admin' });
      fetchAdmins(); // refresh data
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus admin ini?')) return;
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Gagal menghapus admin');
      }
      fetchAdmins();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (currentUser?.role !== 'superadmin') {
    return <div className="text-center mt-20 text-red-500 font-bold">Akses Ditolak. Anda bukan Superadmin.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Manajemen Admin</h1>
        <p className="text-gray-500">
          Tambahkan atau hapus akun admin untuk website ini.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* Form Tambah Admin */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-green-primary" />
          Tambah Admin Baru
        </h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input type="text" required value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-secondary" placeholder="Contoh: Budi" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" required value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-secondary" placeholder="Username unik" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-secondary" placeholder="Password kuat" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-secondary">
              <option value="admin">Admin Biasa</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <Button type="submit" className="w-full h-[42px]" disabled={submitLoading}>
              {submitLoading ? 'Menyimpan...' : 'Tambah'}
            </Button>
          </div>
        </form>
      </div>

      {/* Tabel Daftar Admin */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Tanggal Dibuat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Memuat data...</td></tr>
              ) : admins.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Belum ada admin lain.</td></tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{admin.nama}</td>
                    <td className="px-6 py-4">@{admin.username}</td>
                    <td className="px-6 py-4">
                      {admin.role === 'superadmin' ? (
                        <Badge variant="gold" size="sm" className="bg-amber-100 text-amber-700"><Shield className="w-3 h-3 mr-1" /> Superadmin</Badge>
                      ) : (
                        <Badge variant="blue" size="sm"><User className="w-3 h-3 mr-1" /> Admin</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">{new Date(admin.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => {
                          const newPassword = prompt(`Masukkan password baru untuk user @${admin.username}:`);
                          if (newPassword) {
                            if (newPassword.length < 6) {
                              alert('Password harus minimal 6 karakter!');
                              return;
                            }
                            fetchWithAuth(`${API_BASE_URL}/api/users/${admin.id}/password`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ newPassword })
                            }).then(res => {
                              if (res.ok) alert('Password berhasil direset!');
                              else res.json().then(err => alert(err.error || 'Gagal mereset password'));
                            }).catch(() => alert('Terjadi kesalahan jaringan'));
                          }
                        }} className="text-amber-500 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors" title="Reset Password">
                          <Key className="w-4 h-4" />
                        </button>
                        {admin.id !== currentUser?.id && (
                          <button onClick={() => handleDelete(admin.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Admin">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
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
