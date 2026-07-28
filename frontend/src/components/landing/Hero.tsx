import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 pb-20 sm:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="absolute inset-0 bg-mesh-hero opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-60 mask-fade-y pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="ai" className="px-3 py-1.5">
                <Sparkles size={12} className="text-medical-500" />
                <span>Powered by CuraCore™</span>
                <span className="h-1 w-1 rounded-full bg-medical-300" />
                <span className="text-medical-500 font-semibold">HIPAA-ready</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-display-xl text-navy text-balance"
            >
              CuraCore™-powered early{" "}
              <span className="relative inline-block">
                <span className="gradient-text">cancer risk</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: "0.4em" }}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    d="M2 5 Q 50 1, 100 4 T 198 3"
                    stroke="url(#underlineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              screening.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg text-navy-300 leading-relaxed max-w-xl"
            >
              CuraMind is powered by CuraCore™, a clinical decision support platform that helps clinicians
              estimate individual cancer risk, recommend appropriate screenings, and generate
              explainable reports —{" "}
              <span className="text-navy font-medium">in minutes, not weeks.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Button variant="glow" size="lg" asChild className="group">
                <Link to="/assessment">
                  Start Free Screening
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-200"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-success-500" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={15} className="text-medical-500" />
                <span>Patient data never trains models</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={15} className="text-accent-500" />
                <span>Clinician-reviewed methodology</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        {/* Trusted by strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 sm:mt-28 pt-10 border-t border-surface-border"
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-navy-200">
            Trusted by leading research and clinical institutions
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center">
            {["Mayo", "Stanford", "Cleveland", "Johns Hopkins", "MIT", "Mass General"].map((name) => (
              <div
                key={name}
                className="text-sm font-semibold tracking-tight text-navy-200/70 hover:text-navy-300 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
