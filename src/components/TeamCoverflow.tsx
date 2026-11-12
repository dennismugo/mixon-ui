import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  highlightBg: string;
  pastelBg: string;
}

const MEMBERS: TeamMember[] = [
  {
    slug: 'ibrahim-amwayi',
    name: 'Ibrahim Amwayi',
    role: 'CEO',
    highlightBg: '#FFE529',
    pastelBg: '#FFF7AE',
  },
  {
    slug: 'phelix-ongoro',
    name: 'Phelix Ongoro',
    role: 'CTO',
    highlightBg: '#FF5A3D',
    pastelBg: '#FFC2B5',
  },
  {
    slug: 'dennis-mugo',
    name: 'Dennis Mugo',
    role: 'UI/UX Designer',
    highlightBg: '#3D9BFF',
    pastelBg: '#BFE0FF',
  },
  {
    slug: 'beda-musindalo',
    name: 'Beda Musindalo',
    role: 'Web Developer',
    highlightBg: '#5CE88A',
    pastelBg: '#C8FBE0',
  },
  {
    slug: 'sam-kagunye',
    name: 'Sam Kagunye',
    role: 'AI Specialist',
    highlightBg: '#B794FF',
    pastelBg: '#E6DBFF',
  },
  {
    slug: 'faith-wanjiku',
    name: 'Faith Wanjiku',
    role: 'Lead Systems Architect',
    highlightBg: '#38E0D2',
    pastelBg: '#C2F8F3',
  },
  {
    slug: 'brian-otieno',
    name: 'Brian Otieno',
    role: 'Head of Design & UX Craft',
    highlightBg: '#FFA938',
    pastelBg: '#FFE2BA',
  },
  {
    slug: 'amina-hassan',
    name: 'Amina Hassan',
    role: 'Senior Full-Stack Engineer',
    highlightBg: '#FF7BB8',
    pastelBg: '#FFD4E8',
  },
];

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
          {MEMBERS.map((member, index) => (
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
              className="team-editorial-card group flex flex-col bg-white text-left"
            >
              {/* Compact Blank Studio Grey Field */}
              <div
                aria-hidden="true"
                className="min-h-[112px] sm:min-h-[124px] bg-gradient-to-b from-[#edf0f5] to-[#e1e6ee]"
              />

              {/* Minimal Overlapping Highlighter Nameplate + Color-Matched Role Footer */}
              <div
                className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-2"
                style={{ backgroundColor: member.pastelBg }}
              >
                <div
                  className="-ml-4 -mt-7 mb-2.5 inline-block w-fit max-w-[calc(100%+0.5rem)] px-3.5 py-1.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  style={{ backgroundColor: member.highlightBg }}
                >
                  <h3 className="team-card-name">{member.name}</h3>
                </div>

                <p className="text-[12.5px] font-medium tracking-[0.005em] text-[#04122b]">
                  {member.role}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
