import { useState } from 'react';
import { X, MapPin, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { indianStates } from '@/lib/schemes';

interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  icon: string;
  applyLink: string;
  isStateSpecific?: boolean;
}

const nationalSchemes: Scheme[] = [
  { id: "pm-kisan", name: "PM Kisan Samman Nidhi", description: "₹6,000/year income support to small & marginal farmer families.", benefits: "₹6,000/year in 3 installments directly to bank", icon: "🌾", applyLink: "https://pmkisan.gov.in" },
  { id: "ayushman", name: "Ayushman Bharat (PMJAY)", description: "Health insurance cover of ₹5 lakh per family per year.", benefits: "₹5 lakh cashless health coverage at empaneled hospitals", icon: "🏥", applyLink: "https://pmjay.gov.in" },
  { id: "pm-awas-gramin", name: "PM Awas Yojana – Gramin", description: "Financial aid for rural families to build pucca houses.", benefits: "₹1.2–1.3 lakh for house construction in rural areas", icon: "🏠", applyLink: "https://pmayg.nic.in" },
  { id: "pm-awas-urban", name: "PM Awas Yojana – Urban", description: "Housing subsidy for urban poor and EWS/LIG families.", benefits: "Interest subsidy up to ₹2.67 lakh on home loans", icon: "🏙️", applyLink: "https://pmaymis.gov.in" },
  { id: "skill-india", name: "Skill India (PMKVY 4.0)", description: "Free skill training and industry-recognized certification.", benefits: "Free training + ₹8,000 reward on certification + placement", icon: "🎓", applyLink: "https://www.pmkvyofficial.org" },
  { id: "pm-mudra", name: "PM Mudra Loan Yojana", description: "Collateral-free loans for small businesses and entrepreneurs.", benefits: "Shishu ₹50K / Kishore ₹5L / Tarun ₹10L — no collateral", icon: "💰", applyLink: "https://www.mudra.org.in" },
  { id: "pm-ujjwala", name: "PM Ujjwala Yojana 2.0", description: "Free LPG connections to women from BPL/migrant households.", benefits: "Free LPG connection + first refill + stove free", icon: "🔥", applyLink: "https://www.pmujjwalayojana.com" },
  { id: "sukanya", name: "Sukanya Samriddhi Yojana", description: "High-interest savings scheme for girl child education & marriage.", benefits: "~8.2% interest p.a., tax-free maturity at age 21", icon: "👧", applyLink: "https://www.india.gov.in/sukanya-samriddhi-yojna" },
  { id: "startup-india", name: "Startup India", description: "Tax benefits, easier compliance and funding for startups.", benefits: "3-year tax exemption, patent fee 80% reduction, SIDBI fund", icon: "🚀", applyLink: "https://www.startupindia.gov.in" },
  { id: "jan-dhan", name: "PM Jan Dhan Yojana", description: "Zero-balance bank accounts with insurance and overdraft facility.", benefits: "₹2 lakh accident insurance + ₹10,000 overdraft facility", icon: "🏦", applyLink: "https://pmjdy.gov.in" },
  { id: "jeevan-jyoti", name: "PM Jeevan Jyoti Bima", description: "Life insurance cover at just ₹436/year for ages 18–50.", benefits: "₹2 lakh life cover at ₹436/year premium", icon: "🛡️", applyLink: "https://jansuraksha.gov.in" },
  { id: "suraksha-bima", name: "PM Suraksha Bima Yojana", description: "Accidental death & disability insurance at ₹20/year.", benefits: "₹2 lakh accidental death cover at just ₹20/year", icon: "⛑️", applyLink: "https://jansuraksha.gov.in" },
  { id: "atal-pension", name: "Atal Pension Yojana", description: "Guaranteed pension of ₹1,000–5,000/month after age 60.", benefits: "Guaranteed monthly pension ₹1K–₹5K after retirement", icon: "👴", applyLink: "https://npscra.nsdl.co.in" },
  { id: "nps", name: "National Pension System (NPS)", description: "Voluntary retirement savings scheme with tax benefits.", benefits: "Tax deduction up to ₹2 lakh, market-linked returns", icon: "📈", applyLink: "https://www.npstrust.org.in" },
  { id: "pm-fasal-bima", name: "PM Fasal Bima Yojana", description: "Crop insurance to protect farmers from natural calamities.", benefits: "Compensation for crop loss due to floods, drought, pests", icon: "🌧️", applyLink: "https://pmfby.gov.in" },
  { id: "kisan-credit", name: "Kisan Credit Card (KCC)", description: "Short-term credit for farmers at subsidized interest rates.", benefits: "Credit up to ₹3 lakh at 4% interest rate for farmers", icon: "💳", applyLink: "https://www.nabard.org" },
  { id: "e-shram", name: "e-Shram Card", description: "Registration for unorganized workers with social security benefits.", benefits: "₹2 lakh accident insurance + access to welfare schemes", icon: "👷", applyLink: "https://eshram.gov.in" },
  { id: "one-nation-ration", name: "One Nation One Ration Card", description: "Portability of ration card across all states in India.", benefits: "Access subsidized food grains anywhere in India", icon: "🍚", applyLink: "https://nfsa.gov.in" },
  { id: "pm-garib-kalyan", name: "PM Garib Kalyan Anna Yojana", description: "5 kg free food grains per person per month to 80 crore people.", benefits: "5 kg free wheat/rice per person per month", icon: "🌽", applyLink: "https://dfpd.gov.in" },
  { id: "stand-up-india", name: "Stand Up India", description: "Bank loans for SC/ST and women entrepreneurs.", benefits: "₹10 lakh to ₹1 crore loan for SC/ST/women entrepreneurs", icon: "💼", applyLink: "https://www.standupmitra.in" },
  { id: "national-scholarship", name: "National Scholarship Portal", description: "Central scholarships for students from minority/SC/ST/OBC.", benefits: "Scholarships from ₹1,000 to ₹20,000/year for students", icon: "📚", applyLink: "https://scholarships.gov.in" },
  { id: "pm-poshan", name: "PM POSHAN (Mid-Day Meal)", description: "Free nutritious meals to government school children.", benefits: "Free hot cooked meal daily for school children", icon: "🍱", applyLink: "https://pmposhan.education.gov.in" },
  { id: "beti-bachao", name: "Beti Bachao Beti Padhao", description: "Scheme to improve welfare and education of girl child.", benefits: "Financial incentives + awareness programs for girl education", icon: "🎀", applyLink: "https://wcd.nic.in/bbbp-schemes" },
  { id: "deen-dayal-upadhyaya", name: "DDU-GKY (Rural Jobs)", description: "Placement-linked skill training for rural youth.", benefits: "Free training + guaranteed job placement for rural youth", icon: "🏭", applyLink: "https://ddugky.gov.in" },
];

