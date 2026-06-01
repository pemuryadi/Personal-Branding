import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="pt-[60px] pb-[60px] px-6 lg:px-8 border-t border-border transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-[60px] items-center md:items-start">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full"
        >
          <div 
            className="p-[15px] border border-border bg-gradient-to-br from-card-from to-card-to transition-colors duration-300"
            style={{ boxShadow: '12px 12px 0px var(--app-ink)' }}
          >
             <img 
               src="/images/pemuryadi 1.png" 
               alt="Praswara Eko Maryadi" 
               className="w-full h-auto aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500" 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://placehold.co/600x800/111111/ffffff?text=Praswara+Eko+Maryadi";
               }}
             />
          </div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full"
        >
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            About Me
          </h2>
          <h3 className="text-4xl md:text-5xl font-[900] uppercase tracking-[-0.02em] text-ink mb-8 transition-colors duration-300">
            Menggerakkan Pendidikan<br/>Lewat Teknologi
          </h3>
          <div className="space-y-6 text-[18px] leading-[1.6] text-muted transition-colors duration-300">
            <p>
              Saya adalah seorang Pengembang Teknologi Pendidikan (EdTech) yang berdedikasi 
              untuk memajukan ekosistem pendidikan di Indonesia. Fokus utama saya adalah memfasilitasi transisi menuju 
              administrasi sekolah yang <strong className="text-ink transition-colors duration-300">paperless</strong> dan integrasi <strong className="text-ink transition-colors duration-300">Kurikulum Merdeka</strong> dengan solusi digital yang efisien.
            </p>
            <p>
              Dengan pengalaman dalam merancang alur kerja yang terotomasi menggunakan <strong className="text-ink transition-colors duration-300">Website</strong> dan infrastruktur Claud lainnya, saya membantu para pendidik dan manajemen sekolah untuk secara drastis mengurangi beban rutin administratif. Hal ini memungkinkan setiap guru untuk kembali berfokus pada apa yang paling penting: kualitas pengajaran dan interaksi dengan siswa.
            </p>
            <p>
              Saya percaya inovasi tidak harus selalu rumit dan mahal. Melalui alat-alat sehari-hari yang sudah tersedia, 
              kita bisa menciptakan sistem manajemen dan operasional yang tangguh, mudah digunakan, dan berdampak tinggi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
