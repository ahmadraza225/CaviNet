"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * "$0.0M" → "$50M+" with an ease-out curve. The "+" is laid out (invisible)
 * during the count so the live dot doesn't jump when it appears.
 */
export function CountUp({ to = 50, duration = 2 }: { to?: number; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: easeOutExpo,
      onUpdate: setValue,
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [reduceMotion, to, duration]);

  // Reduced motion: skip the count and show the final figure straight away.
  const finished = done || !!reduceMotion;

  return (
    <span className="inline-flex items-start">
      <span className="sr-only">${to}M+</span>
      <span aria-hidden="true">{finished ? `$${to}M` : `$${value.toFixed(1)}M`}</span>
      <span aria-hidden="true" className={finished ? undefined : "opacity-0"}>
        +
      </span>
      <span aria-hidden="true" className="relative ml-2 mt-[10px] flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative size-2 rounded-full bg-brand" />
      </span>
    </span>
  );
}
