import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, Globe, ArrowRight, Users, FileCheck, Lightbulb, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/Chatbot";
import { SchemeMap } from "@/components/SchemeMap";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBanner from "@/assets/hero-banner.jpg";

const features = [
{
  icon: Search,
  title: "Smart Eligibility Checker",
  desc: "Enter simple details and instantly discover schemes you qualify for."
},
{
  icon: Globe,
  title: "Multilingual Support",
  desc: "Get explanations in English, Hindi, and Tamil — more languages coming soon."
},
{
  icon: Lightbulb,
  title: "AI-Powered Explanations",
  desc: "Understand benefits, documents needed, and how to apply in simple language."
},
{
  icon: Shield,
  title: "Trusted & Secure",
  desc: "Your data stays private. We only use it to find the right schemes for you."
}];


const steps = [
{ num: "1", title: "Enter Your Details", desc: "Fill a simple form with basic information like age, income, and occupation." },
{ num: "2", title: "AI Analyzes Eligibility", desc: "Our AI engine matches your profile against all available government schemes." },
{ num: "3", title: "Get Recommendations", desc: "View your eligible schemes with clear explanations and direct apply links." }];


const LandingPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'english' | 'hindi' | 'tamil'>('english');

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">​🇮🇳</span>
            <span className="text-xl font-bold text-primary">JanVani Bharat</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={setLanguage} />
            <Button onClick={() => navigate("/eligibility")} size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Check Eligibility
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16">
        <div className="relative overflow-hidden gradient-hero">
          <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-primary-foreground space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                JanVani Bharat
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                AI-powered platform to discover government schemes for every citizen. Know your rights, claim your benefits.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/eligibility")}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 gap-2">
                  
                  Start Eligibility Check <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm opacity-80 pt-2">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 8+ Schemes</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> 3 Languages</span>
                <span className="flex items-center gap-1"><FileCheck className="w-4 h-4" /> 100% Free</span>
              </div>
            </div>
            <div className="hidden md:block animate-slide-up">
              <img
                src={heroBanner}
                alt="JanVani Bharat - Diverse Indian citizens discovering government schemes"
                className="rounded-2xl shadow-elevated w-full" />
              
            </div>
          </div>
          {/* wave decoration */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why JanVani Bharat?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bridging the gap between citizens and government welfare schemes using AI.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) =>
            <div
              key={i}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border group">
              
                <div className="w-12 h-12 rounded-lg bg-navy-light flex items-center justify-center mb-4 group-hover:bg-saffron-light transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-navy-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to discover your eligible schemes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) =>
            <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-saffron flex items-center justify-center text-secondary-foreground text-2xl font-bold mx-auto mb-4 shadow-card">
                  {s.num}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate("/eligibility")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 gap-2">
              
              Check Your Eligibility Now <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Schemes by State</h2>
            <p className="text-muted-foreground text-lg">Click on any state to discover available schemes in that region</p>
          </div>
          
          <Tabs defaultValue="map" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="map" className="gap-2">
                <Map className="w-4 h-4" /> Map View
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <Search className="w-4 h-4" /> List View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map">
              <SchemeMap />
            </TabsContent>
            
            <TabsContent value="list">
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-muted-foreground text-center">
                  Select a state from the dropdown or use the map view to explore schemes
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>JanVani Bharat — Built for people       </p>
          <p className="mt-1">Empowering every citizen with AI-driven access to government welfare schemes.</p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot language={language} />
    </div>);

};

export default LandingPage;