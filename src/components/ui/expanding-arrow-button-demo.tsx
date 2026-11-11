"use client";

import React from "react";
import ExpandingArrowButton from "@/components/ui/expanding-arrow-button";

export default function ExpandingArrowButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      {/* Brand Mixon Pill Version matching user image */}
      <ExpandingArrowButton size="pill">Book a demo</ExpandingArrowButton>

      {/* Default beui Size */}
      <ExpandingArrowButton>Book a demo</ExpandingArrowButton>
    </div>
  );
}
