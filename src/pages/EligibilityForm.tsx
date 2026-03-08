import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates, type UserData, scoreSchemes, generateMockExplanation } from "@/lib/schemes";

const EligibilityForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    income: "",
    state: "",
    area: "",
    occupation: "",
    category: "",
    language: "english",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData: UserData = {
      name: form.name,
      age: parseInt(form.age),
      gender: form.gender,
      income: parseInt(form.income),
      state: form.state,
      area: form.area as "rural" | "urban",
      occupation: form.occupation,
      category: form.category,
      language: form.language as "english" | "hindi" | "tamil",
    };

    const eligible = scoreSchemes(userData);
    const explanation = generateMockExplanation(userData, eligible);

    // Simulate AI processing time
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    navigate("/results", {
      state: { userData, eligibleSchemes: eligible, aiExplanation: explanation },
    });
  };

  const fieldClass = "bg-card border-border";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="text-xl font-bold text-primary">JanVani Bharat</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Check Your Eligibility</h1>
          <p className="text-muted-foreground">Fill in your details below to discover government schemes you qualify for.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-lg font-medium text-foreground">Analyzing your eligibility...</p>
            <p className="text-muted-foreground text-sm">Our AI is matching your profile with government schemes</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8 space-y-5 animate-fade-in">
            {/* Language */}
            <div>
              <Label className="text-foreground font-medium">Preferred Language / भाषा / மொழி</Label>
              <Select value={form.language} onValueChange={(v) => update("language", v)}>
                <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div>
              <Label className="text-foreground font-medium">Full Name</Label>
              <Input className={fieldClass} placeholder="Enter your full name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <Label className="text-foreground font-medium">Age</Label>
                <Input className={fieldClass} type="number" placeholder="e.g. 35" min="1" max="120" value={form.age} onChange={(e) => update("age", e.target.value)} required />
              </div>
              {/* Gender */}
              <div>
                <Label className="text-foreground font-medium">Gender</Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v)} required>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Income */}
            <div>
              <Label className="text-foreground font-medium">Annual Income (₹)</Label>
              <Input className={fieldClass} type="number" placeholder="e.g. 200000" min="0" value={form.income} onChange={(e) => update("income", e.target.value)} required />
            </div>

            {/* State */}
            <div>
              <Label className="text-foreground font-medium">State / Union Territory</Label>
              <Select value={form.state} onValueChange={(v) => update("state", v)} required>
                <SelectTrigger className={fieldClass}><SelectValue placeholder="Select your state" /></SelectTrigger>
                <SelectContent>
                  {indianStates.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Area */}
              <div>
                <Label className="text-foreground font-medium">Area</Label>
                <Select value={form.area} onValueChange={(v) => update("area", v)} required>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Category */}
              <div>
                <Label className="text-foreground font-medium">Category</Label>
                <Select value={form.category} onValueChange={(v) => update("category", v)} required>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Occupation */}
            <div>
              <Label className="text-foreground font-medium">Occupation</Label>
              <Select value={form.occupation} onValueChange={(v) => update("occupation", v)} required>
                <SelectTrigger className={fieldClass}><SelectValue placeholder="Select your occupation" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="labourer">Labourer / Daily Wage</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="salaried">Salaried Employee</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg gap-2 mt-4"
            >
              Check Eligibility <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EligibilityForm;
