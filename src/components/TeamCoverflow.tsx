import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  highlightBg: string;
  pastelBg: string;
  mosaicRamp: [string, string, string, string, string, string];
}

const MEMBERS: TeamMember[] = [
  {
    slug: 'ibrahim-amwayi',
    name: 'Ibrahim Amwayi',
    role: 'CEO',
    highlightBg: '#093173',
    pastelBg: '#BFE0FF',
    mosaicRamp: ['#ffffff', '#dceeff', '#add7ff', '#70b8ff', '#2b8aff', '#0066FF'],
  },
  {
    slug: 'phelix-ongoro',
    name: 'Phelix Ongoro',
    role: 'CTO',
    highlightBg: '#093173',
    pastelBg: '#DCE7FA',
    mosaicRamp: ['#ffffff', '#e2edfc', '#b5d2f8', '#78aef2', '#347ce6', '#1451b8'],
  },
  {
    slug: 'dennis-mugo',
    name: 'Dennis Mugo',
    role: 'UI/UX Designer',
    highlightBg: '#093173',
    pastelBg: '#CFF2FF',
    mosaicRamp: ['#ffffff', '#daf1ff', '#a8deff', '#6cc4fc', '#2ca4f0', '#027cc7'],
  },
  {
    slug: 'beda-musindalo',
    name: 'Beda Musindalo',
    role: 'Web Developer',
    highlightBg: '#093173',
    pastelBg: '#D9ECFB',
    mosaicRamp: ['#ffffff', '#e1f1fc', '#b3ddf9', '#6ebcf4', '#2693e3', '#0369a1'],
  },
  {
    slug: 'sam-kagunye',
    name: 'Sam Kagunye',
    role: 'AI Specialist',
    highlightBg: '#093173',
    pastelBg: '#E0E7FC',
    mosaicRamp: ['#ffffff', '#e6edfe', '#c0d2fc', '#8da8f8', '#4b73ef', '#1d42be'],
  },
  {
    slug: 'faith-wanjiku',
    name: 'Faith Wanjiku',
    role: 'Lead Systems Architect',
    highlightBg: '#093173',
    pastelBg: '#DBEAFE',
    mosaicRamp: ['#ffffff', '#e0ecff', '#bad6ff', '#85b5ff', '#4b8ff7', '#1d64e0'],
  },
  {
    slug: 'brian-otieno',
    name: 'Brian Otieno',
    role: 'Head of Design & UX Craft',
    highlightBg: '#093173',
    pastelBg: '#DBEAFE',
    mosaicRamp: ['#ffffff', '#dff0fe', '#b1d8fd', '#6bb5fc', '#248cf6', '#0863c9'],
  },
  {
    slug: 'amina-hassan',
    name: 'Amina Hassan',
    role: 'Senior Full-Stack Engineer',
    highlightBg: '#093173',
    pastelBg: '#D6EAF8',
    mosaicRamp: ['#ffffff', '#e3f1fb', '#b6daf4', '#72b7e9', '#2c89d2', '#0961a8'],
  },
];

const GRID_CELL = 16;
const GRID_COLS = 20;
const GRID_ROWS = 12;

// Generates the diagonal woven pixel-mosaic matrix matching the editorial tile reference.
function buildDiagonalMosaicGrid(ramp: [string, string, string, string, string, string], seedOffset: number) {
  const cells: Array<{ x: number; y: number; fill: string }> = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const u = col / (GRID_COLS - 1);
      const v = row / (GRID_ROWS - 1);
      // Distance away from main top-left -> bottom-right diagonal band
      const dist = Math.abs(v - u * 0.85 - 0.08);
      const jitter = (((row * 29 + col * 43 + seedOffset * 17 + row * col * 13) % 100) / 100 - 0.5) * 0.24;
      const intensity = Math.max(0, Math.min(1, dist * 1.65 + jitter));

      let idx = 0;
      if (intensity > 0.82) idx = 5;
      else if (intensity > 0.65) idx = 4;
      else if (intensity > 0.48) idx = 3;
      else if (intensity > 0.32) idx = 2;
      else if (intensity > 0.16) idx = 1;
      else idx = 0;

      cells.push({
        x: col * GRID_CELL,
        y: row * GRID_CELL,
        fill: ramp[idx],
      });
    }
  }
  return cells;
}

export default function TeamCoverflow() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="our-team"
      data-scroll-no-reveal=""
      className="py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 sm:mb-12 text-left">
          <span className="inline-block bg-white px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.02em] text-[#04122b]">
            Our Team
          </span>
          <h2 id="team-heading" className="team-roster-heading mt-4 font-ptserif text-[#04122b]">
            The people behind Mixon.
          </h2>
        </div>

        <ul
          role="list"
          className="team-editorial-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {MEMBERS.map((member, index) => {
            const mosaicCells = buildDiagonalMosaicGrid(member.mosaicRamp, index + 1);
            const gridPatternId = `teamGrid-${member.slug}`;
            return (
              <motion.li
                key={member.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  delay: reduceMotion ? 0 : (index % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="team-editorial-card flex flex-col bg-white text-left"
              >
                {/* Woven Diagonal Pixel-Mosaic Top Block */}
                <div
                  aria-hidden="true"
                  className="relative min-h-[176px] sm:min-h-[192px] overflow-hidden bg-white"
                >
                  <svg
                    viewBox={`0 0 ${GRID_COLS * GRID_CELL} ${GRID_ROWS * GRID_CELL}`}
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <pattern id={gridPatternId} width={GRID_CELL} height={GRID_CELL} patternUnits="userSpaceOnUse">
                        <path
                          d={`M ${GRID_CELL} 0 L 0 0 0 ${GRID_CELL}`}
                          fill="none"
                          stroke="rgba(4, 18, 43, 0.08)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    {mosaicCells.map((cell, cIdx) => (
                      <rect
                        key={cIdx}
                        x={cell.x}
                        y={cell.y}
                        width={GRID_CELL}
                        height={GRID_CELL}
                        fill={cell.fill}
                      />
                    ))}
                    <rect width="100%" height="100%" fill={`url(#${gridPatternId})`} />
                  </svg>
                </div>

                {/* Overlapping Highlighter Nameplate + Color-Matched Role Footer */}
                <div
                  className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-2"
                  style={{ backgroundColor: member.pastelBg }}
                >
                  <div
                    className="-ml-4 -mt-7 mb-2.5 inline-block w-fit max-w-[calc(100%+0.5rem)] px-3.5 py-1.5"
                    style={{ backgroundColor: member.highlightBg }}
                  >
                    <h3 className="team-card-name">{member.name}</h3>
                  </div>

                  <p className="text-[12.5px] font-medium tracking-[0.005em] text-[#04122b]">
                    {member.role}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
