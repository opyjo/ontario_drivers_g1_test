// Server Actions for Quiz Database Integration
// Direct integration with Supabase DB functions with robust offline/preview fallback

"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Question, QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS, G1_TEST_CONFIG } from "./constants";
import { isValidQuestion } from "./utils";
import type {
  QuizAccessDecision,
  QuizAccessReason,
  QuizStartResult,
} from "./access";

const ANONYMOUS_TRIAL_COOKIE = "g1_anonymous_practice_session";
const ANONYMOUS_TRIAL_MAX_AGE = 60 * 60 * 24 * 365;

async function consumeQuizAccess(
  mode: "practice" | "simulation",
  questionLimit: QuestionLimit,
  sessionId: string
): Promise<QuizAccessDecision> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (mode === "simulation") {
      return {
        allowed: false,
        isAuthenticated: false,
        isPaid: false,
        reason: "sign_in_required",
        practiceRemaining: null,
        simulationRemaining: null,
        resetAt: null,
      };
    }

    if (questionLimit !== QUESTION_LIMITS.QUICK_PRACTICE) {
      return {
        allowed: false,
        isAuthenticated: false,
        isPaid: false,
        reason: "upgrade_required",
        practiceRemaining: null,
        simulationRemaining: null,
        resetAt: null,
      };
    }

    const cookieStore = await cookies();
    const hasUsedGuestPractice = Boolean(
      cookieStore.get(ANONYMOUS_TRIAL_COOKIE)?.value
    );
    if (hasUsedGuestPractice) {
      return {
        allowed: false,
        isAuthenticated: false,
        isPaid: false,
        reason: "sign_in_required",
        practiceRemaining: 0,
        simulationRemaining: null,
        resetAt: null,
      };
    }

    cookieStore.set(ANONYMOUS_TRIAL_COOKIE, "used", {
      httpOnly: true,
      maxAge: ANONYMOUS_TRIAL_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      allowed: true,
      isAuthenticated: false,
      isPaid: false,
      reason: "allowed",
      practiceRemaining: 0,
      simulationRemaining: null,
      resetAt: null,
    };
  }

  const { data, error } = await supabase.rpc("consume_quiz_access", {
    p_mode: mode,
    p_question_limit: questionLimit,
    p_session_id: sessionId,
  });
  const row = data?.[0];

  if (error || !row) {
    console.error("Quiz entitlement check failed:", error?.message);
    return {
      allowed: false,
      isAuthenticated: true,
      isPaid: false,
      reason: "service_unavailable",
      practiceRemaining: null,
      simulationRemaining: null,
      resetAt: null,
    };
  }

  return {
    allowed: row.allowed,
    isAuthenticated: true,
    isPaid: row.is_paid,
    reason: row.reason as QuizAccessReason,
    practiceRemaining: row.practice_remaining,
    simulationRemaining: row.simulation_remaining,
    resetAt: row.reset_at,
  };
}

const formatFallback = (q: any): Question => ({
  id: q.id,
  question_text: q.question_text,
  question_type: q.question_type,
  option_a: q.option_a,
  option_b: q.option_b,
  option_c: q.option_c,
  option_d: q.option_d,
  correct_option: q.correct_option,
  category: q.category || "General",
  explanation: q.explanation || "Refer to the official MTO Driver's Handbook for complete regulations.",
  image_url: q.image_url || null,
  image_description: q.image_description || null,
  learning_topic:
    q.question_type === "signs" ? "Road signs" : "Safe and responsible driving",
  handbook_section:
    q.question_type === "signs"
      ? "Traffic signs and lights"
      : "Safe and responsible driving",
  handbook_url:
    q.question_type === "signs"
      ? "https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-signs-and-lights"
      : "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving",
});

