import { supabase } from '../config/supabase';

export const pengaturanService = {
  async get(key: string) {
    const { data, error } = await supabase
      .from('pengaturan')
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data.value;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('pengaturan')
      .select('*');

    if (error) throw error;
    
    // Convert to object
    const settings: Record<string, string> = {};
    data.forEach(item => {
      settings[item.key] = item.value;
    });
    
    return settings;
  },

  async set(key: string, value: string) {
    // Upsert (insert or update)
    const { error } = await supabase
      .from('pengaturan')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) throw error;
    return true;
  },

  async setMultiple(settings: Record<string, string>) {
    const records = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase
      .from('pengaturan')
      .upsert(records, { onConflict: 'key' });

    if (error) throw error;
    return true;
  }
};
