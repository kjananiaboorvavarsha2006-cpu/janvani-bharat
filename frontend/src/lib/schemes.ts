export interface UserData {
  name: string;
  age: number;
  gender: string;
  income: number;
  state: string;
  area: "rural" | "urban";
  occupation: string;
  category: string;
  language: "english" | "hindi" | "tamil" | "telugu" | "bengali" | "marathi" | "gujarati" | "kannada";
}

export interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  nameTa?: string;
  description: string;
  benefits: string;
  icon: string;
  applyLink: string;
  eligibilityCriteria: string;
}

const schemes: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    nameTa: "பிரதமர் கிசான் சம்மான் நிதி",
    description: "Income support of ₹6,000 per year to small and marginal farmer families.",
    benefits: "₹6,000/year in 3 installments of ₹2,000 directly to bank account",
    icon: "🌾",
    applyLink: "https://pmkisan.gov.in",
    eligibilityCriteria: "Farmer with income ≤ ₹2 lakh/year",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PMJAY)",
    nameHi: "आयुष्मान भारत (पीएमजेएवाय)",
    nameTa: "ஆயுஷ்மான் பாரத் (PMJAY)",
    description: "Health insurance cover of ₹5 lakh per family per year.",
    benefits: "₹5 lakh cashless health coverage per family per year",
    icon: "🏥",
    applyLink: "https://pmjay.gov.in",
    eligibilityCriteria: "Income ≤ ₹1.8 lakh, rural or SC/ST/OBC",
  },
  {
    id: "pm-awas",
    name: "PM Awas Yojana",
    nameHi: "पीएम आवास योजना",
    nameTa: "பிரதமர் ஆவாஸ் யோஜனா",
    description: "Financial assistance for construction of pucca houses for eligible families.",
    benefits: "Subsidy up to ₹2.67 lakh for house construction",
    icon: "🏠",
    applyLink: "https://pmaymis.gov.in",
    eligibilityCriteria: "Income ≤ ₹3 lakh, rural area or SC/ST",
  },
  {
    id: "startup-india",
    name: "Startup India",
    nameHi: "स्टार्टअप इंडिया",
    nameTa: "ஸ்டார்ட்அப் இந்தியா",
    description: "Support and incentives for startups including tax benefits and easier compliance.",
    benefits: "3-year tax exemption, patent fee 80% reduction, SIDBI fund access",
    icon: "🚀",
    applyLink: "https://www.startupindia.gov.in",
    eligibilityCriteria: "Business/self-employed, age 18–45",
  },
  {
    id: "skill-india",
    name: "Skill India (PMKVY)",
    nameHi: "स्किल इंडिया (पीएमकेवीवाय)",
    nameTa: "ஸ்கில் இந்தியா (PMKVY)",
    description: "Free skill training and certification to enable youth to earn a livelihood.",
    benefits: "Free training + ₹8,000 reward on certification + placement assistance",
    icon: "🎓",
    applyLink: "https://www.pmkvyofficial.org",
    eligibilityCriteria: "Age 15–35, student/unemployed/labourer, income ≤ ₹2.5 lakh",
  },
  {
    id: "pm-mudra",
    name: "PM Mudra Loan Yojana",
    nameHi: "पीएम मुद्रा लोन योजना",
    nameTa: "பிரதமர் முத்ரா கடன் யோஜனா",
    description: "Collateral-free loans up to ₹10 lakh for small businesses and entrepreneurs.",
    benefits: "Shishu ₹50K / Kishore ₹5L / Tarun ₹10L — no collateral required",
    icon: "💰",
    applyLink: "https://www.mudra.org.in",
    eligibilityCriteria: "Business/self-employed/farmer, income ≤ ₹10 lakh",
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala Yojana",
    nameHi: "पीएम उज्ज्वला योजना",
    nameTa: "பிரதமர் உஜ்வலா யோஜனா",
    description: "Free LPG connections to women from BPL households.",
    benefits: "Free LPG connection + first refill + stove free",
    icon: "🔥",
    applyLink: "https://www.pmujjwalayojana.com",
    eligibilityCriteria: "Female, income ≤ ₹1.5 lakh, rural area",
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    nameHi: "सुकन्या समृद्धि योजना",
    nameTa: "சுகன்யா சம்ரிதி யோஜனா",
    description: "Savings scheme for the girl child with attractive interest rates and tax benefits.",
    benefits: "~8.2% interest p.a., tax-free maturity at age 21",
    icon: "👧",
    applyLink: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    eligibilityCriteria: "Parent aged 18–50, income ≤ ₹5 lakh",
  },
  {
    id: "jan-dhan",
    name: "PM Jan Dhan Yojana",
    nameHi: "पीएम जन धन योजना",
    nameTa: "பிரதமர் ஜன் தன் யோஜனா",
    description: "Zero-balance bank accounts with insurance and overdraft facility.",
    benefits: "₹2 lakh accident insurance + ₹10,000 overdraft facility",
    icon: "🏦",
    applyLink: "https://pmjdy.gov.in",
    eligibilityCriteria: "Age 18+, income ≤ ₹1 lakh or labourer/farmer",
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana",
    nameHi: "अटल पेंशन योजना",
    nameTa: "அடல் பென்ஷன் யோஜனா",
    description: "Guaranteed pension of ₹1,000–5,000/month after age 60.",
    benefits: "Guaranteed monthly pension ₹1K–₹5K after retirement",
    icon: "👴",
    applyLink: "https://npscra.nsdl.co.in",
    eligibilityCriteria: "Age 18–40, not a government employee, income ≤ ₹5 lakh",
  },
  {
    id: "pm-fasal-bima",
    name: "PM Fasal Bima Yojana",
    nameHi: "पीएम फसल बीमा योजना",
    nameTa: "பிரதமர் பயிர் காப்பீட்டு திட்டம்",
    description: "Crop insurance to protect farmers from natural calamities.",
    benefits: "Compensation for crop loss due to floods, drought, pests",
    icon: "🌧️",
    applyLink: "https://pmfby.gov.in",
    eligibilityCriteria: "Farmer occupation only",
  },
  {
    id: "kisan-credit",
    name: "Kisan Credit Card (KCC)",
    nameHi: "किसान क्रेडिट कार्ड",
    nameTa: "கிசான் கிரெடிட் கார்டு",
    description: "Short-term credit for farmers at subsidized interest rates.",
    benefits: "Credit up to ₹3 lakh at 4% interest rate",
    icon: "💳",
    applyLink: "https://www.nabard.org",
    eligibilityCriteria: "Farmer occupation only",
  },
  {
    id: "e-shram",
    name: "e-Shram Card",
    nameHi: "ई-श्रम कार्ड",
    nameTa: "ஈ-ஷ்ரம் கார்டு",
    description: "Registration for unorganized workers with social security benefits.",
    benefits: "₹2 lakh accident insurance + access to welfare schemes",
    icon: "👷",
    applyLink: "https://eshram.gov.in",
    eligibilityCriteria: "Labourer/farmer/self-employed, income ≤ ₹2.5 lakh",
  },
  {
    id: "stand-up-india",
    name: "Stand Up India",
    nameHi: "स्टैंड अप इंडिया",
    nameTa: "ஸ்டாண்ட் அப் இந்தியா",
    description: "Bank loans for SC/ST and women entrepreneurs.",
    benefits: "₹10 lakh to ₹1 crore loan for SC/ST/women entrepreneurs",
    icon: "💼",
    applyLink: "https://www.standupmitra.in",
    eligibilityCriteria: "SC/ST or female, business/self-employed",
  },
  {
    id: "national-scholarship",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    nameTa: "தேசிய உதவித்தொகை போர்டல்",
    description: "Central scholarships for students from minority/SC/ST/OBC communities.",
    benefits: "Scholarships from ₹1,000 to ₹20,000/year",
    icon: "📚",
    applyLink: "https://scholarships.gov.in",
    eligibilityCriteria: "Student, income ≤ ₹2.5 lakh, SC/ST/OBC/minority",
  },
  {
    id: "beti-bachao",
    name: "Beti Bachao Beti Padhao",
    nameHi: "बेटी बचाओ बेटी पढ़ाओ",
    nameTa: "பேட்டி பச்சாவோ பேட்டி படாவோ",
    description: "Scheme to improve welfare and education of the girl child.",
    benefits: "Financial incentives + awareness programs for girl education",
    icon: "🎀",
    applyLink: "https://wcd.nic.in/bbbp-schemes",
    eligibilityCriteria: "Parent aged 18–45 with girl child",
  },
  {
    id: "jeevan-jyoti",
    name: "PM Jeevan Jyoti Bima",
    nameHi: "पीएम जीवन ज्योति बीमा",
    nameTa: "பிரதமர் ஜீவன் ஜ்யோதி காப்பீடு",
    description: "Life insurance cover at just ₹436/year for ages 18–50.",
    benefits: "₹2 lakh life cover at ₹436/year premium",
    icon: "🛡️",
    applyLink: "https://jansuraksha.gov.in",
    eligibilityCriteria: "Age 18–50, income ≤ ₹5 lakh",
  },
  {
    id: "suraksha-bima",
    name: "PM Suraksha Bima Yojana",
    nameHi: "पीएम सुरक्षा बीमा योजना",
    nameTa: "பிரதமர் சுரக்ஷா பீமா யோஜனா",
    description: "Accidental death and disability insurance at just ₹20/year.",
    benefits: "₹2 lakh accidental death cover at ₹20/year",
    icon: "⛑️",
    applyLink: "https://jansuraksha.gov.in",
    eligibilityCriteria: "Age 18–70, income ≤ ₹5 lakh",
  },
];

