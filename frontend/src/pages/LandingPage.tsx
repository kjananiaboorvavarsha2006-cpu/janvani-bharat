import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, Globe, ArrowRight, Users, FileCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/Chatbot";
import { SchemeMap } from "@/components/SchemeMap";
import { LanguageSelector } from "@/components/LanguageSelector";
import { t, type Language } from "@/lib/translations";
import heroBanner from "@/assets/hero-banner.jpg";

const featureIcons = [Search, Globe, Lightbulb, Shield];

const LandingPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>('english');
  const tr = t(language);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="JanVani Bharat Logo" className="w-8 h-8 rounded-sm" />
            <span className="text-xl font-bold text-primary">JanVani Bharat</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={setLanguage} />
            <Button onClick={() => navigate(`/eligibility?lang=${language}`)} size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              {tr.checkEligibility}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16">
        <div className="relative overflow-hidden gradient-hero">
          <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-primary-foreground space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">{tr.heroTitle}</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">{tr.heroSubtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate(`/eligibility?lang=${language}`)}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 gap-2">
                  {tr.startCheck} <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm opacity-80 pt-2">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {tr.schemesCount}</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {tr.languages}</span>
                <span className="flex items-center gap-1"><FileCheck className="w-4 h-4" /> {tr.free}</span>
              </div>
            </div>
            <div className="hidden md:block animate-slide-up">
              <img src={heroBanner} alt="JanVani Bharat" className="rounded-2xl shadow-elevated w-full" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60H1440V20C1440 20 1200 0 720 30C240 60 0 20 0 20V60Z" fill="hsl(210 33% 98%)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{tr.whyTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tr.whySubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tr.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border group">
                  <div className="w-12 h-12 rounded-lg bg-navy-light flex items-center justify-center mb-4 group-hover:bg-saffron-light transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-navy-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{tr.howTitle}</h2>
            <p className="text-muted-foreground text-lg">{tr.howSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {tr.steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-saffron flex items-center justify-center text-secondary-foreground text-2xl font-bold mx-auto mb-4 shadow-card">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate(`/eligibility?lang=${language}`)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 gap-2">
              {tr.checkNow} <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{tr.exploreTitle}</h2>
            <p className="text-muted-foreground text-lg">{tr.exploreSubtitle}</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <SchemeMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>{tr.footerText}</p>
          <p className="mt-1">{tr.footerSub}</p>
        </div>
      </footer>

      <Chatbot language={language} />
    </div>
  );
};

export default LandingPage;
