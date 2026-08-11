export type PracticeLandingPageData = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  facts: string[];
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  sources: Array<{ title: string; url: string }>;
};

export const practiceLandingPages = {
  g1Practice: {
    path: "/g1-practice-test",
    title: "Ontario G1 Practice Test",
    description: "Prepare for Ontario's G1 knowledge test with focused road-sign and rules practice, clear explanations, and links to current official sources.",
    eyebrow: "G1 practice hub",
    intro: "Build confidence before test day by practising the two knowledge areas Ontario learners need: traffic signs and rules of the road.",
    ctaLabel: "Start mixed G1 practice",
    ctaHref: "/quiz/simulation",
    facts: ["Multiple-choice practice", "Signs and rules coverage", "Immediate explanations", "Self-paced study"],
    sections: [
      { heading: "What the knowledge test checks", paragraphs: ["Ontario knowledge tests assess whether you understand traffic signs and the rules of the road. DriveTest says knowledge tests are multiple choice, not timed, marked immediately, and require an overall score of at least 80 per cent."], bullets: ["Review the handbook before relying on practice questions.", "Study weak topics between attempts.", "Use the official source links below to confirm changing requirements."] },
      { heading: "How to use this practice", paragraphs: ["Begin with one topic, read every explanation, and record the rules you repeatedly miss. Move to a mixed simulation only after you can explain why each answer is correct."], bullets: ["Practise signs", "Practise rules of the road", "Review incorrect answers", "Finish with a full simulation"] },
    ],
    sources: [
      { title: "DriveTest knowledge tests", url: "https://drivetest.ca/tests/knowledge-tests/" },
      { title: "Official MTO Driver's Handbook", url: "https://www.ontario.ca/document/official-mto-drivers-handbook" },
    ],
  },
  signs: {
    path: "/ontario-road-signs-practice-test",
    title: "Ontario Road Signs Practice Test",
    description: "Study Ontario regulatory, warning, temporary, and information signs, then practise identifying their meanings for the G1 test.",
    eyebrow: "Road-sign preparation",
    intro: "Learn what sign shapes, colours, symbols, and instructions mean before testing your recall with Ontario road-sign questions.",
    ctaLabel: "Start road-sign practice",
    ctaHref: "/quiz/signs/setup",
    facts: ["Regulatory signs", "Warning signs", "Temporary-condition signs", "Information signs"],
    sections: [
      { heading: "Learn patterns, not isolated pictures", paragraphs: ["Ontario signs communicate laws, hazards, and directions through consistent visual patterns. Grouping signs by purpose makes them easier to recognize when wording or symbols change."], bullets: ["Regulatory signs tell road users what they must or must not do.", "Warning signs identify hazards or changing road conditions.", "Temporary signs guide drivers through construction or unusual conditions.", "Information signs help with routes, destinations, and services."] },
      { heading: "A better practice routine", paragraphs: ["Name the sign category first, then describe the required driver action. If you miss a sign, revisit the corresponding handbook section instead of memorizing only the answer position."] },
    ],
    sources: [{ title: "Official MTO Driver's Handbook: Signs", url: "https://www.ontario.ca/document/official-mto-drivers-handbook/signs" }],
  },
  rules: {
    path: "/g1-rules-of-the-road-practice",
    title: "Ontario G1 Rules of the Road Practice",
    description: "Practise Ontario right-of-way, intersections, safe driving, licensing rules, and other rules-of-the-road topics for the G1 test.",
    eyebrow: "Rules-of-the-road preparation",
    intro: "Turn handbook rules into decisions you can apply at intersections, around vulnerable road users, and in changing driving conditions.",
    ctaLabel: "Start rules practice",
    ctaHref: "/quiz/rules/setup",
    facts: ["Right-of-way", "Intersections", "Safe driving", "Licence responsibilities"],
    sections: [
      { heading: "Focus on decisions", paragraphs: ["Rules questions often describe a situation rather than asking for a definition. Practise identifying who must stop, who must yield, and what action creates the safest legal outcome."], bullets: ["Controlled and uncontrolled intersections", "Turns, lane changes, and passing", "Sharing the road with pedestrians and cyclists", "Emergencies, weather, and night driving"] },
      { heading: "Explain each answer", paragraphs: ["After answering, state the rule in your own words and identify the official handbook section that supports it. This reduces guesswork and exposes rules that need another review."] },
    ],
    sources: [{ title: "Official MTO Driver's Handbook: Safe and responsible driving", url: "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving" }],
  },
  simulation: {
    path: "/g1-test-simulation",
    title: "Ontario G1 Test Simulation",
    description: "Try a 40-question Ontario G1 study simulation covering road signs and rules, then review explanations for the questions you miss.",
    eyebrow: "Full practice simulation",
    intro: "Use a mixed 40-question simulation as a readiness check after completing focused signs and rules practice.",
    ctaLabel: "Start the 40-question simulation",
    ctaHref: "/quiz/simulation",
    facts: ["40 study questions", "20 signs and 20 rules", "Immediate result", "Incorrect-answer review"],
    sections: [
      { heading: "Use simulations at the right time", paragraphs: ["A simulation is most useful after topic study. Treat the score as feedback about your preparation, not as a prediction or guarantee of an official test result."], bullets: ["Take one uninterrupted attempt.", "Review every missed question.", "Return to the relevant study-guide section.", "Repeat only after additional study."] },
      { heading: "Know the difference", paragraphs: ["This is an independent study simulation, not an official MTO or DriveTest exam. Official knowledge tests are created by the Ministry of Transportation and administered through authorized testing locations."] },
    ],
    sources: [{ title: "DriveTest knowledge-test information", url: "https://drivetest.ca/tests/knowledge-tests/" }],
  },
} satisfies Record<string, PracticeLandingPageData>;

export const practiceLandingPageList = Object.values(practiceLandingPages);
