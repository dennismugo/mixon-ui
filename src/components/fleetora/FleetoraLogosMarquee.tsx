import React from 'react';
import clientAmana from '../../assets/images/clients/amana.webp';
import clientCaritas from '../../assets/images/clients/caritas.webp';
import clientEbesa from '../../assets/images/clients/ebesa.webp';
import clientGib from '../../assets/images/clients/gib.webp';
import clientIbs from '../../assets/images/clients/ibs.webp';
import clientIdman from '../../assets/images/clients/idman.webp';
import clientKush from '../../assets/images/clients/kush.webp';
import clientOpportunity from '../../assets/images/clients/opportunity.webp';

export const FleetoraLogosMarquee: React.FC = () => {
  const clientLogos = [
    { name: 'Amana Bank', src: clientAmana },
    { name: 'Caritas Microfinance Bank', src: clientCaritas },
    { name: 'eBesa', src: clientEbesa },
    { name: 'GIB Bank', src: clientGib },
    { name: 'IBS Bank', src: clientIbs },
    { name: 'IDMAN Community Bank', src: clientIdman },
    { name: 'Kush Bank', src: clientKush },
    { name: 'Opportunity Bank', src: clientOpportunity },
  ];

  return (
    <section className="pt-10 pb-3 sm:pt-14 sm:pb-4 bg-white relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      <div className="w-full max-w-7xl mx-auto mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-500 font-medium tracking-tight">
          <span>Trusted by over</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-950 text-white font-mono font-bold text-[11px] sm:text-xs shadow-2xs">
            2,400+
          </span>
          <span>active businesses &amp; operators worldwide</span>
        </div>
      </div>

      {/* Marquee Track: NO BORDER TOP AND BOTTOM - Matched to Navbar max-w-7xl */}
      <div className="w-full max-w-7xl mx-auto overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center animate-[mixon-logo-drift_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1, 2].map((copyIdx) => (
            <div key={copyIdx} className="flex items-center gap-12 sm:gap-16 lg:gap-20 px-4 sm:px-6">
              {clientLogos.map((client) => (
                <div 
                  key={client.name + copyIdx} 
                  className="flex items-center justify-center h-10 sm:h-12 w-auto shrink-0 group/logo"
                >
                  <img 
                    src={client.src} 
                    alt={client.name} 
                    loading="lazy"
                    className="h-7 sm:h-9 w-auto max-w-[150px] sm:max-w-[170px] object-contain transition-transform duration-300 group-hover/logo:scale-105 filter-none opacity-100" 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
