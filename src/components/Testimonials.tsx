import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Kepala Sekolah, SMPN 1 Maju",
    text: "Aplikasi Raport Instan dan Generator KBM sangat membantu sekolah kami dalam efisiensi waktu guru. Luar biasa inovasinya!",
    avatar: "BS"
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    role: "Guru Penggerak Angkatan 7",
    text: "Modul ajar yang dibagikan sangat sesuai dengan Kurikulum Merdeka. Template-nya mudah dimodifikasi dan sangat inspiratif.",
    avatar: "SR"
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    role: "Wakil Kepala Kurikulum",
    text: "Pelatihan pemanfaatan AI dalam pembelajaran yang diberikan sangat membuka wawasan. Penyampaiannya praktis dan langsung bisa diterapkan.",
    avatar: "AF"
  }
];

export function Testimonials() {
  return (
    <section id="testimoni" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
              Kata Mereka
            </h2>
            <p className="text-[18px] leading-[1.6] text-ink font-bold max-w-2xl m-0 transition-colors duration-300">
              Testimoni dari rekan sejawat dan institusi yang telah merasakan manfaat langsung.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border rounded-2xl p-6 relative bg-card-from/30 backdrop-blur-sm transition-colors duration-300 hover:border-border-hover shadow-sm flex flex-col"
            >
              <Quote className="w-8 h-8 text-btn-bg mb-4 opacity-50" />
              <p className="text-[15px] leading-relaxed text-ink italic mb-6 flex-grow">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-btn-bg/10 flex items-center justify-center border border-btn-bg/20 text-btn-bg font-bold text-[14px]">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-ink">{item.name}</div>
                  <div className="text-[12px] text-muted">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
