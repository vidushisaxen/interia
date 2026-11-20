// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import cloud from "@/assets/hero/cloud.png";
import villa from "@/assets/hero/villa.png";

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
          { yPercent: 20 },
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
    <section ref={sectionRef} className="relative grid w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={cloud} alt="" fill sizes="100vw" loading="eager" className="object-cover object-top" />
      </div>
      <div className="relative z-[1] col-start-1 row-start-1 flex flex-col items-center gap-6 self-start px-[3.5vw] py-[14vh] max-lg:px-[6vw] max-md:gap-4 max-md:px-[5vw] max-md:py-[12vh]">
        <h1 className="w-[69%] text-center text-[#fffbf5] max-lg:w-full">Spaces that connect people</h1>
        <p className="w-[28%] text-center text-28 text-[#fffbf5] max-lg:w-[50%] max-md:w-full">
          We design more than buildings, we create spaces that foster connection, creativity, and community
        </p>
      </div>
      <div ref={villaRef} className="pointer-events-none relative z-[2] col-start-1 row-start-1 aspect-[5/4] w-full self-end">
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
      <div className="pointer-events-none relative z-[3] col-start-1 row-start-1 h-[30vh] self-end bg-[linear-gradient(180deg,#ffffff00_0%,#ffffff_77.3%)]" />
    </section>
  );
}
