export interface UserData {
  name: string;
  age: number;
  gender: string;
  income: number;
  state: string;
  area: "rural" | "urban";
  occupation: string;
  category: string;
  language: "english" | "hindi" | "tamil" | "telugu" | "bengali" | "marathi" | "gujarati" | "kannada" | "malayalam" | "odia";
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

const nationalSchemes: Scheme[] = [
  { id: "pm-kisan", name: "PM Kisan Samman Nidhi", nameHi: "पीएम किसान सम्मान निधि", nameTa: "பிரதமர் கிசான் சம்மான் நிதி", description: "Income support of ₹6,000/year to small and marginal farmer families.", benefits: "₹6,000/year in 3 installments of ₹2,000 directly to bank account", icon: "🌾", applyLink: "https://pmkisan.gov.in/", eligibilityCriteria: "Farmer with income ≤ ₹2 lakh/year" },
  { id: "ayushman-bharat", name: "Ayushman Bharat (PMJAY)", nameHi: "आयुष्मान भारत (पीएमजेएवाय)", nameTa: "ஆயுஷ்மான் பாரத் (PMJAY)", description: "Health insurance cover of ₹5 lakh per family per year.", benefits: "₹5 lakh cashless health coverage per family per year", icon: "🏥", applyLink: "https://beneficiary.nha.gov.in/", eligibilityCriteria: "Income ≤ ₹1.8 lakh, rural or SC/ST/OBC" },
  { id: "pm-awas", name: "PM Awas Yojana", nameHi: "पीएम आवास योजना", nameTa: "பிரதமர் ஆவாஸ் யோஜனா", description: "Financial assistance for construction of pucca houses.", benefits: "Subsidy up to ₹2.67 lakh for house construction", icon: "🏠", applyLink: "https://pmaymis.gov.in/", eligibilityCriteria: "Income ≤ ₹3 lakh, rural area or SC/ST" },
  { id: "startup-india", name: "Startup India", nameHi: "स्टार्टअप इंडिया", nameTa: "ஸ்டார்ட்அப் இந்தியா", description: "Support and incentives for startups including tax benefits.", benefits: "3-year tax exemption, patent fee 80% reduction, SIDBI fund access", icon: "🚀", applyLink: "https://www.startupindia.gov.in/content/sih/en/startupgov/startup-recognition-page.html", eligibilityCriteria: "Business/self-employed, age 18–45" },
  { id: "skill-india", name: "Skill India (PMKVY)", nameHi: "स्किल इंडिया (पीएमकेवीवाय)", nameTa: "ஸ்கில் இந்தியா (PMKVY)", description: "Free skill training and certification to enable youth to earn a livelihood.", benefits: "Free training + ₹8,000 reward on certification + placement assistance", icon: "🎓", applyLink: "https://www.skillindiadigital.gov.in/", eligibilityCriteria: "Age 15–35, student/unemployed/labourer, income ≤ ₹2.5 lakh" },
  { id: "pm-mudra", name: "PM Mudra Loan Yojana", nameHi: "पीएम मुद्रा लोन योजना", nameTa: "பிரதமர் முத்ரா கடன் யோஜனா", description: "Collateral-free loans up to ₹10 lakh for small businesses.", benefits: "Shishu ₹50K / Kishore ₹5L / Tarun ₹10L — no collateral required", icon: "💰", applyLink: "https://www.mudra.org.in/", eligibilityCriteria: "Business/self-employed/farmer, income ≤ ₹10 lakh" },
  { id: "pm-ujjwala", name: "PM Ujjwala Yojana", nameHi: "पीएम उज्ज्वला योजना", nameTa: "பிரதமர் உஜ்வலா யோஜனா", description: "Free LPG connections to women from BPL households.", benefits: "Free LPG connection + first refill + stove free", icon: "🔥", applyLink: "https://www.pmuy.gov.in/", eligibilityCriteria: "Female, income ≤ ₹1.5 lakh, rural area" },
  { id: "sukanya-samriddhi", name: "Sukanya Samriddhi Yojana", nameHi: "सुकन्या समृद्धि योजना", nameTa: "சுகன்யா சம்ரிதி யோஜனா", description: "Savings scheme for the girl child with attractive interest rates.", benefits: "~8.2% interest p.a., tax-free maturity at age 21", icon: "👧", applyLink: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samridhi-Account.aspx", eligibilityCriteria: "Parent aged 18–50, income ≤ ₹5 lakh" },
  { id: "jan-dhan", name: "PM Jan Dhan Yojana", nameHi: "पीएम जन धन योजना", nameTa: "பிரதமர் ஜன் தன் யோஜனா", description: "Zero-balance bank accounts with insurance and overdraft facility.", benefits: "₹2 lakh accident insurance + ₹10,000 overdraft facility", icon: "🏦", applyLink: "https://pmjdy.gov.in/", eligibilityCriteria: "Age 18+, income ≤ ₹1 lakh or labourer/farmer" },
  { id: "atal-pension", name: "Atal Pension Yojana", nameHi: "अटल पेंशन योजना", nameTa: "அடல் பென்ஷன் யோஜனா", description: "Guaranteed pension of ₹1,000–5,000/month after age 60.", benefits: "Guaranteed monthly pension ₹1K–₹5K after retirement", icon: "👴", applyLink: "https://www.npscra.nsdl.co.in/scheme-details.php", eligibilityCriteria: "Age 18–40, not a government employee, income ≤ ₹5 lakh" },
  { id: "pm-fasal-bima", name: "PM Fasal Bima Yojana", nameHi: "पीएम फसल बीमा योजना", nameTa: "பிரதமர் பயிர் காப்பீட்டு திட்டம்", description: "Crop insurance to protect farmers from natural calamities.", benefits: "Compensation for crop loss due to floods, drought, pests", icon: "🌧️", applyLink: "https://pmfby.gov.in/", eligibilityCriteria: "Farmer occupation only" },
  { id: "kisan-credit", name: "Kisan Credit Card (KCC)", nameHi: "किसान क्रेडिट कार्ड", nameTa: "கிசான் கிரெடிட் கார்டு", description: "Short-term credit for farmers at subsidized interest rates.", benefits: "Credit up to ₹3 lakh at 4% interest rate", icon: "💳", applyLink: "https://www.nabard.org/content1.aspx?id=572", eligibilityCriteria: "Farmer occupation only" },
  { id: "e-shram", name: "e-Shram Card", nameHi: "ई-श्रम कार्ड", nameTa: "ஈ-ஷ்ரம் கார்டு", description: "Registration for unorganized workers with social security benefits.", benefits: "₹2 lakh accident insurance + access to welfare schemes", icon: "👷", applyLink: "https://eshram.gov.in/", eligibilityCriteria: "Labourer/farmer/self-employed, income ≤ ₹2.5 lakh" },
  { id: "stand-up-india", name: "Stand Up India", nameHi: "स्टैंड अप इंडिया", nameTa: "ஸ்டாண்ட் அப் இந்தியா", description: "Bank loans for SC/ST and women entrepreneurs.", benefits: "₹10 lakh to ₹1 crore loan for SC/ST/women entrepreneurs", icon: "💼", applyLink: "https://www.standupmitra.in/", eligibilityCriteria: "SC/ST or female, business/self-employed" },
  { id: "national-scholarship", name: "National Scholarship Portal", nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल", nameTa: "தேசிய உதவித்தொகை போர்டல்", description: "Central scholarships for students from minority/SC/ST/OBC communities.", benefits: "Scholarships from ₹1,000 to ₹20,000/year", icon: "📚", applyLink: "https://scholarships.gov.in/", eligibilityCriteria: "Student, income ≤ ₹2.5 lakh, SC/ST/OBC/minority" },
  { id: "beti-bachao", name: "Beti Bachao Beti Padhao", nameHi: "बेटी बचाओ बेटी पढ़ाओ", nameTa: "பேட்டி பச்சாவோ பேட்டி படாவோ", description: "Scheme to improve welfare and education of the girl child.", benefits: "Financial incentives + awareness programs for girl education", icon: "🎀", applyLink: "https://wcd.nic.in/schemes/beti-bachao-beti-padhao-scheme", eligibilityCriteria: "Parent aged 18–45 with girl child" },
  { id: "jeevan-jyoti", name: "PM Jeevan Jyoti Bima", nameHi: "पीएम जीवन ज्योति बीमा", nameTa: "பிரதமர் ஜீவன் ஜ்யோதி காப்பீடு", description: "Life insurance cover at just ₹436/year for ages 18–50.", benefits: "₹2 lakh life cover at ₹436/year premium", icon: "🛡️", applyLink: "https://jansuraksha.gov.in/Files/PMJJBY/English/ApplicationForm.pdf", eligibilityCriteria: "Age 18–50, income ≤ ₹5 lakh" },
  { id: "suraksha-bima", name: "PM Suraksha Bima Yojana", nameHi: "पीएम सुरक्षा बीमा योजना", nameTa: "பிரதமர் சுரக்ஷா பீமா யோஜனா", description: "Accidental death and disability insurance at just ₹20/year.", benefits: "₹2 lakh accidental death cover at ₹20/year", icon: "⛑️", applyLink: "https://jansuraksha.gov.in/Files/PMSBY/English/ApplicationForm.pdf", eligibilityCriteria: "Age 18–70, income ≤ ₹5 lakh" },
];

const stateSchemes: Record<string, Scheme[]> = {
  "Tamil Nadu": [
    { id: "tn-kalaignar", name: "Kalaignar Magalir Urimai Thittam", description: "₹1,000/month to women heads of families in Tamil Nadu.", benefits: "₹1,000/month direct bank transfer to women", icon: "👩", applyLink: "https://www.tn.gov.in/scheme/data_view/24440", eligibilityCriteria: "Female, Tamil Nadu resident" },
    { id: "tn-moovalur", name: "Moovalur Ramamirtham Scheme", description: "Monthly stipend + gold for girls completing education.", benefits: "₹1,000/month stipend + ₹4,000 gold at graduation", icon: "🥇", applyLink: "https://www.tn.gov.in/scheme/data_view/24441", eligibilityCriteria: "Female student, Tamil Nadu" },
  ],
  "Maharashtra": [
    { id: "mh-ladki-bahin", name: "Mukhyamantri Ladki Bahin Yojana", description: "₹1,500/month financial aid to women aged 21–65.", benefits: "₹1,500/month direct benefit transfer", icon: "👩", applyLink: "https://ladakibahin.maharashtra.gov.in/", eligibilityCriteria: "Female aged 21–65, Maharashtra" },
    { id: "mh-shetkari", name: "Shetkari Sanman Yojana", description: "Loan waiver for farmers in Maharashtra.", benefits: "Loan waiver up to ₹2 lakh for farmers", icon: "🌾", applyLink: "https://www.maharashtra.gov.in/1125/Farmer-Schemes", eligibilityCriteria: "Farmer, Maharashtra" },
  ],
  "Uttar Pradesh": [
    { id: "up-kanya", name: "Kanya Sumangala Yojana", description: "Financial support for girl child education in UP.", benefits: "₹15,000 in 6 installments per girl child", icon: "👧", applyLink: "https://mksy.up.gov.in/women_welfare/citizen/guest_login.php", eligibilityCriteria: "Female, Uttar Pradesh, income ≤ ₹3 lakh" },
    { id: "up-pension", name: "UP Old Age Pension Scheme", description: "Monthly pension for senior citizens above 60 in UP.", benefits: "₹1,000/month pension for elderly", icon: "👴", applyLink: "https://sspy-up.gov.in/HindiPages/oldagepension_h.aspx", eligibilityCriteria: "Age 60+, Uttar Pradesh" },
  ],
  "Karnataka": [
    { id: "ka-gruha", name: "Gruha Jyothi Scheme", description: "200 units free electricity per month to households.", benefits: "200 units free electricity every month", icon: "💡", applyLink: "https://gruha.karnataka.gov.in/page/Gruha+Jyothi/en", eligibilityCriteria: "Karnataka resident" },
    { id: "ka-shakti", name: "Shakti Free Bus Travel", description: "Free bus travel for all women in KSRTC buses.", benefits: "Free travel on all KSRTC/BMTC buses for women", icon: "🚌", applyLink: "https://www.ksrtc.in/oprs-web/", eligibilityCriteria: "Female, Karnataka" },
    { id: "ka-yuva-nidhi", name: "Yuva Nidhi Scheme", description: "Unemployment allowance for educated youth in Karnataka.", benefits: "₹3,000/month for graduates, ₹1,500 for diploma holders", icon: "🎓", applyLink: "https://sevasindhu.karnataka.gov.in/Sevasindhu/English", eligibilityCriteria: "Unemployed graduate/diploma, Karnataka" },
  ],
  "Delhi": [
    { id: "dl-free-bus", name: "Free Bus Travel for Women", description: "Free travel in DTC/cluster buses for all women in Delhi.", benefits: "Free bus travel across all Delhi routes", icon: "🚌", applyLink: "https://dtc.delhi.gov.in/", eligibilityCriteria: "Female, Delhi" },
    { id: "dl-bijli", name: "Delhi Free Electricity", description: "200 units free electricity per month to households.", benefits: "200 units free + 50% subsidy on next 200 units", icon: "⚡", applyLink: "https://bsesdelhi.com/web/bses/subsidy", eligibilityCriteria: "Delhi resident" },
  ],
  "Gujarat": [
    { id: "gj-mahila-utkarsh", name: "Mukhyamantri Mahila Utkarsh Yojana", description: "Interest-free loans to women self-help groups.", benefits: "Interest-free loan up to ₹1 lakh for women SHGs", icon: "👩‍💼", applyLink: "https://sje.gujarat.gov.in/dwd/schemes", eligibilityCriteria: "Female, Gujarat" },
    { id: "gj-kisan-suryoday", name: "Kisan Suryoday Yojana", description: "Daytime electricity supply for farmers.", benefits: "3-phase electricity from 5 AM to 9 PM for farmers", icon: "☀️", applyLink: "https://www.pgvcl.com/", eligibilityCriteria: "Farmer, Gujarat" },
  ],
  "Rajasthan": [
    { id: "rj-chiranjeevi", name: "Chiranjeevi Swasthya Bima Yojana", description: "Health insurance up to ₹25 lakh per family.", benefits: "₹25 lakh health coverage per family per year", icon: "🏥", applyLink: "https://chiranjeevi.rajasthan.gov.in/", eligibilityCriteria: "Rajasthan resident" },
    { id: "rj-indira-rasoi", name: "Indira Rasoi Yojana", description: "Subsidized meals at ₹8 for lunch and ₹12 for dinner.", benefits: "Nutritious meals at ₹8–₹12 across the state", icon: "🍽️", applyLink: "https://indirarasoi.rajasthan.gov.in/", eligibilityCriteria: "Rajasthan resident" },
  ],
  "West Bengal": [
    { id: "wb-lakshmir", name: "Lakshmir Bhandar", description: "Monthly financial support to women heads of families.", benefits: "₹500 (General) / ₹1,000 (SC/ST) per month", icon: "👩", applyLink: "https://socialsecurity.wb.gov.in/", eligibilityCriteria: "Female head of family, West Bengal" },
    { id: "wb-kanyashree", name: "Kanyashree Prakalpa", description: "Scholarship for girl students to continue education.", benefits: "₹1,000/year + ₹25,000 one-time grant at age 18", icon: "🎓", applyLink: "https://wbkanyashree.gov.in/kp_4.0/index.php", eligibilityCriteria: "Female student, West Bengal" },
    { id: "wb-swasthya-sathi", name: "Swasthya Sathi", description: "Health insurance for all families in West Bengal.", benefits: "₹5 lakh cashless health coverage per family", icon: "🏥", applyLink: "https://swasthyasathi.gov.in/", eligibilityCriteria: "West Bengal resident" },
  ],
  "Kerala": [
    { id: "kl-karunya", name: "Karunya Health Scheme", description: "Financial assistance for serious illnesses in Kerala.", benefits: "Up to ₹2 lakh for critical illness treatment", icon: "🏥", applyLink: "https://karunyakerala.org/", eligibilityCriteria: "Kerala resident" },
  ],
  "Bihar": [
    { id: "br-mukhyamantri", name: "Mukhyamantri Kanya Utthan Yojana", description: "Financial incentive for girl child education in Bihar.", benefits: "₹50,000 on graduation for girls", icon: "👧", applyLink: "https://medhasoft.bih.nic.in/", eligibilityCriteria: "Female student, Bihar" },
  ],
  "Andhra Pradesh": [
    { id: "ap-rythu-bharosa", name: "YSR Rythu Bharosa", description: "₹13,500/year investment support to farmers.", benefits: "₹13,500/year to farmer families", icon: "🌾", applyLink: "https://ysrrythubharosa.ap.gov.in/RBApp/", eligibilityCriteria: "Farmer, Andhra Pradesh" },
    { id: "ap-amma-vodi", name: "Jagananna Amma Vodi", description: "₹15,000/year to mothers who send children to school.", benefits: "₹15,000/year for mothers of school-going children", icon: "👩‍👧", applyLink: "https://ammavodi.ap.gov.in/", eligibilityCriteria: "Mother with school-going child, Andhra Pradesh" },
  ],
  "Telangana": [
    { id: "tg-rythu-bandhu", name: "Rythu Bandhu Scheme", description: "₹10,000/acre/year investment support to farmers.", benefits: "₹10,000 per acre per year (Rabi + Kharif)", icon: "🌾", applyLink: "https://rythubandhu.telangana.gov.in/", eligibilityCriteria: "Farmer, Telangana" },
    { id: "tg-kalyana-lakshmi", name: "Kalyana Lakshmi / Shaadi Mubarak", description: "Financial assistance for marriage of girls from SC/ST/minority.", benefits: "₹1,00,116 financial assistance for marriage", icon: "💍", applyLink: "https://telanganaepass.cgg.gov.in/", eligibilityCriteria: "Female SC/ST/minority, Telangana" },
  ],
  "Madhya Pradesh": [
    { id: "mp-ladli-laxmi", name: "Ladli Laxmi Yojana 2.0", description: "Financial support for girl child education and marriage.", benefits: "₹1.43 lakh total benefit from birth to marriage", icon: "👧", applyLink: "https://ladlilaxmi.mp.gov.in/LLYHome.aspx", eligibilityCriteria: "Female, Madhya Pradesh" },
  ],
  "Punjab": [
    { id: "pb-ashirwad", name: "Ashirwad Scheme", description: "₹51,000 financial assistance for marriage of girls.", benefits: "₹51,000 grant for marriage of girls from poor families", icon: "💍", applyLink: "https://sswcd.punjab.gov.in/en/ashirwad-scheme", eligibilityCriteria: "Female, Punjab, income ≤ ₹3 lakh" },
  ],
  "Haryana": [
    { id: "hr-ladli", name: "Ladli Social Security Allowance", description: "₹2,000/month to families with only girl children.", benefits: "₹2,000/month for families with no male child", icon: "👧", applyLink: "https://socialjusticehry.gov.in/ladli-scheme/", eligibilityCriteria: "Haryana resident with girl child only" },
  ],
  "Odisha": [
    { id: "od-biju-swasthya", name: "Biju Swasthya Kalyan Yojana", description: "Health coverage up to ₹5 lakh for all families.", benefits: "₹5 lakh (₹10 lakh for women) health coverage", icon: "🏥", applyLink: "https://bsky.odisha.gov.in/", eligibilityCriteria: "Odisha resident" },
    { id: "od-kalia", name: "KALIA Scheme", description: "Financial support to small farmers and landless labourers.", benefits: "₹10,000/year to small farmers + ₹12,500 to landless", icon: "🌾", applyLink: "https://kalia.odisha.gov.in/index.html", eligibilityCriteria: "Farmer/labourer, Odisha" },
  ],
  "Assam": [
    { id: "as-orunodoi", name: "Orunodoi Scheme", description: "₹1,250/month financial assistance to poor families.", benefits: "₹1,250/month direct bank transfer to women", icon: "👩", applyLink: "https://orunodoi.assam.gov.in/", eligibilityCriteria: "Female, Assam, income ≤ ₹2 lakh" },
  ],
  "Himachal Pradesh": [
    { id: "hp-sahara", name: "Sahara Scheme", description: "₹3,000/month for patients with serious chronic diseases.", benefits: "₹3,000/month for chronic illness patients", icon: "🏥", applyLink: "https://himachal.nic.in/index.php?lang=1&dpt_id=10&level=0&lid=1&sublinkid=8543", eligibilityCriteria: "Himachal Pradesh resident with chronic illness" },
  ],
};

export function getStateSchemes(state: string): Scheme[] {
  return stateSchemes[state] || [];
}

export function scoreSchemes(userData: UserData): Scheme[] {
  const eligible: Scheme[] = [];
  const { age, gender, income, area, occupation, category, state } = userData;
  const isRural = area === "rural";
  const isFarmer = occupation === "farmer";
  const isBusiness = occupation === "business" || occupation === "self-employed";
  const isStudent = occupation === "student";
  const isLabourer = occupation === "labourer";
  const isUnemployed = occupation === "unemployed";
  const isScSt = category === "SC" || category === "ST";
  const isScStObc = isScSt || category === "OBC";
  const isFemale = gender === "female";

  // Score national schemes
  for (const scheme of nationalSchemes) {
    let match = false;
    switch (scheme.id) {
      case "pm-kisan": match = isFarmer && income <= 200000; break;
      case "ayushman-bharat": match = income <= 180000 && (isRural || isScStObc); break;
      case "pm-awas": match = income <= 300000 && (isRural || isScSt); break;
      case "startup-india": match = isBusiness && age >= 18 && age <= 45; break;
      case "skill-india": match = age >= 15 && age <= 35 && (isStudent || isUnemployed || isLabourer) && income <= 250000; break;
      case "pm-mudra": match = (isBusiness || isFarmer) && income <= 1000000; break;
      case "pm-ujjwala": match = isFemale && income <= 150000 && isRural; break;
      case "sukanya-samriddhi": match = age >= 18 && age <= 50 && income <= 500000; break;
      case "jan-dhan": match = age >= 18 && (income <= 100000 || isLabourer || isFarmer); break;
      case "atal-pension": match = age >= 18 && age <= 40 && occupation !== "employed" && income <= 500000; break;
      case "pm-fasal-bima": match = isFarmer; break;
      case "kisan-credit": match = isFarmer; break;
      case "e-shram": match = (isLabourer || isFarmer || occupation === "self-employed") && income <= 250000; break;
      case "stand-up-india": match = (isScSt || isFemale) && isBusiness; break;
      case "national-scholarship": match = isStudent && income <= 250000 && isScStObc; break;
      case "beti-bachao": match = age >= 18 && age <= 45; break;
      case "jeevan-jyoti": match = age >= 18 && age <= 50 && income <= 500000; break;
      case "suraksha-bima": match = age >= 18 && age <= 70 && income <= 500000; break;
    }
    if (match) eligible.push(scheme);
  }

  // Add state-specific schemes for the user's state
  const userStateSchemes = stateSchemes[state] || [];
  eligible.push(...userStateSchemes);

  return eligible;
}

export function generateMockExplanation(userData: UserData, eligibleSchemes: Scheme[]): string {
  const { name, age, income, occupation, category, area, state, language } = userData;
  const count = eligibleSchemes.length;

  const profile = {
    english: `Age: ${age} | Income: ₹${income.toLocaleString()} | Occupation: ${occupation} | Category: ${category} | Area: ${area} | State: ${state}`,
    hindi: `आयु: ${age} | आय: ₹${income.toLocaleString()} | व्यवसाय: ${occupation} | वर्ग: ${category} | क्षेत्र: ${area} | राज्य: ${state}`,
    tamil: `வயது: ${age} | வருமானம்: ₹${income.toLocaleString()} | தொழில்: ${occupation} | பிரிவு: ${category} | பகுதி: ${area} | மாநிலம்: ${state}`,
    telugu: `వయసు: ${age} | ఆదాయం: ₹${income.toLocaleString()} | వృత్తి: ${occupation} | వర్గం: ${category} | ప్రాంతం: ${area} | రాష్ట్రం: ${state}`,
    bengali: `বয়স: ${age} | আয়: ₹${income.toLocaleString()} | পেশা: ${occupation} | বিভাগ: ${category} | এলাকা: ${area} | রাজ্য: ${state}`,
    marathi: `वय: ${age} | उत्पन्न: ₹${income.toLocaleString()} | व्यवसाय: ${occupation} | श्रेणी: ${category} | क्षेत्र: ${area} | राज्य: ${state}`,
    gujarati: `ઉંમર: ${age} | આવક: ₹${income.toLocaleString()} | વ્યવસાય: ${occupation} | શ્રેણી: ${category} | વિસ્તાર: ${area} | રાજ્ય: ${state}`,
    kannada: `ವಯಸ್ಸು: ${age} | ಆದಾಯ: ₹${income.toLocaleString()} | ಉದ್ಯೋಗ: ${occupation} | ವರ್ಗ: ${category} | ಪ್ರದೇಶ: ${area} | ರಾಜ್ಯ: ${state}`,
    malayalam: `പ്രായം: ${age} | വരുമാനം: ₹${income.toLocaleString()} | തൊഴിൽ: ${occupation} | വിഭാഗം: ${category} | പ്രദേശം: ${area} | സംസ്ഥാനം: ${state}`,
    odia: `ବୟସ: ${age} | ଆୟ: ₹${income.toLocaleString()} | ବୃତ୍ତି: ${occupation} | ବର୍ଗ: ${category} | ଅଞ୍ଚଳ: ${area} | ରାଜ୍ୟ: ${state}`,
  };

  const schemeList = eligibleSchemes.map(s => `• ${s.name}: ${s.benefits}`).join('\n');

  if (count === 0) {
    const msgs: Record<string, string> = {
      english: `Dear ${name},\n\nBased on your profile (${profile.english}), no matching government schemes were found at this time.\n\nWe recommend visiting your nearest Common Service Centre (CSC) for personalized assistance.`,
      hindi: `प्रिय ${name},\n\nआपकी जानकारी (${profile.hindi}) के आधार पर इस समय कोई उपयुक्त सरकारी योजना नहीं मिली।\n\nव्यक्तिगत सहायता के लिए अपने निकटतम CSC पर जाएं।`,
      tamil: `அன்பார்ந்த ${name},\n\nஉங்கள் விவரங்களின் (${profile.tamil}) அடிப்படையில் தற்போது பொருத்தமான திட்டங்கள் கிடைக்கவில்லை.\n\nதனிப்பட்ட உதவிக்கு உங்கள் அருகிலுள்ள CSC-ஐ அணுகவும்.`,
      telugu: `ప్రియమైన ${name},\n\nమీ వివరాల (${profile.telugu}) ఆధారంగా ప్రస్తుతం సరిపోలే పథకాలు కనుగొనబడలేదు.\n\nవ్యక్తిగత సహాయం కోసం సమీప CSC సందర్శించండి.`,
      bengali: `প্রিয় ${name},\n\nআপনার তথ্যের (${profile.bengali}) ভিত্তিতে এই মুহূর্তে কোনো মিলে যাওয়া প্রকল্প পাওয়া যায়নি।\n\nব্যক্তিগত সহায়তার জন্য নিকটতম CSC পরিদর্শন করুন।`,
      marathi: `प्रिय ${name},\n\nतुमच्या माहितीच्या (${profile.marathi}) आधारे सध्या कोणत्याही जुळणाऱ्या योजना आढळल्या नाहीत.\n\nवैयक्तिक मदतीसाठी जवळच्या CSC ला भेट द्या.`,
      gujarati: `પ્રિય ${name},\n\nતમારી વિગતો (${profile.gujarati}) ના આધારે આ સમયે કોઈ મેળ ખાતી યોજનાઓ મળી નથી.\n\nવ્યક્તિગત સહાય માટે નજીકના CSC ની મુલાકાત લો.`,
      kannada: `ಪ್ರಿಯ ${name},\n\nನಿಮ್ಮ ವಿವರಗಳ (${profile.kannada}) ಆಧಾರದ ಮೇಲೆ ಈ ಸಮಯದಲ್ಲಿ ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.\n\nವ್ಯಕ್ತಿಗತ ಸಹಾಯಕ್ಕಾಗಿ ಹತ್ತಿರದ CSC ಗೆ ಭೇಟಿ ನೀಡಿ.`,
    };
    return msgs[language] ?? msgs.english;
  }

  const msgs: Record<string, string> = {
    english: `Dear ${name},\n\nProfile: ${profile.english}\n\nYou are eligible for ${count} government scheme(s):\n\n${schemeList}\n\nApply at the earliest to avail these benefits. Visit the respective websites or your nearest CSC for assistance.`,
    hindi: `प्रिय ${name},\n\nप्रोफ़ाइल: ${profile.hindi}\n\nआप ${count} सरकारी योजना(ओं) के लिए पात्र हैं:\n\n${schemeList}\n\nजल्द से जल्द आवेदन करें। सहायता के लिए संबंधित वेबसाइट या निकटतम CSC पर जाएं।`,
    tamil: `அன்பார்ந்த ${name},\n\nசுயவிவரம்: ${profile.tamil}\n\nநீங்கள் ${count} அரசு திட்டங்களுக்கு தகுதியானவர்:\n\n${schemeList}\n\nவிரைவில் விண்ணப்பிக்கவும். உதவிக்கு சம்பந்தப்பட்ட இணையதளங்கள் அல்லது CSC-ஐ அணுகவும்.`,
    telugu: `ప్రియమైన ${name},\n\nప్రొఫైల్: ${profile.telugu}\n\nమీరు ${count} ప్రభుత్వ పథకాలకు అర్హులు:\n\n${schemeList}\n\nత్వరగా దరఖాస్తు చేయండి. సహాయం కోసం సంబంధిత వెబ్‌సైట్లు లేదా సమీప CSC సందర్శించండి.`,
    bengali: `প্রিয় ${name},\n\nপ্রোফাইল: ${profile.bengali}\n\nআপনি ${count}টি সরকারি প্রকল্পের জন্য যোগ্য:\n\n${schemeList}\n\nযত তাড়াতাড়ি সম্ভব আবেদন করুন। সহায়তার জন্য সংশ্লিষ্ট ওয়েবসাইট বা নিকটতম CSC পরিদর্শন করুন।`,
    marathi: `प्रिय ${name},\n\nप्रोफाइल: ${profile.marathi}\n\nतुम्ही ${count} सरकारी योजनांसाठी पात्र आहात:\n\n${schemeList}\n\nलवकरात लवकर अर्ज करा. मदतीसाठी संबंधित वेबसाइट किंवा जवळच्या CSC ला भेट द्या.`,
    gujarati: `પ્રિય ${name},\n\nપ્રોફાઇલ: ${profile.gujarati}\n\nતમે ${count} સરકારી યોજનાઓ માટે પાત્ર છો:\n\n${schemeList}\n\nજલ્દીથી અરજી કરો. સહાય માટે સંબંધિત વેબસાઇટ અથવા નજીકના CSC ની મુલાકાત લો.`,
    kannada: `ಪ್ರಿಯ ${name},\n\nಪ್ರೊಫೈಲ್: ${profile.kannada}\n\nನೀವು ${count} ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ:\n\n${schemeList}\n\nಆದಷ್ಟು ಬೇಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಸಹಾಯಕ್ಕಾಗಿ ಸಂಬಂಧಿತ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಅಥವಾ ಹತ್ತಿರದ CSC ಗೆ ಭೇಟಿ ನೀಡಿ.`,
    malayalam: `പ്രിയ ${name},\n\nപ്രൊഫൈൽ: ${profile.malayalam}\n\nനിങ്ങൾ ${count} സർക്കാർ പദ്ധതികൾക്ക് അർഹരാണ്:\n\n${schemeList}\n\nഎത്രയും വേഗം അപേക്ഷിക്കുക. സഹായത്തിന് ബന്ധപ്പെട്ട വെബ്‌സൈറ്റുകൾ അല്ലെങ്കിൽ അടുത്തുള്ള CSC സന്ദർശിക്കുക.`,
    odia: `ପ୍ରିୟ ${name},\n\nପ୍ରୋଫାଇଲ୍: ${profile.odia}\n\nଆପଣ ${count}ଟି ସରକାରୀ ଯୋଜନା ପାଇଁ ଯୋଗ୍ୟ:\n\n${schemeList}\n\nଯଥାଶୀଘ୍ର ଆବେଦନ କରନ୍ତୁ। ସାହାଯ୍ୟ ପାଇଁ ସଂଶ୍ଳିଷ୍ଟ ୱେବସାଇଟ୍ ବା ନିକଟ CSC ପରିଦର୍ଶନ କରନ୍ତୁ।`,
  };
  return msgs[language] ?? msgs.english;
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
