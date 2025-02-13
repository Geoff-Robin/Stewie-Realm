"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30 pointer-events-auto",
        className
      )}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}


export function BackgroundBoxes() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 grid place-items-center">
      <div className="absolute inset-0 bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-20 text-center">
        <div className="flex flex-col h-[500px]">
            <h1 className={cn("md:text-4xl text-xl text-white font-cormorant")}>
            Haiku Balance
            </h1>
            <p className="mt-2 text-neutral-300 font-cormorant">
            Find peace in every haiku, one verse at a time.
            </p>
        </div>
        <MarqueeEffectDoubleExample/>
      </div>
    </div>
  );
}