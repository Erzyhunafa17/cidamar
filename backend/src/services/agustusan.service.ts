import { supabase } from '../config/supabase';

interface GetAgustusanOptions {
  tahun_acara?: number;
}

export const agustusanService = {
  async getAll({ tahun_acara }: GetAgustusanOptions = {}) {
    // If no year specified, use current year
    const year = tahun_acara || new Date().getFullYear();

    // In Supabase, to fetch a related table we can use select('*, anggota_grup(id, nama)')
    const { data, error } = await supabase
      .from('grup_penampilan')
      .select(`
        *,
        anggota_grup (
          id,
          nama
        )
      `)
      .eq('tahun_acara', year)
      .order('urutan_tampil', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('grup_penampilan')
      .select(`
        *,
        anggota_grup (
          id,
          nama
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  async create(data: any) {
    // Pisahkan anggota dari data grup
    const { anggota, ...grupData } = data;

    // Insert ke tabel grup_penampilan
    const { data: grupResult, error: grupError } = await supabase
      .from('grup_penampilan')
      .insert([grupData])
      .select()
      .single();

    if (grupError) throw grupError;

    // Jika ada daftar anggota, insert ke tabel anggota_grup
    if (anggota && Array.isArray(anggota) && anggota.length > 0) {
      const anggotaToInsert = anggota.map((nama: string) => ({
        grup_id: grupResult.id,
        nama
      }));

      const { error: anggotaError } = await supabase
        .from('anggota_grup')
        .insert(anggotaToInsert);
        
      if (anggotaError) {
        console.error('Gagal menyimpan anggota grup:', anggotaError);
        // Tetap kembalikan hasil grup meskipun anggotanya gagal, 
        // walau idealnya ini dilakukan dalam sebuah transaction (RPC di Supabase)
      }
    }

    await this.syncUrutan(grupData.tahun_acara || new Date().getFullYear());
    return this.getById(grupResult.id);
  },

  async update(id: string, data: any) {
    const { anggota, ...grupData } = data;

    // Update tabel grup_penampilan
    if (Object.keys(grupData).length > 0) {
      const { error: grupError } = await supabase
        .from('grup_penampilan')
        .update(grupData)
        .eq('id', id);

      if (grupError) throw grupError;
    }

    // Update anggota (Hapus yang lama, insert yang baru)
    // Supabase tidak mensupport nested update dari REST API standar dengan mudah,
    // maka cara termudah adalah replace (delete & insert) jika field anggota disertakan
    if (anggota && Array.isArray(anggota)) {
      // 1. Hapus semua anggota lama
      await supabase
        .from('anggota_grup')
        .delete()
        .eq('grup_id', id);

      // 2. Insert anggota baru jika ada
      if (anggota.length > 0) {
        const anggotaToInsert = anggota.map((nama: string) => ({
          grup_id: id,
          nama
        }));

        await supabase
          .from('anggota_grup')
          .insert(anggotaToInsert);
      }
    }

    return this.getById(id);
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('grup_penampilan')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    // Ambil tahun acara sebelum dihapus untuk keperluan sync
    const item = await this.getById(id);
    if (!item) return true;

    const { error } = await supabase
      .from('grup_penampilan')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    await this.syncUrutan(item.tahun_acara);
    return true;
  },

  async syncUrutan(tahun_acara: number) {
    const { data: allItems, error } = await supabase
      .from('grup_penampilan')
      .select('id, urutan_tampil')
      .eq('tahun_acara', tahun_acara)
      .order('urutan_tampil', { ascending: true });

    if (error) throw error;
    if (!allItems || allItems.length === 0) return;

    // Update hanya jika ada ketidaksesuaian (gap atau urutan salah)
    const updatePromises = allItems.map((item, index) => {
      const correctUrutan = index + 1;
      if (item.urutan_tampil !== correctUrutan) {
        return supabase
          .from('grup_penampilan')
          .update({ urutan_tampil: correctUrutan })
          .eq('id', item.id);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
  },

  async reorder(id: string, new_urutan: number) {
    const item = await this.getById(id);
    if (!item) throw new Error('Data tidak ditemukan');

    const year = item.tahun_acara;
    const old_urutan = item.urutan_tampil;

    if (old_urutan === new_urutan) return item;

    const { data: allItems, error: err2 } = await supabase
      .from('grup_penampilan')
      .select('id, urutan_tampil')
      .eq('tahun_acara', year)
      .order('urutan_tampil', { ascending: true });

    if (err2) throw err2;

    const withoutItem = allItems.filter((i: any) => i.id !== id);
    
    let insertIndex = new_urutan - 1;
    if (insertIndex < 0) insertIndex = 0;
    if (insertIndex > withoutItem.length) insertIndex = withoutItem.length;

    withoutItem.splice(insertIndex, 0, { id, urutan_tampil: old_urutan });

    const updatePromises = withoutItem.map((i: any, index: number) => {
      const correctUrutan = index + 1;
      if (i.urutan_tampil !== correctUrutan) {
        return supabase
          .from('grup_penampilan')
          .update({ urutan_tampil: correctUrutan })
          .eq('id', i.id);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
    return this.getById(id);
  },

  async deleteSelesai(tahun_acara?: number) {
    const year = tahun_acara || new Date().getFullYear();
    const { error } = await supabase
      .from('grup_penampilan')
      .delete()
      .eq('status', 'selesai')
      .eq('tahun_acara', year);

    if (error) throw error;
    
    await this.syncUrutan(year);
    return true;
  }
};
