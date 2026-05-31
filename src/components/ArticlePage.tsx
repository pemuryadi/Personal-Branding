import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, ChevronRight, Home, ArrowLeft } from "lucide-react";

const articles = [
  {
    id: "literasi-digital",
    title: "Pentingnya Literasi Digital di Era Society 5.0",
    date: "2026-06-01",
    excerpt: "Di era Society 5.0, batas antara ruang fisik dan digital semakin bias. Literasi digital tidak hanya sekadar mampu menggunakan gawai, tetapi juga...",
    content: (
      <>
        <p className="mb-4">
          Di era Society 5.0, batas antara ruang fisik dan digital semakin bias. Penguasaan literasi digital tidak lagi hanya sekadar kemampuan teknis untuk mengoperasikan gawai atau perangkat lunak, melainkan sebuah kompetensi komprehensif yang mencakup pemahaman akan etika digital, kemampuan memilah informasi secara kritis dari paparan hoaks, serta memanfaatkannya untuk menciptakan inovasi yang produktif.
        </p>
        <p className="mb-6">
          Peran institusi pendidikan dan para pendidik menjadi sangat esensial dalam menanamkan kecakapan abad ke-21 ini. Melalui kurikulum yang adaptif, peserta didik dipersiapkan tidak hanya sebagai konsumen informasi, tetapi juga sebagai warga digital yang bertanggung jawab. Dengan fondasi literasi digital yang kuat, mereka akan lebih siap untuk beradaptasi, bersaing, dan memberikan kontribusi positif di ekosistem masyarakat global masa depan secara aman.
        </p>
        <p className="italic text-muted font-medium mt-8 border-t border-border pt-4">
          Sumber: Jurnal Pendidikan Dasar & Kominfo
        </p>
      </>
    ),
    imageUrl: "https://image.pollinations.ai/prompt/students%20using%20digital%20tablets%20in%20a%20modern%20classroom%2C%20futuristic%2C%20minimalist%20vector%20art%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  },
  {
    id: "pendidikan-berbasis-proyek",
    title: "Membangun Karakter Melalui Pembelajaran Berbasis Proyek (PjBL)",
    date: "2026-05-28",
    excerpt: "Pembelajaran Berbasis Proyek dirancang untuk memberikan peserta didik pengalaman belajar langsung dalam memecahkan masalah nyata...",
    content: (
      <>
        <p className="mb-4">
          Pembelajaran Berbasis Proyek (Project-Based Learning) dirancang secara khusus untuk memberikan peserta didik pengalaman belajar aplikatif. Alih-alih sekadar mendengarkan teori di dalam kelas, mereka terjun langsung dalam menganalisis dan merumuskan solusi atas masalah-masalah nyata yang terjadi di lingkungan sekitarnya.
        </p>
        <p className="mb-6">
          Melalui pendekatan pembelajaran yang dinamis ini, siswa dapat menyelami makna sesungguhnya dari kolaborasi tim, mengasah kemampuan berpikir kritis (critical thinking), melatih komunikasi efektif, serta menumbuhkan kreativitas yang tak terbatas. Sebagai salah satu pilar penggerak dalam implementasi Kurikulum Merdeka, pendekatan ini terbukti tidak hanya meningkatkan motivasi intrinsik siswa, tetapi juga sangat efektif dalam membangun karakter unggul yang sejalan dengan nilai-nilai luhur Profil Pelajar Pancasila.
        </p>
        <p className="italic text-muted font-medium mt-8 border-t border-border pt-4">
          Sumber: Artikel Pendidikan Kemendikbudristek
        </p>
      </>
    ),
    imageUrl: "https://image.pollinations.ai/prompt/students%20working%20together%20on%20a%20science%20project%2C%20minimalist%20vector%20art%2C%20educational%20theme%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  }
];

export function ArticlePage() {
  const [hash, setHash] = useState(window.location.hash);
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isDetailView = hash.startsWith('#artikel/');
  const articleId = isDetailView ? hash.replace('#artikel/', '') : null;
  const activeArticle = articles.find(a => a.id === articleId);

  // Exit Intent Logic
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Jika kursor bergerak keluar layar ke arah atas (biasanya ke arah tombol close tab)
      if (e.clientY <= 0 && isDetailView && !showExitIntent) {
        setShowExitIntent(true);
      }
    };
    
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isDetailView, showExitIntent]);

  // Scroll to top when opening an article
  useEffect(() => {
    if (isDetailView) {
      window.scrollTo(0, 0);
    }
  }, [isDetailView]);

  const redGradient = "bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-transparent bg-clip-text";

  if (isDetailView && activeArticle) {
    return (
      <div className="pt-24 pb-20 px-6 lg:px-8 max-w-4xl mx-auto w-full min-h-screen">
        
        {/* Exit Intent Modal */}
        <AnimatePresence>
          {showExitIntent && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-bg border border-border rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center"
              >
                <h3 className={`text-2xl font-bold mb-4 ${redGradient}`}>Yakin mau meninggalkan?</h3>
                <p className="text-muted mb-8">Anda sedang membaca artikel menarik ini. Apakah Anda yakin ingin pergi sekarang?</p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setShowExitIntent(false);
                      window.history.back(); // Or close window if possible, but back is safest
                    }}
                    className="px-6 py-2.5 rounded-lg border border-border hover:bg-border/50 text-ink transition-colors font-medium"
                  >
                    Ya, keluar
                  </button>
                  <button 
                    onClick={() => setShowExitIntent(false)}
                    className="px-6 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg shadow-red-500/25 transition-all"
                  >
                    Tidak, Lanjut Membaca
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm font-medium text-muted mb-8 flex-wrap gap-2">
            <a href="#home" className="flex items-center hover:text-ink transition-colors">
              <Home className="w-4 h-4 mr-1" />
              HOME
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="#artikel" className="hover:text-ink transition-colors">
              Artikel
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className={redGradient}>{activeArticle.title}</span>
          </div>
          
          {/* Hero Image */}
          <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-8 border border-border shadow-2xl relative">
            <img 
              src={activeArticle.imageUrl} 
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center text-rose-300 mb-3 font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                {activeArticle.date}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {activeArticle.title}
              </h1>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-ink leading-relaxed text-justify mt-8">
            {activeArticle.content}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <a href="#artikel" className="inline-flex items-center text-ink hover:text-red-500 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Artikel
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Card List View
  return (
    <section id="artikel" className="pt-[60px] pb-[60px] px-6 lg:px-8 bg-card-from/30 border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${redGradient}`}>
            Artikel Pilihan
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Kumpulan bacaan ringkas dan informatif mengenai perkembangan dunia pendidikan modern dan pemanfaatan teknologi secara bijak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <motion.a
              key={article.id}
              href={`#artikel/${article.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col bg-bg border border-border rounded-3xl overflow-hidden shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl group"
            >
              <div className="w-full h-64 overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center text-sm font-medium text-muted mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {article.date}
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${redGradient}`}>
                  {article.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm font-bold tracking-widest mt-auto">
                  <span className={`transition-opacity opacity-80 group-hover:opacity-100 ${redGradient}`}>
                    BACA SELENGKAPNYA <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
