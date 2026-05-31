import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { useEffect } from "react";

const articles = [
  {
    id: "literasi-digital",
    title: "Pentingnya Literasi Digital di Era Society 5.0",
    date: "1 Juni 2026",
    author: "Redaksi Pendidikan",
    source: "Jurnal Pendidikan Dasar & Kominfo",
    excerpt: "Menjelaskan bagaimana literasi digital membantu siswa menyaring informasi dengan bijak dan menggunakan teknologi secara positif.",
    summary: "Di era Society 5.0, batas antara ruang fisik dan digital semakin bias. Literasi digital tidak hanya sekadar mampu menggunakan gawai, tetapi juga memahami etika digital, memilah informasi secara kritis dari paparan hoaks, serta memanfaatkannya untuk hal-hal yang produktif dan inovatif. Peran sekolah dan pendidik menjadi sangat esensial dalam menanamkan kecakapan abad ke-21 ini agar peserta didik dapat beradaptasi, bersaing, dan berkembang di ekosistem masyarakat global masa depan secara aman dan bertanggung jawab.",
    imageUrl: "https://image.pollinations.ai/prompt/students%20using%20digital%20tablets%20in%20a%20modern%20classroom%2C%20futuristic%2C%20minimalist%20vector%20art%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  },
  {
    id: "pendidikan-berbasis-proyek",
    title: "Membangun Karakter Melalui Pembelajaran Berbasis Proyek (PjBL)",
    date: "28 Mei 2026",
    author: "Redaksi Pendidikan",
    source: "Artikel Pendidikan Kemendikbudristek",
    excerpt: "Mengedepankan kolaborasi, gotong royong, dan pemecahan masalah nyata untuk membentuk karakter profil Pelajar Pancasila.",
    summary: "Pembelajaran Berbasis Proyek (Project-Based Learning) dirancang untuk memberikan peserta didik pengalaman belajar langsung dalam memecahkan masalah-masalah nyata di lingkungan sekitarnya. Melalui pendekatan dinamis ini, siswa belajar makna sesungguhnya dari kolaborasi tim, berpikir kritis (critical thinking), komunikasi efektif, dan kreativitas. Sebagai salah satu pilar penggerak dalam Kurikulum Merdeka, pendekatan ini terbukti lebih memotivasi siswa sekaligus efektif dalam membangun karakter yang sejalan dengan nilai luhur Profil Pelajar Pancasila.",
    imageUrl: "https://image.pollinations.ai/prompt/students%20working%20together%20on%20a%20science%20project%2C%20minimalist%20vector%20art%2C%20educational%20theme%2C%20blue%20and%20purple%20glow?width=1200&height=600&nologo=true&private=true"
  }
];

interface ArticlePageProps {
  hash: string;
}

export function ArticlePage({ hash }: ArticlePageProps) {
  // Always scroll to top when mounting or changing articles
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  const isDetailView = hash.startsWith('#artikel/');
  const articleId = isDetailView ? hash.replace('#artikel/', '') : null;
  const activeArticle = articles.find(a => a.id === articleId);

  // Jika di mode detail tapi artikel tidak ditemukan
  if (isDetailView && !activeArticle) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center pt-32">
        <h2 className="text-2xl font-bold text-ink mb-4">Artikel Tidak Ditemukan</h2>
        <a href="#artikel" className="px-6 py-3 bg-card-from border border-border rounded-lg text-ink font-medium hover:bg-card-to transition-colors">
          Kembali ke Daftar Artikel
        </a>
      </div>
    );
  }

  // Tampilan Detail Artikel
  if (activeArticle) {
    return (
      <div className="pt-24 pb-20 px-6 lg:px-8 max-w-4xl mx-auto w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="#artikel" className="inline-flex items-center text-muted hover:text-ink transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Artikel
          </a>
          
          <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 border border-border">
            <img 
              src={activeArticle.imageUrl} 
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-ink leading-tight mb-6">
            {activeArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-10 pb-8 border-b border-border">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {activeArticle.date}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {activeArticle.author}
            </span>
            <span className="flex items-center text-blue-500 font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Sumber: {activeArticle.source}
            </span>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted leading-relaxed">
            <p className="text-xl font-medium text-ink mb-6">
              {activeArticle.excerpt}
            </p>
            <p>
              {activeArticle.summary}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Tampilan Daftar Artikel
  return (
    <div className="pt-24 pb-20 px-6 lg:px-8 max-w-6xl mx-auto w-full min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
          Artikel Pilihan
        </h1>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group flex flex-col bg-bg border border-border rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 block"
          >
            <div className="w-full h-64 overflow-hidden bg-card-from">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-xs font-medium text-blue-500 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10">Pendidikan</span>
                <span className="text-muted">{article.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-blue-500 transition-colors">
                {article.title}
              </h2>
              <p className="text-muted flex-grow mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center text-sm font-medium text-ink mt-auto">
                <span className="border-b border-transparent group-hover:border-blue-500 group-hover:text-blue-500 transition-colors pb-0.5 flex items-center">
                  Baca Ringkasan & Sumber
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
