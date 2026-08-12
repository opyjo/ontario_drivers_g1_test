import { highIntentGuideArticles } from "./high-intent-guides";

export type GuideCategory =
  | "Test day"
  | "Study strategy"
  | "Road signs"
  | "Rules of the road"
  | "Licensing";

export type GuideArticle = {
  slug: string;
  category: GuideCategory;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  intro: string;
  takeaways: string[];
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  sources: Array<{ title: string; url: string }>;
  practiceHref: string;
  practiceLabel: string;
  relatedSlugs?: string[];
};

const foundationalGuideArticles: GuideArticle[] = [
  {
    slug: "g1-test-day-checklist",
    category: "Test day",
    title: "Ontario G1 Test Day Checklist",
    description: "Know what to bring, where to go, and what to expect when taking an Ontario G1 knowledge test.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 5,
    intro: "A calm test day starts with current identification, payment, and testing information—not last-minute guessing.",
    takeaways: ["Confirm accepted original identification before travelling.", "Knowledge tests are available at DriveTest centres without a regular test appointment.", "Check current fees, hours, and service disruptions directly with DriveTest."],
    sections: [
      { heading: "Before leaving home", paragraphs: ["Ontario requires applicants to meet age, residency, vision, identification, and knowledge-test requirements. Accepted documents depend on immigration or citizenship status, so compare your original documents with Ontario's current list."], bullets: ["Bring original accepted identification.", "Bring corrective lenses if you need them for driving.", "Check the centre's hours and arrive with enough time to register and finish.", "Confirm current payment methods and fees."] },
      { heading: "What the knowledge test is like", paragraphs: ["DriveTest describes knowledge tests as multiple choice, not timed, and marked immediately. The test covers traffic signs and rules of the road, and DriveTest currently states that an overall score of at least 80 per cent is required."], bullets: ["Read each question completely.", "Do not use outside help during a proctored test.", "If unsuccessful, review the sections you did not meet before paying for another attempt."] },
      { heading: "Use official operational information", paragraphs: ["Centre hours, fees, identification rules, and service availability can change. This checklist supports preparation, but the official pages below control what you need on the day you apply."] },
    ],
    sources: [
      { title: "Ontario: Get a G driver's licence", url: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers" },
      { title: "DriveTest knowledge tests", url: "https://drivetest.ca/tests/knowledge-tests/" },
      { title: "DriveTest fees", url: "https://drivetest.ca/tests/fees/" },
    ],
    practiceHref: "/g1-practice-test", practiceLabel: "Prepare with G1 practice",
  },
  {
    slug: "g1-licence-restrictions",
    category: "Licensing",
    title: "Ontario G1 Licence Restrictions Explained",
    description: "Review Ontario G1 supervision, alcohol, seatbelt, time, and highway restrictions using current official guidance.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 6,
    intro: "A G1 licence lets a new driver practise only when all Level One conditions are satisfied.",
    takeaways: ["A qualified accompanying driver must sit in the front passenger seat.", "G1 drivers must maintain zero blood alcohol and cannot drive from midnight to 5 a.m.", "Most 400-series highways and high-speed expressways are prohibited unless a certified Ontario driving instructor accompanies the learner."],
    sections: [
      { heading: "Supervision and passengers", paragraphs: ["The accompanying driver needs a full licence and at least four years of driving experience, and must meet Ontario's blood-alcohol requirement. That person must be the only other person in the front seat."], bullets: ["Every passenger needs a working seatbelt.", "The accompanying driver must be ready and legally able to supervise.", "Passenger choices must never interfere with safe control of the vehicle."] },
      { heading: "Time, alcohol, and road restrictions", paragraphs: ["G1 drivers may not drive between midnight and 5 a.m. and must maintain zero blood alcohol. Ontario also restricts G1 driving on 400-series highways and listed high-speed expressways, subject to the certified-instructor exception."], bullets: ["Plan practice sessions outside the prohibited hours.", "Choose roads appropriate for the learner's current ability.", "Confirm that any supervising instructor is certified in Ontario."] },
      { heading: "Check for changes", paragraphs: ["Restrictions are legal requirements, not study tips. Verify the current Ontario page before driving, especially after a policy or licence change."] },
    ],
    sources: [{ title: "Ontario: G1 licence rules", url: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers" }],
    practiceHref: "/g1-rules-of-the-road-practice", practiceLabel: "Practise licensing rules",
  },
  {
    slug: "g1-vs-g2-ontario",
    category: "Licensing",
    title: "G1 vs. G2 in Ontario: What Changes?",
    description: "Compare Ontario G1 and G2 driving privileges, restrictions, waiting periods, and road-test steps.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 6,
    intro: "G1 and G2 are separate stages of Ontario's graduated licensing system, with different supervision and driving privileges.",
    takeaways: ["G1 driving requires a qualified accompanying driver.", "G2 generally allows independent driving on all Ontario roads.", "Novice-driver alcohol and seatbelt requirements continue at G2, and additional passenger restrictions can apply to drivers age 19 and under."],
    sections: [
      { heading: "The G1 stage", paragraphs: ["After passing the vision and knowledge tests, an eligible applicant receives a G1 licence. Most learners wait 12 months before the first road test, or eight months after completing an approved beginner driver education course."], bullets: ["Practise only with qualified supervision.", "Follow the G1 time and highway restrictions.", "Use the waiting period to build consistent observation and control skills."] },
      { heading: "The G2 stage", paragraphs: ["Passing the first road test leads to G2. A G2 driver can generally drive without an accompanying driver, on all Ontario roads, and at any time, but novice conditions still apply."], bullets: ["Maintain zero blood alcohol.", "Carry no more passengers than there are working seatbelts.", "If age 19 or under, review the current overnight passenger restrictions."] },
      { heading: "Moving to a full G licence", paragraphs: ["A learner normally holds G2 for 12 months before attempting the G road test. Ontario gives new drivers up to five years to complete the graduated process, subject to current renewal and retesting rules."] },
    ],
    sources: [{ title: "Ontario graduated licensing", url: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers" }],
    practiceHref: "/study-guide/getting-your-license", practiceLabel: "Study Ontario licensing",
  },
  {
    slug: "ontario-right-of-way-examples",
    category: "Rules of the road",
    title: "Ontario Right-of-Way Rules with Examples",
    description: "Learn who yields at uncontrolled intersections, stop signs, turns, driveways, and pedestrian crossings in Ontario.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 7,
    intro: "Right-of-way rules tell drivers when to let another road user proceed; a signal or assumption never makes an unsafe movement acceptable.",
    takeaways: ["At an uncontrolled intersection, the earlier vehicle proceeds first; simultaneous arrivals yield to the vehicle on the right.", "A turning driver must yield to road users crossing the intended path.", "Drivers entering from a driveway or private road yield to road traffic and pedestrians."],
    sections: [
      { heading: "Uncontrolled intersections", paragraphs: ["When no signs or lights control the intersection, yield to a vehicle that arrived first. If vehicles arrive at the same time from different roads, the driver on the left yields to the driver on the right."], bullets: ["Slow enough to assess every approach.", "Look for pedestrians and cyclists as well as vehicles.", "If the situation is uncertain, avoid forcing the right-of-way."] },
      { heading: "Turns and driveways", paragraphs: ["A driver turning left waits for approaching traffic and for pedestrians crossing the intended path. A right-turning driver also yields to pedestrians and checks for cyclists approaching from behind. A driver entering from a driveway yields before joining the road."], bullets: ["Signal before the movement.", "Check mirrors and blind spots.", "Proceed only when the complete path is clear."] },
      { heading: "Pedestrian crossings", paragraphs: ["Ontario's handbook directs drivers to yield and wait for pedestrians to completely cross at pedestrian crossovers and school crossings with crossing guards. Use the official source for the full legal context."] },
    ],
    sources: [{ title: "Official MTO handbook: Driving through intersections", url: "https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections" }],
    practiceHref: "/g1-rules-of-the-road-practice", practiceLabel: "Practise right-of-way questions",
  },
  {
    slug: "four-way-stop-ontario",
    category: "Rules of the road",
    title: "How a Four-Way Stop Works in Ontario",
    description: "Apply Ontario four-way-stop arrival, yielding, turning, pedestrian, and uncertainty rules step by step.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 5,
    intro: "At an all-way stop, complete stops and careful observation matter before deciding whose turn it is.",
    takeaways: ["The first vehicle to stop proceeds first when it is safe.", "If two vehicles stop at the same time, the vehicle on the left yields to the vehicle on the right.", "Pedestrians and conflicting traffic can still require a driver to wait."],
    sections: [
      { heading: "The basic sequence", paragraphs: ["Come to a complete stop at the required position, scan every approach and crosswalk, identify which vehicle stopped first, then proceed only when your path is clear."], bullets: ["First complete stop: first opportunity to proceed.", "Same-time stop: left yields to right.", "Turning traffic yields to road users in its path."] },
      { heading: "When the order is unclear", paragraphs: ["Do not compete for position. Make eye contact where possible, wait for a clear movement, and avoid entering beside another vehicle if the paths may conflict. Courtesy does not replace the need to confirm that the intersection is safe."], bullets: ["Never assume another driver's signal guarantees a turn.", "Watch for cyclists filtering into view.", "Recheck crosswalks immediately before moving."] },
      { heading: "Why practice scenarios help", paragraphs: ["Draw the intersection, number vehicles by their complete-stop time, and trace each intended path. This turns a memorized rule into a repeatable decision process."] },
    ],
    sources: [{ title: "Official MTO handbook: Intersections and right-of-way", url: "https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections" }],
    practiceHref: "/g1-rules-of-the-road-practice", practiceLabel: "Practise intersection questions",
  },
  {
    slug: "ontario-demerit-points-new-drivers",
    category: "Licensing",
    title: "Ontario Demerit Points for G1 and G2 Drivers",
    description: "Understand how Ontario demerit points accumulate and why novice-driver warnings, suspensions, and escalating penalties differ.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 7,
    intro: "Ontario drivers start at zero and gain demerit points after convictions; novice G1 and G2 drivers face different thresholds and can also face escalating penalties.",
    takeaways: ["Demerit points are added, not deducted, and generally stay on the record for two years from the offence date.", "Ontario currently sends novice drivers warning letters at 2–5 and 6–8 points and suspends at 9 or more points.", "Separate escalating penalties may apply to graduated-licensing violations and serious offences."],
    sections: [
      { heading: "How points accumulate", paragraphs: ["The number of points depends on the conviction. Ontario's current list includes offences ranging from improper turns and seatbelt violations to failing to yield, careless driving, racing, and failing to stop for a school bus."], bullets: ["Start at zero points.", "Points follow convictions for specified offences.", "Do not rely on an old chart; offence values and penalties can change."] },
      { heading: "Novice-driver thresholds", paragraphs: ["Ontario currently identifies G1 and G2 drivers as novice drivers. The published thresholds are a warning at 2–5 points, another warning at 6–8 points, and a 60-day suspension at 9 or more points."], bullets: ["A suspension notice includes its effective date.", "Failure to surrender a suspended licence can create further consequences.", "Reinstatement can require additional testing."] },
      { heading: "Escalating penalties", paragraphs: ["Graduated-licensing violations, offences carrying four or more points, and certain court-ordered suspensions may trigger separate escalating consequences. Always check the current Ontario page or obtain qualified legal advice for an actual charge or suspension."] },
    ],
    sources: [{ title: "Ontario: Understanding demerit points", url: "https://www.ontario.ca/page/understanding-demerit-points" }],
    practiceHref: "/g1-rules-of-the-road-practice", practiceLabel: "Practise rules questions",
  },
  {
    slug: "common-ontario-road-sign-mistakes",
    category: "Road signs",
    title: "Common Ontario Road Sign Study Mistakes",
    description: "Avoid common road-sign study errors by learning sign families, driver actions, and confusing visual patterns.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 6,
    intro: "Road-sign preparation improves when learners connect each visual cue to a required driving action instead of memorizing isolated images.",
    takeaways: ["Identify the sign family before interpreting the symbol.", "Describe the driver action, not only the sign's name.", "Study confusing pairs together and test them in varied order."],
    sections: [
      { heading: "Mistake: memorizing only the label", paragraphs: ["Knowing that an image is a warning sign is incomplete. State the hazard, where it may appear, and how speed, position, or observation should change."], bullets: ["Category", "Meaning", "Required or safest response", "Likely road context"] },
      { heading: "Mistake: ignoring shapes and colours", paragraphs: ["Shapes and colours provide early clues before every symbol is readable. Learn those patterns, then confirm the specific instruction shown on the sign."], bullets: ["Separate regulatory instructions from warnings.", "Distinguish temporary-condition signs from permanent signs.", "Recognize direction and information signs without treating them as commands."] },
      { heading: "Mistake: repeating the same order", paragraphs: ["Shuffle practice, mix categories, and explain missed answers. Repeating a fixed sequence can create recognition of position rather than durable knowledge."] },
    ],
    sources: [{ title: "Official MTO Driver's Handbook: Signs", url: "https://www.ontario.ca/document/official-mto-drivers-handbook/signs" }],
    practiceHref: "/ontario-road-signs-practice-test", practiceLabel: "Practise Ontario road signs",
  },
  {
    slug: "two-week-g1-study-plan",
    category: "Study strategy",
    title: "A Two-Week Ontario G1 Study Plan",
    description: "Follow a focused 14-day plan combining the official handbook, topic review, practice, and simulation feedback.",
    publishedAt: "2026-08-11", updatedAt: "2026-08-11", readingMinutes: 6,
    intro: "A short study plan works best when it alternates reading, retrieval, explanation, and correction rather than repeating full tests every day.",
    takeaways: ["Use the official handbook as the source of truth.", "Separate signs study from rules study before mixing them.", "Schedule time to correct mistakes, not only to produce scores."],
    sections: [
      { heading: "Days 1–4: build the foundation", paragraphs: ["Read the licensing overview and traffic-sign chapters first, taking brief notes in your own words."], bullets: ["Day 1: test process and G1 restrictions.", "Day 2: regulatory and warning signs.", "Day 3: temporary, information, lights, and markings.", "Day 4: retrieve sign meanings without notes."] },
      { heading: "Days 5–10: rules and situations", paragraphs: ["Move through right-of-way, turns, sharing the road, safe driving, difficult conditions, and legal responsibilities."], bullets: ["Days 5–6: intersections and turns.", "Days 7–8: sharing the road and safe driving.", "Days 9–10: weather, emergencies, and licence responsibilities."] },
      { heading: "Days 11–14: practise and correct", paragraphs: ["Use focused practice before a mixed simulation. Build a correction list containing the rule, the correct answer, and the official section that supports it."], bullets: ["Day 11: signs practice and corrections.", "Day 12: rules practice and corrections.", "Day 13: mixed simulation and targeted review.", "Day 14: light review, documents, centre information, and rest."] },
    ],
    sources: [
      { title: "Official MTO Driver's Handbook", url: "https://www.ontario.ca/document/official-mto-drivers-handbook" },
      { title: "DriveTest knowledge tests", url: "https://drivetest.ca/tests/knowledge-tests/" },
    ],
    practiceHref: "/g1-test-simulation", practiceLabel: "Finish with a simulation",
  },
];

export const guideArticles: GuideArticle[] = [
  ...highIntentGuideArticles,
  ...foundationalGuideArticles,
];

export function getGuideArticle(slug: string) { return guideArticles.find((article) => article.slug === slug); }

export function getGuideArticlesBySlugs(slugs: ReadonlyArray<string>): GuideArticle[] {
  return slugs
    .map(getGuideArticle)
    .filter((article): article is GuideArticle => Boolean(article));
}

const chapterGuideSlugs: Record<string, string[]> = {
  "getting-your-license": [
    "g1-licence-restrictions",
    "g1-vs-g2-ontario",
    "g1-test-day-checklist",
  ],
  "traffic-signs-lights-markings": [
    "ontario-road-sign-shapes-colours",
    "common-ontario-road-sign-mistakes",
  ],
  "intersections-right-of-way": [
    "ontario-right-of-way-examples",
    "four-way-stop-ontario",
  ],
  "legal-responsibilities-licence-maintenance": [
    "ontario-demerit-points-new-drivers",
    "what-happens-if-you-fail-g1-test",
  ],
};

export function getGuideArticlesForChapter(chapterId: string): GuideArticle[] {
  return getGuideArticlesBySlugs(
    chapterGuideSlugs[chapterId] ?? [
      "most-common-g1-test-mistakes",
      "two-week-g1-study-plan",
    ]
  );
}

export function getRelatedGuideArticles(
  article: GuideArticle,
  limit = 3
): GuideArticle[] {
  const explicit = (article.relatedSlugs ?? [])
    .map(getGuideArticle)
    .filter((candidate): candidate is GuideArticle => Boolean(candidate));
  const sameCategory = guideArticles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.category === article.category &&
      !explicit.some((item) => item.slug === candidate.slug)
  );
  const remaining = guideArticles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      !explicit.some((item) => item.slug === candidate.slug) &&
      !sameCategory.some((item) => item.slug === candidate.slug)
  );

  return [...explicit, ...sameCategory, ...remaining].slice(0, limit);
}
