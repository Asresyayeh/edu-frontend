import {
  Video,
  Users,
  Award,
  MessagesSquare,
  Smartphone,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Video Courses",
    text: "High-quality lessons you can watch anytime, at your own pace.",
  },
  {
    icon: Users,
    title: "Live Classes",
    text: "Interactive sessions where you can ask instructors questions.",
  },
  {
    icon: Award,
    title: "Certificates",
    text: "Finish a course and earn a certificate to share with employers.",
  },
  {
    icon: MessagesSquare,
    title: "Mentorship",
    text: "One-on-one guidance from experienced industry professionals.",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    text: "Study on any device with your progress synced everywhere.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Our team is ready to help whenever you get stuck.",
  },
];

export default function Service() {
  return (
    <main className="font-sans antialiased">
      {/* Header */}
      <section
        id="services"
        className="relative overflow-hidden bg-brand-800 px-5 py-20 text-center text-white"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-700/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <p className="relative text-sm font-semibold uppercase tracking-widest text-gold">
          What we do
        </p>
        <h1 className="relative mt-3 text-4xl font-bold sm:text-5xl">
          Our <span className="text-gold">Services</span>
        </h1>
        <p className="relative mx-auto mt-4 max-w-lg text-white/75">
          Everything you need to learn new skills and grow your career.
        </p>
      </section>

      {/* Cards */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => {
            const featured = i === 1;
            return (
              <article
                key={title}
                className={`group relative overflow-hidden rounded-2xl p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  featured
                    ? "bg-brand-800 text-white shadow-lg"
                    : "bg-white text-ink shadow-sm ring-1 ring-slate-200"
                }`}
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl ${
                    featured
                      ? "bg-gold text-brand-900"
                      : "bg-gradient-to-br from-brand-600 to-brand-800 text-gold"
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${featured ? "text-white/75" : "text-slate-500"}`}
                >
                  {text}
                </p>
                <ArrowUpRight
                  className={`absolute right-6 top-6 h-5 w-5 opacity-0 transition group-hover:opacity-100 ${
                    featured ? "text-gold" : "text-brand-600"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition duration-300 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-5 py-14 text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          Ready to start learning?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          Join thousands of students already reaching their goals.
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-md bg-gold px-7 py-3 text-sm font-semibold text-brand-900 shadow hover:brightness-105"
        >
          Join Now
        </a>
      </section>
    </main>
  );
}
