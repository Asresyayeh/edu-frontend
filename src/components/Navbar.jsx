import { useState } from "react";
import { GraduationCap, Search, Menu, X } from "lucide-react";

const nav = ["Home", "Courses", "Pages", "Services", "Shop", "Contact"];

function Navbar({ onLoginClick }) {
  const [open, setOpen] = useState(false);

  const handleLoginClick = () => {
    setOpen(false);
    onLoginClick();
  };

  return (
    <header className="sticky top-0 z-30 bg-brand-800/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-brand">
            <GraduationCap className="h-6 w-6" />
          </span>
          Edu<span className="font-semibold">Flow</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-white/85 md:flex">
          {nav.map((n, i) => (
            <a
              key={n}
              href="#"
              className={`hover:text-gold ${i === 0 ? "text-gold" : ""}`}
            >
              {n}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Search className="h-5 w-5 text-white/85" />

          <button
            onClick={handleLoginClick}
            className="inline-block rounded-md bg-gold px-5 py-2 text-sm font-semibold text-brand-900 transition hover:brightness-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="space-y-3 border-t border-white/10 px-5 pb-5 pt-3 md:hidden">
          {nav.map((n) => (
            <a
              key={n}
              href="#"
              className="block text-white/90"
              onClick={() => setOpen(false)}
            >
              {n}
            </a>
          ))}

          <button
            onClick={handleLoginClick}
            className="inline-block rounded-md bg-gold px-6 py-2 text-sm font-semibold text-brand-900"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
