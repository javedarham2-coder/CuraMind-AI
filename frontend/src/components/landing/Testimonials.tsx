import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { FadeIn, Stagger, StaggerItem, Section, PageContainer } from "@/components/ui/PageContainer";

const testimonials = [
  {
    quote:
      "CuraMind is the rare CuraCore™ tool that respects clinical judgment. The explainability layer changed how our team adopts ML in practice.",
    name: "Dr. Amara Okonkwo",
    role: "Director of Oncology, Mount Sinai",
    initials: "AO",
    rating: 5,
  },
  {
    quote:
      "The risk reports are beautifully clear. My patients finally understand their screening recommendations — and why.",
    name: "Dr. Rohan Iyer",
    role: "Primary Care Physician",
    initials: "RI",
    rating: 5,
  },
  {
    quote:
      "We've reduced time-to-insight by 70% in our early detection program. The privacy posture is best in class.",
    name: "Dr. Mei Lin",
    role: "Chief Medical Officer, Helix Health",
    initials: "ML",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <Section id="about" className="bg-white">
      <PageContainer>
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-medical-500">
            Trusted by clinicians
          </p>
          <h2 className="mt-3 text-display-lg text-navy text-balance">
            Built in partnership with{" "}
            <span className="gradient-text">leading medical experts</span>.
          </h2>
          <p className="mt-4 text-lg text-navy-300 leading-relaxed">
            Designed alongside practicing oncologists and primary care physicians.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid md:grid-cols-3 gap-5" delay={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="h-full p-6 hover:border-navy-200/60 transition-colors">
                <CardContent className="p-0">
                  <Quote size={22} className="text-medical-300" />
                  <p className="mt-4 text-[15px] text-navy-300 leading-relaxed">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3 pt-5 border-t border-surface-border">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-medical-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{t.name}</p>
                      <p className="text-xs text-navy-200">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </PageContainer>
    </Section>
  );
}
