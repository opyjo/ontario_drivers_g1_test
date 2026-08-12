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
  topicLinks: Array<{ title: string; description: string; href: string }>;
  sampleQuestions: Array<{
    question: string;
    answer: string;
    explanation: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
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
    topicLinks: [
      {
        title: "Traffic signs and signals",
        description: "Review sign families, traffic lights, and pavement markings.",
        href: "/study-guide/traffic-signs-lights-markings/introduction-signs",
      },
      {
        title: "Intersections and right-of-way",
        description: "Study yielding decisions and priority at Ontario intersections.",
        href: "/study-guide/intersections-right-of-way/right-of-way-rules",
      },
      {
        title: "G1 requirements and restrictions",
        description: "Understand the responsibilities that apply to Level One drivers.",
        href: "/study-guide/getting-your-license/level-one-g1",
      },
    ],
    sampleQuestions: [
      {
        question: "How should you respond when approaching a yield sign?",
        answer: "Slow down, give the right-of-way, and stop if necessary.",
        explanation: "Proceed only after yielding to traffic and pedestrians and confirming that the way is clear.",
      },
      {
        question: "What is a safe minimum following gap in ideal conditions?",
        answer: "At least two seconds behind the vehicle ahead.",
        explanation: "Increase the gap to three or four seconds or more when weather, visibility, or road conditions are poor.",
      },
      {
        question: "How is the DriveTest Pro full simulation divided?",
        answer: "Twenty traffic-sign questions and twenty rules questions.",
        explanation: "The 40-question format provides a balanced readiness check after focused topic practice.",
      },
    ],
    faqs: [
      {
        question: "Are these official Ontario knowledge-test questions?",
        answer: "No. DriveTest Pro is an independent study resource. Its questions are based on reviewed Ontario handbook material, but official test questions are controlled by the Ministry of Transportation.",
      },
      {
        question: "How many questions are available?",
        answer: "The active bank contains 700 questions: 300 road-sign questions and 400 rules-of-the-road questions. Each practice session uses a focused selection from that bank.",
      },
      {
        question: "What is the best order for studying?",
        answer: "Start with focused signs and rules practice, read every explanation, revisit weak study-guide topics, and finish with a mixed 40-question simulation.",
      },
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
    topicLinks: [
      {
        title: "Regulatory signs",
        description: "Learn signs that impose rules, restrictions, and lane controls.",
        href: "/study-guide/traffic-signs-lights-markings/regulatory-signs",
      },
      {
        title: "Warning signs",
        description: "Recognize hazards, curves, intersections, and changing road conditions.",
        href: "/study-guide/traffic-signs-lights-markings/warning-signs",
      },
      {
        title: "Temporary-condition signs",
        description: "Prepare for construction zones, road work, and temporary controls.",
        href: "/study-guide/traffic-signs-lights-markings/temporary-construction-signs",
      },
    ],
    sampleQuestions: [
      {
        question: "What must you do at a yield sign?",
        answer: "Slow down, give the right-of-way, and stop if necessary.",
        explanation: "You may proceed only when the way is clear and your movement will not interfere with other road users.",
      },
      {
        question: "What do orange road-work signs warn drivers about?",
        answer: "Temporary construction, maintenance, or changing road conditions.",
        explanation: "Reduce speed, stay alert, and obey workers, signs, and temporary traffic controls.",
      },
      {
        question: "What does an orange triangle with a red border on the rear of a vehicle mean?",
        answer: "It identifies a slow-moving vehicle that normally travels at 40 km/h or less.",
        explanation: "Approach cautiously, leave extra space, and pass only when it is legal and safe.",
      },
    ],
    faqs: [
      {
        question: "How many road-sign questions are in the bank?",
        answer: "There are 300 active road-sign questions covering recognition, meaning, and application in realistic driving situations.",
      },
      {
        question: "Should I memorize every sign picture?",
        answer: "Learn each sign's category, shape, colour, meaning, and required driver action. Understanding those patterns is more reliable than memorizing an answer position.",
      },
      {
        question: "Why can one sign support several questions?",
        answer: "A driver must do more than name a sign. Practice can also test the correct approach speed, yielding decision, lane choice, or hazard response associated with the same sign.",
      },
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
    topicLinks: [
      {
        title: "Right-of-way rules",
        description: "Review yielding principles and priority situations at intersections.",
        href: "/study-guide/intersections-right-of-way/right-of-way-rules",
      },
      {
        title: "Lane changes",
        description: "Practise mirror checks, signaling, blind-spot checks, and safe gaps.",
        href: "/study-guide/changing-directions-positions/lane-changes",
      },
      {
        title: "Following distance",
        description: "Learn how road and weather conditions change the space you need.",
        href: "/study-guide/safe-responsible-driving-fundamentals/following-distance-space",
      },
    ],
    sampleQuestions: [
      {
        question: "What does a flashing red traffic light require?",
        answer: "Come to a complete stop, yield, and proceed only when it is safe.",
        explanation: "Treat the signal like a stop sign and check that the intersection is clear before moving.",
      },
      {
        question: "What checks should you make before changing lanes?",
        answer: "Check traffic and mirrors, signal, check the appropriate blind spot, and move only when the gap is safe.",
        explanation: "Mirrors do not show every nearby cyclist, motorcycle, pedestrian, or vehicle, so a shoulder check is essential.",
      },
      {
        question: "How can you measure a two-second following gap?",
        answer: "Count two seconds after the vehicle ahead passes a fixed object.",
        explanation: "If you reach the object before finishing the count, drop back and repeat the check.",
      },
    ],
    faqs: [
      {
        question: "How many rules questions are available?",
        answer: "There are 400 active rules-of-the-road questions covering intersections, safe driving, licensing responsibilities, road users, weather, emergencies, and other handbook topics.",
      },
      {
        question: "Are rules questions only about memorizing numbers?",
        answer: "No. Many questions describe a driving situation and ask you to apply right-of-way, observation, signaling, speed, or space-management rules.",
      },
      {
        question: "How should I review a missed rules question?",
        answer: "Read the explanation, state the rule in your own words, and follow the related study-guide link before attempting another mixed simulation.",
      },
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
    topicLinks: [
      {
        title: "Traffic signs overview",
        description: "Refresh sign categories before attempting the signs section.",
        href: "/study-guide/traffic-signs-lights-markings/introduction-signs",
      },
      {
        title: "Intersections and right-of-way",
        description: "Review common decision points before the rules section.",
        href: "/study-guide/intersections-right-of-way/right-of-way-rules",
      },
      {
        title: "Practice scenarios and answers",
        description: "Use worked scenarios to improve your answer-review process.",
        href: "/study-guide/legal-responsibilities-licence-maintenance/sample-test-questions",
      },
    ],
    sampleQuestions: [
      {
        question: "A traffic light is flashing red. What should you do?",
        answer: "Stop completely, yield, and continue only when the intersection is clear.",
        explanation: "The flashing red signal is handled like a stop sign rather than a caution-only signal.",
      },
      {
        question: "You see an orange road-work sign ahead. What is the safest response?",
        answer: "Reduce speed, stay alert, and follow temporary signs and traffic-control directions.",
        explanation: "Construction conditions can change lane paths, surfaces, speeds, and the location of workers.",
      },
      {
        question: "When should you increase a two-second following distance?",
        answer: "When weather, visibility, traffic, or road conditions make stopping more difficult.",
        explanation: "Use at least three or four seconds or more when conditions are poor.",
      },
    ],
    faqs: [
      {
        question: "How many questions are in the simulation?",
        answer: "The simulation contains 40 questions: 20 traffic-sign questions and 20 rules-of-the-road questions.",
      },
      {
        question: "Is the simulation timed?",
        answer: "No. It is untimed so you can read carefully and treat the result as a study diagnostic rather than a speed exercise.",
      },
      {
        question: "What score should I aim for?",
        answer: "DriveTest Pro uses at least 16 correct answers in each 20-question section as its readiness standard. Meeting that benchmark is useful feedback, not a guarantee of an official result.",
      },
    ],
    sources: [{ title: "DriveTest knowledge-test information", url: "https://drivetest.ca/tests/knowledge-tests/" }],
  },
} satisfies Record<string, PracticeLandingPageData>;

export const practiceLandingPageList = Object.values(practiceLandingPages);
