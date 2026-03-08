export interface UserData {
  name: string;
  age: number;
  gender: string;
  income: number;
  state: string;
  area: "rural" | "urban";
  occupation: string;
  category: string;
  language: "english" | "hindi" | "tamil";
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
    description: "Income support of ₹6,000 per year to farmer families for purchasing farm inputs.",
    benefits: "₹6,000 per year in 3 installments of ₹2,000 each, directly to bank account",
    icon: "🌾",
    applyLink: "https://pmkisan.gov.in",
    eligibilityCriteria: "Small and marginal farmer families",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PMJAY)",
    nameHi: "आयुष्मान भारत (पीएमजेएवाय)",
    nameTa: "ஆயுஷ்மான் பாரத் (PMJAY)",
    description: "Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.",
    benefits: "₹5 lakh health coverage per family per year, cashless treatment at empaneled hospitals",
    icon: "🏥",
    applyLink: "https://pmjay.gov.in",
    eligibilityCriteria: "Economically weaker families",
  },
  {
    id: "pm-awas",
    name: "PM Awas Yojana",
    nameHi: "पीएम आवास योजना",
    nameTa: "பிரதமர் ஆவாஸ் யோஜனா",
    description: "Financial assistance for construction of pucca houses for eligible families.",
    benefits: "Subsidy up to ₹2.67 lakh for house construction, interest subsidy on home loans",
    icon: "🏠",
    applyLink: "https://pmaymis.gov.in",
    eligibilityCriteria: "Homeless or living in kutcha/dilapidated houses",
  },
  {
    id: "startup-india",
    name: "Startup India",
    nameHi: "स्टार्टअप इंडिया",
    nameTa: "ஸ்டார்ட்அப் இந்தியா",
    description: "Support and incentives for startups including tax benefits and easier compliance.",
    benefits: "Tax exemption for 3 years, self-certification for compliance, patent fee reduction",
    icon: "🚀",
    applyLink: "https://www.startupindia.gov.in",
    eligibilityCriteria: "Entrepreneurs and startup founders",
  },
  {
    id: "skill-india",
    name: "Skill India (PMKVY)",
    nameHi: "स्किल इंडिया (पीएमकेवीवाय)",
    nameTa: "ஸ்கில் இந்தியா (PMKVY)",
    description: "Free skill training and certification to enable youth to earn a livelihood.",
    benefits: "Free training, certification, placement assistance, ₹8,000 reward on certification",
    icon: "🎓",
    applyLink: "https://www.pmkvyofficial.org",
    eligibilityCriteria: "Youth seeking skill development",
  },
  {
    id: "pm-mudra",
    name: "PM Mudra Loan Yojana",
    nameHi: "पीएम मुद्रा लोन योजना",
    nameTa: "பிரதமர் முத்ரா கடன் யோஜனா",
    description: "Collateral-free loans up to ₹10 lakh for small businesses and entrepreneurs.",
    benefits: "Loans up to ₹10 lakh without collateral: Shishu (₹50K), Kishore (₹5L), Tarun (₹10L)",
    icon: "💰",
    applyLink: "https://www.mudra.org.in",
    eligibilityCriteria: "Small business owners and entrepreneurs",
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala Yojana",
    nameHi: "पीएम उज्ज्वला योजना",
    nameTa: "பிரதமர் உஜ்வலா யோஜனா",
    description: "Free LPG connections to women from BPL households.",
    benefits: "Free LPG connection, ₹1,600 financial support, first refill and stove free",
    icon: "🔥",
    applyLink: "https://www.pmujjwalayojana.com",
    eligibilityCriteria: "Women from BPL households",
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    nameHi: "सुकन्या समृद्धि योजना",
    nameTa: "சுகன்யா சம்ரிதி யோஜனா",
    description: "Savings scheme for the girl child with attractive interest rates and tax benefits.",
    benefits: "High interest rate (~8%), tax-free returns, maturity at age 21",
    icon: "👧",
    applyLink: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    eligibilityCriteria: "Parents of girl children below 10 years",
  },
];

