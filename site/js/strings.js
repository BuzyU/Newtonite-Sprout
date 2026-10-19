/**
 * Sprout Localisation Engine
 * Loads en and hi string dictionaries with zero CDN, zero external requests.
 */

window.SproutLocales = {
  en: null,
  hi: null
};

// Embed directly for offline / file:// safety while preserving 1-to-1 sync with locales/*.json
const enStrings = {
  "nav": {
    "brand": "Sprout",
    "howItWorks": "How it works",
    "faq": "FAQ",
    "startBtn": "Start with ₹100",
    "langToggle": "हिंदी"
  },
  "hero": {
    "headline": "Start small. Learn as you grow.",
    "subline": "Invest your first ₹100 in diversified funds. No minimum lock-ins, no complicated jargon.",
    "ctaPrimary": "Start with ₹100",
    "ctaSecondary": "How Sprout works ↓",
    "mascotAlt": "Ankur the Sprout mascot waving hello",
    "disclaimer": "Investments in mutual funds and securities are subject to market risks and can lose value. Past performance is not an indicator of future returns. [verify with Compliance]"
  },
  "reassurance": {
    "point1Title": "Start with just ₹100",
    "point1Desc": "You do not need a lump sum. Begin with what you have in your pocket and build confidence at your own pace.",
    "point2Title": "See what you own",
    "point2Desc": "Full transparency on where every single rupee is allocated across India's leading enterprises.",
    "point3Title": "Help in your language",
    "point3Desc": "Clear, jargon-free explanations available in English and Hindi, designed for first-time investors."
  },
  "journey": {
    "heading": "Your first ₹100, step by step",
    "subheading": "Four simple milestones with zero surprise hurdles.",
    "step1Title": "Tell us your goal",
    "step1Time": "~1 min",
    "step1Desc": "Select whether you are saving for a rainy day, a specific purchase, or just curious to learn.",
    "step2Title": "Keep documents ready",
    "step2Time": "~2 mins",
    "step2Desc": "We tell you exactly what is needed (PAN, Aadhaar phone, bank details) before you start verification.",
    "step3Title": "Simple verification",
    "step3Time": "~3 mins",
    "step3Desc": "Secure, paperless identity check. If there is a registry delay, we notify you so you never guess.",
    "step4Title": "Invest your first ₹100",
    "step4Time": "~1 min",
    "step4Desc": "Confirm your starting amount and place your first order into a diversified portfolio."
  },
  "example": {
    "badge": "Example only, not a prediction",
    "heading": "How a small ₹100 habit works",
    "desc": "When you invest ₹100, it is pooled with other investors to buy small fractional shares of large, diversified companies.",
    "breakdownTitle": "Hypothetical ₹100 monthly allocation",
    "item1": "Top Indian Companies (Nifty 50 Index): ₹50",
    "item2": "Government & Corporate Bonds: ₹30",
    "item3": "Emerging Growth Sectors: ₹20",
    "riskNotice": "Market investments fluctuate. Your account balance can rise or fall based on everyday market movements. [verify with Compliance]"
  },
  "trust": {
    "heading": "Built on regulated foundations",
    "point1": "[verify with Compliance: Registered with SEBI as Mutual Fund Distributor ARN-XXXXX]",
    "point2": "[verify with Compliance: Bank-grade 256-bit encryption for all identity documents]",
    "point3": "[verify with Compliance: Regulated depository partner for automated clearing]"
  },
  "faq": {
    "heading": "Frequently asked questions",
    "q1": "What do I need to start investing on Sprout?",
    "a1": "You only need three items: your PAN card number, a mobile number linked to your Aadhaar for OTP verification, and an active Indian bank account. All verification is completed digitally.",
    "q2": "Why does verification take time?",
    "a2": "By financial regulation, your details are cross-referenced with official government registries. This usually takes 45 to 90 seconds. If an agency registry is slow, we save your progress and send you an SMS alert as soon as it clears.",
    "q3": "Can I withdraw my money whenever I want?",
    "a3": "Yes. Sprout offers liquid and open-ended funds with no minimum lock-in periods. Redemption proceeds typically credit back to your verified bank account within 1 to 3 business days.",
    "q4": "Is ₹100 really enough to start?",
    "a4": "Yes. Regulatory micro-investing and systematic investment plans (SIPs) allow beginners to start with as little as ₹100 per month."
  },
  "referral": {
    "text": "Know a friend starting their financial journey? Share Sprout after your first step."
  },
  "footer": {
    "tagline": "Sprout - Patient financial growth for first-time investors.",
    "complianceDisclaimer": "Investments in mutual funds and securities are subject to market risks and can lose value. Past performance is not an indicator of future returns. Please read all scheme-related documents carefully before investing. [verify with Compliance]",
    "assignmentNotice": "Design submission for an assignment. Not a real financial product."
  },
  "app": {
    "screen1": {
      "greeting": "Hi, I'm Ankur",
      "intro": "I'm your guide at Sprout. We help you take your very first step in investing, starting with just ₹100.",
      "whatsNextTitle": "What happens next:",
      "step1": "1. Tell us your goal (~1 min)",
      "step2": "2. Check your documents (~2 mins)",
      "step3": "3. Simple identity check (~3 mins)",
      "step4": "4. Invest your first ₹100 (~1 min)",
      "timeEstimate": "Total time: about 7 minutes",
      "cta": "Get Started",
      "disclaimer": "Investments can lose value. No minimum lock-in. [verify with Compliance]"
    },
    "screen2": {
      "heading": "What brings you here?",
      "subheading": "Pick the option closest to your mind right now. You can change this anytime.",
      "option1": "Building a rainy day fund",
      "option1Sub": "A small safety cushion for unexpected needs",
      "option2": "Learning how investing works",
      "option2Sub": "Hands-on experience with ₹100",
      "option3": "Saving for a specific goal",
      "option3Sub": "A phone, course, or upcoming purchase",
      "option4": "I'm just curious",
      "option4Sub": "Exploring before making any decisions",
      "reassurance": "It is completely normal to feel unsure when starting. We take things one step at a time.",
      "cta": "Continue"
    },
    "screen3": {
      "heading": "Keep these ready",
      "subheading": "Identity verification is mandated by financial regulations. Having these three items nearby makes the process smooth.",
      "timeTag": "Takes about 5 minutes",
      "item1Title": "PAN Card",
      "item1Desc": "Required by income tax rules to create your investment portfolio.",
      "item2Title": "Mobile linked to Aadhaar",
      "item2Desc": "You will receive a 6-digit OTP from the government UIDAI portal.",
      "item3Title": "Bank Account Details",
      "item3Desc": "Account number and IFSC to link where your ₹100 investments and withdrawals flow.",
      "ctaReady": "I have them ready",
      "ctaLater": "Remind me later",
      "reminderNote": "We will only send a reminder notification when you are ready. We respect your privacy."
    },
    "screen4": {
      "heading": "Verification",
      "step1": "Phone & OTP",
      "step2": "PAN Details",
      "step3": "Aadhaar e-KYC",
      "consentTitle": "Why we collect this information",
      "consentBody": "Financial regulations require KYC verification to confirm your identity and prevent financial fraud. Your records are encrypted with 256-bit security and never shared with advertisers. [verify with Compliance/Legal]",
      "consentCheckbox": "I authorize Sprout to fetch my verification records in compliance with SEBI and UIDAI guidelines.",
      "privacyLink": "Read Privacy Notice",
      "phoneLabel": "Mobile Number",
      "otpLabel": "Enter 6-digit OTP sent to your phone",
      "panLabel": "PAN Number",
      "panPlaceholder": "e.g. ABCDE1234F",
      "ctaVerify": "Verify & Continue",
      "waitTitle": "Checking official records...",
      "waitDesc": "Connecting securely with the verification registry. This typically takes about 45 seconds.",
      "waitNote": "You do not need to stare at this screen. If the agency registry is slow, we will save your progress and notify you via SMS when complete.",
      "otpDelayNotice": "OTP taking longer than usual?",
      "resendOtp": "Resend OTP (available in 24s)",
      "otpAlternative": "Receive OTP via WhatsApp or Call",
      "errorTitle": "We couldn't verify this PAN",
      "errorDesc": "The name or number entered did not match official records. Please double-check for typos or ensure the name matches your tax document.",
      "errorHelp": "Need help? Contact support via chat.",
      "offlineTitle": "You're offline",
      "offlineDesc": "Your progress has been saved securely on your device. We will automatically reconnect when your signal returns.",
      "successTitle": "Verification complete",
      "successDesc": "Your investment account has been verified and registered. You are ready to invest."
    },
    "screen5": {
      "heading": "Your first ₹100",
      "subheading": "Your money is allocated into a diversified basket of top Indian enterprises.",
      "amountLabel": "Choose your starting amount",
      "riskWarning": "Market investments fluctuate. Your account balance can rise or fall with market movements. [verify with Compliance]",
      "disclaimer": "Investments are subject to market risk and can lose value. [verify with Compliance]",
      "ctaInvest": "Confirm and Invest ₹100",
      "celebrationTitle": "Your first step is taken",
      "celebrationDesc": "Your order for ₹100 is scheduled for the upcoming market cycle.",
      "nextStepTitle": "What happens next?",
      "nextStepDesc": "Funds are allocated to your mutual fund folio. Units will reflect in your portfolio within 2 business days.",
      "referralTitle": "Learn together",
      "referralDesc": "Know someone curious about investing? Share a ₹100 learning credit with a friend."
    }
  }
};