const stateSpecificSchemes: Record<string, Scheme[]> = {
  "Tamil Nadu": [
    { id: "tn-kalaignar", name: "Kalaignar Magalir Urimai Thittam", description: "₹1,000/month to women heads of families.", benefits: "₹1,000/month direct bank transfer", icon: "👩", applyLink: "https://www.tn.gov.in", isStateSpecific: true },
    { id: "tn-breakfast", name: "CM's Breakfast Scheme", description: "Free breakfast for government school students.", benefits: "Free nutritious breakfast every school day", icon: "🍱", applyLink: "https://www.tn.gov.in", isStateSpecific: true },
    { id: "tn-moovalur", name: "Moovalur Ramamirtham Scheme", description: "₹1,000/month + ₹4,000 gold for girls completing education.", benefits: "Monthly stipend + gold at graduation", icon: "🥇", applyLink: "https://www.tn.gov.in", isStateSpecific: true },
    { id: "tn-amma-water", name: "Amma Drinking Water Scheme", description: "Free drinking water supply to rural households.", benefits: "Free piped drinking water connection", icon: "💧", applyLink: "https://www.tn.gov.in", isStateSpecific: true },
  ],
  "Maharashtra": [
    { id: "mh-ladki-bahin", name: "Mukhyamantri Ladki Bahin Yojana", description: "₹1,500/month financial aid to women aged 21–65.", benefits: "₹1,500/month direct benefit transfer", icon: "👩", applyLink: "https://ladakibahin.maharashtra.gov.in", isStateSpecific: true },
    { id: "mh-shetkari", name: "Shetkari Sanman Yojana", description: "Loan waiver for farmers in Maharashtra.", benefits: "Loan waiver up to ₹2 lakh for farmers", icon: "🌾", applyLink: "https://www.maharashtra.gov.in", isStateSpecific: true },
    { id: "mh-mahatma-jyotirao", name: "Mahatma Jyotirao Phule Jan Arogya", description: "Health insurance for BPL families in Maharashtra.", benefits: "₹5 lakh health coverage for BPL families", icon: "🏥", applyLink: "https://www.jeevandayee.gov.in", isStateSpecific: true },
  ],
  "Uttar Pradesh": [
    { id: "up-kanya", name: "Kanya Sumangala Yojana", description: "Financial support for girl child education.", benefits: "₹15,000 in 6 installments per girl child", icon: "👧", applyLink: "https://mksy.up.gov.in", isStateSpecific: true },
    { id: "up-laptop", name: "UP Free Laptop Scheme", description: "Free laptops to meritorious 10th/12th pass students.", benefits: "Free laptop for top-scoring students", icon: "💻", applyLink: "https://www.up.gov.in", isStateSpecific: true },
    { id: "up-pension", name: "UP Old Age Pension Scheme", description: "Monthly pension for senior citizens above 60.", benefits: "₹1,000/month pension for elderly", icon: "👴", applyLink: "https://sspy-up.gov.in", isStateSpecific: true },
  ],
  "Karnataka": [
    { id: "ka-gruha", name: "Gruha Jyothi Scheme", description: "200 units free electricity per month to households.", benefits: "200 units free electricity every month", icon: "💡", applyLink: "https://gruha.karnataka.gov.in", isStateSpecific: true },
    { id: "ka-anna-bhagya", name: "Anna Bhagya Scheme", description: "10 kg free rice per month to BPL families.", benefits: "10 kg free rice per month per family", icon: "🍚", applyLink: "https://ahara.karnataka.gov.in", isStateSpecific: true },
    { id: "ka-shakti", name: "Shakti Free Bus Travel", description: "Free bus travel for all women in KSRTC buses.", benefits: "Free travel on all KSRTC/BMTC buses for women", icon: "🚌", applyLink: "https://www.karnataka.gov.in", isStateSpecific: true },
    { id: "ka-yuva-nidhi", name: "Yuva Nidhi Scheme", description: "Unemployment allowance for educated youth.", benefits: "₹3,000/month for graduates, ₹1,500 for diploma holders", icon: "🎓", applyLink: "https://sevasindhu.karnataka.gov.in", isStateSpecific: true },
  ],
  "Delhi": [
    { id: "dl-free-bus", name: "Free Bus Travel for Women", description: "Free travel in DTC/cluster buses for all women.", benefits: "Free bus travel across all Delhi routes", icon: "🚌", applyLink: "https://delhi.gov.in", isStateSpecific: true },
    { id: "dl-bijli", name: "Delhi Free Electricity (200 Units)", description: "200 units free electricity per month to households.", benefits: "200 units free + 50% subsidy on next 200 units", icon: "⚡", applyLink: "https://delhi.gov.in", isStateSpecific: true },
    { id: "dl-mukhyamantri-tirth", name: "Mukhyamantri Tirth Yatra Yojana", description: "Free pilgrimage for senior citizens of Delhi.", benefits: "Free pilgrimage trip for seniors above 60", icon: "🛕", applyLink: "https://edistrict.delhigovt.nic.in", isStateSpecific: true },
  ],
  "Gujarat": [
    { id: "gj-mahila-utkarsh", name: "Mukhyamantri Mahila Utkarsh Yojana", description: "Interest-free loans to women self-help groups.", benefits: "Interest-free loan up to ₹1 lakh for women SHGs", icon: "👩‍💼", applyLink: "https://www.gujarat.gov.in", isStateSpecific: true },
    { id: "gj-kisan-suryoday", name: "Kisan Suryoday Yojana", description: "3-phase electricity to farmers from 5 AM to 9 PM.", benefits: "Daytime electricity supply for agricultural use", icon: "☀️", applyLink: "https://www.gujarat.gov.in", isStateSpecific: true },
  ],
  "Rajasthan": [
    { id: "rj-chiranjeevi", name: "Chiranjeevi Swasthya Bima Yojana", description: "Health insurance up to ₹25 lakh per family.", benefits: "₹25 lakh health coverage per family per year", icon: "🏥", applyLink: "https://chiranjeevi.rajasthan.gov.in", isStateSpecific: true },
    { id: "rj-indira-rasoi", name: "Indira Rasoi Yojana", description: "Subsidized meals at ₹8 for lunch and ₹12 for dinner.", benefits: "Nutritious meals at ₹8–₹12 across the state", icon: "🍽️", applyLink: "https://indirarasoi.rajasthan.gov.in", isStateSpecific: true },
  ],
  "West Bengal": [
    { id: "wb-lakshmir", name: "Lakshmir Bhandar", description: "Monthly financial support to women heads of families.", benefits: "₹500 (General) / ₹1,000 (SC/ST) per month", icon: "👩", applyLink: "https://wb.gov.in", isStateSpecific: true },
    { id: "wb-kanyashree", name: "Kanyashree Prakalpa", description: "Scholarship for girl students to continue education.", benefits: "₹1,000/year + ₹25,000 one-time grant at age 18", icon: "🎓", applyLink: "https://wbkanyashree.gov.in", isStateSpecific: true },
    { id: "wb-swasthya-sathi", name: "Swasthya Sathi", description: "Health insurance for all families in West Bengal.", benefits: "₹5 lakh cashless health coverage per family", icon: "🏥", applyLink: "https://swasthyasathi.gov.in", isStateSpecific: true },
  ],
  "Kerala": [
    { id: "kl-karunya", name: "Karunya Health Scheme", description: "Financial assistance for serious illnesses.", benefits: "Up to ₹2 lakh for critical illness treatment", icon: "🏥", applyLink: "https://kerala.gov.in", isStateSpecific: true },
    { id: "kl-snehapoorvam", name: "Snehapoorvam Scholarship", description: "Scholarship for children of parents with serious illness.", benefits: "₹300–₹1,000/month scholarship for students", icon: "📚", applyLink: "https://kerala.gov.in", isStateSpecific: true },
  ],
  "Bihar": [
    { id: "br-mukhyamantri", name: "Mukhyamantri Kanya Utthan Yojana", description: "Financial incentive for girl child education.", benefits: "₹50,000 on graduation for girls", icon: "👧", applyLink: "https://medhasoft.bih.nic.in", isStateSpecific: true },
    { id: "br-cycle", name: "Bihar Free Cycle Scheme", description: "Free bicycles for girl students in class 9.", benefits: "Free bicycle for girls enrolling in class 9", icon: "🚲", applyLink: "https://state.bihar.gov.in", isStateSpecific: true },
  ],
  "Andhra Pradesh": [
    { id: "ap-rythu-bharosa", name: "YSR Rythu Bharosa", description: "₹13,500/year investment support to farmers.", benefits: "₹13,500/year to farmer families", icon: "🌾", applyLink: "https://ysrrythubharosa.ap.gov.in", isStateSpecific: true },
    { id: "ap-jagananna-amma-vodi", name: "Jagananna Amma Vodi", description: "₹15,000/year to mothers who send children to school.", benefits: "₹15,000/year for mothers of school-going children", icon: "👩‍👧", applyLink: "https://ammavodi.ap.gov.in", isStateSpecific: true },
  ],
  "Telangana": [
    { id: "tg-rythu-bandhu", name: "Rythu Bandhu Scheme", description: "₹10,000/acre/year investment support to farmers.", benefits: "₹10,000 per acre per year (Rabi + Kharif)", icon: "🌾", applyLink: "https://rythubandhu.telangana.gov.in", isStateSpecific: true },
    { id: "tg-kalyana-lakshmi", name: "Kalyana Lakshmi / Shaadi Mubarak", description: "Financial assistance for marriage of girls from SC/ST/minority.", benefits: "₹1,00,116 financial assistance for marriage", icon: "💍", applyLink: "https://telanganaepass.cgg.gov.in", isStateSpecific: true },
  ],
  "Madhya Pradesh": [
    { id: "mp-ladli-laxmi", name: "Ladli Laxmi Yojana 2.0", description: "Financial support for girl child education and marriage.", benefits: "₹1.43 lakh total benefit from birth to marriage", icon: "👧", applyLink: "https://ladlilaxmi.mp.gov.in", isStateSpecific: true },
    { id: "mp-mukhyamantri-tirth", name: "Mukhyamantri Tirth Darshan Yojana", description: "Free pilgrimage for senior citizens of MP.", benefits: "Free pilgrimage trip for seniors above 60", icon: "🛕", applyLink: "https://www.mp.gov.in", isStateSpecific: true },
  ],
  "Punjab": [
    { id: "pb-atta-dal", name: "Atta Dal Scheme", description: "Subsidized wheat flour and pulses for BPL families.", benefits: "Subsidized atta & dal for BPL card holders", icon: "🌾", applyLink: "https://punjab.gov.in", isStateSpecific: true },
    { id: "pb-ashirwad", name: "Ashirwad Scheme", description: "₹51,000 financial assistance for marriage of girls.", benefits: "₹51,000 grant for marriage of girls from poor families", icon: "💍", applyLink: "https://punjab.gov.in", isStateSpecific: true },
  ],
  "Haryana": [
    { id: "hr-ladli", name: "Ladli Social Security Allowance", description: "₹2,000/month to families with only girl children.", benefits: "₹2,000/month for families with no male child", icon: "👧", applyLink: "https://haryana.gov.in", isStateSpecific: true },
    { id: "hr-mukhyamantri-vivah", name: "Mukhyamantri Vivah Shagun Yojana", description: "Financial gift for marriage of girls from SC/BPL families.", benefits: "₹71,000 for SC/BPL girls' marriage", icon: "💍", applyLink: "https://haryana.gov.in", isStateSpecific: true },
  ],
  "Odisha": [
    { id: "od-biju-swasthya", name: "Biju Swasthya Kalyan Yojana", description: "Health coverage up to ₹5 lakh for all families.", benefits: "₹5 lakh (₹10 lakh for women) health coverage", icon: "🏥", applyLink: "https://bsky.odisha.gov.in", isStateSpecific: true },
    { id: "od-kalia", name: "KALIA Scheme", description: "Financial support to small farmers and landless labourers.", benefits: "₹10,000/year to small farmers + ₹12,500 to landless", icon: "🌾", applyLink: "https://kalia.odisha.gov.in", isStateSpecific: true },
  ],
  "Assam": [
    { id: "as-orunodoi", name: "Orunodoi Scheme", description: "₹1,250/month financial assistance to poor families.", benefits: "₹1,250/month direct bank transfer to women", icon: "👩", applyLink: "https://orunodoi.assam.gov.in", isStateSpecific: true },
  ],
  "Himachal Pradesh": [
    { id: "hp-sahara", name: "Sahara Scheme", description: "₹3,000/month for patients with serious chronic diseases.", benefits: "₹3,000/month for chronic illness patients", icon: "🏥", applyLink: "https://himachal.nic.in", isStateSpecific: true },
  ],
};