const RAW_SIGNS: any[] = [
  {
    id: 1001,
    question_text: "What does an octagonal red traffic sign signify?",
    option_a: "Yield right of way",
    option_b: "Come to a complete stop and proceed when safe",
    option_c: "Slow down and proceed with caution",
    option_d: "No entry allowed",
    correct_option: "B",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1002,
    question_text: "What does a triangular upside-down red and white sign mean?",
    option_a: "Stop completely",
    option_b: "Yield right-of-way to other traffic",
    option_c: "School zone ahead",
    option_d: "One way street",
    correct_option: "B",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1003,
    question_text: "What does a diamond-shaped yellow sign indicate?",
    option_a: "Regulatory instruction",
    option_b: "Warning of hazardous or changing road conditions ahead",
    option_c: "Hospital direction",
    option_d: "Construction area ahead",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1004,
    question_text: "What does a green circular sign with an arrow pointing straight mean?",
    option_a: "Straight through movement permitted",
    option_b: "Must turn right",
    option_c: "No entry",
    option_d: "Detour ahead",
    correct_option: "A",
    question_type: "signs",
    category: "Information Signs",
  },
  {
    id: 1005,
    question_text: "What does a sign showing a black crossbuck with 'Railway Crossing' mean?",
    option_a: "Subway station ahead",
    option_b: "Approach with caution and yield to trains at railway tracks",
    option_c: "Construction work ahead",
    option_d: "Pedestrian crosswalk",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1006,
    question_text: "What does a pentagon-shaped fluorescent yellow-green sign indicate?",
    option_a: "Hospital zone",
    option_b: "School area or school crosswalk ahead",
    option_c: "Playground zone",
    option_d: "Bus terminal",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1007,
    question_text: "What does a sign with a red slash over a U-turn arrow mean?",
    option_a: "U-turns allowed only at night",
    option_b: "U-turns prohibited at this location",
    option_c: "Right turns only",
    option_d: "Sharp left curve ahead",
    correct_option: "B",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1008,
    question_text: "What does an orange diamond sign with a figure digging indicate?",
    option_a: "Archaeological site",
    option_b: "Road construction or maintenance work ahead",
    option_c: "Farm area",
    option_d: "Detour ends",
    correct_option: "B",
    question_type: "signs",
    category: "Temporary Signs",
  },
  {
    id: 1009,
    question_text: "What does a sign with a white background and black text showing 'SPEED LIMIT 50' mean?",
    option_a: "Suggested speed in good weather",
    option_b: "Maximum legal speed limit under ideal conditions is 50 km/h",
    option_c: "Minimum speed requirement",
    option_d: "Truck speed limit only",
    correct_option: "B",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1010,
    question_text: "What does a yellow diamond sign with a symbol of a truck going down a slope mean?",
    option_a: "Truck parking ahead",
    option_b: "Steep hill or downgrade ahead, drivers should check brakes",
    option_c: "No heavy trucks allowed",
    option_d: "Bridge ahead",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1011,
    question_text: "What does a sign showing a black bicycle inside a green circle mean?",
    option_a: "Bicycles prohibited",
    option_b: "Designated bicycle route or lane",
    option_c: "Bicycle shop ahead",
    option_d: "Watch for pedestrians",
    correct_option: "B",
    question_type: "signs",
    category: "Information Signs",
  },
  {
    id: 1012,
    question_text: "What does a red circle with a white horizontal bar in the center signify?",
    option_a: "Do Not Enter",
    option_b: "Yield Right of Way",
    option_c: "Stop and Wait",
    option_d: "No Parking",
    correct_option: "A",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1013,
    question_text: "What does a yellow diamond sign with a squiggly arrow pointing up indicate?",
    option_a: "Winding road ahead",
    option_b: "Slippery road when wet",
    option_c: "Detour ahead",
    option_d: "Merge lanes",
    correct_option: "A",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1014,
    question_text: "What does a sign showing two arrows pointing in opposite directions vertically mean?",
    option_a: "One-way street",
    option_b: "Two-way traffic ahead",
    option_c: "Divided highway begins",
    option_d: "No passing zone",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1015,
    question_text: "What does a blue square sign with a white 'H' symbol mean?",
    option_a: "Hotel ahead",
    option_b: "Hospital location nearby",
    option_c: "Highway entrance",
    option_d: "Helipad",
    correct_option: "B",
    question_type: "signs",
    category: "Information Signs",
  },
  {
    id: 1016,
    question_text: "What does a yellow diamond sign with a car leaving skid marks mean?",
    option_a: "Car race track",
    option_b: "Road surface is slippery when wet",
    option_c: "Brake testing area",
    option_d: "Rough road",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1017,
    question_text: "What does a sign showing a black arrow merging into a main line mean?",
    option_a: "Lane ends ahead",
    option_b: "Traffic merging from the right",
    option_c: "Turn right only",
    option_d: "Highway exit",
    correct_option: "B",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1018,
    question_text: "What does a white rectangular sign displaying a black arrow pointing right with 'ONLY' mean?",
    option_a: "Lane must turn right only",
    option_b: "Right turn optional",
    option_c: "One-way street to the right",
    option_d: "No right turn",
    correct_option: "A",
    question_type: "signs",
    category: "Regulatory Signs",
  },
  {
    id: 1019,
    question_text: "What does a yellow diamond sign with a traffic light symbol mean?",
    option_a: "Traffic signals ahead, prepare to stop if necessary",
    option_b: "Broken traffic light",
    option_c: "Police check-point",
    option_d: "Toll booth ahead",
    correct_option: "A",
    question_type: "signs",
    category: "Warning Signs",
  },
  {
    id: 1020,
    question_text: "What does a green sign with a white P inside a green circle mean?",
    option_a: "Parking permitted as posted",
    option_b: "No parking allowed",
    option_c: "Police station",
    option_d: "Park area",
    correct_option: "A",
    question_type: "signs",
    category: "Regulatory Signs",
  },
];

