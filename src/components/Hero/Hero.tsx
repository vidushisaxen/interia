// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import cloud from "@/assets/hero/cloud.png";
import villa from "@/assets/hero/villa.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          villaRef.current,
          { yPercent: 30 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={cloud} alt="" fill sizes="100vw" loading="eager" className="object-cover" />
        </div>
        <div ref={villaRef} className="absolute inset-x-0 bottom-0 z-[1] aspect-[5/4] w-full">
          <Image
            src={villa}
            alt="An image of a beautiful villa"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