export function scoreSchemes(userData: UserData): Scheme[] {
  const eligible: Scheme[] = [];
  const { age, gender, income, area, occupation, category } = userData;
  const isRural = area === "rural";
  const isFarmer = occupation === "farmer";
  const isBusiness = occupation === "business" || occupation === "self-employed";
  const isStudent = occupation === "student";
  const isLabourer = occupation === "labourer";
  const isUnemployed = occupation === "unemployed";
  const isScSt = category === "SC" || category === "ST";
  const isScStObc = isScSt || category === "OBC";
  const isFemale = gender === "female";

  for (const scheme of schemes) {
    let match = false;

    switch (scheme.id) {
      case "pm-kisan":
        // Farmer + income ≤ 2L
        match = isFarmer && income <= 200000;
        break;

      case "ayushman-bharat":
        // Income ≤ 1.8L AND (rural OR SC/ST/OBC)
        match = income <= 180000 && (isRural || isScStObc);
        break;

      case "pm-awas":
        // Income ≤ 3L AND (rural OR SC/ST)
        match = income <= 300000 && (isRural || isScSt);
        break;

      case "startup-india":
        // Business/self-employed, age 18–45
        match = isBusiness && age >= 18 && age <= 45;
        break;

      case "skill-india":
        // Age 15–35, student/unemployed/labourer, income ≤ 2.5L
        match = age >= 15 && age <= 35 &&
          (isStudent || isUnemployed || isLabourer) &&
          income <= 250000;
        break;

      case "pm-mudra":
        // Business/self-employed/farmer, income ≤ 10L
        match = (isBusiness || isFarmer) && income <= 1000000;
        break;

      case "pm-ujjwala":
        // Female + income ≤ 1.5L + rural
        match = isFemale && income <= 150000 && isRural;
        break;

      case "sukanya-samriddhi":
        // Parent aged 18–50, income ≤ 5L (for girl child account)
        match = age >= 18 && age <= 50 && income <= 500000;
        break;

      case "jan-dhan":
        // Age 18+, low income or labourer/farmer
        match = age >= 18 && (income <= 100000 || isLabourer || isFarmer);
        break;

      case "atal-pension":
        // Age 18–40, not govt employee, income ≤ 5L
        match = age >= 18 && age <= 40 &&
          occupation !== "employed" &&
          income <= 500000;
        break;

      case "pm-fasal-bima":
        // Farmer only
        match = isFarmer;
        break;

      case "kisan-credit":
        // Farmer only
        match = isFarmer;
        break;

      case "e-shram":
        // Unorganized worker: labourer/farmer/self-employed, income ≤ 2.5L
        match = (isLabourer || isFarmer || occupation === "self-employed") &&
          income <= 250000;
        break;

      case "stand-up-india":
        // SC/ST or female + business/self-employed
        match = (isScSt || isFemale) && isBusiness;
        break;

      case "national-scholarship":
        // Student + income ≤ 2.5L + SC/ST/OBC/minority
        match = isStudent && income <= 250000 && isScStObc;
        break;

      case "beti-bachao":
        // Parent aged 18–45
        match = age >= 18 && age <= 45;
        break;

      case "jeevan-jyoti":
        // Age 18–50, income ≤ 5L
        match = age >= 18 && age <= 50 && income <= 500000;
        break;

      case "suraksha-bima":
        // Age 18–70, income ≤ 5L
        match = age >= 18 && age <= 70 && income <= 500000;
        break;
    }

    if (match) eligible.push(scheme);
  }

  return eligible;
}