const FALLBACK_SIGNS_QUESTIONS: Question[] = RAW_SIGNS.map(formatFallback);

const RAW_RULES: any[] = [
  {
    id: 2001,
    question_text: "As a G1 driver in Ontario, what is the allowable Blood Alcohol Concentration (BAC) limit?",
    option_a: "0.05%",
    option_b: "0.08%",
    option_c: "Exactly 0.00%",
    option_d: "0.02%",
    correct_option: "C",
    question_type: "rules",
    category: "G1 License Rules",
  },
  {
    id: 2002,
    question_text: "Between what hours are G1 licence holders prohibited from driving in Ontario?",
    option_a: "10:00 PM to 5:00 AM",
    option_b: "Midnight to 5:00 AM",
    option_c: "11:00 PM to 6:00 AM",
    option_d: "Midnight to 6:00 AM",
    correct_option: "B",
    question_type: "rules",
    category: "G1 License Rules",
  },
  {
    id: 2003,
    question_text: "Who must accompany a G1 driver in the front passenger seat?",
    option_a: "Any licensed driver over 18",
    option_b: "A fully licensed driver (G) with at least 4 years of driving experience",
    option_c: "A family member over 21",
    option_d: "Any G2 driver",
    correct_option: "B",
    question_type: "rules",
    category: "G1 License Rules",
  },
  {
    id: 2004,
    question_text: "At an intersection without signs or signals, who has the right of way?",
    option_a: "The vehicle approaching from the left",
    option_b: "The vehicle approaching from the right",
    option_c: "The fastest moving vehicle",
    option_d: "The vehicle turning left",
    correct_option: "B",
    question_type: "rules",
    category: "Right of Way",
  },
  {
    id: 2005,
    question_text: "What must a driver do when an emergency vehicle with flashing red or blue lights approaches from any direction on an undivided road?",
    option_a: "Speed up to clear the intersection",
    option_b: "Pull over to the nearest curb or edge of the road and stop",
    option_c: "Maintain speed and change lanes",
    option_d: "Sound your horn to warn others",
    correct_option: "B",
    question_type: "rules",
    category: "Emergency Vehicles",
  },
  {
    id: 2006,
    question_text: "When approaching a stopped school bus with red lights flashing on an undivided highway, drivers coming from both directions must:",
    option_a: "Slow down to 20 km/h",
    option_b: "Stop at least 20 meters away and wait until red lights stop flashing",
    option_c: "Proceed carefully if no children are visible",
    option_d: "Honk horn and pass slowly",
    correct_option: "B",
    question_type: "rules",
    category: "School Bus Safety",
  },
  {
    id: 2007,
    question_text: "When driving in bad weather or fog, which headlights should you use?",
    option_a: "High beams",
    option_b: "Low beams",
    option_c: "Hazard lights only",
    option_d: "No lights required during daytime",
    correct_option: "B",
    question_type: "rules",
    category: "Safe Driving Practices",
  },
  {
    id: 2008,
    question_text: "What is the minimum safe following distance behind another vehicle under normal driving conditions?",
    option_a: "At least 1 second",
    option_b: "At least 2 seconds",
    option_c: "5 car lengths",
    option_d: "10 meters",
    correct_option: "B",
    question_type: "rules",
    category: "Safe Driving Practices",
  },
  {
    id: 2009,
    question_text: "If your vehicle begins to skid on an icy road, what should you do?",
    option_a: "Slam hard on the brakes",
    option_b: "Steer smoothly in the direction you want the vehicle to go",
    option_c: "Turn the steering wheel sharply in the opposite direction",
    option_d: "Accelerate to regain traction",
    correct_option: "B",
    question_type: "rules",
    category: "Emergency Situations",
  },
  {
    id: 2010,
    question_text: "Unless otherwise posted, what is the maximum speed limit in cities, towns, and villages in Ontario?",
    option_a: "40 km/h",
    option_b: "50 km/h",
    option_c: "60 km/h",
    option_d: "80 km/h",
    correct_option: "B",
    question_type: "rules",
    category: "Speed Limits",
  },
  {
    id: 2011,
    question_text: "What is the penalty for a G1 or G2 driver who accumulates 6 or more demerit points?",
    option_a: "A warning letter",
    option_b: "30-day licence suspension for first offence",
    option_c: "Immediate licence revocation for 5 years",
    option_d: "$100 fine only",
    correct_option: "B",
    question_type: "rules",
    category: "Demerit Points System",
  },
  {
    id: 2012,
    question_text: "When passing a cyclist on Ontario roads, how much distance must drivers maintain where possible?",
    option_a: "At least 0.5 meters",
    option_b: "At least 1 meter",
    option_c: "At least 2 meters",
    option_d: "3 meters",
    correct_option: "B",
    question_type: "rules",
    category: "Sharing the Road",
  },
  {
    id: 2013,
    question_text: "When entering a roundabout, who must you yield to?",
    option_a: "Vehicles approaching from the right",
    option_b: "Traffic already inside the roundabout and pedestrians at crosswalks",
    option_c: "No one, you have automatic right of way",
    option_d: "Bicycles only",
    correct_option: "B",
    question_type: "rules",
    category: "Intersection Rules",
  },
  {
    id: 2014,
    question_text: "When turning right on a red light at an intersection where it is permitted, you must first:",
    option_a: "Slow down and turn quickly",
    option_b: "Come to a complete stop, yield to pedestrians and oncoming traffic, then proceed",
    option_c: "Honk your horn to alert pedestrians",
    option_d: "Wait for the light to turn green",
    correct_option: "B",
    question_type: "rules",
    category: "Traffic Light Rules",
  },
  {
    id: 2015,
    question_text: "If you are involved in a collision where total property damage appears to exceed $5,000, you must:",
    option_a: "Exchange insurance and leave without reporting",
    option_b: "Report the collision immediately to the nearest police station",
    option_c: "Call your mechanic first",
    option_d: "Report to your municipality within 30 days",
    correct_option: "B",
    question_type: "rules",
    category: "Collision Reporting",
  },
  {
    id: 2016,
    question_text: "What should you do before changing lanes?",
    option_a: "Check mirrors, signal intention, and check blind spot over your shoulder",
    option_b: "Signal and turn immediately",
    option_c: "Honk horn and change lanes",
    option_d: "Speed up and check rear mirror only",
    correct_option: "A",
    question_type: "rules",
    category: "Lane Changes & Turning",
  },
  {
    id: 2017,
    question_text: "Are G1 drivers permitted to drive on 400-series highways or the QEW?",
    option_a: "Yes, at any time alone",
    option_b: "No, unless accompanied by a licensed driving instructor",
    option_c: "Yes, provided the speed is under 80 km/h",
    option_d: "Only during daytime hours",
    correct_option: "B",
    question_type: "rules",
    category: "G1 License Rules",
  },
  {
    id: 2018,
    question_text: "What does hydroplaning mean?",
    option_a: "Driving a vehicle with water-cooled engine",
    option_b: "Tires riding on a thin film of water, losing contact with the road",
    option_c: "Washing the car while driving",
    option_d: "Braking hard on dry pavement",
    correct_option: "B",
    question_type: "rules",
    category: "Adverse Weather",
  },
  {
    id: 2019,
    question_text: "When parking downhill with a curb, in which direction should you turn your front wheels?",
    option_a: "Towards the curb (right)",
    option_b: "Away from the curb (left)",
    option_c: "Straight ahead",
    option_d: "It does not matter",
    correct_option: "A",
    question_type: "rules",
    category: "Parking Rules",
  },
  {
    id: 2020,
    question_text: "Who is responsible for ensuring passengers under 16 years old wear their seatbelts?",
    option_a: "The passengers themselves",
    option_b: "The driver of the vehicle",
    option_c: "The parents even if not in the car",
    option_d: "The police officer",
    correct_option: "B",
    question_type: "rules",
    category: "Seatbelt & Safety Laws",
  },
];

