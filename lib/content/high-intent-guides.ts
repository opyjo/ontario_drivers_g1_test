import type { GuideArticle } from "./guides";

const KNOWLEDGE_TEST_URL = "https://drivetest.ca/tests/knowledge-tests/";
const FEES_URL = "https://drivetest.ca/tests/fees/";
const HANDBOOK_URL =
  "https://www.ontario.ca/document/official-mto-drivers-handbook";
const SIGNS_URL =
  "https://www.ontario.ca/document/official-mto-drivers-handbook/signs";

export const highIntentGuideArticles: GuideArticle[] = [
  {
    slug: "how-many-questions-ontario-g1-test",
    category: "Test day",
    title: "How Many Questions Are on the Ontario G1 Test?",
    description:
      "Understand the official G1 knowledge-test structure, timing, sections, and how DriveTest Pro's 40-question simulation should be used.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 4,
    intro:
      "DriveTest describes the official knowledge test by its topics, sections, timing, and passing standard rather than promising one fixed public question count.",
    takeaways: [
      "The official test is multiple choice and covers traffic signs and rules of the road.",
      "DriveTest says a knowledge test has two or three sections and typically takes 20 to 30 minutes.",
      "DriveTest Pro's 40-question format is an independent study simulation, not a copy of the official test.",
    ],
    sections: [
      {
        heading: "What DriveTest publishes",
        paragraphs: [
          "DriveTest states that knowledge tests are created by the Ministry of Transportation, are multiple choice, and contain two or three sections. For G1 preparation, the central subject areas are traffic signs and rules of the road.",
          "The current official page does not promise applicants one fixed public question count. Treat websites that guarantee an exact current question total or claim to reproduce the official exam cautiously.",
        ],
      },
      {
        heading: "What to expect on test day",
        paragraphs: [
          "DriveTest says the test is not timed, although it typically takes 20 to 30 minutes and must be finished before the office closes. Results are marked immediately.",
        ],
        bullets: [
          "Read every option before choosing.",
          "Budget time for registration as well as testing.",
          "Prepare for both signs and rules rather than relying on one strong topic.",
        ],
      },
      {
        heading: "Why this app uses 40 questions",
        paragraphs: [
          "DriveTest Pro uses 20 signs questions and 20 rules questions to create a balanced readiness check. That structure is useful for finding a weak section, but it should not be presented as inside information about the live test.",
        ],
      },
    ],
    sources: [{ title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL }],
    practiceHref: "/g1-test-simulation",
    practiceLabel: "Try the 40-question study simulation",
    relatedSlugs: ["g1-test-passing-score", "g1-test-day-checklist"],
  },
  {
    slug: "g1-test-passing-score",
    category: "Test day",
    title: "What Score Do You Need to Pass the Ontario G1 Test?",
    description:
      "Learn DriveTest's current G1 knowledge-test passing standard and how to use section results when planning your next study session.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 4,
    intro:
      "DriveTest currently states that you must earn a total score of at least 80 per cent to pass a knowledge test.",
    takeaways: [
      "The published overall passing standard is at least 80 per cent.",
      "A high overall practice score can still hide a weak signs or rules section.",
      "Practice scores are feedback, not a guarantee of an official result.",
    ],
    sections: [
      {
        heading: "Understand the 80 per cent standard",
        paragraphs: [
          "On the current DriveTest knowledge-test page, the published requirement is a total score of at least 80 per cent. Because official test administration can change, confirm the standard on DriveTest before attending.",
        ],
      },
      {
        heading: "Use section scores, not only the total",
        paragraphs: [
          "Signs and rules require different kinds of recall. Review them separately so that a strong result in one area does not conceal repeated errors in the other.",
        ],
        bullets: [
          "List every missed rule or sign family.",
          "Find the supporting handbook section.",
          "Explain the correct answer without looking at the choices.",
          "Retest the weak topic before another mixed simulation.",
        ],
      },
      {
        heading: "Choose a readiness target",
        paragraphs: [
          "Do not stop studying the first time you reach 80 per cent in practice. Aim to meet the standard consistently across several shuffled attempts while being able to explain your corrections.",
        ],
      },
    ],
    sources: [{ title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL }],
    practiceHref: "/g1-test-simulation",
    practiceLabel: "Check your readiness",
    relatedSlugs: [
      "how-many-questions-ontario-g1-test",
      "what-happens-if-you-fail-g1-test",
    ],
  },
  {
    slug: "what-happens-if-you-fail-g1-test",
    category: "Test day",
    title: "What Happens If You Do Not Pass the Ontario G1 Test?",
    description:
      "Review current DriveTest retest rules, result validity, extra-attempt fees, and a focused plan for preparing after an unsuccessful attempt.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 5,
    intro:
      "An unsuccessful attempt is recoverable: use the result to identify the section that needs work, confirm the current fee, and prepare before trying again.",
    takeaways: [
      "DriveTest says you may pay the applicable fee and try again after an unsuccessful attempt.",
      "Results are valid for one year, and a retest within that period covers only sections that did not meet MTO standards.",
      "The current listed fee for an extra Class G knowledge-test attempt is $16, but fees can change.",
    ],
    sections: [
      {
        heading: "What the official guidance says",
        paragraphs: [
          "DriveTest marks knowledge tests immediately. Its current guidance says unsuccessful applicants can pay the fee and try again. Results remain valid for one year; within that period, only sections that did not meet the MTO standard must be repeated.",
        ],
      },
      {
        heading: "Check the fee before returning",
        paragraphs: [
          "DriveTest currently lists an extra Class G knowledge-test attempt at $16. Verify the fee, centre hours, service disruptions, and accepted payment methods on the official site before travelling.",
        ],
      },
      {
        heading: "Turn the result into a study plan",
        paragraphs: [
          "Avoid immediately repeating random full tests. First rebuild the section that fell short, then use a mixed simulation to confirm that the improvement holds.",
        ],
        bullets: [
          "Write down the topics that felt uncertain.",
          "Review those topics in the official handbook.",
          "Complete focused signs or rules practice.",
          "Explain each missed answer before attempting another simulation.",
        ],
      },
    ],
    sources: [
      { title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL },
      { title: "DriveTest fees", url: FEES_URL },
    ],
    practiceHref: "/g1-practice-test",
    practiceLabel: "Rebuild your weak topics",
    relatedSlugs: ["g1-test-passing-score", "two-week-g1-study-plan"],
  },
  {
    slug: "most-common-g1-test-mistakes",
    category: "Study strategy",
    title: "Common Ontario G1 Test Study Mistakes",
    description:
      "Avoid weak study habits such as memorizing answer positions, skipping explanations, overusing simulations, and ignoring official handbook sources.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 6,
    intro:
      "Many avoidable mistakes happen during preparation: learners repeat familiar questions without checking whether they can apply the underlying rule.",
    takeaways: [
      "Use the official handbook as the source of truth.",
      "Explain why the correct answer is right and why the alternatives are unsafe or incorrect.",
      "Use simulations as readiness checks after focused study, not as the entire study method.",
    ],
    sections: [
      {
        heading: "Mistake: memorizing the option position",
        paragraphs: [
          "Repeatedly seeing the same question order can create familiarity without understanding. Shuffle practice and answer the rule in your own words before looking at the options.",
        ],
      },
      {
        heading: "Mistake: treating every error the same",
        paragraphs: [
          "A sign-recognition miss, a right-of-way misunderstanding, and a rushed reading error need different corrections. Label the reason for each miss so your next study action matches the problem.",
        ],
        bullets: [
          "Knowledge gap: return to the handbook.",
          "Confusing pair: compare the two rules or signs side by side.",
          "Application error: draw or describe the road situation.",
          "Reading error: slow down and identify the exact question being asked.",
        ],
      },
      {
        heading: "Mistake: chasing scores without corrections",
        paragraphs: [
          "A score shows what happened, not what to do next. Spend at least as much attention correcting missed answers as you spend taking another practice set.",
        ],
      },
    ],
    sources: [
      { title: "Official MTO Driver's Handbook", url: HANDBOOK_URL },
      { title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL },
    ],
    practiceHref: "/g1-practice-test",
    practiceLabel: "Practise with explanations",
    relatedSlugs: ["two-week-g1-study-plan", "how-long-study-g1-test"],
  },
  {
    slug: "ontario-road-sign-shapes-colours",
    category: "Road signs",
    title: "Ontario Road-Sign Shapes and Colours Explained",
    description:
      "Learn how Ontario sign shapes and colours help identify stop, yield, school-zone, warning, temporary, regulatory, and direction signs.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 6,
    intro:
      "Shape and colour give drivers an early clue, while the symbol or wording confirms the specific instruction, warning, or destination.",
    takeaways: [
      "A stop sign is eight-sided; a yield sign is triangular; a railway crossing sign is X-shaped.",
      "Warning signs are usually yellow diamonds, while temporary-condition signs are usually orange diamonds.",
      "Regulatory signs give directions that must be obeyed and are commonly rectangular or square.",
    ],
    sections: [
      {
        heading: "Distinctive shapes to recognize first",
        paragraphs: [
          "Ontario's handbook identifies the red eight-sided stop sign, the triangular yield sign with a red border, the five-sided fluorescent yellow-green school-zone sign, and the X-shaped railway crossing sign. Their distinctive outlines help recognition when visibility is limited.",
        ],
      },
      {
        heading: "Colour and shape families",
        paragraphs: [
          "Warning signs are usually diamond-shaped with a yellow background and black symbols. Temporary-condition signs are also usually diamond-shaped but use orange. Information and direction signs are generally rectangular and often green with white lettering.",
        ],
        bullets: [
          "Regulatory: a direction or restriction that must be obeyed.",
          "Warning: a hazard or unusual condition ahead.",
          "Temporary: road work, detours, closures, or temporary control.",
          "Information and direction: routes, services, destinations, and distances.",
        ],
      },
      {
        heading: "Always connect the clue to an action",
        paragraphs: [
          "Do not answer from colour alone. Identify the family, read the symbol or message, then state the action the driver must take. Similar colours can appear in different contexts, and the complete sign controls its meaning.",
        ],
      },
    ],
    sources: [{ title: "Official MTO Driver's Handbook: Signs", url: SIGNS_URL }],
    practiceHref: "/ontario-road-signs-practice-test",
    practiceLabel: "Practise Ontario road signs",
    relatedSlugs: ["common-ontario-road-sign-mistakes"],
  },
  {
    slug: "how-long-study-g1-test",
    category: "Study strategy",
    title: "How Long Should You Study for the Ontario G1 Test?",
    description:
      "Choose a realistic G1 study schedule based on topic mastery, correction quality, and consistent practice rather than a fixed number of hours.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 5,
    intro:
      "There is no official number of study hours that fits every learner; readiness is better measured by consistent understanding across signs and rules.",
    takeaways: [
      "Plan by topics and corrections, not only by hours.",
      "Short, repeated sessions usually support better recall than one last-minute marathon.",
      "You should be able to explain missed answers and meet your practice target consistently.",
    ],
    sections: [
      {
        heading: "Start with a diagnostic",
        paragraphs: [
          "After a first handbook review, try a short signs set and a short rules set. Use the results to decide which chapters deserve more time instead of assigning equal time to every topic.",
        ],
      },
      {
        heading: "Build a repeatable schedule",
        paragraphs: [
          "A practical session combines a small amount of reading, closed-book recall, focused questions, and correction. Repeat this cycle over several days so that you revisit material after a delay.",
        ],
        bullets: [
          "Review one handbook topic.",
          "Summarize the rule without notes.",
          "Answer a focused set of questions.",
          "Record and correct every uncertain answer.",
        ],
      },
      {
        heading: "Use readiness signals",
        paragraphs: [
          "Before test day, look for stable performance across shuffled attempts, few repeated errors, and the ability to explain both signs and road-rule decisions. If one section remains inconsistent, keep the study plan focused there.",
        ],
      },
    ],
    sources: [
      { title: "Official MTO Driver's Handbook", url: HANDBOOK_URL },
      { title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL },
    ],
    practiceHref: "/g1-practice-test",
    practiceLabel: "Find your starting point",
    relatedSlugs: ["two-week-g1-study-plan", "most-common-g1-test-mistakes"],
  },
  {
    slug: "g1-test-cost-locations-languages",
    category: "Test day",
    title: "Ontario G1 Test Cost, Locations, Languages, and Access",
    description:
      "Check current Ontario G1 package and retest fees, where knowledge tests are offered, available languages, audio, and accommodation options.",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-12",
    readingMinutes: 6,
    intro:
      "Confirm operational details directly with DriveTest before travelling because fees, hours, services, and disruptions can change.",
    takeaways: [
      "DriveTest currently lists the Class G1 licence package at $159.75 and an extra knowledge-test attempt at $16.",
      "Knowledge tests are offered at all DriveTest Centres, and regular knowledge testing does not require an appointment.",
      "Class G1 tests are currently offered in 32 languages, with audio and accommodation options available.",
    ],
    sections: [
      {
        heading: "Current listed fees",
        paragraphs: [
          "DriveTest currently lists the Class G1 licence package at $159.75. It includes the knowledge test, one Class G2 road test, and a five-year licence. The listed fee for each extra Class G knowledge-test attempt is $16.",
          "These amounts are time-sensitive. Check the official fee page on the day you plan your visit rather than relying on a saved screenshot or an older article.",
        ],
      },
      {
        heading: "Locations and arrival time",
        paragraphs: [
          "DriveTest says knowledge tests are offered at every DriveTest Centre and are available without an appointment. It recommends arriving at least one hour before closing so there is time to register and complete testing.",
        ],
      },
      {
        heading: "Languages, audio, and accommodations",
        paragraphs: [
          "Computerized and paper Class G1 knowledge tests are currently offered in 32 listed languages. Computer kiosks have an audio function. Verbal tests, interpreters, and some accessible-space requests require advance arrangements or approval, so read the official accommodation instructions before visiting.",
        ],
      },
    ],
    sources: [
      { title: "DriveTest knowledge tests", url: KNOWLEDGE_TEST_URL },
      { title: "DriveTest fees", url: FEES_URL },
    ],
    practiceHref: "/g1-practice-test",
    practiceLabel: "Prepare before your visit",
    relatedSlugs: ["g1-test-day-checklist", "what-happens-if-you-fail-g1-test"],
  },
];