export function generateMockExplanation(userData: UserData, eligibleSchemes: Scheme[]): string {
  const { name, age, income, occupation, category, area, language } = userData;

  if (eligibleSchemes.length === 0) {
    const msgs: Partial<Record<string, string>> = {
      english: `Dear ${name}, based on your profile (Age: ${age}, Income: ₹${income.toLocaleString()}, Occupation: ${occupation}), no matching government schemes were found at this time. We recommend visiting your nearest Common Service Centre (CSC) for personalized assistance.`,
      hindi: `प्रिय ${name}, आपकी जानकारी (आयु: ${age}, आय: ₹${income.toLocaleString()}, व्यवसाय: ${occupation}) के आधार पर इस समय कोई उपयुक्त सरकारी योजना नहीं मिली। व्यक्तिगत सहायता के लिए अपने निकटतम CSC पर जाएं।`,
      tamil: `அன்பார்ந்த ${name}, உங்கள் விவரங்களின் (வயது: ${age}, வருமானம்: ₹${income.toLocaleString()}, தொழில்: ${occupation}) அடிப்படையில் தற்போது பொருத்தமான திட்டங்கள் கிடைக்கவில்லை. உங்கள் அருகிலுள்ள CSC-ஐ அணுகவும்.`,
    };
    return msgs[language] ?? msgs.english!;
  }

  const schemeList = eligibleSchemes.map(s => `• ${s.name}: ${s.benefits}`).join('\n');

  const msgs: Partial<Record<string, string>> = {
    english: `Dear ${name},\n\nBased on your profile:\n• Age: ${age} years\n• Annual Income: ₹${income.toLocaleString()}\n• Occupation: ${occupation}\n• Category: ${category}\n• Area: ${area}\n\nYou are eligible for ${eligibleSchemes.length} government scheme(s):\n\n${schemeList}\n\nWe recommend applying at the earliest to avail these benefits. Visit the respective websites or your nearest CSC for assistance.`,
    hindi: `प्रिय ${name},\n\nआपकी जानकारी के आधार पर:\n• आयु: ${age} वर्ष\n• वार्षिक आय: ₹${income.toLocaleString()}\n• व्यवसाय: ${occupation}\n• वर्ग: ${category}\n• क्षेत्र: ${area}\n\nआप ${eligibleSchemes.length} सरकारी योजना(ओं) के लिए पात्र हैं:\n\n${schemeList}\n\nजल्द से जल्द आवेदन करें। सहायता के लिए संबंधित वेबसाइट या निकटतम CSC पर जाएं।`,
    tamil: `அன்பார்ந்த ${name},\n\nஉங்கள் விவரங்களின் அடிப்படையில்:\n• வயது: ${age} ஆண்டுகள்\n• வருடாந்திர வருமானம்: ₹${income.toLocaleString()}\n• தொழில்: ${occupation}\n• பிரிவு: ${category}\n• பகுதி: ${area}\n\nநீங்கள் ${eligibleSchemes.length} அரசு திட்டங்களுக்கு தகுதியானவர்:\n\n${schemeList}\n\nவிரைவில் விண்ணப்பிக்கவும். உதவிக்கு சம்பந்தப்பட்ட இணையதளங்கள் அல்லது CSC-ஐ அணுகவும்.`,
  };

  return msgs[language] ?? msgs.english!;
}

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
  "Chandigarh", "Andaman & Nicobar Islands", "Dadra & Nagar Haveli and Daman & Diu", "Lakshadweep",
];
