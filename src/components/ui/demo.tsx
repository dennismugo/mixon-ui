import React from 'react';
import { AntiMetalButton } from "@/components/ui/anti-metal-button";

export default function DemoOne() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 p-8 bg-slate-900">
      {/* Mixon Theme Default */}
      <AntiMetalButton label="Book a demo" />
      
      {/* Explore miReserve */}
      <AntiMetalButton label="Explore miReserve" />

      {/* Spark Theme Variant */}
      <AntiMetalButton 
        label="Explore Packages" 
        accentFrom="#C9F27A" 
        accentTo="#a3d93b" 
        dotColor="#0F172A" 
      />
    </div>
  );
}
