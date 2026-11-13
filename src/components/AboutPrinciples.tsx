import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Eye, Heart, Target } from 'lucide-react';

const principles = [
  {
    title: 'Our mission',
    icon: Target,
    copy: 'Make useful business technology easier to access and use through practical software and thoughtful digital services.',
    wash: 'linear-gradient(145deg, #eaf3ff 0%, #f8fbff 58%, #ffffff 100%)',
    accent: '#0066ff',
  },
  {
    title: 'Our vision',
    icon: Eye,
    copy: 'A world where every business works smarter, serves people better, and grows with confidence.',
    wash: 'linear-gradient(145deg, #eaf8ff 0%, #f7fcff 58%, #ffffff 100%)',
    accent: '#1689d8',
  },
  {
    title: 'What we believe',
    icon: Heart,
    copy: 'Technology should be clear, useful, and respectful of people’s time.',
    wash: 'linear-gradient(145deg, #eef4ff 0%, #fafbff 58%, #ffffff 100%)',
    accent: '#0873dc',
  },
];

interface ScrollFlipCardProps {
  key?: React.Key;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  copy: string;
  wash: string;
  accent: string;
  index: number;
}

function ScrollFlipCard({
  title,
  copy,
  icon: Icon,
  wash,
  accent,
  index,
}: ScrollFlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.38 });
  const reduceMotion = useReducedMotion();
  const flipped = isInView || reduceMotion === true;

  return (
    <div ref={cardRef} className="[perspective:1200px]">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[295px] rounded-none shadow-[0_14px_40px_rgba(9,49,115,0.06)] sm:min-h-[330px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-none border border-[#dce7f4] p-6 sm:p-7"
          style={{ background: wash, backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-[13px] border border-white/80 bg-white/75 shadow-sm" style={{ color: accent }}>
              <Icon size={21} strokeWidth={1.8} />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/75 text-[#526985]">
              <ArrowUpRight size={17} strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <span className="mb-3 block h-[2px] w-9 rounded-full" style={{ background: accent }} />
            <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.045em] text-[#10203a] sm:text-[1.75rem]">{title}</h3>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-none border border-[#c9ddf5] p-6 sm:p-7"
          style={{ background: wash, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.19em]" style={{ color: accent }}>Mixon / {title.replace('Our ', '')}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/80" style={{ color: accent }}>
              <Icon size={17} strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <h3 className="mb-3 font-display text-[1.35rem] font-semibold tracking-[-0.04em] text-[#10203a] sm:text-[1.5rem]">{title}</h3>
            <p className="max-w-sm text-[15px] leading-7 text-[#526985]">{copy}</p>
          </div>
          <div className="h-px w-full bg-[#10203a]/10" />
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPrinciples() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200/80 bg-[#f7faff] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-[#38bdf8]/10 blur-[90px]" />
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-xl sm:mb-14"
        >
          <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0066ff]">Our purpose</span>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.05em] text-[#10203a] sm:text-4xl">Built to make work better.</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {principles.map((principle, index) => (
            <ScrollFlipCard
              key={principle.title}
              title={principle.title}
              icon={principle.icon}
              copy={principle.copy}
              wash={principle.wash}
              accent={principle.accent}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
