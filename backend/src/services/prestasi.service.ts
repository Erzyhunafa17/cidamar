import { supabase } from '../config/supabase';
import { slugify } from '../utils/slugify';

interface GetPrestasiOptions {
  page?: number;
  limit?: number;
  search?: string;
  kategori?: string;
  tingkat?: string;
  tahun?: number;
}

export const prestasiService = {
  async getAll({ page = 1, limit = 10, search, kategori, tingkat, tahun }: GetPrestasiOptions = {}) {
    let query = supabase
      .from('prestasi')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('nama_prestasi', `%${search}%`);
    }
    if (kategori) {
      query = query.eq('kategori', kategori);
    }
    if (tingkat) {
      query = query.eq('tingkat', tingkat);
    }
    if (tahun) {
      query = query.eq('tahun', tahun);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Order by terbaru
    const { data, error, count } = await query
      .order('tahun', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
      }
    };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('prestasi')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('prestasi')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  async create(data: any) {
    let baseSlug = slugify(data.nama_prestasi);
    let slug = baseSlug;
    let isUnique = false;
    let counter = 1;

    while (!isUnique) {
      const { data: existing } = await supabase
        .from('prestasi')
        .select('id')
        .eq('slug', slug)
        .single();
      
      if (!existing) {
        isUnique = true;
      } else {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const { data: result, error } = await supabase
      .from('prestasi')
      .insert([{ ...data, slug }])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from('prestasi')
      .update(data) // updated_at is automatically updated in pg or ignored in schema
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('prestasi')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
