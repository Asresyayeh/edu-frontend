import { Star } from "lucide-react";
const courses = [
  {
    title: "Complete Web Development Bootcamp",
    rating: 4.8,
    reviews: 981,
    price: 69,
    old: 99,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "UI/UX Design Masterclass",
    rating: 4.8,
    reviews: 672,
    price: 59,
    old: 89,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Digital Marketing Masterclass",
    rating: 4.7,
    reviews: 455,
    price: 49,
    old: 79,
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Data Science with Python",
    rating: 4.9,
    reviews: 1204,
    price: 79,
    old: 119,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

const Title = ({ children, sub }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-ink sm:text-3xl">{children}</h2>
    {sub && <p className="mt-2 text-sm text-slate-500">{sub}</p>}
  </div>
);

function Courses() {
  return (
    <section id="courses" className="bg-white pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <Title sub="Handpicked courses to help you learn and grow your skills.">
          Featured Courses
        </Title>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="min-h-[2.75rem] text-sm font-semibold leading-snug text-ink">
                  {c.title}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  <b className="text-slate-700">{c.rating}</b>({c.reviews})
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-bold text-brand-600">${c.price}</span>

                  <span className="text-xs text-slate-400 line-through">
                    ${c.old}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-block rounded-md border border-brand-600 px-6 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}

export default Courses;
