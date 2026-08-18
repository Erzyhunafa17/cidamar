import { Metadata } from 'next';
import { fetchArsip } from '@/lib/api/galeri'; // menggunakan file api yang sama
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Arsip & Dokumen | Kampung Cidamar',
  description: 'Unduh dokumen, surat, dan proposal terkait Kampung Cidamar.',
};

export const dynamic = 'force-dynamic';

export default async function ArsipPage() {
  const { data } = await fetchArsip().catch(() => ({ data: [] }));
  const arsipData = data || [];

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20 font-sans">
      <div className="container-custom max-w-5xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gray" className="mb-4">
            <FileText className="w-4 h-4 mr-1.5" />
            Dokumen Publik
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-primary mb-4">
            Arsip & Surat
          </h1>
          <p className="text-lg text-brown-medium">
            Akses dan unduh format surat, proposal, serta dokumen publik Kampung Cidamar.
          </p>
        </div>

        {/* Arsip List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
          
          {/* Dekorasi Pojok */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-[100px] -z-0 opacity-50"></div>

          <div className="relative z-10 p-6 md:p-8">
            {arsipData.length > 0 ? (
              <div className="space-y-4">
                {arsipData.map((item: any) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 gap-6 group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-primary transition-colors">
                          {item.judul}
                        </h3>
                        {item.keterangan && (
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                            {item.keterangan}
                          </p>
                        )}
                        {item.tanggal_surat && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(item.tanggal_surat)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="shrink-0 md:pl-4 md:border-l border-gray-100 flex items-center">
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-white border-2 border-gray-100 text-gray-700 hover:text-green-600 hover:border-green-500 rounded-xl font-bold text-sm transition-all shadow-sm group-hover:shadow-md"
                      >
                        Buka Dokumen
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Dokumen</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Belum ada arsip surat atau proposal yang diunggah oleh admin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
