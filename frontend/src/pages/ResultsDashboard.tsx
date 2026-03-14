import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, RotateCcw, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Scheme, UserData } from "@/lib/schemes";
import { t } from "@/lib/translations";

const ResultsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, eligibleSchemes, aiExplanation } = (location.state || {}) as {
    userData?: UserData;
    eligibleSchemes?: Scheme[];
    aiExplanation?: string;
  };

  if (!userData || !eligibleSchemes) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">No results found. Please check your eligibility first.</p>
          <Button onClick={() => navigate("/eligibility")} className="bg-primary text-primary-foreground">
            Go to Eligibility Check
          </Button>
        </div>
      </div>
    );
  }

  const tr = t(userData.language);

  const getSchemeName = (s: Scheme) => {
    if (userData.language === "hindi" && s.nameHi) return s.nameHi;
    if (userData.language === "tamil" && s.nameTa) return s.nameTa;
    return s.name;
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src="/favicon.ico" alt="logo" className="w-7 h-7 rounded-sm" />
            <span className="text-xl font-bold text-primary">JanVani Bharat</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/eligibility")} className="gap-2 border-border text-foreground">
            <RotateCcw className="w-4 h-4" /> {tr.checkAgain}
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Summary */}
        <div className="gradient-hero rounded-xl p-6 md:p-8 text-primary-foreground mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {eligibleSchemes.length > 0
              ? tr.schemesFound(eligibleSchemes.length, userData.name)
              : `Results for ${userData.name}`}
          </h1>
          <p className="opacity-90">
            {userData.age} {userData.language === 'hindi' ? 'वर्ष' : userData.language === 'tamil' ? 'வயது' : 'years'} •{' '}
            {userData.occupation} • ₹{userData.income.toLocaleString()} •{' '}
            {userData.state} • {tr.rural === 'Rural' ? userData.area : userData.area === 'rural' ? tr.rural : tr.urban} • {userData.category}
          </p>
        </div>

        {/* Scheme Cards */}
        {eligibleSchemes.length > 0 ? (
          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> {tr.eligibleSchemes}
            </h2>
            <div className="grid gap-4">
              {eligibleSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-card rounded-xl border border-border p-5 md:p-6 shadow-card hover:shadow-elevated transition-shadow animate-fade-in">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{scheme.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1">{getSchemeName(scheme)}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{scheme.description}</p>
                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium text-foreground">💡 {tr.benefits}: {scheme.benefits}</p>
                      </div>
                      <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                        {tr.applyNow} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center mb-10 animate-fade-in">
            <Info className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <p className="text-foreground font-medium text-lg">{tr.noSchemes}</p>
            <p className="text-muted-foreground text-sm mt-1">{tr.noSchemesHint}</p>
          </div>
        )}

        {/* AI Explanation */}
        {aiExplanation && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <span className="text-lg">🤖</span> {tr.aiExplanation}
            </h2>
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line leading-relaxed">
                {aiExplanation}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 py-8 border-t border-border">
          <p className="text-muted-foreground text-sm mb-4">🇮🇳 {tr.footerText}</p>
          <Button onClick={() => navigate("/eligibility")} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
            <RotateCcw className="w-4 h-4" /> {tr.checkAnother}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
