import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Users, Activity } from 'lucide-react';

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
  const [imageModel, setImageModel] = useState<string>('nanobanana-2');
  const [loading, setLoading] = useState(true);

  const fetchMotivation = async (forceRefresh = false) => {
    setLoading(true);
    // Randomize image model
    const models = ['nanobanana-2', 'openai'];
    setImageModel(models[Math.floor(Math.random() * models.length)]);

    try {
      const url = forceRefresh ? '/api/motivation?refresh=true' : '/api/motivation';
      const res = await fetch(url);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      if (data.text) {
        setMotivation(data.text);
        setImagePrompt(data.imagePrompt);
      } else {
        throw new Error('No text returned');
      }
    } catch (err) {
      console.error('API failed, using fallback:', err);
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border rounded-xl p-5 md:p-6 relative bg-card-from/30 backdrop-blur-sm transition-colors duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="block h-full">
              {/* Left side: Poster (Smaller size) */}
              <div className="float-left w-[120px] md:w-[140px] lg:w-[150px] aspect-[4/5] relative overflow-hidden border border-border bg-[#111111] rounded-lg mr-6 mb-4">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-border/40" />
                ) : (
                  <img
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt || 'inspiring teacher in a futuristic glowing classroom, vector minimalist illustration')}%20beautiful%20inspiring%20teacher%20poster%20minimalist%20vector%20art%20style%20blue%20and%20purple%20glow?width=300&height=375&model=${imageModel}&nologo=true&private=true&seed=${encodeURIComponent(motivation.substring(0, 15))}`}
                    alt="Poster Motivasi"
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-all duration-700 ease-in-out"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Right side: Motivation Text */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-blue-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> MOTIVASI GURU HARI INI
                  </span>
                  <button 
                    onClick={() => fetchMotivation(true)}
                    disabled={loading}
                    className="p-1.5 text-muted hover:text-ink transition-colors disabled:opacity-50"
                    title="Refresh Motivasi"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                
                <div className="min-h-[60px]">
                  {loading ? (
                    <div className="animate-pulse space-y-3 py-1">
                      <div className="h-3 bg-border rounded w-3/4"></div>
                      <div className="h-3 bg-border rounded w-full"></div>
                      <div className="h-3 bg-border rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div className="text-[14px] md:text-[15px] leading-relaxed text-ink italic font-medium whitespace-pre-line text-justify">
                      "{motivation}"
                    </div>
                  )}
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
