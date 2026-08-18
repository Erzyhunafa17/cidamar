import { API_BASE_URL } from '../utils/constants';
import Cookies from 'js-cookie';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login gagal');
  }

  const data = await res.json();
  
  // Simpan token di cookie agar bisa dibaca oleh middleware Next.js
  Cookies.set('token', data.token, { expires: 1, path: '/' });
  // Simpan user info di localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}

export function logout() {
  Cookies.remove('token', { path: '/' });
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export function getUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

// Fungsi pembantu untuk membungkus fetch dengan Authorization header
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = Cookies.get('token');
  
  const headers = {
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const res = await fetch(url, { 
    ...options, 
    headers,
    cache: 'no-store'
  });
  
  // Jika token expired / tidak valid (401), auto logout
  if (res.status === 401) {
    logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new Error('Sesi berakhir. Silakan login kembali.');
  }
  
  return res;
}
