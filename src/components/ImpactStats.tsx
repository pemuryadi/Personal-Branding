import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FileText, Download, Award } from "lucide-react";

const iconMap: Record<string, any> = {
  Users,
  FileText,
  Download,
  Award
};

type StatItem = {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: string;
};

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(from + (to - from) * progress));
          requestAnimationFrame(animateCount);
        } else {
          setCount(to);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString("id-ID")}</span>;
}

export function ImpactStats() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    fetch('/data/stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Failed to load stats", err));
  }, []);

  return (
    <section id="impact" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Dampak Nyata
          </h2>
          <p className="text-[18px] leading-[1.6] text-ink font-bold max-w-2xl mx-auto m-0 transition-colors duration-300">
            Berkontribusi dalam transformasi digital pendidikan di seluruh Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Award;
            return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-gradient-to-b from-card-from to-card-to hover:border-border-hover transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <IconComponent className="w-10 h-10 text-btn-bg mb-4 opacity-80" />
              <div className="text-[32px] md:text-[40px] font-[900] text-ink mb-2 tracking-tight flex items-center">
                <Counter from={0} to={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-[14px] text-muted font-bold tracking-[1px] uppercase">
                {stat.label}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
