import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, PageContainer } from "@/components/ui/PageContainer";

const points = [
  "No credit card required",
  "End-to-end encrypted",
  "Cancel anytime",
];

export function CTA() {
  return (
    <Section id="contact" className="relative">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-navy-500 text-white p-8 sm:p-12 lg:p-16"
        >
          {/* Background visuals */}
          <div className="absolute inset-0 bg-mesh-hero opacity-50" />
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-medical-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium">
                <Sparkles size={12} className="text-cyan-400" />
                <span>Free for early access clinicians</span>
              </div>
              <h2 className="mt-6 text-display-lg text-balance">
                Bring intelligence to your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-medical-300 bg-clip-text text-transparent">
                  screening workflow
                </span>
                .
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-md">
                Join the clinicians and researchers already using CuraMind to surface earlier,
                explainable insights for their patients.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="glow" size="lg" asChild className="group">
                  <Link to="/assessment">
                    Start Free Screening
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                >
                  <a href="#contact">Talk to our team</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Active clinicians", value: "1,200+" },
                  { label: "Screenings run", value: "48,000+" },
                  { label: "Avg. report time", value: "3.2 min" },
                  { label: "Clinical accuracy", value: "94%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5"
                  >
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className="text-xs text-white/60 mt-1.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-1.5">
                    <Check size={14} className="text-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
