import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

const fallbackMotivations = [
  {
    text: "Seorang guru memengaruhi keabadian; ia tidak pernah tahu di mana pengaruhnya berhenti.",
    imagePrompt: "an ancient library with glowing books, warm light, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Teknologi hanyalah alat. Namun untuk menyalakan rasa ingin tahu siswa, gurulah yang paling utama.",
    imagePrompt: "student looking at a glowing holographic galaxy in a classroom, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Mengajar bukanlah tentang mengisi wadah yang kosong, melainkan tentang menyalakan api rasa ingin tahu.",
    imagePrompt: "a small hand lighting a giant bonfire under the starry sky, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia.",
    imagePrompt: "a silhouette of a teacher looking at a futuristic city, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Guru terbaik mengajar dari hati, bukan sekadar dari buku.",
    imagePrompt: "a glowing heart shaping into a book, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Tugas mendidik bukan hanya mencerdaskan otak, melainkan juga menanamkan akhlak mulia di dalam jiwa.",
    imagePrompt: "a seedling growing from an open book under beautiful light, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Jadilah pelita yang menerangi jalan bagi mereka yang sedang mencari arah dalam kegelapan.",
    imagePrompt: "a lighthouse shining light across a calm dark sea, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Setiap anak adalah bintang yang berhak bersinar. Guru adalah langit yang menopang sinar mereka.",
    imagePrompt: "constellations in the night sky shaped like children and stars, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Pendidikan yang baik adalah fondasi untuk masa depan yang lebih cerah.",
    imagePrompt: "abstract geometrical staircase leading up to the sun, minimalist illustration, flat design, vector art, blue and purple glow"
  },
  {
    text: "Kesabaran seorang guru adalah jembatan emas bagi masa depan siswanya.",
    imagePrompt: "a golden bridge spanning across a deep canyon, minimalist illustration, flat design, vector art, blue and purple glow"
  }
];

const getFallbackMotivation = () => {
  const day = new Date().getDate(); // 1-31
  return fallbackMotivations[day % fallbackMotivations.length];
};

export function Motivation() {
  const [motivation, setMotivation] = useState<string>('');
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMotivation = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/motivation');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMotivation(data.text || 'Guru adalah pelita harapan bangsa.');
      setImagePrompt(data.imagePrompt || 'inspiring minimalist teacher poster vector art blue purple');
    } catch (err) {
      console.warn('API failed, using local fallback motivation:', err);
      const fallback = getFallbackMotivation();
      setMotivation(fallback.text);
      setImagePrompt(fallback.imagePrompt);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotivation();
  }, []);

  return (
    <section className="px-6 lg:px-8 bg-bg transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border rounded-xl p-6 md:p-8 relative bg-card-from/30 backdrop-blur-sm transition-colors duration-300 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
            {/* Left side: Poster generated via Pollinations AI */}
            <div className="w-full md:w-[220px] lg:w-[260px] aspect-[4/5] flex-shrink-0 relative overflow-hidden border border-border bg-[#111111] rounded-lg">
              {loading ? (
                <div className="w-full h-full animate-pulse bg-border/40" />
              ) : (
                <img
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt || 'inspiring teacher in a futuristic glowing classroom, vector minimalist illustration')}%20beautiful%20inspiring%20teacher%20poster%20minimalist%20vector%20art%20style%20blue%20and%20purple%20glow?width=400&height=500&nologo=true&private=true&seed=${encodeURIComponent(motivation.substring(0, 15))}`}
                  alt="Poster Motivasi"
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-all duration-700 ease-in-out"
                  loading="lazy"
                />
              )}
            </div>

            {/* Right side: Motivation Text */}
            <div className="flex-grow flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> MOTIVASI GURU HARI INI
                  </span>
                  {(!loading && motivation) && (
                     <button 
                       onClick={fetchMotivation}
                       className="text-muted hover:text-ink transition-colors p-2 cursor-pointer"
                       title="Refresh Motivasi"
                     >
                       <RefreshCw className="w-4 h-4" />
                     </button>
                  )}
                </div>
                
                <div className="min-h-[80px] flex items-center">
                  {loading ? (
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-border rounded w-3/4"></div>
                        <div className="h-4 bg-border rounded w-full"></div>
                        <div className="h-4 bg-border rounded w-5/6"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[18px] md:text-[20px] leading-relaxed text-ink italic font-medium whitespace-pre-line">
                      "{motivation}"
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-[12px] tracking-wide text-muted flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-border/50">
                <span>Dihasilkan secara dinamis oleh kecerdasan buatan (AI)</span>
                <span>Poster visual oleh Pollinations AI</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
