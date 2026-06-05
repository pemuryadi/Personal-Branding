import { BookOpen, FileSpreadsheet, ShieldCheck, Box } from "lucide-react";
import { motion } from "framer-motion";

type EcosystemItem = {
  icon: any;
  title: string;
  description: string;
  stack: string;
  url?: string;
  comingSoon?: boolean;
  hasTrial?: boolean;
};

const ecosystemItems: EcosystemItem[] = [
  {
    icon: BookOpen,
    title: "Generator KBM",
    description: "Pembuatan perangkat Kegiatan Belajar Mengajar secara otomatis dan terstruktur.",
    stack: "WEBSITE & ai",
    url: "https://www.digen.id"
  },
  {
    icon: FileSpreadsheet,
    title: "Raport Instan",
    description: "Otomatisasi pengolahan nilai dan pengisian raport berbasis Kurikulum Merdeka.",
    stack: "Sheets • Apps Script",
    url: "https://raportsks.my.id/",
    hasTrial: true
  },
  {
    icon: ShieldCheck,
    title: "Asisten SNP",
    description: "Pengelolaan dan pemantauan Standar Nasional Pendidikan sekolah yang efisien.",
    stack: "WEBSITE & ai",
    comingSoon: true
  },
  {
    icon: Box,
    title: "Produk Digital",
    description: "Kumpulan aset dan produk digital untuk mendukung transformasi pendidikan instansi.",
    stack: "Market place",
    url: "https://lynk.id/pemuryadi"
  }
];

export function Ecosystem() {
  return (
    <section id="ekosistem" className="pt-[60px] pb-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Ekosistem Generator yang Saya Bangun
          </h2>
          <p className="text-[18px] leading-[1.6] text-muted max-w-2xl m-0 transition-colors duration-300">
            Menciptakan alur kerja yang terintegrasi, paperless, dan efisien untuk kebutuhan akademik dan administratif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {ecosystemItems.map((item, index) => {
            const MotionComponent = item.url ? motion.a : motion.div;
            return (
            <MotionComponent
              key={index}
              href={item.url}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border border-border p-[25px] aspect-square flex flex-col justify-between bg-gradient-to-br from-card-from to-card-to hover:border-border-hover transition-colors duration-300 relative ${item.url ? 'cursor-pointer group block' : ''}`}
            >
              {item.comingSoon && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#1e3a8a] to-[#581c87] text-[#e0e7ff] border border-[#3b82f6]/30 text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-[900] rounded shadow-sm animate-pulse">
                  COMING SOON
                </div>
              )}
              <div>
                <span className="text-[18px] font-mono text-muted block mb-6 transition-colors duration-300">
                  [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                </span>
                <item.icon className="w-8 h-8 text-ink mb-6 transition-colors duration-300" />
                <h3 className={`text-[20px] font-[800] uppercase tracking-[1px] text-ink mb-4 transition-colors duration-300 ${item.url ? 'group-hover:underline' : ''}`}>{item.title}</h3>
                <p className="text-[18px] leading-[1.6] text-muted m-0 transition-colors duration-300">{item.description}</p>
                {item.hasTrial && (
                  <span className="inline-block mt-4 text-[14px] font-bold uppercase tracking-[1px] text-blue-500 group-hover:text-blue-400 transition-colors duration-300">
                    Coba Versi Trial ↗
                  </span>
                )}
              </div>
              <div className="text-[14px] font-bold uppercase tracking-[1px] text-muted mt-6 transition-colors duration-300">
                {item.stack}
              </div>
            </MotionComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
