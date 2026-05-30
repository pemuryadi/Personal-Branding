import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

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
      setMotivation(data.text);
      setImagePrompt(data.imagePrompt || '');
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotivation();
  }, []);

  if (error) {
    return null; // Silent fail if API doesn't work
  }

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
