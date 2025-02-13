import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BackgroundBoxes() {
  const features = [
    {
      title: "Diabolical Genius",
      description:
        "Witness the unparalleled intellect of Stewie Griffin. His brilliance knows no bounds, and his schemes are as intricate as they are devious. Prepare yourself for an onslaught of cutting wit and unmatched sarcasm.",
    },
    {
      title: "British Sophistication",
      description:
        "Stewie isn't just a baby; he's a refined gentleman with a sharp tongue and an even sharper mind. His eloquence is unparalleled, delivering insults with the grace of a Victorian aristocrat.",
    },
    {
      title: "World Domination Aspirations",
      description:
        "Stewie's grand vision extends beyond mere intellect—he aims for global conquest. Every moment is a step toward his inevitable rise to power. Bask in his glorious ambition and marvel at his master plans.",
    },
  ];

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 grid place-items-center">
      <div className="absolute inset-0 bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-30 text-center flex flex-col items-center">
        <div className="flex flex-col w-full max-w-xl px-4 items-center justify-center p-10">
          <h1
            className={cn(
              "md:text-4xl text-3xl text-white font-cormorant mb-6"
            )}
          >
            Stewie's Realm
          </h1>
          <p className="mt-6 text-neutral-300 font-cormorant">
            Enter the mind of Stewie Griffin, where intellect and ambition reign
            supreme.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 font-cormorant px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-slate-800 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-neutral-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
