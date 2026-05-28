import { Database, FolderOpen, Youtube } from "lucide-react";
import { motion } from "motion/react";

const ecosystemItems = [
  {
    icon: Database,
    title: "Pemuryadi Digital Hub",
    description: "Dashboard guru: absensi digital, input nilai rapor, monitoring kehadiran — didukung Google Apps Script + Sheets.",
    stack: "Apps Script • Sheets • Web",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: FolderOpen,
    title: "Repositori Humas & Akademik",
    description: "Folder Google Drive terstruktur: program semester, analisis SWOT, hingga aset Tujuh Kebiasaan Anak Hebat.",
    stack: "Google Drive • Docs",
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    icon: Youtube,
    title: "Media Edukasi Komunitas",
    description: "Konten edukasi digital kurikulum merdeka dan infografis keamanan digital berbasis literasi digital.",
    stack: "YouTube • Canva • AI",
    color: "text-red-500",
    bgColor: "bg-red-50"
  }
];

export function Ecosystem() {
  return (
    <section id="ekosistem" className="pt-[60px] pb-[60px] px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-[15px] font-[700] m-0">
            Ekosistem Google yang Saya Bangun
          </h2>
          <p className="text-[14px] leading-[1.6] text-[#a0a0a0] max-w-2xl m-0">
            Menciptakan alur kerja yang terintegrasi, paperless, dan efisien untuk kebutuhan akademik dan administratif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
          {ecosystemItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-[#222222] p-[15px] aspect-square flex flex-col justify-between bg-gradient-to-br from-[#111111] to-[#0a0a0a] hover:border-[#444444] transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-[#555555] block mb-4">
                  [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                </span>
                <item.icon className="w-6 h-6 text-[#ffffff] mb-4" />
                <h3 className="text-[12px] font-[800] uppercase tracking-[1px] text-[#ffffff] mb-3">{item.title}</h3>
                <p className="text-[11px] leading-[1.6] text-[#a0a0a0] m-0">{item.description}</p>
              </div>
              <div className="text-[9px] uppercase tracking-[1px] text-[#555555] mt-4">
                {item.stack}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
