import { useState } from "react";
import { Users, Infinity as Inf } from "lucide-react";
import teaching1 from "../assets/teaching-1.png";
import teaching2 from "../assets/teaching-2.png";

/* Put real image paths here (e.g. "/images/hero.png"). Empty = placeholder. */
const HERO_IMG = "";
const BANNER_IMG = "";

const Btn = ({ children, href = "#", className = "" }) => (
  <a
    href={href}
    className={`inline-block rounded-md bg-gold px-6 py-3 text-sm font-semibold text-brand-900 transition hover:brightness-105 ${className}`}
  >
    {children}
  </a>
);

const HERO_IMAGES = [
  teaching1,
  teaching2,
  //   "/images/teaching-3.jpg",
  //   "/images/teaching-1.jpg",
  //   "/images/teaching-2.jpg",
  //   "/images/teaching-3.jpg",
];

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-900 text-white">
      {/* Scrolling background images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-slider flex h-full w-max">
          {HERO_IMAGES.map((image, index) => (
            <div
              key={index}
              className="h-screen w-screen shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      </div>

      {/* Transparent dark overlay */}
      <div className="absolute inset-0 bg-brand-900/65" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            Unlock Your Potential with{" "}
            <span className="text-gold">Online Learning</span>
          </h1>

          <p className="mt-5 max-w-sm text-white/80">
            Learn new skills anytime, anywhere with expert instructors.
          </p>

          <Btn href="#courses" className="mt-8">
            Explore Courses
          </Btn>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="mx-auto flex h-[400px] w-72 items-end justify-center rounded-t-[8rem] border border-white/20 bg-white/10 backdrop-blur-sm">
            <Users className="mb-16 h-24 w-24 text-white/50" />
          </div>

          <div className="absolute bottom-6 left-0 flex items-center gap-3 rounded-full bg-white px-4 py-2 text-brand-900 shadow-xl">
            <span className="flex -space-x-2">
              {["bg-orange-400", "bg-sky-400", "bg-pink-400"].map((c) => (
                <span
                  key={c}
                  className={`h-7 w-7 rounded-full border-2 border-white ${c}`}
                />
              ))}
            </span>

            <span className="text-xs font-semibold leading-tight">
              Trusted by
              <br />
              200K+ Students
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans antialiased">
      <Hero />
    </div>
  );
}
