export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General App Usage",
    description: "Basic questions about using DriveTest Pro",
    icon: "❓",
  },
  {
    id: "study-guide",
    title: "Study Guide",
    description: "Questions about study materials and chapters",
    icon: "📚",
  },
  {
    id: "practice-tests",
    title: "Practice Tests & Quizzes",
    description: "Information about practice questions and test simulations",
    icon: "✅",
  },
  {
    id: "traffic-signs",
    title: "Traffic Signs",
    description: "Questions about road signs and their meanings",
    icon: "🚦",
  },
  {
    id: "licensing",
    title: "G1/G2 Licensing Process",
    description: "Ontario's graduated licensing system explained",
    icon: "📋",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "How to use the AI driving instructor feature",
    icon: "🤖",
  },
  {
    id: "account",
    title: "Account & Authentication",
    description: "Managing your account and login issues",
    icon: "👤",
  },
  {
    id: "technical",
    title: "Technical Support",
    description: "App issues and troubleshooting",
    icon: "⚙️",
  },
];

export const faqData: FAQItem[] = [
  // General App Usage
  {
    id: "what-is-drivetest-pro",
    question: "What is DriveTest Pro?",
    answer:
      "DriveTest Pro is a comprehensive Ontario driving test preparation platform that helps you study for your G1, G2, or full G license exam. Our app includes detailed study guides covering all 11 chapters of driving knowledge, unlimited practice questions, realistic test simulations, traffic signs reference, and an AI assistant powered by official MTO documents.",
    category: "general",
    tags: ["overview", "features", "ontario", "g1", "g2"],
  },
  {
    id: "how-to-get-started",
    question: "How do I get started with DriveTest Pro?",
    answer:
      "Getting started is easy! You can begin studying immediately by visiting our Study Guide section, which covers all essential topics. For the best learning experience, we recommend following this path: 1) Start with the Study Guide to learn the fundamentals, 2) Use Practice Mode to test your knowledge without pressure, 3) Take Practice Tests when you feel confident, and 4) Use Timed Tests to simulate the real exam experience.",
    category: "general",
    tags: ["getting-started", "study-path", "learning"],
  },
  {
    id: "is-app-free",
    question: "Is DriveTest Pro free to use?",
    answer:
      "Yes! DriveTest Pro offers comprehensive free study materials including all study guide chapters, practice questions, traffic signs reference, and basic features. Some advanced features may require registration, but the core learning resources are available to everyone at no cost.",
    category: "general",
    tags: ["free", "pricing", "cost"],
  },
  {
    id: "mobile-friendly",
    question: "Can I use DriveTest Pro on my phone or tablet?",
    answer:
      "Absolutely! DriveTest Pro is fully responsive and works perfectly on all devices including smartphones, tablets, laptops, and desktop computers. You can study anywhere, anytime with the same great experience across all your devices.",
    category: "general",
    tags: ["mobile", "responsive", "devices", "tablet", "phone"],
  },
  {
    id: "offline-access",
    question: "Can I use the app offline?",
    answer:
      "DriveTest Pro requires an internet connection to access the latest content and features. However, once you've loaded study materials, you can continue reading them if your connection is temporarily interrupted. For the best experience and access to all features including the AI assistant, we recommend staying connected to the internet.",
    category: "general",
    tags: ["offline", "internet", "connection"],
  },

  // Study Guide
  {
    id: "study-guide-coverage",
    question: "What topics does the Study Guide cover?",
    answer:
      "Our Study Guide covers all 11 chapters of Ontario driving knowledge based on official MTO content: 1) Getting Your License, 2) Safe & Responsible Driving Fundamentals, 3) Sharing the Road with Others, 4) Intersections & Right-of-Way, 5) Changing Directions & Positions, 6) Parking & Roadside Procedures, 7) Traffic Signs, Lights & Markings, 8) Challenging Conditions & Situations, 9) Legal Responsibilities & License Maintenance, 10) Emergency Procedures & Collision Response, and 11) Weather & Night Driving.",
    category: "study-guide",
    tags: ["chapters", "coverage", "mto", "content", "topics"],
  },
  {
    id: "study-time-required",
    question: "How long does it take to complete the Study Guide?",
    answer:
      "Each chapter has an estimated completion time, with most taking 45-90 minutes to study thoroughly. The entire Study Guide requires approximately 12-15 hours of focused study time. However, everyone learns at their own pace - some may need more time for certain topics, while others might move through material more quickly. We recommend studying consistently over several days or weeks rather than cramming everything at once.",
    category: "study-guide",
    tags: ["time", "duration", "completion", "study-schedule"],
  },
  {
    id: "study-guide-official",
    question: "Is the Study Guide content official and up-to-date?",
    answer:
      "Yes! Our Study Guide is based on official Ministry of Transportation Ontario (MTO) documents and is regularly updated to reflect current laws, regulations, and best practices. All content is sourced from authoritative MTO publications to ensure accuracy and compliance with current Ontario driving standards.",
    category: "study-guide",
    tags: ["official", "mto", "updated", "accurate", "current"],
  },
  {
    id: "study-guide-navigation",
    question: "How do I navigate through the Study Guide chapters?",
    answer:
      "The Study Guide is organized into clear chapters and sections. You can access any chapter directly from the main Study Guide page, navigate sequentially through sections using the Previous/Next buttons, or jump to specific topics using the chapter menu. Each section includes key points and detailed explanations to help you understand important concepts.",
    category: "study-guide",
    tags: ["navigation", "chapters", "sections", "menu"],
  },
  {
    id: "key-points-feature",
    question: "What are the key points in each section?",
    answer:
      "Key points are highlighted summaries of the most important information in each study section. These bullet points help you quickly review essential concepts, identify critical rules and regulations, and focus your attention on information most likely to appear on the driving test. Use key points for quick reviews before taking practice tests.",
    category: "study-guide",
    tags: ["key-points", "summary", "important", "review"],
  },

  // Practice Tests & Quizzes
  {
    id: "practice-vs-quiz-mode",
    question: "What's the difference between Practice Mode and Practice Tests?",
    answer:
      "Practice Mode offers unlimited questions in a relaxed, pressure-free environment where you can learn at your own pace without time limits. Practice Tests simulate the actual G1 exam format with 40 questions that must be completed, giving you a realistic test experience. Use Practice Mode for learning and building confidence, then move to Practice Tests when you're ready to assess your knowledge.",
    category: "practice-tests",
    tags: ["practice-mode", "practice-tests", "difference", "unlimited"],
  },
  {
    id: "timed-tests-format",
    question: "How do Timed Tests work?",
    answer:
      "Timed Tests simulate the real Ontario G1 exam experience with 40 multiple-choice questions that must be completed within 30 minutes. This matches the actual time limit and question count of the official test. Timed Tests help you practice working under pressure and managing your time effectively during the real exam.",
    category: "practice-tests",
    tags: [
      "timed-tests",
      "30-minutes",
      "40-questions",
      "real-exam",
      "simulation",
    ],
  },
  {
    id: "question-explanations",
    question: "Do I get explanations for practice questions?",
    answer:
      "Yes! Every practice question includes detailed explanations for both correct and incorrect answers. These explanations help you understand the reasoning behind the correct answer, learn from mistakes, and reinforce important driving concepts. The explanations are based on official Ontario driving laws and best practices.",
    category: "practice-tests",
    tags: ["explanations", "answers", "detailed", "learning", "mistakes"],
  },
  {
    id: "passing-score",
    question: "What score do I need to pass the practice tests?",
    answer:
      "In Ontario, you need to score at least 80% (32 out of 40 questions correct) to pass the G1 knowledge test. Our practice tests use the same scoring system. We recommend consistently scoring 85% or higher on practice tests before taking the real exam to ensure you're well-prepared and confident.",
    category: "practice-tests",
    tags: ["passing-score", "80-percent", "32-questions", "g1-exam"],
  },
  {
    id: "retake-practice-tests",
    question: "Can I retake practice tests multiple times?",
    answer:
      "Absolutely! You can take practice tests and use practice mode as many times as you want. Each test draws from our extensive question bank, so you'll encounter different questions each time. This helps you practice various scenarios and ensures comprehensive preparation for your actual driving test.",
    category: "practice-tests",
    tags: ["retake", "multiple-times", "unlimited", "question-bank"],
  },
  {
    id: "track-progress",
    question: "How can I track my study progress?",
    answer:
      "While studying, you can monitor your improvement by noting your practice test scores over time, identifying topics where you consistently struggle, and focusing additional study time on weak areas. We recommend keeping a study log of your practice test results and reviewing explanations for questions you miss.",
    category: "practice-tests",
    tags: ["progress", "tracking", "scores", "improvement", "study-log"],
  },

  // Traffic Signs
  {
    id: "traffic-signs-categories",
    question: "What types of traffic signs are covered in the app?",
    answer:
      "DriveTest Pro covers all major categories of Ontario traffic signs: 1) Regulatory Signs (red and white signs showing rules and restrictions), 2) Warning Signs (yellow diamond signs alerting you to hazards), 3) Information Signs (blue and green signs providing directions and services), 4) Temporary Signs (orange construction and work zone signs), and 5) Traffic Control Signs (stop signs, yield signs, traffic lights).",
    category: "traffic-signs",
    tags: ["regulatory", "warning", "information", "temporary", "categories"],
  },
  {
    id: "sign-meanings",
    question: "How do I learn what different traffic signs mean?",
    answer:
      "Each traffic sign in our collection includes the sign image, its official name, and a clear explanation of what it means and how you should respond. Signs are organized by category and include real-world examples of when you'll encounter them. Study tip: Focus on the shape and color of signs, as these provide important clues about their meaning and urgency.",
    category: "traffic-signs",
    tags: ["meanings", "explanations", "shapes", "colors", "respond"],
  },
  {
    id: "most-important-signs",
    question: "Which traffic signs are most important to memorize?",
    answer:
      "Priority signs for the G1 test include: Stop signs, Yield signs, School zone signs, Speed limit signs, One-way signs, Do not enter signs, Construction zone signs, Hospital signs, and all warning signs (yellow diamonds). These frequently appear on the knowledge test and are essential for safe driving.",
    category: "traffic-signs",
    tags: ["important", "memorize", "priority", "g1-test", "essential"],
  },
  {
    id: "construction-signs",
    question: "What should I know about construction and temporary signs?",
    answer:
      "Orange construction and temporary signs always take priority over regular signs and speed limits. Key rules: Reduce speed in construction zones, watch for workers and equipment, follow detour instructions, expect lane changes and closures, and remember that flag persons have authority to stop and direct traffic. Construction zone violations often carry double fines.",
    category: "traffic-signs",
    tags: [
      "construction",
      "temporary",
      "orange",
      "priority",
      "workers",
      "fines",
    ],
  },
  {
    id: "sign-shapes-colors",
    question:
      "Do the shapes and colors of traffic signs have special meanings?",
    answer:
      "Yes! Sign shapes and colors convey important information: Red = stop, prohibition, or danger; Yellow = caution or warning; Blue = motorist services; Green = guidance and directions; Orange = construction or temporary conditions. Shapes also matter: Octagons = stop; Triangles = yield; Diamonds = warning; Rectangles = regulatory or informational.",
    category: "traffic-signs",
    tags: [
      "shapes",
      "colors",
      "meanings",
      "octagon",
      "triangle",
      "diamond",
      "rectangle",
    ],
  },

  // G1/G2 Licensing Process
  {
    id: "graduated-licensing-system",
    question: "How does Ontario's Graduated Licensing System work?",
    answer:
      "Ontario uses a two-step graduated licensing system that takes at least 20 months to complete: 1) G1 Level (12 months, or 8 with driver education) - requires accompanying driver, has restrictions; 2) G2 Level (at least 12 months) - can drive alone but with some restrictions for drivers under 20; 3) Full G License - complete driving privileges after passing the final road test.",
    category: "licensing",
    tags: ["graduated-licensing", "g1", "g2", "full-g", "20-months", "steps"],
  },
  {
    id: "g1-requirements",
    question: "What are the requirements to get a G1 license?",
    answer:
      "To get your G1 license, you must: be at least 16 years old, provide acceptable identification (passport, birth certificate, etc.), pass a vision test, pass a knowledge test covering traffic laws and signs, and pay the required fees. The fee includes your knowledge test, first road test, and 5-year license fee.",
    category: "licensing",
    tags: [
      "g1-requirements",
      "age-16",
      "identification",
      "vision-test",
      "knowledge-test",
      "fees",
    ],
  },
  {
    id: "g1-restrictions",
    question: "What restrictions apply to G1 drivers?",
    answer:
      "G1 restrictions include: zero blood-alcohol level, must have an accompanying driver (4+ years experience, BAC under 0.05%), no driving on 400-series highways over 80 km/h, no driving on high-speed roads like QEW or DVP, no driving between midnight and 5 a.m., and all passengers must wear seatbelts. Violations can result in license suspension.",
    category: "licensing",
    tags: [
      "g1-restrictions",
      "accompanying-driver",
      "highways",
      "midnight",
      "seatbelts",
      "zero-alcohol",
    ],
  },
  {
    id: "g2-restrictions",
    question: "What restrictions apply to G2 drivers?",
    answer:
      "G2 restrictions include: zero blood-alcohol level for drivers 21 and under, all passengers must wear seatbelts, and for drivers 19 and under between midnight-5 a.m.: only 1 passenger aged 19 or under for first 6 months, then up to 3 passengers aged 19 or under. Exemptions apply when accompanied by a fully licensed driver or when passengers are immediate family members.",
    category: "licensing",
    tags: [
      "g2-restrictions",
      "zero-alcohol",
      "passengers",
      "midnight",
      "19-under",
      "family-exemption",
    ],
  },
  {
    id: "road-test-preparation",
    question: "How do I prepare for the G1 exit and G2 exit road tests?",
    answer:
      "For road tests: practice with a qualified instructor or experienced driver, ensure you're comfortable with all driving maneuvers (parking, three-point turns, lane changes), know the rules of the road thoroughly, practice on various road types including highways (for G2 exit), and book your test when you feel confident and skilled. Bring a proper vehicle that's insured and in good condition.",
    category: "licensing",
    tags: [
      "road-test",
      "preparation",
      "instructor",
      "maneuvers",
      "practice",
      "vehicle",
    ],
  },
  {
    id: "driver-education-benefits",
    question: "Should I take a driver education course?",
    answer:
      "Yes! Ministry-approved Beginner Driver Education (BDE) courses offer several benefits: reduce G1 waiting period from 12 to 8 months, potential insurance premium savings, professional instruction covering strategic driving techniques, risk management, and adverse condition driving. Courses require minimum 40 hours (20 classroom + 10 in-vehicle + 10 flexible instruction).",
    category: "licensing",
    tags: [
      "driver-education",
      "bde",
      "benefits",
      "8-months",
      "insurance",
      "40-hours",
    ],
  },

  // AI Assistant
  {
    id: "ai-assistant-features",
    question: "What can the AI Assistant help me with?",
    answer:
      "Our AI Assistant is powered by official MTO documents and can help you with: answering specific driving law questions, explaining traffic signs and their meanings, clarifying road rules and regulations, providing study tips and guidance, helping you understand complex driving scenarios, and offering personalized assistance based on official Ontario driving standards.",
    category: "ai-assistant",
    tags: [
      "ai-features",
      "mto-documents",
      "questions",
      "explanations",
      "study-tips",
    ],
  },
  {
    id: "ai-accuracy",
    question: "How accurate is the AI Assistant?",
    answer:
      "Our AI Assistant is trained on official Ministry of Transportation Ontario (MTO) documents and provides information based on current Ontario driving laws and regulations. While the AI strives for accuracy, always refer to official MTO sources for legal requirements and consult with qualified driving instructors for personalized guidance. The AI is designed to supplement, not replace, official study materials.",
    category: "ai-assistant",
    tags: [
      "accuracy",
      "official-sources",
      "mto",
      "supplement",
      "legal-requirements",
    ],
  },
  {
    id: "ai-usage-tips",
    question: "How do I get the best results from the AI Assistant?",
    answer:
      "For best results: ask specific, clear questions rather than vague ones, provide context when asking about driving scenarios, ask follow-up questions if you need more detail, use the AI to clarify concepts from the study guide, and ask for examples when learning about traffic laws or signs. The AI works best when you're specific about what you want to learn.",
    category: "ai-assistant",
    tags: [
      "usage-tips",
      "specific-questions",
      "context",
      "follow-up",
      "examples",
    ],
  },
  {
    id: "ai-vs-study-guide",
    question: "Should I use the AI Assistant instead of the Study Guide?",
    answer:
      "No, use them together! The Study Guide provides comprehensive, structured learning of all driving topics, while the AI Assistant offers personalized help and answers to specific questions. Start with the Study Guide for foundational learning, then use the AI Assistant to clarify concepts, get additional examples, or ask questions about specific scenarios you encounter.",
    category: "ai-assistant",
    tags: [
      "combined-use",
      "structured-learning",
      "personalized-help",
      "foundational",
    ],
  },

  // Account & Authentication
  {
    id: "create-account-benefits",
    question: "Do I need to create an account to use DriveTest Pro?",
    answer:
      "You can access most features without an account, including study guides, practice questions, and traffic signs. However, creating a free account enables additional features like progress tracking, personalized study recommendations, accessing the AI Assistant, and syncing your progress across devices. Account creation is quick and only requires basic information.",
    category: "account",
    tags: [
      "account-benefits",
      "free",
      "progress-tracking",
      "sync",
      "ai-access",
    ],
  },
  {
    id: "forgot-password",
    question: "What should I do if I forget my password?",
    answer:
      "If you forget your password, click the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password. Check your email inbox and spam folder for the reset link. If you continue to have issues, ensure you're using the same email address you used to create your account.",
    category: "account",
    tags: ["forgot-password", "reset", "email", "instructions", "spam-folder"],
  },
  {
    id: "change-email-password",
    question: "How do I change my email address or password?",
    answer:
      "To change your account information: log into your account, go to your profile or account settings, update your email address or password as needed, and confirm the changes. For security reasons, you may need to verify your identity or confirm changes via email before they take effect.",
    category: "account",
    tags: [
      "change-email",
      "change-password",
      "account-settings",
      "security",
      "verification",
    ],
  },
  {
    id: "delete-account",
    question: "Can I delete my account?",
    answer:
      "Yes, you can delete your account if needed. Contact our support team through the app or website with your deletion request. Please note that deleting your account will permanently remove your progress, study history, and any personalized settings. This action cannot be undone, so consider whether you might want to use the service again in the future.",
    category: "account",
    tags: [
      "delete-account",
      "permanent",
      "progress-removal",
      "support",
      "cannot-undo",
    ],
  },

  // Technical Support
  {
    id: "app-not-loading",
    question: "What should I do if the app isn't loading or working properly?",
    answer:
      "If you're experiencing technical issues: 1) Check your internet connection, 2) Try refreshing the page or restarting the app, 3) Clear your browser cache and cookies, 4) Try using a different browser or device, 5) Ensure your browser is up to date, 6) Disable browser extensions temporarily. If issues persist, contact support with details about your device and browser.",
    category: "technical",
    tags: [
      "not-loading",
      "technical-issues",
      "troubleshooting",
      "browser",
      "cache",
      "support",
    ],
  },
  {
    id: "browser-compatibility",
    question: "Which browsers and devices are supported?",
    answer:
      "DriveTest Pro works on all modern browsers including Chrome, Firefox, Safari, and Edge. The app is fully responsive and supports smartphones, tablets, laptops, and desktop computers running iOS, Android, Windows, and macOS. For the best experience, ensure your browser is updated to the latest version.",
    category: "technical",
    tags: [
      "browser-compatibility",
      "chrome",
      "firefox",
      "safari",
      "edge",
      "responsive",
      "devices",
    ],
  },
  {
    id: "slow-loading",
    question: "Why is the app loading slowly?",
    answer:
      "Slow loading can be caused by: poor internet connection, browser cache issues, too many open tabs or applications, outdated browser version, or temporary server issues. Try clearing your browser cache, closing unnecessary tabs, checking your internet speed, or accessing the app during off-peak hours. If problems persist, contact support.",
    category: "technical",
    tags: [
      "slow-loading",
      "internet-connection",
      "cache",
      "browser-tabs",
      "server-issues",
    ],
  },
  {
    id: "contact-support",
    question: "How do I contact technical support?",
    answer:
      "For technical support or other questions: use the contact form on our website, email our support team (response within 24-48 hours), or check this FAQ section for common issues. When contacting support, please include details about your device, browser, the specific issue you're experiencing, and any error messages you see.",
    category: "technical",
    tags: [
      "contact-support",
      "response-time",
      "device-details",
      "error-messages",
      "help",
    ],
  },

  // Additional Important Questions
  {
    id: "real-test-differences",
    question: "How similar are your practice tests to the real G1 exam?",
    answer:
      "Our practice tests closely mirror the official G1 exam format: 40 multiple-choice questions, same topics covered, similar question styles, and 30-minute time limit for timed tests. However, the actual exam questions are different and controlled by the Ministry of Transportation. Our tests prepare you for the format, style, and knowledge areas you'll encounter on the real test.",
    category: "practice-tests",
    tags: [
      "real-exam",
      "similar",
      "format",
      "40-questions",
      "mto-controlled",
      "preparation",
    ],
  },
  {
    id: "study-schedule",
    question: "How should I create a study schedule for the G1 test?",
    answer:
      "Recommended study schedule: Week 1-2: Complete study guide chapters 1-4, Week 3-4: Study chapters 5-8 and start practice questions, Week 5-6: Finish remaining chapters and take practice tests regularly, Week 7: Focus on weak areas identified in practice tests, Week 8: Take timed tests and final review. Adjust timing based on your learning pace and confidence level.",
    category: "study-guide",
    tags: [
      "study-schedule",
      "8-weeks",
      "chapters",
      "practice-tests",
      "weak-areas",
      "timing",
    ],
  },
  {
    id: "test-day-tips",
    question: "What should I expect on G1 test day?",
    answer:
      "On test day: arrive early with required identification, bring required fees (if applicable), expect a vision test first, then the 40-question knowledge test on a computer, allow 30 minutes for the knowledge portion, stay calm and read questions carefully, and you'll get your results immediately. If you pass, you'll receive your G1 license and can schedule your road test.",
    category: "licensing",
    tags: [
      "test-day",
      "identification",
      "vision-test",
      "computer-test",
      "results",
      "g1-license",
    ],
  },
];

// Helper functions to work with FAQ data
export const getFAQsByCategory = (categoryId: string): FAQItem[] => {
  return faqData.filter((faq) => faq.category === categoryId);
};

export const searchFAQs = (searchTerm: string): FAQItem[] => {
  const term = searchTerm.toLowerCase();
  return faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(term) ||
      faq.answer.toLowerCase().includes(term) ||
      faq.tags?.some((tag) => tag.toLowerCase().includes(term))
  );
};

export const getFAQById = (id: string): FAQItem | undefined => {
  return faqData.find((faq) => faq.id === id);
};

export const getFeaturedFAQs = (): FAQItem[] => {
  // Return most commonly asked questions
  const featuredIds = [
    "what-is-drivetest-pro",
    "how-to-get-started",
    "practice-vs-quiz-mode",
    "graduated-licensing-system",
    "g1-requirements",
    "ai-assistant-features",
  ];
  return faqData.filter((faq) => featuredIds.includes(faq.id));
};
