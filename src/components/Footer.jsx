const stats = [
  ["10K+", "Happy Students"],
  ["200+", "Expert Instructors"],
  ["150+", "Online Courses"],
];

function JoinCta() {
  return (
    <section className="bg-brand-800 py-14 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Join thousands of students achieving their goals.
            </h2>

            <div className="mt-6 flex gap-10">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-gold">{n}</div>
                  <div className="text-xs text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#"
            className="inline-block rounded-md bg-gold px-6 py-3 text-sm font-semibold text-brand-900 transition hover:brightness-105"
          >
            Join Now
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/60">Trusted by top companies</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-lg font-semibold text-white/80">
            {["Google", "Microsoft", "airbnb", "Spotify"].map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
      <JoinCta />

      <footer className="bg-brand-900 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} EduFlow. All rights reserved.
      </footer>
    </>
  );
}