const FALLBACK_RULES_QUESTIONS: Question[] = RAW_RULES.map(formatFallback);

// -------------------------------
// 1. Signs practice questions
// -------------------------------
export async function getSignsPracticeQuestions(
  limit: QuestionLimit,
  sessionId: string
): Promise<QuizStartResult> {
  if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
    throw new Error(
      `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(", ")}`
    );
  }

  const access = await consumeQuizAccess("practice", limit, sessionId);
  if (!access.allowed) return { ok: false, questions: [], access };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("get_signs_practice_questions", {
      question_limit: limit,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.warn("Using fallback signs practice dataset:", error?.message || "No data");
      return { ok: true, questions: FALLBACK_SIGNS_QUESTIONS.slice(0, limit), access };
    }

    const validQuestions = (data as unknown[]).filter(
      (q: any): q is Question =>
        isValidQuestion(q) && q.question_type === "signs"
    );

    return {
      ok: true,
      questions:
        validQuestions.length > 0
          ? validQuestions.slice(0, limit)
          : FALLBACK_SIGNS_QUESTIONS.slice(0, limit),
      access,
    };
  } catch (error) {
    console.warn("Falling back to local signs question set due to database connection:", error);
    return { ok: true, questions: FALLBACK_SIGNS_QUESTIONS.slice(0, limit), access };
  }
}

