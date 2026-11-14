// import {
//   Code2,
//   Palette,
//   Megaphone,
//   Briefcase,
//   TrendingUp,
//   Laptop,
// } from "lucide-react";

// const categories = [
//   { name: "Development", count: 38, icon: Code2 },
//   { name: "Design", count: 24, icon: Palette },
//   { name: "Marketing", count: 30, icon: Megaphone },
//   { name: "Business", count: 18, icon: Briefcase },
//   { name: "Personal Growth", count: 16, icon: TrendingUp },
//   { name: "IT & Software", count: 22, icon: Laptop },
// ];

// const Title = ({ children, sub }) => (
//   <div className="text-center">
//     <h2 className="text-2xl font-bold text-ink sm:text-3xl">{children}</h2>

//     {sub && <p className="mt-2 text-sm text-slate-500">{sub}</p>}
//   </div>
// );

// function Categories() {
//   return (
//     <section id="categories" className="bg-white py-14">
//       <div className="mx-auto max-w-7xl px-5">
//         <Title sub="Explore top categories and find the right course for you.">
//           Popular Categories
//         </Title>

//         <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
//           {categories.map(({ name, count, icon: Icon }, i) => (
//             <a
//               key={name}
//               href="#"
//               className={`rounded-lg border bg-white p-5 text-center transition hover:shadow-lg ${
//                 i === 2 ? "border-gold shadow-md" : "border-slate-200"
//               }`}
//             >
//               <Icon className="mx-auto h-7 w-7 text-brand-600" />

//               <div className="mt-3 text-sm font-semibold text-ink">{name}</div>

//               <div className="text-xs text-slate-500">{count} Courses</div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Categories;

import { useState } from "react";
import {
  Code2,
  Palette,
  Megaphone,
  Briefcase,
  TrendingUp,
  Laptop,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Development",
    count: 38,
    icon: Code2,
    href: "/courses/development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Design",
    count: 24,
    icon: Palette,
    href: "/courses/design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marketing",
    count: 30,
    icon: Megaphone,
    href: "/courses/marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Business",
    count: 18,
    icon: Briefcase,
    href: "/courses/business",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Personal Growth",
    count: 16,
    icon: TrendingUp,
    href: "/courses/personal-growth",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "IT & Software",
    count: 22,
    icon: Laptop,
    href: "/courses/it-software",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
];

const Title = ({ children, sub }) => (
  <div className="mx-auto max-w-2xl text-center">
    <span className="inline-block rounded-full bg-brand-600/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-600 uppercase">
      Browse Topics
    </span>
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
      {children}
    </h2>
    {sub && (
      <p className="mt-3 text-base leading-relaxed text-slate-500">{sub}</p>
    )}
  </div>
);

function Categories() {
  const [selected, setSelected] = useState("Marketing");

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white py-20"
    >
      <div className="mx-auto max-w-7xl px-5">
        <Title sub="Explore top categories and find the right course for you.">
          Popular Categories
        </Title>

        {/* Wider 3-column desktop grid (2 rows of 3) with larger gaps */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, count, icon: Icon, href, image }) => {
            const isSelected = selected === name;

            return (
              <a
                key={name}
                href={href}
                onClick={() => setSelected(name)}
                className={`group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border bg-white text-center transition-all duration-300 hover:-translate-y-1.5 ${
                  isSelected
                    ? "border-gold ring-2 ring-gold/20 shadow-lg shadow-slate-200/70"
                    : "border-slate-200/80 shadow-sm hover:border-brand-600/40 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
              >
                {/* Taller Category Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={`${name} courses`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />

                  <span
                    className={`absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
                      isSelected
                        ? "bg-gold text-white opacity-100"
                        : "bg-white/85 text-slate-700 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                {/* Larger Overlapping Icon Badge */}
                <div className="relative -mt-7 flex justify-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white shadow-md transition-all duration-300 group-hover:scale-110 ${
                      isSelected
                        ? "bg-brand-600 text-white"
                        : "bg-white text-brand-600 group-hover:bg-brand-600 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>

                {/* Expanded Card Body */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 pt-4 pb-8">
                  <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-brand-600">
                    {name}
                  </h3>

                  <span className="mt-2.5 inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-sm font-medium text-slate-600 transition-colors group-hover:bg-brand-600/10 group-hover:text-brand-600">
                    {count} Courses
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
