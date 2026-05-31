import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowUpRight, RefreshCw, AlertCircle } from 'lucide-react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export function NewsUpdate() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(false);
    
    try {
      const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=pendidikan+indonesia+kemendikbud+OR+kemendikdasmen+OR+kemdiktisaintek&hl=id&gl=ID&ceid=ID:id');
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      
      if (data.status === 'ok' && data.items) {
        // Map the items to match our Article interface
        const parsedArticles = data.items.map((item: any) => {
          let title = item.title || '';
          let source = 'Pendidikan Indonesia';
          
          // Google News often appends the source to the end of the title with " - "
          if (title.includes(' - ')) {
            const parts = title.split(' - ');
            source = parts.pop() || source;
            title = parts.join(' - ');
          }
          
          return {
            title: title,
            link: item.link,
            pubDate: item.pubDate,
            source: source
          };
        });
        setArticles(parsedArticles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error('Error fetching educational news:', err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatIndoDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch (e) {
      return dateStr;
    }
  };

  const getSourceBadgeColor = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('kemendikdasmen') || s.includes('kemdikbud') || s.includes('kementerian pendidikan')) {
      return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
    }
    if (s.includes('ristek') || s.includes('kemdiktisaintek') || s.includes('teknologi')) {
      return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
    }
    return 'bg-neutral-500/10 text-muted border border-border';
  };

  return (
    <section id="news" className="px-6 lg:px-8 bg-bg transition-colors duration-300 py-12 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-blue-500 flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4" /> Real-time Updates
            </span>
            <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.03em] leading-none text-ink">
              Kabar Pendidikan
            </h2>
            <p className="text-muted text-[15px] mt-2">
              Informasi terkini seputar kebijakan dan dinamika pendidikan di Indonesia secara langsung.
            </p>
          </div>
          
          <button
            onClick={() => fetchNews(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card-from/50 text-[14px] font-medium text-ink hover:border-border-hover disabled:opacity-50 cursor-pointer transition-all active:scale-95"
            title="Muat Ulang Berita"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-border rounded-xl p-5 bg-card-from/30 animate-pulse h-[180px] flex flex-col justify-between">
                <div>
                  <div className="h-4 bg-border rounded w-1/4 mb-3"></div>
                  <div className="h-4 bg-border rounded w-full mb-2"></div>
                  <div className="h-4 bg-border rounded w-5/6"></div>
                </div>
                <div className="h-3 bg-border rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-8 text-center max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500/80 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink mb-2">Gagal Memuat Berita</h3>
            <p className="text-muted text-[14px] mb-4">
              Tidak dapat mengambil informasi terbaru saat ini. Silakan coba beberapa saat lagi.
            </p>
            <button
              onClick={() => fetchNews()}
              className="px-4 py-2 bg-btn-bg text-btn-text hover:bg-btn-hover rounded-lg text-[14px] font-medium transition-all"
            >
              Coba Lagi
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-muted">
            Tidak ada kabar pendidikan terbaru saat ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.link + index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                className="group border border-border hover:border-border-hover rounded-xl p-5 bg-card-from/20 hover:bg-card-from/50 transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Source tag & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getSourceBadgeColor(article.source)}`}>
                      {article.source || 'Pendidikan'}
                    </span>
                    <span className="text-[11px] text-muted font-medium">
                      {formatIndoDate(article.pubDate)}
                    </span>
                  </div>

                  {/* Title */}
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-ink font-semibold text-[15px] leading-snug group-hover:text-blue-500 transition-colors duration-200 line-clamp-3 mb-4"
                  >
                    {article.title}
                  </a>
                </div>

                {/* Link footer */}
                <div className="pt-2 border-t border-border/30 flex items-center justify-between">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-muted group-hover:text-ink inline-flex items-center gap-1 transition-colors duration-200"
                  >
                    Buka Artikel
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
