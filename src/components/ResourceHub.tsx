import { motion } from "framer-motion";
import { Download, FileText, Database, Layers } from "lucide-react";

const resources = [
  // Administrasi Sekolah
  {
    id: 1,
    title: "Program Kerja Kepala Sekolah",
    description: "Template dokumen perencanaan program jangka pendek, menengah, dan panjang.",
    icon: FileText,
    type: "Document",
    link: "/administrasi-sekolah/Program-Kerja-Kepala-Sekolah.md",
    category: "sekolah"
  },
  {
    id: 2,
    title: "Format RKAS",
    description: "Contoh Rencana Kegiatan dan Anggaran Sekolah untuk merencanakan anggaran.",
    icon: Database,
    type: "Spreadsheet",
    link: "/administrasi-sekolah/Format-RKAS.csv",
    category: "sekolah"
  },
  {
    id: 3,
    title: "Kalender Pendidikan",
    description: "Contoh jadwal akademik tahun berjalan beserta rincian kegiatannya.",
    icon: Layers,
    type: "Document",
    link: "/administrasi-sekolah/Kalender-Pendidikan.md",
    category: "sekolah"
  },

  // Administrasi Mengajar
  {
    id: 4,
    title: "Modul Ajar Kurikulum Merdeka",
    description: "Contoh modul ajar IPA SMP sesuai pedoman Kurikulum Merdeka terbaru.",
    icon: FileText,
    type: "Document",
    link: "/administrasi-mengajar/Contoh-Modul-Ajar-Kurmer.md",
    category: "mengajar"
  },

  // Administrasi Kelas
  {
    id: 5,
    title: "Template Absensi & Jurnal Kelas",
    description: "Spreadsheet pencatatan kehadiran dan rincian aktivitas pembelajaran.",
    icon: Database,
    type: "Spreadsheet",
    link: "/administrasi-kelas/Template-Absensi-Jurnal.csv",
    category: "kelas"
  },

  // Prompt Poster
  {
    id: 6,
    title: "Prompt Poster Anti-Perundungan",
    description: "Prompt dasar untuk men-generate poster edukasi stop bullying menggunakan AI.",
    icon: FileText,
    type: "Text",
    link: "/prompt-poster/Prompt-Poster-Anti-Bullying.txt",
    category: "prompt"
  }
];
export function ResourceHub({ category }: { category?: string }) {
  const filteredResources = category ? resources.filter(r => r.category === category) : resources;

  return (
    <section id="resources" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Ruang Berbagi {category && `- Administrasi ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>
          <p className="text-[18px] leading-[1.6] text-ink font-bold max-w-2xl m-0 transition-colors duration-300">
            Kumpulan sumber daya, template, dan perangkat pembelajaran yang bisa Anda unduh secara gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.a
              href={resource.link}
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block border border-border rounded-2xl p-6 bg-gradient-to-br from-card-from to-card-to hover:border-border-hover transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-btn-bg/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <resource.icon className="w-6 h-6 text-btn-bg" />
              </div>
              <h3 className="text-[20px] font-[800] tracking-[0.5px] text-ink mb-3 transition-colors duration-300 group-hover:underline">
                {resource.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-muted mb-6 transition-colors duration-300">
                {resource.description}
              </p>
              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <span className="text-[12px] font-bold uppercase tracking-[1px] text-muted">
                  {resource.type}
                </span>
                <span className="flex items-center gap-2 text-[14px] font-bold text-btn-bg group-hover:text-btn-hover transition-colors">
                  Unduh <Download className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
