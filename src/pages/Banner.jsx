import { Award, Users, Rocket, BarChart3, Trophy } from "lucide-react";

const BANNER_IMG = "";

const perks = [
  "Expert Instructors",
  "Interactive Lessons",
  "Certificate",
  "Lifetime Access",
];

const levels = [
  {
    name: "Beginner",
    sub: "Start from zero",
    icon: Rocket,
    bg: "bg-gold",
  },
  {
    name: "Intermediate",
    sub: "Build real skills",
    icon: BarChart3,
    bg: "bg-sage",
  },
  {
    name: "Advanced",
    sub: "Master your craft",
    icon: Trophy,
    bg: "bg-blush",
  },
];

function Banner() {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Education is the key to a better future
            </h2>

            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Start your learning journey today and achieve your dreams.
            </p>

            <a
              href="#courses"
              className="mt-6 inline-block rounded-md bg-violet-brand px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
            >
              Explore Courses
            </a>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs font-medium text-slate-700 sm:grid-cols-4">
              {perks.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-brand-600" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {BANNER_IMG ? (
            <img
              src={BANNER_IMG}
              alt="Happy learners"
              className="mx-auto max-h-80 object-contain"
            />
          ) : (
            <div className="grid h-64 place-items-center rounded-[2rem] bg-[#e4e6b0]">
              <Users className="h-20 w-20 text-brand-600/40" />
            </div>
          )}
        </div>

        <h3 className="mt-12 text-lg font-bold text-ink">Browse by Levels</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {levels.map(({ name, sub, icon: Icon, bg }) => (
            <a
              key={name}
              href="#"
              className={`flex items-center gap-3 rounded-xl p-5 text-ink transition hover:-translate-y-0.5 ${bg}`}
            >
              <Icon className="h-7 w-7" />

              <span>
                <b className="block">{name}</b>
                <span className="text-xs opacity-70">{sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;
