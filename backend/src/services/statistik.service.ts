import { supabase } from '../config/supabase';
import { createError } from '../middlewares/errorHandler';

export interface StatistikItem {
  id: string;
  label: string;
  nilai: number;
  satuan: string | null;
  updated_at: string;
}

export const statistikService = {
  async getAll(): Promise<StatistikItem[]> {
    const { data, error } = await supabase
      .from('statistik_kampung')
      .select('*')
      .order('label', { ascending: true });

    if (error) {
      throw createError(`Gagal mengambil data statistik: ${error.message}`, 500);
    }

    return data as StatistikItem[];
  },

  async updateByLabel(label: string, nilai: number): Promise<StatistikItem> {
    const { data, error } = await supabase
      .from('statistik_kampung')
      .update({ nilai, updated_at: new Date().toISOString() })
      .eq('label', label)
      .select()
      .single();

    if (error) {
      throw createError(`Gagal memperbarui statistik: ${error.message}`, 500);
    }

    return data as StatistikItem;
  },
};
