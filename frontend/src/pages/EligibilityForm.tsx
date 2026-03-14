import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageSelector } from "@/components/LanguageSelector";
import { indianStates, type UserData, scoreSchemes, generateMockExplanation } from "@/lib/schemes";
import { t, type Language } from "@/lib/translations";

const VALID_LANGS: Language[] = ['english','hindi','tamil','telugu','bengali','marathi','gujarati','kannada'];

const EligibilityForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlLang = searchParams.get('lang') as Language | null;
  const initLang: Language = urlLang && VALID_LANGS.includes(urlLang) ? urlLang : 'english';

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", age: "", gender: "", income: "",
    state: "", area: "", occupation: "", category: "",
    language: initLang,
  });

  const tr = t(form.language);
  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userData: UserData = {
      name: form.name, age: parseInt(form.age), gender: form.gender,
      income: parseInt(form.income), state: form.state,
      area: form.area as "rural" | "urban", occupation: form.occupation,
      category: form.category, language: form.language,
    };
    const eligible = scoreSchemes(userData);
    const explanation = generateMockExplanation(userData, eligible);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate("/results", { state: { userData, eligibleSchemes: eligible, aiExplanation: explanation } });
  };

  const fc = "bg-card border-border";

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src="/favicon.ico" alt="logo" className="w-7 h-7 rounded-sm" />
            <span className="text-xl font-bold text-primary">JanVani Bharat</span>
          </div>
          <LanguageSelector value={form.language} onChange={(v) => update("language", v)} />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{tr.formTitle}</h1>
          <p className="text-muted-foreground">{tr.formSubtitle}</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-lg font-medium text-foreground">{tr.analyzing}</p>
            <p className="text-muted-foreground text-sm">{tr.analyzingSubtitle}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8 space-y-5 animate-fade-in">

            {/* Name */}
            <div>
              <Label className="text-foreground font-medium">{tr.fullName}</Label>
              <Input className={fc} placeholder={tr.namePlaceholder} value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground font-medium">{tr.age}</Label>
                <Input className={fc} type="number" placeholder="e.g. 35" min="1" max="120" value={form.age} onChange={(e) => update("age", e.target.value)} required />
              </div>
              <div>
                <Label className="text-foreground font-medium">{tr.gender}</Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v)} required>
                  <SelectTrigger className={fc}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{tr.male}</SelectItem>
                    <SelectItem value="female">{tr.female}</SelectItem>
                    <SelectItem value="other">{tr.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-foreground font-medium">{tr.income}</Label>
              <Input className={fc} type="number" placeholder="e.g. 200000" min="0" value={form.income} onChange={(e) => update("income", e.target.value)} required />
            </div>

            <div>
              <Label className="text-foreground font-medium">{tr.state}</Label>
              <Select value={form.state} onValueChange={(v) => update("state", v)} required>
                <SelectTrigger className={fc}><SelectValue placeholder={tr.selectState} /></SelectTrigger>
                <SelectContent>
                  {indianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground font-medium">{tr.area}</Label>
                <Select value={form.area} onValueChange={(v) => update("area", v)} required>
                  <SelectTrigger className={fc}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rural">{tr.rural}</SelectItem>
                    <SelectItem value="urban">{tr.urban}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground font-medium">{tr.category}</Label>
                <Select value={form.category} onValueChange={(v) => update("category", v)} required>
                  <SelectTrigger className={fc}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-foreground font-medium">{tr.occupation}</Label>
              <Select value={form.occupation} onValueChange={(v) => update("occupation", v)} required>
                <SelectTrigger className={fc}><SelectValue placeholder={tr.selectOccupation} /></SelectTrigger>
                <SelectContent>
                  {Object.entries(tr.occupations).map(([val, label]) => (
                    <SelectItem key={val} value={val}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg gap-2 mt-4">
              {tr.checkBtn} <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EligibilityForm;
