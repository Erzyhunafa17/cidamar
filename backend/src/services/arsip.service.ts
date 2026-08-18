import { supabase } from '../config/supabase';

export const arsipService = {
  async getAll() {
    const { data, error } = await supabase
      .from('arsip_surat')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('arsip_surat')
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
    const { data: result, error } = await supabase
      .from('arsip_surat')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from('arsip_surat')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('arsip_surat')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
