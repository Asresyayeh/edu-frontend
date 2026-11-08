import {
  Code2,
  Palette,
  Megaphone,
  Briefcase,
  TrendingUp,
  Laptop,
} from "lucide-react";

const categories = [
  { name: "Development", count: 38, icon: Code2 },
  { name: "Design", count: 24, icon: Palette },
  { name: "Marketing", count: 30, icon: Megaphone },
  { name: "Business", count: 18, icon: Briefcase },
  { name: "Personal Growth", count: 16, icon: TrendingUp },
  { name: "IT & Software", count: 22, icon: Laptop },
];

const Title = ({ children, sub }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-ink sm:text-3xl">{children}</h2>

    {sub && <p className="mt-2 text-sm text-slate-500">{sub}</p>}
  </div>
);

function Categories() {
  return (
    <section id="categories" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-5">
        <Title sub="Explore top categories and find the right course for you.">
          Popular Categories
        </Title>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, count, icon: Icon }, i) => (
            <a
              key={name}
              href="#"
              className={`rounded-lg border bg-white p-5 text-center transition hover:shadow-lg ${
                i === 2 ? "border-gold shadow-md" : "border-slate-200"
              }`}
            >
              <Icon className="mx-auto h-7 w-7 text-brand-600" />

              <div className="mt-3 text-sm font-semibold text-ink">{name}</div>

              <div className="text-xs text-slate-500">{count} Courses</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
