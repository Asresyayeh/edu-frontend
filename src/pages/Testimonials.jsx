import { useState } from "react";
import {
  Users,
  BookOpen,
  Infinity as Inf,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Expert Instructors",
    text: "Learn from industry professionals",
  },
  {
    icon: BookOpen,
    title: "Quality Content",
    text: "Clear, up-to-date lessons",
  },
  {
    icon: Inf,
    title: "Flexible Learning",
    text: "Study anytime on any device",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    text: "The lessons are clear and practical. I finished my first course in two weeks and used the skills at work right away.",
  },
  {
    name: "Daniel Bekele",
    role: "Junior Developer",
    text: "Flexible schedule and great instructors. The projects helped me land my first developer job.",
  },
];

const Title = ({ children }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-ink sm:text-3xl">{children}</h2>
  </div>
);

function WhyChoose() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-5">
        <Title>Why Choose EduFlow?</Title>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-lg border border-slate-200 p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-emerald-50 text-brand-600">
                <Icon className="h-6 w-6" />
              </span>

              <div>
                <div className="font-semibold text-ink">{title}</div>
                <div className="text-xs text-slate-500">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);

  const t = testimonials[i];

  const go = (d) => {
    setI((i + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-[#fbf8f1] py-14">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <Title>What Our Students Say</Title>

        <figure className="relative mt-8 rounded-2xl bg-white p-8 shadow-md">
          <Quote className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gold p-1.5 text-brand-900" />

          <blockquote className="leading-relaxed text-slate-600">
            {t.text}
          </blockquote>

          <figcaption className="mt-5 flex items-center justify-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-bold text-white">
              {t.name[0]}
            </span>

            <span className="text-left text-sm">
              <b className="block text-ink">{t.name}</b>
              <span className="text-slate-500">{t.role}</span>
            </span>
          </figcaption>
        </figure>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="rounded-full p-1.5 text-slate-500 hover:bg-white"
          >
            <ChevronLeft />
          </button>

          {testimonials.map((_, n) => (
            <span
              key={n}
              className={`h-2 w-2 rounded-full ${
                n === i ? "bg-gold" : "bg-slate-300"
              }`}
            />
          ))}

          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="rounded-full p-1.5 text-slate-500 hover:bg-white"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function WhyChooseTestimonials() {
  return (
    <>
      <WhyChoose />
      <Testimonials />
    </>
  );
}
