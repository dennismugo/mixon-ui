import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  surface: string;
};

const members: TeamMember[] = [
  { name: 'Ibrahim Amwayi', role: 'CEO', bio: 'Leading Mixon’s strategy, partnerships, and product direction.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Phelix Ongoro', role: 'CTO', bio: 'Building reliable systems that make complex work feel simple.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Dennis Mugo', role: 'UI/UX Designer', bio: 'Designing clear, useful product experiences for real operators.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Beda Musindalo', role: 'Web Developer', bio: 'Turning product ideas into fast, thoughtful digital experiences.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Sam Kagunye', role: 'AI Specialist', bio: 'Making intelligent automation practical for everyday business work.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Faith Wanjiku', role: 'Lead Systems Architect', bio: 'Connecting the systems, data, and rails businesses rely on.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Brian Otieno', role: 'Head of Design & UX Craft', bio: 'Creating product detail that feels clear, calm, and considered.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
  { name: 'Amina Hassan', role: 'Senior Full-Stack Engineer', bio: 'Engineering dependable platforms from interface to infrastructure.', image: '/mixon-team-avatar.jpg', surface: 'bg-[#0052d4]' },
];

export default function TeamCoverflow() {
  const railRef = useRef<HTMLDivElement>(null);
  const moveRail = (direction: number) => railRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="team-heading">
      <div className="mx-auto max-w-[1540px] px-6 sm:px-10 lg:px-14">
        <div className="mb-11 flex flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="mb-4 inline-block text-[11px] font-mono font-semibold uppercase tracking-[.16em] text-[#0066FF]">Our team</span>
            <h2 id="team-heading" className="font-display text-[2.5rem] font-medium leading-[.98] tracking-[-.05em] text-[#10203a] sm:text-5xl">The people behind Mixon.</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            <p className="text-sm leading-6 text-[#52647d] sm:text-base sm:leading-7 md:text-right">A close-knit team of builders, designers, and problem-solvers making everyday business work easier.</p>
            {/* Desktop & Mobile Arrow Navigation */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => moveRail(-1)}
                aria-label="Previous team members"
                className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-[#0066FF] hover:bg-blue-50/70 hover:text-[#0066FF] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="h-4.5 w-4.5 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={() => moveRail(1)}
                aria-label="Next team members"
                className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:border-[#0066FF] hover:bg-blue-50/70 hover:text-[#0066FF] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ArrowRight className="h-4.5 w-4.5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div ref={railRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 scroll-smooth">
            {members.map((member) => (
              <article key={member.name} className="group w-[202px] shrink-0 snap-start sm:w-[224px]">
                <div className={`aspect-[.93] overflow-hidden rounded-[8px] ${member.surface}`}><img src={member.image} alt={member.name} className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.035]" /></div>
                <div className="pt-4"><h3 className="text-[15px] font-semibold leading-5 tracking-[-.025em] text-[#171716]">{member.name}</h3><p className="mt-0.5 text-[13px] font-medium leading-5 text-[#52647d]">{member.role}</p><p className="mt-2.5 text-[12px] leading-[1.48] text-[#7a8491]">{member.bio}</p></div>
              </article>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white via-white/85 to-transparent md:block" />
        </div>
      </div>
    </section>
  );
}
