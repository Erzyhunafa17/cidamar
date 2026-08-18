import { supabase } from '../config/supabase';

interface GetGaleriOptions {
  limit?: number;
}

const mapToFrontend = (item: any) => {
  if (!item) return item;
  const mapped = { ...item, kategori: item.kategori_kegiatan };
  delete mapped.kategori_kegiatan;
  return mapped;
};

const mapToDatabase = (data: any) => {
  const payload = { ...data };
  if ('kategori' in payload) {
    payload.kategori_kegiatan = payload.kategori;
    delete payload.kategori;
  }
  return payload;
};

export const galeriService = {
  async getAll({ limit }: GetGaleriOptions = {}) {
    let query = supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ? data.map(mapToFrontend) : [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return mapToFrontend(data);
  },

  async create(data: any) {
    const payload = mapToDatabase(data);
    const { data: result, error } = await supabase
      .from('galeri')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return mapToFrontend(result);
  },

  async update(id: string, data: any) {
    const payload = mapToDatabase(data);
    const { data: result, error } = await supabase
      .from('galeri')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapToFrontend(result);
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('galeri')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
