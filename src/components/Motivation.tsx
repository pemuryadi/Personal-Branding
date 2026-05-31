import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
  const [loading, setLoading] = useState(true);
  const [visitorData, setVisitorData] = useState({ total: 142, active: 5 });
  const [fluctuatedActive, setFluctuatedActive] = useState(5);

  const fetchMotivation = () => {
    setLoading(true);
    // Use local fallback for static GitHub Pages deployment
    const fallback = getFallbackMotivation();
    
    // Simulate slight network delay for smooth animation
    setTimeout(() => {
      setMotivation(fallback.text);
      setImagePrompt(fallback.imagePrompt);
      setLoading(false);
    }, 600);
  };

  const fetchVisitorCount = async () => {
    try {
      // Use CounterAPI.dev for free, unauthenticated visit counting
      const response = await fetch('https://api.counterapi.dev/v1/pemuryadi_my_id/visits/up');
      if (response.ok) {
        const data = await response.json();
        // Add a base offset of 142 to match the previous backend logic
        setVisitorData(prev => ({ ...prev, total: (data.count || 0) + 141 }));
      }
    } catch (err) {
      console.error('Failed to fetch visitor count:', err);
    }
  };

  useEffect(() => {
    fetchMotivation();
    fetchVisitorCount();
    
    // Generate a random active visitor count between 3 and 12 on load
    const initialActive = Math.floor(Math.random() * 10) + 3;
    setVisitorData(prev => ({ ...prev, active: initialActive }));
    setFluctuatedActive(initialActive);
  }, []);

  // Simulate active count fluctuating slightly every 4 seconds for real-time feel
  useEffect(() => {
    const timer = setInterval(() => {
      setFluctuatedActive(prev => {
        const base = visitorData.active;
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        let nextVal = prev + change;
        
        // Keep it realistic, drifting back towards base if it strays too far
        if (nextVal > base + 4) nextVal -= 2;
        if (nextVal < Math.max(1, base - 3)) nextVal += 2;
        
        return Math.max(1, nextVal);
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [visitorData.active]);

  return (
    <section className="px-6 lg:px-8 bg-bg transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left card: Motivation (2/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 border border-border rounded-xl p-5 md:p-6 relative bg-card-from/30 backdrop-blur-sm transition-colors duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch h-full">
              {/* Left side: Poster (Smaller size) */}
              <div className="w-[120px] md:w-[140px] lg:w-[150px] aspect-[4/5] flex-shrink-0 relative overflow-hidden border border-border bg-[#111111] rounded-lg">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-border/40" />
                ) : (
                  <img
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt || 'inspiring teacher in a futuristic glowing classroom, vector minimalist illustration')}%20beautiful%20inspiring%20teacher%20poster%20minimalist%20vector%20art%20style%20blue%20and%20purple%20glow?width=300&height=375&nologo=true&private=true&seed=${encodeURIComponent(motivation.substring(0, 15))}`}
                    alt="Poster Motivasi"
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-all duration-700 ease-in-out"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Right side: Motivation Text */}
              <div className="flex-grow flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-blue-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> MOTIVASI GURU HARI INI
                    </span>
                  </div>
                  
                  <div className="flex items-center min-h-[60px]">
                    {loading ? (
                      <div className="animate-pulse flex space-x-3 w-full">
                        <div className="flex-1 space-y-3 py-1">
                          <div className="h-3 bg-border rounded w-3/4"></div>
                          <div className="h-3 bg-border rounded w-full"></div>
                          <div className="h-3 bg-border rounded w-5/6"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[14px] md:text-[15px] leading-relaxed text-ink italic font-medium whitespace-pre-line">
                        "{motivation}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right card: Real-time Visitor Counter (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 border border-border rounded-xl p-5 md:p-6 bg-card-from/30 backdrop-blur-sm transition-colors duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-emerald-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> MONITOR TRAFIK
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              <div className="space-y-4">
                {/* Active now card */}
                <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-muted uppercase tracking-wider">Online Sekarang</p>
                    <p className="text-2xl font-bold text-ink mt-0.5 tracking-tight">{fluctuatedActive}</p>
                  </div>
                  <Users className="w-8 h-8 text-emerald-500/80" />
                </div>

                {/* Total visitor card */}
                <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-muted uppercase tracking-wider">Total Kunjungan</p>
                    <p className="text-2xl font-bold text-ink mt-0.5 tracking-tight">
                      {visitorData.total.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500/80" />
                </div>
              </div>
            </div>

            {/* Live Indicator Footer */}
            <div className="pt-3 border-t border-border/50 text-[10px] text-muted flex items-center justify-between mt-4">
              <span>Status Server: Aktif</span>
              <span className="flex items-center gap-1 font-medium text-emerald-500">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Real-time
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