// -------------------------------
// 2. Rules practice questions
// -------------------------------
export async function getRulesPracticeQuestions(
  limit: QuestionLimit,
  sessionId: string
): Promise<QuizStartResult> {
  if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
    throw new Error(
      `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(", ")}`
    );
  }

  const access = await consumeQuizAccess("practice", limit, sessionId);
  if (!access.allowed) return { ok: false, questions: [], access };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("get_rules_practice_questions", {
      question_limit: limit,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.warn("Using fallback rules practice dataset:", error?.message || "No data");
      return { ok: true, questions: FALLBACK_RULES_QUESTIONS.slice(0, limit), access };
    }

    const validQuestions = (data as unknown[]).filter(
      (q: any): q is Question =>
        isValidQuestion(q) && q.question_type === "rules"
    );

    return {
      ok: true,
      questions:
        validQuestions.length > 0
          ? validQuestions.slice(0, limit)
          : FALLBACK_RULES_QUESTIONS.slice(0, limit),
      access,
    };
  } catch (error) {
    console.warn("Falling back to local rules question set due to database connection:", error);
    return { ok: true, questions: FALLBACK_RULES_QUESTIONS.slice(0, limit), access };
  }
}

// -------------------------------
// 3. G1 Simulation (20 signs + 20 rules)
// -------------------------------
export async function getG1SimulationQuestions(
  sessionId: string
): Promise<QuizStartResult> {
  const access = await consumeQuizAccess(
    "simulation",
    QUESTION_LIMITS.QUICK_PRACTICE,
    sessionId
  );
  if (!access.allowed) return { ok: false, questions: [], access };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("get_g1_simulation_questions");

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.warn("Using fallback G1 simulation dataset:", error?.message || "No data");
      return {
        ok: true,
        questions: [...FALLBACK_SIGNS_QUESTIONS.slice(0, 20), ...FALLBACK_RULES_QUESTIONS.slice(0, 20)],
        access,
      };
    }

    const validQuestions = (data as unknown[]).filter(
      (q: any): q is Question =>
        isValidQuestion(q) &&
        (q.question_type === "signs" || q.question_type === "rules")
    );

    if (validQuestions.length < 40) {
      return {
        ok: true,
        questions: [...FALLBACK_SIGNS_QUESTIONS.slice(0, 20), ...FALLBACK_RULES_QUESTIONS.slice(0, 20)],
        access,
      };
    }

    return { ok: true, questions: validQuestions, access };
  } catch (error) {
    console.warn("Falling back to local G1 simulation dataset:", error);
    return {
      ok: true,
      questions: [...FALLBACK_SIGNS_QUESTIONS.slice(0, 20), ...FALLBACK_RULES_QUESTIONS.slice(0, 20)],
      access,
    };
  }
}