export function scoreSchemes(userData: UserData): Scheme[] {
  const eligible: Scheme[] = [];

  for (const scheme of schemes) {
    let match = false;

    switch (scheme.id) {
      case "pm-kisan":
        match = userData.occupation === "farmer" && userData.income <= 600000;
        break;
      case "ayushman-bharat":
        match = userData.income <= 500000;
        break;
      case "pm-awas":
        match = userData.income <= 600000 && (userData.category === "SC" || userData.category === "ST" || userData.category === "OBC" || userData.area === "rural");
        break;
      case "startup-india":
        match = (userData.occupation === "business" || userData.occupation === "self-employed") && userData.age >= 18 && userData.age <= 55;
        break;
      case "skill-india":
        match = userData.age >= 15 && userData.age <= 45 && (userData.occupation === "student" || userData.occupation === "unemployed" || userData.income <= 300000);
        break;
      case "pm-mudra":
        match = (userData.occupation === "business" || userData.occupation === "self-employed" || userData.occupation === "farmer") && userData.income <= 1000000;
        break;
      case "pm-ujjwala":
        match = userData.gender === "female" && userData.income <= 200000 && userData.area === "rural";
        break;
      case "sukanya-samriddhi":
        match = userData.age >= 18 && userData.income <= 800000;
        break;
    }

    if (match) eligible.push(scheme);
  }

  return eligible;
}

export function generateMockExplanation(userData: UserData, eligibleSchemes: Scheme[]): string {
  if (eligibleSchemes.length === 0) {
    const msgs: Record<string, string> = {
      english: `Dear ${userData.name}, based on the information you provided, we could not find any matching government schemes at this time. We recommend checking back later or visiting your nearest Common Service Centre (CSC) for personalized assistance.`,
      hindi: `प्रिय ${userData.name}, आपके द्वारा दी गई जानकारी के आधार पर, हमें इस समय कोई उपयुक्त सरकारी योजना नहीं मिली। हम अनुशंसा करते हैं कि आप बाद में दोबारा जाँच करें या व्यक्तिगत सहायता के लिए अपने निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएँ।`,
      tamil: `அன்பார்ந்த ${userData.name}, நீங்கள் வழங்கிய தகவலின் அடிப்படையில், தற்போது பொருத்தமான அரசு திட்டங்கள் எதுவும் கிடைக்கவில்லை. பின்னர் மீண்டும் சரிபார்க்கவும் அல்லது தனிப்பட்ட உதவிக்கு உங்கள் அருகிலுள்ள பொது சேவை மையத்தை (CSC) அணுகவும்.`,
    };
    return msgs[userData.language] || msgs.english;
  }

  const schemeNames = eligibleSchemes.map(s => s.name).join(", ");
  
  const msgs: Record<string, string> = {
    english: `Dear ${userData.name},\n\nBased on your profile — Age: ${userData.age}, Income: ₹${userData.income.toLocaleString()}, Occupation: ${userData.occupation}, Category: ${userData.category}, Area: ${userData.area} — you are eligible for the following government schemes:\n\n${eligibleSchemes.map(s => `✅ **${s.name}**\n${s.description}\n💡 Benefits: ${s.benefits}`).join("\n\n")}\n\nWe recommend applying at the earliest to avail these benefits. Visit the respective websites or your nearest CSC for assistance.`,
    hindi: `प्रिय ${userData.name},\n\nआपकी जानकारी के आधार पर — आयु: ${userData.age}, आय: ₹${userData.income.toLocaleString()}, व्यवसाय: ${userData.occupation}, वर्ग: ${userData.category}, क्षेत्र: ${userData.area} — आप निम्नलिखित सरकारी योजनाओं के लिए पात्र हैं:\n\n${eligibleSchemes.map(s => `✅ **${s.nameHi || s.name}**\n${s.description}\n💡 लाभ: ${s.benefits}`).join("\n\n")}\n\nहम अनुशंसा करते हैं कि आप जल्द से जल्द आवेदन करें। सहायता के लिए संबंधित वेबसाइट या अपने निकटतम CSC पर जाएँ।`,
    tamil: `அன்பார்ந்த ${userData.name},\n\nஉங்கள் விவரங்களின் அடிப்படையில் — வயது: ${userData.age}, வருமானம்: ₹${userData.income.toLocaleString()}, தொழில்: ${userData.occupation}, பிரிவு: ${userData.category}, பகுதி: ${userData.area} — நீங்கள் பின்வரும் அரசு திட்டங்களுக்கு தகுதியானவர்:\n\n${eligibleSchemes.map(s => `✅ **${s.nameTa || s.name}**\n${s.description}\n💡 நன்மைகள்: ${s.benefits}`).join("\n\n")}\n\nஇந்த நன்மைகளைப் பெற விரைவில் விண்ணப்பிக்கவும். உதவிக்கு சம்பந்தப்பட்ட இணையதளங்கள் அல்லது உங்கள் அருகிலுள்ள CSC-ஐ அணுகவும்.`,
  };

  return msgs[userData.language] || msgs.english;
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
