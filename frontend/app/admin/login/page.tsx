'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Lock, User, Loader2 } from 'lucide-react';
import { login } from '@/lib/api/auth';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message || 'Gagal login. Periksa username dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-green-900/5 p-8 border border-gray-100 relative overflow-hidden">
        
        {/* Dekorasi Latar */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-50 rounded-full blur-3xl opacity-60"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-green-primary rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <Leaf className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Panel Admin</h1>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Sistem Informasi Kampung Cidamar
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-secondary/20 focus:border-green-secondary transition-all sm:text-sm outline-none"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-secondary/20 focus:border-green-secondary transition-all sm:text-sm outline-none"
                  placeholder="Masukkan password"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3.5 mt-2 rounded-xl bg-green-primary text-white hover:bg-green-700 transition-all font-semibold shadow-lg shadow-green-600/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