const hiStrings = {
  "_note": "Natural conversational Hindi translation for evaluation. Requires review by certified Hindi financial localization specialist before production deployment. [verify with Localization/Compliance]",
  "nav": {
    "brand": "स्प्रॉउट (Sprout)",
    "howItWorks": "यह कैसे काम करता है",
    "faq": "आम सवाल",
    "startBtn": "₹100 से शुरू करें",
    "langToggle": "English"
  },
  "hero": {
    "headline": "छोटी शुरुआत करें। सीखते हुए आगे बढ़ें।",
    "subline": "सिर्फ ₹100 से विविध फंडों में निवेश शुरू करें। कोई न्यूनतम लॉक-इन नहीं, कोई जटिल शब्दावली नहीं।",
    "ctaPrimary": "₹100 से शुरुआत करें",
    "ctaSecondary": "स्प्रॉउट कैसे काम करता है ↓",
    "mascotAlt": "अंकुर - स्प्रॉउट का मार्गदर्शक पौधा",
    "disclaimer": "म्यूचुअल फंड और प्रतिभूतियों में निवेश बाजार जोखिमों के अधीन है और मूल्य घट सकता है। पिछला प्रदर्शन भविष्य के लाभ का संकेतक नहीं है। [verify with Compliance]"
  },
  "reassurance": {
    "point1Title": "मात्र ₹100 से शुरुआत",
    "point1Desc": "आपको बड़ी रकम की जरूरत नहीं है। अपनी जेब में बची छोटी राशि से शुरुआत करें और अपनी गति से आत्मविश्वास बढ़ाएं।",
    "point2Title": "पारदर्शिता से देखें आपका पैसा कहां है",
    "point2Desc": "भारत की शीर्ष कंपनियों में आपके हर एक रुपये का स्पष्ट और सीधा हिसाब।",
    "point3Title": "आपकी अपनी भाषा में सहायता",
    "point3Desc": "अंग्रेजी और हिंदी में सरल, स्पष्ट जानकारी, जो पहली बार निवेश करने वालों को ध्यान में रखकर तैयार की गई है।"
  },
  "journey": {
    "heading": "आपका पहला ₹100, आसान चरणों में",
    "subheading": "बिना किसी अप्रत्याशित बाधा के चार सरल पड़ाव।",
    "step1Title": "अपना उद्देश्य बताएं",
    "step1Time": "~1 मिनट",
    "step1Desc": "चुनें कि आप आपातकालीन बचत कर रहे हैं, किसी लक्ष्य के लिए या सिर्फ सीखने के लिए उत्सुक हैं।",
    "step2Title": "दस्तावेज़ तैयार रखें",
    "step2Time": "~2 मिनट",
    "step2Desc": "सत्यापन शुरू करने से पहले हम आपको स्पष्ट बताते हैं कि क्या चाहिए (पैन, आधार लिंक मोबाइल, बैंक विवरण)।",
    "step3Title": "सरल डिजिटल पहचान सत्यापन",
    "step3Time": "~3 मिनट",
    "step3Desc": "सुरक्षित और पेपरलेस सत्यापन। यदि सरकारी पोर्टल पर समय लगता है, तो हम आपको सूचित कर देते हैं।",
    "step4Title": "पहला ₹100 निवेश करें",
    "step4Time": "~1 मिनट",
    "step4Desc": "अपनी राशि की पुष्टि करें और शीर्ष कंपनियों के डायवर्सिफाइड पोर्टफोलियो में अपना पहला कदम रखें।"
  },
  "example": {
    "badge": "केवल उदाहरण हेतु, कोई निश्चित वादा नहीं",
    "heading": "हर महीने ₹100 की आदत कैसे काम करती है",
    "desc": "जब आप ₹100 निवेश करते हैं, तो यह अन्य निवेशकों के साथ मिलकर भारत की शीर्ष कंपनियों में आंशिक रूप से निवेशित होता है।",
    "breakdownTitle": "काल्पनिक ₹100 मासिक आवंटन",
    "item1": "भारत की शीर्ष 50 कंपनियां (निफ्टी 50 इंडेक्स): ₹50",
    "item2": "सरकारी एवं कॉर्पोरेट बॉन्ड: ₹30",
    "item3": "उभरते विकास क्षेत्र: ₹20",
    "riskNotice": "बाजार के निवेश में उतार-चढ़ाव होता रहता है। दैनिक बाजार के आधार पर आपका संतुलन बढ़ या घट सकता है। [verify with Compliance]"
  },
  "trust": {
    "heading": "नियामक नियमों के तहत निर्मित",
    "point1": "[verify with Compliance: सेबी (SEBI) के पास म्यूचुअल फंड वितरक ARN-XXXXX के रूप में पंजीकृत]",
    "point2": "[verify with Compliance: सभी पहचान दस्तावेजों के लिए बैंक-स्तरीय 256-बिट एन्क्रिप्शन सुरक्षा]",
    "point3": "[verify with Compliance: स्वचालित समाशोधन हेतु पंजीकृत डिपॉजिटरी पार्टनर]"
  },
  "faq": {
    "heading": "अक्सर पूछे जाने वाले सवाल",
    "q1": "स्प्रॉउट पर निवेश शुरू करने के लिए मुझे क्या चाहिए?",
    "a1": "आपको सिर्फ तीन चीजों की जरूरत है: आपका पैन कार्ड नंबर, आधार से जुड़ा मोबाइल नंबर (OTP सत्यापन के लिए), और एक सक्रिय बैंक खाता। सारा सत्यापन डिजिटल रूप से होता है।",
    "q2": "पहचान सत्यापन में समय क्यों लगता है?",
    "a2": "वित्तीय नियमों के अनुसार आपके विवरण का सरकारी रिकॉर्ड से मिलान किया जाता है। इसमें आमतौर पर 45 से 90 सेकंड लगते हैं। यदि सर्वर धीमा होता है, तो हम आपकी प्रगति सुरक्षित रखते हैं और सूचना भेजते हैं।",
    "q3": "क्या मैं जब चाहूं अपना पैसा निकाल सकता हूं?",
    "a3": "हां। स्प्रॉउट ओपन-एंडेड फंड प्रदान करता है जिनमें कोई लॉक-इन अवधि नहीं होती। निकासी की राशि सामान्यतः 1 से 3 कार्यदिवसों में आपके बैंक खाते में जमा हो जाती है।",
    "q4": "क्या सच में ₹100 से शुरुआत हो सकती है?",
    "a4": "हां। नियामक सूक्ष्म-निवेश नियमों के तहत नौसिखिए निवेशक भी प्रति माह ₹100 जैसी छोटी राशि से शुरुआत कर सकते हैं।"
  },
  "referral": {
    "text": "क्या आपका कोई मित्र निवेश शुरू करना चाहता है? अपना पहला कदम पूरा करने के बाद स्प्रॉउट साझा करें।"
  },
  "footer": {
    "tagline": "स्प्रॉउट - पहली बार निवेश करने वालों के लिए धैर्यवान वित्तीय विकास।",
    "complianceDisclaimer": "म्यूचुअल फंड और प्रतिभूतियों में निवेश बाजार जोखिमों के अधीन है और मूल्य घट सकता है। पिछला प्रदर्शन भविष्य के लाभ का संकेतक नहीं है। कृपया निवेश करने से पहले सभी योजना से जुड़े दस्तावेजों को ध्यान से पढ़ें। [verify with Compliance]",
    "assignmentNotice": "असाइनमेंट के लिए बनाया गया डिज़ाइन सबमिशन। वास्तविक वित्तीय उत्पाद नहीं है।"
  },
  "app": {
    "screen1": {
      "greeting": "नमस्ते, मैं अंकुर हूं",
      "intro": "मैं स्प्रॉउट पर आपका मार्गदर्शक हूं। हम आपको सिर्फ ₹100 से निवेश की पहली समझदारी भरी शुरुआत करने में मदद करते हैं।",
      "whatsNextTitle": "आगे क्या होगा:",
      "step1": "1. अपना उद्देश्य चुनें (~1 मिनट)",
      "step2": "2. ज़रूरी दस्तावेज़ जांचें (~2 मिनट)",
      "step3": "3. डिजिटल पहचान सत्यापन (~3 मिनट)",
      "step4": "4. अपना पहला ₹100 निवेश करें (~1 मिनट)",
      "timeEstimate": "कुल समय: लगभग 7 मिनट",
      "cta": "शुरुआत करें",
      "disclaimer": "निवेश का मूल्य घट सकता है। कोई न्यूनतम लॉक-इन नहीं। [verify with Compliance]"
    },
    "screen2": {
      "heading": "आप यहां किस उद्देश्य से आए हैं?",
      "subheading": "वह विकल्प चुनें जो इस समय आपके विचार के सबसे करीब हो। आप इसे कभी भी बदल सकते हैं।",
      "option1": "आपातकालीन बचत कोष बनाना",
      "option1Sub": "अनपेक्षित खर्चों के लिए एक छोटी सुरक्षा राशि",
      "option2": "निवेश कैसे काम करता है यह सीखना",
      "option2Sub": "₹100 के साथ व्यावहारिक अनुभव",
      "option3": "किसी खास लक्ष्य के लिए बचत",
      "option3Sub": "फोन, कोर्स या आगामी खरीदारी के लिए",
      "option4": "मैं सिर्फ जानने के लिए उत्सुक हूं",
      "option4Sub": "कोई निर्णय लेने से पहले समझना",
      "reassurance": "शुरुआत में थोड़ा असमंजस महसूस होना पूरी तरह स्वाभाविक है। हम एक-एक कदम आगे बढ़ेंगे।",
      "cta": "आगे बढ़ें"
    },
    "screen3": {
      "heading": "ये चीज़ें तैयार रखें",
      "subheading": "पहचान सत्यापन वित्तीय नियमों के तहत अनिवार्य है। ये तीन चीज़ें पास रखने से प्रक्रिया बहुत आसान हो जाती है।",
      "timeTag": "लगभग 5 मिनट का समय लगेगा",
      "item1Title": "पैन कार्ड (PAN Card)",
      "item1Desc": "आयकर नियमों के अनुसार आपका निवेश फोलियो तैयार करने के लिए आवश्यक।",
      "item2Title": "आधार से जुड़ा मोबाइल नंबर",
      "item2Desc": "आपको सरकारी UIDAI पोर्टल से 6 अंकों का सुरक्षित OTP प्राप्त होगा।",
      "item3Title": "बैंक खाता विवरण",
      "item3Desc": "खाता संख्या और IFSC ताकि आपका निवेश और निकासी सीधे आपके खाते से जुड़े।",
      "ctaReady": "मेरे पास सब तैयार है",
      "ctaLater": "मुझे बाद में याद दिलाएं",
      "reminderNote": "जब आप तैयार होंगे तभी हम एक रिमाइंडर नोटिफिकेशन भेजेंगे। हम आपकी निजता का सम्मान करते हैं।"
    },
    "screen4": {
      "heading": "डिजिटल पहचान सत्यापन",
      "step1": "फ़ोन और OTP",
      "step2": "पैन विवरण",
      "step3": "आधार ई-केवाईसी",
      "consentTitle": "हम यह जानकारी क्यों मांगते हैं",
      "consentBody": "वित्तीय नियमों के अनुसार आपकी पहचान सत्यापित करने और धोखाधड़ी रोकने के लिए केवाईसी आवश्यक है। आपका डेटा 256-बिट सुरक्षा से सुरक्षित है और कभी बेचा नहीं जाता। [verify with Compliance/Legal]",
      "consentCheckbox": "मैं सेबी और यूआईडीएआई दिशानिर्देशों के अनुसार स्प्रॉउट को अपने सत्यापन रिकॉर्ड प्राप्त करने की अनुमति देता/देती हूं।",
      "privacyLink": "गोपनीयता नीति पढ़ें",
      "phoneLabel": "मोबाइल नंबर",
      "otpLabel": "आपके फोन पर भेजा गया 6-अंकीय OTP दर्ज करें",
      "panLabel": "पैन नंबर",
      "panPlaceholder": "उदा. ABCDE1234F",
      "ctaVerify": "सत्यापित करें और आगे बढ़ें",
      "waitTitle": "सरकारी रिकॉर्ड की जांच हो रही है...",
      "waitDesc": "सत्यापन रजिस्ट्री से सुरक्षित रूप से संपर्क किया जा रहा है। इसमें आमतौर पर 45 सेकंड लगते हैं।",
      "waitNote": "आपको इस स्क्रीन पर लगातार देखने की ज़रूरत नहीं है। यदि पोर्टल धीमा है, तो आपकी प्रगति सुरक्षित रहेगी और काम पूरा होने पर हम SMS भेज देंगे।",
      "otpDelayNotice": "क्या OTP आने में समय लग रहा है?",
      "resendOtp": "OTP पुनः भेजें (24 सेकंड में उपलब्ध)",
      "otpAlternative": "व्हाट्सएप या कॉल के माध्यम से OTP प्राप्त करें",
      "errorTitle": "हम इस पैन का सत्यापन नहीं कर सके",
      "errorDesc": "दर्ज किया गया नाम या नंबर सरकारी रिकॉर्ड से मेल नहीं खाया। कृपया अक्षरों की जांच करें या सुनिश्चित करें कि नाम आपके दस्तावेज़ से मेल खाता है।",
      "errorHelp": "मदद चाहिए? सहायता केंद्र से चैट करें।",
      "offlineTitle": "आप ऑफ़लाइन हैं",
      "offlineDesc": "आपकी प्रगति आपके डिवाइस पर सुरक्षित कर ली गई है। इंटरनेट वापस आने पर हम स्वतः पुनः कनेक्ट हो जाएंगे।",
      "successTitle": "सत्यापन सफलतापूर्वक पूर्ण हुआ",
      "successDesc": "आपका निवेश खाता सत्यापित और पंजीकृत हो गया है। आप निवेश के लिए तैयार हैं।"
    },
    "screen5": {
      "heading": "आपका पहला ₹100",
      "subheading": "आपकी राशि भारत की शीर्ष कंपनियों के एक विविध समूह में आवंटित की जा रही है।",
      "amountLabel": "अपनी शुरुआती राशि चुनें",
      "riskWarning": "बाजार के निवेश में उतार-चढ़ाव होता है। बाजार के अनुसार आपके खाते का मूल्य बढ़ या घट सकता है। [verify with Compliance]",
      "disclaimer": "निवेश बाजार जोखिमों के अधीन हैं और मूल्य घट सकता है। [verify with Compliance]",
      "ctaInvest": "पुष्टि करें और ₹100 निवेश करें",
      "celebrationTitle": "आपका पहला कदम पूरा हुआ",
      "celebrationDesc": "₹100 का आपका ऑर्डर आगामी बाजार चक्र के लिए निर्धारित कर दिया गया है।",
      "nextStepTitle": "आगे क्या होगा?",
      "nextStepDesc": "धनराशि आपके म्यूचुअल फंड फोलियो में आवंटित कर दी गई है। यूनिट 2 कार्यदिवसों में दिखाई देंगी।",
      "referralTitle": "साथ मिलकर सीखें",
      "referralDesc": "क्या आपका कोई परिचित निवेश सीखना चाहता है? किसी मित्र को ₹100 का लर्निंग क्रेडिट साझा करें।"
    }
  }
};

window.SproutLocales.en = enStrings;
window.SproutLocales.hi = hiStrings;

function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
}

window.applyTranslations = function(lang) {
  const dictionary = window.SproutLocales[lang] || window.SproutLocales.en;
  document.documentElement.lang = lang;
  
  const translatables = document.querySelectorAll('[data-i18n]');
  translatables.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNestedValue(dictionary, key);
    if (val !== null && val !== undefined) {
      if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
        el.setAttribute('placeholder', val);
      } else {
        el.textContent = val;
      }
    }
  });

  const langToggles = document.querySelectorAll('.lang-toggle-btn');
  langToggles.forEach(btn => {
    btn.textContent = lang === 'en' ? 'हिंदी' : 'English';
    btn.setAttribute('aria-label', lang === 'en' ? 'Switch interface to Hindi' : 'Switch interface to English');
  });

  try {
    localStorage.setItem('sprout_lang', lang);
  } catch(e) {}
};