// -------------------------------
// 4. Incorrect questions review
// -------------------------------
export async function getIncorrectQuestions(
  userId: string,
  questionType: "signs" | "rules" | "all" = "all"
): Promise<Question[]> {
  try {
    if (!userId) return [];
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.rpc("get_incorrect_questions", {
      user_id_param: userId,
      question_type: questionType,
    });

    if (error || !data) {
      console.warn("Using fallback incorrect questions set:", error?.message);
      const combined = [...FALLBACK_SIGNS_QUESTIONS, ...FALLBACK_RULES_QUESTIONS];
      if (questionType === "signs") return FALLBACK_SIGNS_QUESTIONS.slice(0, 5);
      if (questionType === "rules") return FALLBACK_RULES_QUESTIONS.slice(0, 5);
      return combined.slice(0, 5);
    }

    const validQuestions = ((data || []) as unknown[]).filter((q: any): q is Question =>
      isValidQuestion(q)
    );

    return validQuestions;
  } catch (error) {
    console.warn("Falling back to local incorrect questions:", error);
    const combined = [...FALLBACK_SIGNS_QUESTIONS, ...FALLBACK_RULES_QUESTIONS];
    return combined.slice(0, 5);
  }
}

// -------------------------------
// 5. DB Connectivity Validator
// -------------------------------
export async function validateQuizDatabase(): Promise<{
  isConnected: boolean;
  signsCount: number;
  rulesCount: number;
  canSimulate: boolean;
}> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: signsData, error: signsError } = await supabase.rpc(
      "get_signs_practice_questions",
      { question_limit: 1 }
    );
    const { data: rulesData, error: rulesError } = await supabase.rpc(
      "get_rules_practice_questions",
      { question_limit: 1 }
    );

    const isConnected = !signsError && !rulesError;
    const signsCount = signsData?.length || FALLBACK_SIGNS_QUESTIONS.length;
    const rulesCount = rulesData?.length || FALLBACK_RULES_QUESTIONS.length;
    const canSimulate = true;

    return { isConnected, signsCount, rulesCount, canSimulate };
  } catch (error) {
    return {
      isConnected: false,
      signsCount: FALLBACK_SIGNS_QUESTIONS.length,
      rulesCount: FALLBACK_RULES_QUESTIONS.length,
      canSimulate: true,
    };
  }
}
