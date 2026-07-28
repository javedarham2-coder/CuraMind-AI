import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { to: "/#features", label: "Features" },
  { to: "/#how", label: "How it Works" },
  { to: "/#about", label: "About" },
  { to: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-surface-border/80"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="CuraMind home">
            <Logo />
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.to}
                href={isHome ? item.to : `/${item.to}`}
                className="relative whitespace-nowrap px-3.5 py-2 text-sm font-medium text-navy-300 hover:text-navy transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <ThemeToggle compact />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link to="/assessment">Get Started</Link>
            </Button>
          </div>

          <div className="ml-auto hidden sm:flex xl:hidden items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link to="/assessment">Get Started</Link>
            </Button>
          </div>

          <button
            className="ml-2 xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-surface-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="xl:hidden border-t border-surface-border bg-white/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
              <div className="flex justify-end pb-2">
                <ThemeToggle />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={isHome ? item.to : `/${item.to}`}
                  className="menu-nav-link whitespace-nowrap px-3 py-2.5 text-sm font-medium text-navy-300 rounded-lg hover:bg-surface-muted hover:text-navy"
                >
                  {item.label}
                </a>
              ))}
              <div className="sm:hidden flex flex-col gap-2 pt-3 border-t border-surface-border mt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button variant="primary" size="sm" asChild>
                  <Link to="/assessment">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
