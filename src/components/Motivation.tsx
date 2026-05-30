import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

export function Motivation() {
  const [motivation, setMotivation] = useState<string>('');
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
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> MOTIVASI GURU HARI INI
                </span>
                {(!loading && motivation) && (
                   <button 
                     onClick={fetchMotivation}
                     className="text-muted hover:text-ink transition-colors p-2"
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
                    {motivation}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-[12px] tracking-wide text-muted">
                Dihasilkan secara dinamis oleh kecerdasan buatan (AI)
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
