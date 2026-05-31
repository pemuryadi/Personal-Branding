import { motion } from "framer-motion";

const articles = [
  {
    id: "literasi-digital",
    title: "Pentingnya Literasi Digital di Era Society 5.0",
    date: "1 Juni 2026",
    summary: "Di era Society 5.0, batas antara ruang fisik dan digital semakin bias. Literasi digital tidak hanya sekadar mampu menggunakan gawai, tetapi juga memahami etika digital, memilah informasi secara kritis dari paparan hoaks, serta memanfaatkannya untuk hal-hal yang produktif dan inovatif. Peran sekolah dan pendidik menjadi sangat esensial dalam menanamkan kecakapan abad ke-21 ini agar peserta didik dapat beradaptasi, bersaing, dan berkembang di ekosistem masyarakat global masa depan secara aman dan bertanggung jawab. (Sumber: Jurnal Pendidikan Dasar & Kominfo)",
    imageUrl: "https://image.pollinations.ai/prompt/students%20using%20digital%20tablets%20in%20a%20modern%20classroom%2C%20futuristic%2C%20minimalist%20vector%20art%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  },
  {
    id: "pendidikan-berbasis-proyek",
    title: "Membangun Karakter Melalui Pembelajaran Berbasis Proyek (PjBL)",
    date: "28 Mei 2026",
    summary: "Pembelajaran Berbasis Proyek (Project-Based Learning) dirancang untuk memberikan peserta didik pengalaman belajar langsung dalam memecahkan masalah-masalah nyata di lingkungan sekitarnya. Melalui pendekatan dinamis ini, siswa belajar makna sesungguhnya dari kolaborasi tim, berpikir kritis (critical thinking), komunikasi efektif, dan kreativitas. Sebagai salah satu pilar penggerak dalam Kurikulum Merdeka, pendekatan ini terbukti lebih memotivasi siswa sekaligus efektif dalam membangun karakter yang sejalan dengan nilai luhur Profil Pelajar Pancasila. (Sumber: Artikel Pendidikan Kemendikbudristek)",
    imageUrl: "https://image.pollinations.ai/prompt/students%20working%20together%20on%20a%20science%20project%2C%20minimalist%20vector%20art%2C%20educational%20theme%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  }
];

export function ArticlePage() {
  return (
    <section id="artikel" className="pt-[60px] pb-[60px] px-6 lg:px-8 bg-card-from/30 border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">
            Artikel Pilihan
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Kumpulan bacaan ringkas dan informatif mengenai perkembangan dunia pendidikan modern dan pemanfaatan teknologi secara bijak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col bg-bg border border-border rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              <div className="w-full h-64 overflow-hidden bg-card-from">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs font-medium text-blue-500 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10">Pendidikan</span>
                  <span className="text-muted">{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-4">
                  {article.title}
                </h3>
                <p className="text-muted leading-relaxed text-justify">
                  {article.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