const stateColors = [
  "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800",
  "bg-green-50 hover:bg-green-100 border-green-200 text-green-800",
  "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-800",
  "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800",
  "bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800",
  "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800",
  "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800",
  "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800",
];

interface SchemeMapProps {
  onStateSelect?: (state: string) => void;
}

export const SchemeMap = ({ onStateSelect }: SchemeMapProps) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    if (onStateSelect) onStateSelect(state);
  };

  const stateExtra = selectedState ? (stateSpecificSchemes[selectedState] || []) : [];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span>Click any state or UT to see available schemes</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {indianStates.map((state, i) => (
            <button
              key={state}
              onClick={() => handleStateClick(state)}
              className={`
                px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer
                ${stateColors[i % stateColors.length]}
                ${selectedState === state ? 'ring-2 ring-primary ring-offset-1 scale-105 font-bold' : ''}
              `}
            >
              {state}
              {stateSpecificSchemes[state] && <span className="ml-1 text-yellow-600">★</span>}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">★ States with exclusive state-specific schemes</p>
      </div>

      {selectedState && (
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> {selectedState}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {stateExtra.length > 0
                  ? `${stateExtra.length} state-specific + ${nationalSchemes.length} national schemes`
                  : `${nationalSchemes.length} national schemes available`}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedState(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {stateExtra.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-1.5 inline-flex items-center gap-1 mb-3">
                <Star className="w-3 h-3" /> Exclusive to {selectedState}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {stateExtra.map((scheme) => (
                  <div key={scheme.id} className="flex items-start gap-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <span className="text-2xl flex-shrink-0">{scheme.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{scheme.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{scheme.description}</p>
                      <p className="text-xs font-medium text-green-700 mt-1">💡 {scheme.benefits}</p>
                      <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5 font-medium">
                        Apply Now <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">National Schemes (available in all states)</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {nationalSchemes.map((scheme) => (
              <div key={scheme.id} className="flex items-start gap-3 bg-muted/50 rounded-lg p-3 border border-border">
                <span className="text-2xl flex-shrink-0">{scheme.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{scheme.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{scheme.description}</p>
                  <p className="text-xs font-medium text-green-700 mt-1">💡 {scheme.benefits}</p>
                  <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5 font-medium">
                    Apply Now <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
