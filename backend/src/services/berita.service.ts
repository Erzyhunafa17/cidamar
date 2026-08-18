import { supabase } from '../config/supabase';
import { slugify } from '../utils/slugify';

interface GetBeritaOptions {
  page?: number;
  limit?: number;
  search?: string;
  kategori?: string;
}

export const beritaService = {
  async getAll({ page = 1, limit = 10, search, kategori }: GetBeritaOptions = {}) {
    let query = supabase
      .from('berita')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('judul', `%${search}%`);
    }

    if (kategori) {
      query = query.eq('kategori', kategori);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('tanggal_terbit', { ascending: false })
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
      .from('berita')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  async create(data: any, penulis_id?: string) {
    // Generate unique slug
    let baseSlug = slugify(data.judul);
    let slug = baseSlug;
    let isUnique = false;
    let counter = 1;

    while (!isUnique) {
      const { data: existing } = await supabase
        .from('berita')
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
      .from('berita')
      .insert([{ ...data, slug, penulis_id }])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async update(id: string, data: any) {
    // If title changed, we might want to update slug, but usually slug is kept the same for SEO.
    // We will just update the provided fields.
    const { data: result, error } = await supabase
      .from('berita')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('berita')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
