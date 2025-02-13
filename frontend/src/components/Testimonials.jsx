import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Boxes } from "./ui/background-boxes";

export function TestimonialMarquee({ testimonials = [] }) {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 grid place-items-center">
      <div className="absolute inset-0 bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes/>
        <Marquee pauseOnHover className="overflow-hidden p-4">
        {testimonials.map((testimonial, index) => (
            <div
            key={index}
            className="relative m-4 w-80 flex-shrink-0 rounded-lg shadow-lg overflow-hidden"
            >
            <div className="relative z-10 p-6 bg-foreground bg-opacity-90">
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <p className="mt-4 text-gray-900 font-bold">- {testimonial.author}</p>
            </div>
            </div>
        ))}
        </Marquee>
    </div>
  );
}
