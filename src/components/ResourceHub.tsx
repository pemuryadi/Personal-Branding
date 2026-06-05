import { motion } from "framer-motion";
import { Download, FileText, Database, Layers } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Modul Ajar Bahasa Indonesia",
    description: "Contoh Modul Ajar Bahasa Indonesia kelas 7 Kurikulum Merdeka.",
    icon: FileText,
    type: "Document",
    link: "/modul-ajar/Modul-Ajar-Bahasa-Indonesia.txt"
  },
  {
    id: 2,
    title: "Modul Ajar Matematika",
    description: "Contoh Modul Ajar Matematika kelas 8 Kurikulum Merdeka.",
    icon: FileText,
    type: "Document",
    link: "/modul-ajar/Modul-Ajar-Matematika.txt"
  },
  {
    id: 3,
    title: "Prompt Skenario Pembelajaran",
    description: "Prompt untuk AI membuat skenario pembelajaran berdiferensiasi.",
    icon: Database,
    type: "Notion Template",
    link: "/prompt-ai/Prompt-Skenario-Pembelajaran.txt"
  },
  {
    id: 4,
    title: "Prompt Generator Soal",
    description: "Prompt untuk men-generate soal HOTS pilihan ganda.",
    icon: Database,
    type: "Notion Template",
    link: "/prompt-ai/Prompt-Generator-Soal.txt"
  },
  {
    id: 5,
    title: "Template Nilai Formatif",
    description: "Spreadsheet untuk merekap dan mengolah nilai formatif siswa.",
    icon: Layers,
    type: "Google Sheets",
    link: "/manajemen-nilai/Template-Nilai-Formatif.csv"
  },
  {
    id: 6,
    title: "Template Nilai Sumatif",
    description: "Spreadsheet untuk merekap dan mengolah nilai sumatif siswa.",
    icon: Layers,
    type: "Google Sheets",
    link: "/manajemen-nilai/Template-Nilai-Sumatif.csv"
  }
];

export function ResourceHub() {
  return (
    <section id="resources" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Ruang Berbagi
          </h2>
          <p className="text-[18px] leading-[1.6] text-ink font-bold max-w-2xl m-0 transition-colors duration-300">
            Kumpulan sumber daya, template, dan perangkat pembelajaran yang bisa Anda unduh secara gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
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
