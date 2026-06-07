import { motion } from "framer-motion";
import { BookOpen, FileSpreadsheet } from "lucide-react";

type InfoItem = {
  icon: any;
  title: string;
  description: string;
  url: string;
};

const infoItems: InfoItem[] = [
  {
    icon: BookOpen,
    title: "Generator Pendidikan",
    description: "Sistem otomatisasi untuk memudahkan pekerjaan administrasi dan penyusunan perangkat ajar guru.",
    url: "https://www.pemuryadi.my.id/2026/03/Generator-Pendidikan"
  },
  {
    icon: FileSpreadsheet,
    title: "Raport SKS",
    description: "Platform pengolahan nilai dan penyusunan raport sekolah dengan cepat berbasis Kurikulum Merdeka.",
    url: "https://www.raportsks.my.id/2026/03/rapor"
  }
];

export function InfoGuru() {
  return (
    <section id="info-guru" className="pt-[60px] pb-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Info Guru
          </h2>
          <p className="text-[18px] leading-[1.6] text-muted max-w-2xl m-0 transition-colors duration-300">
            Kumpulan artikel dan panduan alat bantu untuk menunjang kegiatan pengajaran serta kemudahan dalam administrasi sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {infoItems.map((item, index) => {
            return (
              <motion.a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border p-[25px] flex flex-col justify-between bg-gradient-to-br from-card-from to-card-to hover:border-border-hover transition-colors duration-300 relative cursor-pointer group block"
              >
                <div>
                  <span className="text-[18px] font-mono text-muted block mb-6 transition-colors duration-300">
                    [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                  </span>
                  <item.icon className="w-8 h-8 text-ink mb-6 transition-colors duration-300" />
                  <h3 className="text-[20px] font-[800] uppercase tracking-[1px] text-ink mb-4 transition-colors duration-300 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-[18px] leading-[1.6] text-muted m-0 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
                <div className="text-[14px] font-bold uppercase tracking-[1px] text-muted mt-6 transition-colors duration-300">
                  Kunjungi Website ↗
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
