// Clean Ontario Driver's Study Guide Data
export interface StudyGuideSection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface StudyGuideChapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  sections: StudyGuideSection[];
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const studyGuideData: StudyGuideChapter[] = [
  {
    id: "getting-your-license",
    title: "Getting Your Driver's Licence",
    description:
      "Complete guide to Ontario's Graduated Licensing System, license classifications, requirements, and the step-by-step process to get your G1, G2, and full G license. Note: A 'Z' air brake endorsement is required on a driver's licence to operate any air brake equipped motor vehicle. An RV endorsement ('T' endorsement) allows drivers with class E, F and G licences to operate a recreational vehicle weighing up to 14,000 kilograms.",
    icon: "📋",
    estimatedTime: "60 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "requirements",
        title: "Requirements for Driving in Ontario",
        content:
          "Ontario residents must be at least 16 years old and have a valid Ontario driver's licence. If you have just become an Ontario resident, you have 60 days to continue to use your existing driver's licence and apply for an Ontario driver's licence. Visitors to Ontario must be at least 16 years old, have a valid driver's licence from your home province, state or country, and must have an international driver's permit from your own country if visiting Ontario for more than 3 months. Visitors are not eligible for an Ontario driver's licence.",
        keyPoints: [
          "Ontario residents must be at least 16 years old",
          "Must have valid Ontario driver's licence",
          "New residents have 60 days to apply for Ontario licence",
          "Visitors must be 16+ with valid home jurisdiction licence",
          "International permit required for visits over 3 months",
          "Visitors cannot get Ontario licence",
        ],
      },
      {
        id: "license-classes",
        title: "Driver's License Classifications Chart",
        content:
          "In Ontario, there are 12 different classes of licences. Each one qualifies you to drive a different type of vehicle. The class of licence you have must match the type of vehicle you are driving. You need a Class G licence to drive a car, van or small truck. You must have a Class G licence before you can be licensed to drive any other type of vehicle. The only exception is motorcycles. You may get a motorcycle licence (Class M) without first getting a Class G licence.",
        keyPoints: [
          "12 different classes of licences available",
          "Licence class must match vehicle type",
          "Class G required for cars, vans, small trucks",
          "Class G required before other commercial classes",
          "Class M (motorcycle) is the only exception",
          "Class A: Tractor-trailer combinations",
          "Class B: School buses",
          "Class C: Regular buses",
          "Class D: Trucks over 11,000kg",
          "Classes E & F: Smaller buses and ambulances",
        ],
      },
      {
        id: "class-details",
        title: "Detailed License Class Descriptions",
        content:
          "Class A: Any tractor-trailer combination, may also drive class D and G. Class B: Any school purposes bus, may also drive class C, D, E, F and G. Class C: Any regular bus, may also drive class D, F and G. Class D: Motor vehicle exceeding 11,000kg gross weight or any truck combination provided towed vehicle is not over 4,600kg, may also drive class G. Class E: School purposes bus - maximum 24-passenger capacity, may also drive class F and G. Class F: Regular bus - maximum 24-passenger capacity and ambulances, may also drive class G. Class G: Cars, vans, small trucks or combination up to 11,000kg provided towed vehicle not over 4,600kg.",
        keyPoints: [
          "Class A: Tractor-trailers (highest commercial class)",
          "Class B: School buses (all sizes)",
          "Class C: Regular buses (all sizes)",
          "Class D: Large trucks over 11,000kg",
          "Class E: Small school buses (24 passengers max)",
          "Class F: Small buses and ambulances (24 passengers max)",
          "Class G: Standard passenger vehicles",
          "Each class includes privileges of lower classes",
          "Higher classes allow driving more vehicle types",
        ],
      },
      {
        id: "motorcycle-classes",
        title: "Motorcycle License Classes",
        content:
          "Class M: Any motorcycles, including motor tricycles, limited-speed motorcycles (motor scooters) and motor-assisted bicycles (mopeds). Holders may also drive a Class G vehicle under Class G1 conditions. Class M1: Level One graduated licensing for motorcycles with certain conditions. Class M2: Level Two graduated licensing for motorcycles with zero blood alcohol level required. Class M with L condition: Limited-speed motorcycle or moped only. Class M with M condition: Motor tricycle only.",
        keyPoints: [
          "Class M: Full motorcycle privileges",
          "Class M1: Level One motorcycle (with restrictions)",
          "Class M2: Level Two motorcycle (zero BAC required)",
          "M with L condition: Limited-speed motorcycles/mopeds only",
          "M with M condition: Motor tricycles only",
          "M licence holders can drive Class G under G1 conditions",
          "Separate graduated system for motorcycles",
          "Study Official MTO Motorcycle Handbook for details",
        ],
      },
      {
        id: "gls-overview",
        title: "Ontario's Graduated Licensing System",
        content:
          "New drivers applying for their first car or motorcycle licence enter Ontario's graduated licensing system. Graduated licensing lets new drivers get driving experience and skills gradually. The two-step licensing process takes at least 20 months to complete. To apply for a licence, you must be at least 16 years old, pass a vision test and pass a test of your knowledge of the rules of the road and traffic signs. After you pass these tests, you will enter Level One and get a Class G1 licence. You must pass two road tests to become fully licensed.",
        keyPoints: [
          "Two-step process taking at least 20 months",
          "Applies to first-time car or motorcycle applicants",
          "Allows gradual development of driving skills",
          "Must be 16+ years old to start",
          "Vision test required",
          "Knowledge test on rules and signs required",
          "Two road tests needed for full licence",
          "Progressive privilege system",
        ],
      },
      {
        id: "level-one-g1",
        title: "Level One (Class G1) Requirements",
        content:
          "Level One lasts 12 months. The Ministry encourages all new drivers to take an approved driver-education course. If you pass an approved course, you can complete Level One in eight months. While at Level One: You must not drive if you have been drinking alcohol (blood-alcohol level must be zero). You must not drive alone; an accompanying driver must sit in the front passenger seat. The accompanying driver must have a valid Class G (or higher) licence, at least four years of driving experience and a blood-alcohol level of less than .05%. You must not drive on 400-series highways with posted speed limit over 80 km/h or certain high-speed roads. You must not drive between midnight and 5 a.m.",
        keyPoints: [
          "Duration: 12 months (8 with driver education)",
          "Zero blood-alcohol level required",
          "Must have accompanying driver in front seat",
          "Accompanying driver needs 4+ years experience",
          "Accompanying driver BAC must be under 0.05%",
          "No 400-series highways over 80 km/h",
          "No QEW, DVP, Gardiner Expressway, etc.",
          "No driving midnight to 5 a.m.",
          "All occupants must wear seatbelts",
        ],
      },
      {
        id: "level-two-g2",
        title: "Level Two (Class G2) Requirements",
        content:
          "Level Two lasts at least 12 months. At this level, you have more privileges because of your driving experience. You must not drive if you have been drinking alcohol (blood-alcohol level must be zero). Each person in the vehicle must have a working seatbelt. For G2 drivers aged 19 and under, between midnight and 5 a.m.: In the first six months after receiving your G2 licence, you are allowed to carry only one passenger aged 19 or under. After six months with your G2 licence and until you obtain your full G licence or turn 20, you are allowed to carry up to three passengers aged 19 or under. Exemptions apply if accompanied by a fully-licensed driver or if passengers are immediate family members.",
        keyPoints: [
          "Duration: At least 12 months",
          "Zero blood-alcohol level still required",
          "All passengers must wear seatbelts",
          "Age 19 and under have passenger restrictions",
          "First 6 months: Only 1 passenger aged 19 or under",
          "After 6 months: Up to 3 passengers aged 19 or under",
          "Restrictions apply midnight to 5 a.m. only",
          "Exemptions for family members or with full licence holder",
          "Can drive on all roads including highways",
        ],
      },
      {
        id: "application-process",
        title: "Applying for a Licence",
        content:
          "To apply for a licence, you must show proof of your legal name and date of birth (showing day, month and year of birth). Documents must be original and valid. Photocopies and expired documents are not acceptable. Bring the documents to a DriveTest Centre or Travel Point. You must pay a fee when you apply. This fee includes the cost of the knowledge test, your first road test and a five-year licensing fee. When you apply for your licence, you will be asked questions about your health. People with certain physical or medical conditions are not allowed to drive for safety reasons.",
        keyPoints: [
          "Must prove legal name and complete date of birth",
          "Original, valid documents only (no photocopies)",
          "Apply at DriveTest Centre or Travel Point",
          "Fee includes knowledge test, first road test, 5-year licence",
          "Additional fees for second road test and retests",
          "Health questions asked during application",
          "Medical conditions may prevent licensing",
          "Must report medical changes that affect driving",
        ],
      },
      {
        id: "proof-of-identification",
        title: "Proof of Identification Requirements",
        content:
          "Acceptable documents for proof of legal name and complete date of birth include: Passport (Canadian or foreign), Canadian Citizenship Card with photo, Permanent immigration documents (PRC, Record of Landing, Confirmation of Permanent Residence), Temporary immigration documents (Student Authorization, Employment Authorization, Visitor Record, etc.), or Canadian/U.S. Birth Certificate. Additional documents may be required if the primary document doesn't show complete information. Marriage certificates, change-of-name certificates, or court orders may be needed for legal name changes.",
        keyPoints: [
          "Canadian or foreign passport accepted",
          "Canadian Citizenship Card with photo",
          "Permanent Resident Card (PRC)",
          "Record of Landing (Form 1000)",
          "Student/Employment Authorization",
          "Canadian or U.S. Birth Certificate",
          "Marriage certificate for name changes",
          "Court orders for legal name changes",
          "Direct identification by parent/guardian not acceptable",
        ],
      },
      {
        id: "road-tests",
        title: "Road Test Procedures and Requirements",
        content:
          "Road tests check your driving skills in the vehicle and in traffic. You will be tested on your ability to follow the rules of the road and safe driving practices. Schedule an appointment by internet, phone or in-person at any DriveTest Centre. You must bring the appropriate vehicle to your road test. The vehicle must be fit, in proper working condition, plated and insured. Electronic driving aids such as automatic parallel-parking systems, lane monitoring, cruise control, and back cameras may not be used during the road test. At the end of each test, the examiner will give you a complete report of your skills. If you fail, you must wait at least 10 days between tests.",
        keyPoints: [
          "Tests driving skills in vehicle and traffic",
          "Schedule online, by phone, or in-person",
          "Must bring properly equipped, insured vehicle",
          "Electronic driving aids prohibited during test",
          "No pets or passengers allowed (examiner only)",
          "Examiner provides complete skill report",
          "10-day wait required between failed tests",
          "G2 exit test requires highway driving experience",
          "Declaration of Highway Driving Experience form required",
        ],
      },
      {
        id: "new-residents",
        title: "New Ontario Residents and Licence Exchange",
        content:
          "If you are a new resident of Ontario and have a valid driver's licence from another province or country, you can use that licence for 60 days in Ontario. Ontario has licence-exchange agreements with every Canadian province and territory, and with Australia, Austria, Belgium, France, Germany, Great Britain, Ireland, Isle of Man, Japan, New Zealand, Northern Ireland, Republic of Korea, Switzerland, Taiwan and the United States. For non-reciprocating jurisdictions, applicants must pass vision test, knowledge test, and may need to complete graduated licensing requirements.",
        keyPoints: [
          "60 days to exchange valid licence from elsewhere",
          "Exchange agreements with Canadian provinces/territories",
          "Exchange agreements with many countries",
          "Full Class G if equivalent licence held",
          "Credit given for driving experience",
          "Non-reciprocating jurisdictions need full testing",
          "Vision and knowledge tests required",
          "May need to complete graduated licensing",
          "Foreign experience up to 3 years may be credited",
        ],
      },
      {
        id: "driving-schools",
        title: "Choosing a Driving School",
        content:
          "A beginner driver education (BDE) course in a driving school that has been approved by the provincial government can teach you the skills and attitudes you need to be a safe and responsible driver. If you graduate from an approved BDE course, you can reduce Level One from 12 to 8 months and may save on car insurance. Ministry-approved BDE courses must last a minimum of 40 hours: at least 20 hours in-class, 10 hours in-vehicle and 10 hours of flexible instruction. All ministry-licenced driving schools offer in-class and in-car training taught by ministry-licensed driving instructors.",
        keyPoints: [
          "Approved BDE course reduces G1 to 8 months",
          "May provide insurance savings",
          "Minimum 40 hours total instruction",
          "20 hours classroom, 10 hours in-vehicle minimum",
          "10 hours flexible instruction (various formats)",
          "Only ministry-licensed schools and instructors",
          "Schools licensed and renewed every 3 years",
          "Check ministry website for approved schools",
          "Avoid revoked/unlicensed schools",
        ],
      },
    ],
  },
  {
    id: "safe-responsible-driving",
    title: "Safe and Responsible Driving",
    description:
      "Learn the fundamental principles of safe and responsible driving, including vehicle preparation, defensive driving techniques, and essential driving skills.",
    icon: "🛡️",
    estimatedTime: "60 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "safe-responsible-fundamentals",
        title: "Safe and Responsible Driving Fundamentals",
        content:
          "Being a safe and responsible driver requires knowledge, skill, and attitude. Traffic laws protect everyone on the road. Everyone is responsible for avoiding collisions. Defensive driving is based on visibility, space, and communication.",
        keyPoints: [
          "Safe driving requires knowledge, skill, and attitude",
          "Traffic laws enforced by all levels of government",
          "Everyone responsible for avoiding collisions",
          "Defensive driving: visibility, space, communication",
          "Scan road ahead and check mirrors regularly",
          "Maintain safe following distances",
          "Signal intentions clearly to others",
        ],
      },
      {
        id: "getting-ready-drive",
        title: "Getting Ready to Drive",
        content:
          "Before driving, assess physical, mental, and emotional state. Know your vehicle systems and limitations. Get to know controls and instruments. Adjust seating position properly and fasten seatbelt.",
        keyPoints: [
          "Assess physical, mental, emotional state before driving",
          "Don't drive when ill, fatigued, or emotionally upset",
          "Know your vehicle's systems and limitations",
          "Read owner's manual for safety features",
          "Adjust seating position for proper control",
          "Fasten seatbelt properly",
        ],
      },
      {
        id: "seating-position",
        title: "Seating Position and Controls",
        content:
          "Sit high enough to see over steering wheel and hood. Adjust seat so feet reach pedals comfortably. Adjust headrest for collision protection. Keep clear view through all windows.",
        keyPoints: [
          "Sit high enough to see over steering wheel",
          "Feet should reach pedals comfortably",
          "Adjust headrest for collision protection",
          "Maintain clear view through all windows",
          "Locate and understand blind spots",
          "Adjust mirrors to minimize blind spots",
        ],
      },
      {
        id: "child-safety",
        title: "Child Safety Requirements",
        content:
          "Children must be properly secured in appropriate child car seats, booster seats, or seatbelts based on age, height, and weight. Child car seats can reduce injury risk by 75%.",
        keyPoints: [
          "Child car seats reduce injury risk by 75%",
          "All children under 16 must be properly restrained",
          "Rear-facing seats for infants under 9kg",
          "Booster seats for children 18-36kg under 145cm",
          "Children can use seatbelts after age 8 or specific criteria",
          "Back seat safest for children under 13",
        ],
      },
      {
        id: "lighting-systems",
        title: "Headlight Usage and Lighting Systems",
        content:
          "Headlights must be visible 150m ahead and required in low visibility conditions. Use high beams for better visibility, low beams within 150m of oncoming vehicles. Daytime running lights enhance visibility.",
        keyPoints: [
          "Headlights must be visible 150m ahead",
          "Required between 1/2 hour before sunset to 1/2 hour after sunrise",
          "Required in poor visibility conditions",
          "Use high beams when safe for better visibility",
          "Switch to low beams within 150m of oncoming vehicles",
          "Daytime running lights for good conditions only",
        ],
      },
      {
        id: "driving-along",
        title: "Driving Along - Basic Techniques",
        content:
          "Scan ahead, behind, and to sides continuously. Check mirrors every 5 seconds. Check blind spots before maneuvers. Maintain cushion of space around vehicle. Signal intentions well in advance.",
        keyPoints: [
          "Scan ahead, behind, and to sides continuously",
          "Check mirrors every 5 seconds",
          "Check blind spots before maneuvers",
          "Maintain cushion of space around vehicle",
          "Steer smoothly with hands at 9 and 3 o'clock",
          "Signal intentions well in advance",
          "Keep right except when passing or turning",
        ],
      },
    ],
  },
  {
    id: "dealing-with-particular-situations",
    title: "Dealing with Particular Situations",
    description:
      "Learn how to handle challenging driving situations including aggressive drivers, fatigue, construction zones, and adverse weather conditions.",
    icon: "⚠️",
    estimatedTime: "50 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "aggressive-driving",
        title: "Aggressive Driving and Road Rage",
        content:
          "Aggressive driving is any unsafe driving behavior that endangers others on the road. Road rage is an extreme form of aggressive driving where anger causes dangerous actions. Common aggressive behaviors include tailgating, frequent unsafe lane changes, running red lights, and excessive speeding.",
        keyPoints: [
          "Aggressive driving endangers others on the road",
          "Road rage involves anger causing dangerous actions",
          "Tailgating is following too closely",
          "Frequent unsafe lane changes",
          "Running red lights or stop signs",
          "Excessive speeding",
          "Using high beams to intimidate",
          "Horn honking aggressively",
        ],
      },
      {
        id: "street-racing",
        title: "Street Racing and Reckless Driving",
        content:
          "Street racing involves competing with other vehicles for speed or performance, often in residential areas or on public roads. This dangerous activity puts lives at risk and carries severe penalties. Ontario law prohibits any form of street racing or stunt driving.",
        keyPoints: [
          "Street racing competes for speed on public roads",
          "Puts lives at risk in residential areas",
          "Severe legal penalties apply",
          "Ontario prohibits stunt driving",
          "Includes burnouts and excessive acceleration",
          "Endangers pedestrians and other drivers",
          "License suspension for first offense",
          "Criminal charges possible",
        ],
      },
      {
        id: "drowsy-driving",
        title: "Drowsy Driving and Fatigue",
        content:
          "Drowsy driving is as dangerous as impaired driving. Fatigue affects reaction time, decision-making, and vehicle control. Signs include heavy eyelids, yawning, drifting between lanes, and difficulty maintaining speed. Never drive when drowsy - pull over and rest.",
        keyPoints: [
          "Drowsy driving equals impaired driving danger",
          "Fatigue affects reaction time and decision-making",
          "Signs: heavy eyelids, yawning, drifting",
          "Never drive when drowsy",
          "Pull over and rest when tired",
          "Get adequate sleep before driving",
          "Take breaks on long trips",
          "Share driving responsibilities",
        ],
      },
      {
        id: "construction-zones",
        title: "Workers on the Road and Construction Zones",
        content:
          "Construction zones require extra caution. Workers are present, road conditions change, and traffic patterns may be different. Obey all signs, reduce speed, and be prepared for sudden stops. Fines are doubled in construction zones for many violations.",
        keyPoints: [
          "Extra caution required in construction zones",
          "Workers present on roadways",
          "Road conditions change frequently",
          "Obey all signs and signals",
          "Reduce speed appropriately",
          "Be prepared for sudden stops",
          "Fines doubled in construction zones",
          "Watch for flaggers and equipment",
        ],
      },
      {
        id: "animals-road",
        title: "Animals on the Road",
        content:
          "Wildlife collisions are common in Ontario. Deer are most frequently hit, often at dawn and dusk. If you see an animal, slow down and prepare to stop. Use high beams to detect eyes at night, but switch to low beams when approaching. Report collisions to authorities.",
        keyPoints: [
          "Wildlife collisions common in Ontario",
          "Deer most frequently hit animals",
          "Peak times: dawn and dusk",
          "Slow down when animals present",
          "Use high beams to detect eyes at night",
          "Switch to low beams when approaching",
          "Prepare to stop safely",
          "Report collisions to authorities",
        ],
      },
      {
        id: "distracted-driving",
        title: "Distracted Driving Laws and Prevention",
        content:
          "Distracted driving causes thousands of crashes annually. Ontario law prohibits holding electronic devices while driving. Hands-free systems may be allowed, but any distraction from driving is dangerous. Focus completely on driving when behind the wheel.",
        keyPoints: [
          "Distracted driving causes thousands of crashes",
          "Ontario prohibits holding electronic devices",
          "Hands-free systems may be permitted",
          "Any distraction from driving is dangerous",
          "Focus completely on driving",
          "Pull over for calls or texts",
          "Adjust audio/radio before driving",
          "Secure loose items in vehicle",
        ],
      },
      {
        id: "emergency-vehicles",
        title: "Emergency Vehicles (Approaching and Stopped)",
        content:
          "When you see emergency vehicle lights and sirens, pull over immediately and allow them to pass. Move to the right side of the road and stop. Never try to race or outrun emergency vehicles. When emergency vehicles are stopped, proceed with caution and obey directions.",
        keyPoints: [
          "Pull over immediately for emergency vehicles",
          "Move to right side of road",
          "Allow emergency vehicles to pass",
          "Never race or outrun emergency vehicles",
          "Proceed with caution when stopped",
          "Obey directions from emergency personnel",
          "Keep safe distance when passing stopped vehicles",
          "Watch for emergency personnel on foot",
        ],
      },
      {
        id: "night-driving",
        title: "Driving at Night and Low Visibility",
        content:
          "Night driving requires extra caution due to reduced visibility. Use headlights properly, avoid overdriving your lights, and be aware of glare from oncoming vehicles. Increase following distances and watch for pedestrians. Fatigue increases at night.",
        keyPoints: [
          "Night driving requires extra caution",
          "Use headlights properly",
          "Avoid overdriving your lights",
          "Be aware of glare from oncoming vehicles",
          "Increase following distances",
          "Watch for pedestrians at night",
          "Fatigue increases at night",
          "Rest before long night drives",
        ],
      },
      {
        id: "weather-conditions",
        title: "Weather Conditions (Rain, Snow, Ice, Whiteouts)",
        content:
          "Ontario weather can change rapidly and create dangerous driving conditions. Rain reduces traction, snow and ice make roads slippery, and whiteouts eliminate visibility. Adjust speed, increase following distances, and use appropriate tires. Know your vehicle's limitations.",
        keyPoints: [
          "Ontario weather changes rapidly",
          "Rain reduces traction and visibility",
          "Snow and ice make roads slippery",
          "Whiteouts eliminate visibility",
          "Adjust speed for conditions",
          "Increase following distances",
          "Use appropriate tires",
          "Know your vehicle's limitations",
        ],
      },
      {
        id: "vehicle-skids",
        title: "Vehicle Skids and Recovery Techniques",
        content:
          "Skids occur when tires lose traction with the road surface. Common causes include sudden braking, sharp turns, or slippery roads. The key is to remain calm, avoid slamming brakes, and steer in the direction you want to go. Practice skid recovery in safe conditions.",
        keyPoints: [
          "Skids occur when tires lose traction",
          "Common causes: sudden braking, sharp turns",
          "Remain calm during skid",
          "Avoid slamming brakes",
          "Steer in direction you want to go",
          "Practice skid recovery safely",
          "Adjust speed for road conditions",
          "Maintain proper tire pressure",
        ],
      },
      {
        id: "abs-systems",
        title: "Anti-lock Braking Systems (ABS)",
        content:
          "ABS prevents wheels from locking during hard braking, helping maintain steering control. When ABS activates, you'll feel vibration through the brake pedal. Continue pressing firmly - do not pump the brakes. ABS works best when combined with proper braking technique.",
        keyPoints: [
          "ABS prevents wheels from locking",
          "Maintains steering control during braking",
          "Vibration indicates ABS activation",
          "Continue pressing brake pedal firmly",
          "Do not pump brakes with ABS",
          "Works best with proper technique",
          "Not all vehicles have ABS",
          "Check your owner's manual",
        ],
      },
    ],
  },
  {
    id: "dealing-with-emergencies",
    title: "Dealing with Emergencies",
    description:
      "Learn how to handle vehicle emergencies, collision procedures, and what to do when things go wrong on the road.",
    icon: "🚨",
    estimatedTime: "45 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "vehicle-failures",
        title: "Vehicle Component Failures (Brakes, Gas Pedal, Headlights)",
        content:
          "Vehicle failures can happen unexpectedly. If brakes fail, pump the pedal and use emergency brake gradually. If gas pedal sticks, shift to neutral and use emergency brake. Headlight failures require immediate hazard lights and safe stopping. Know your vehicle's emergency features.",
        keyPoints: [
          "Vehicle failures can happen unexpectedly",
          "Brake failure: pump pedal, use emergency brake",
          "Gas pedal sticks: shift to neutral, emergency brake",
          "Headlight failure: use hazard lights immediately",
          "Know your vehicle's emergency features",
          "Carry emergency kit with tools",
          "Regular maintenance prevents failures",
          "Pull off road safely when possible",
        ],
      },
      {
        id: "freeway-trouble",
        title: "Freeway Trouble and Breakdown Procedures",
        content:
          "Freeway breakdowns require special procedures. Move to the right shoulder if possible, activate hazard lights, and call for help. Set up warning triangles or flares. Never stay in the vehicle on the travelled portion. Exit through the passenger side if safe.",
        keyPoints: [
          "Move to right shoulder when possible",
          "Activate hazard lights immediately",
          "Call for help (roadside assistance)",
          "Set up warning triangles or flares",
          "Never stay in vehicle on travelled portion",
          "Exit through passenger side if safe",
          "Stay away from traffic",
          "Wait for professional help",
        ],
      },
      {
        id: "wheels-off-pavement",
        title: "Wheels Going Off Pavement",
        content:
          "If your wheels go off the pavement, don't panic or slam on brakes. Gradually slow down while gently steering back onto the road. Look where you want to go, not at the ditch. Once back on pavement, check for traffic and resume normal speed gradually.",
        keyPoints: [
          "Don't panic if wheels leave pavement",
          "Don't slam on brakes",
          "Gradually slow down",
          "Gently steer back onto road",
          "Look where you want to go",
          "Check for traffic when back on pavement",
          "Resume normal speed gradually",
          "Stay calm and in control",
        ],
      },
      {
        id: "tire-blowouts",
        title: "Tire Blowouts",
        content:
          "Tire blowouts are sudden and startling. Hold the steering wheel firmly and keep the vehicle straight. Don't slam on brakes - ease off the gas and let the vehicle slow gradually. Move to the shoulder when safe. Never brake hard on a blowout.",
        keyPoints: [
          "Tire blowouts are sudden and startling",
          "Hold steering wheel firmly",
          "Keep vehicle straight",
          "Don't slam on brakes",
          "Ease off gas pedal gradually",
          "Move to shoulder when safe",
          "Never brake hard on blowout",
          "Signal intentions to other drivers",
        ],
      },
      {
        id: "collision-procedures",
        title: "Collision Procedures (With and Without Injuries)",
        content:
          "After a collision, ensure safety first, then check for injuries. Call emergency services if anyone is hurt. Exchange information with other parties. Move vehicles off the road if possible. Report the collision to police within 24 hours. Cooperate with authorities and insurance companies.",
        keyPoints: [
          "Ensure safety first after collision",
          "Check for injuries immediately",
          "Call emergency services if anyone hurt",
          "Exchange information with other parties",
          "Move vehicles off road if possible",
          "Report collision to police within 24 hours",
          "Cooperate with authorities",
          "Contact insurance company",
        ],
      },
      {
        id: "first-aid",
        title: "First Aid Considerations",
        content:
          "Basic first aid knowledge can save lives. Know how to control bleeding, perform CPR, and handle shock. Carry a first aid kit in your vehicle. If someone is seriously injured, call emergency services immediately and provide basic care until help arrives.",
        keyPoints: [
          "Basic first aid can save lives",
          "Know how to control bleeding",
          "Learn CPR techniques",
          "Handle shock and unconsciousness",
          "Carry first aid kit in vehicle",
          "Call emergency services for serious injuries",
          "Stay with injured until help arrives",
          "Move injured only if absolutely necessary",
        ],
      },
      {
        id: "reporting-requirements",
        title: "Reporting Requirements and Information Exchange",
        content:
          "All collisions must be reported to police within 24 hours. Exchange names, addresses, phone numbers, insurance information, and license plate numbers. Take photos if possible. Cooperate with police investigation. Understand your insurance requirements and documentation needs.",
        keyPoints: [
          "Report all collisions to police within 24 hours",
          "Exchange complete contact information",
          "Share insurance details",
          "Record license plate numbers",
          "Take photos of scene and damage",
          "Cooperate with police investigation",
          "Understand insurance requirements",
          "Keep detailed records",
        ],
      },
      {
        id: "towing-procedures",
        title: "Towing Procedures for Disabled Vehicles",
        content:
          "When your vehicle needs towing, arrange for professional service. Ensure the tow truck operator is licensed and insured. Understand towing fees and procedures. Never attempt unsafe towing methods. Know your roadside assistance coverage and emergency contacts.",
        keyPoints: [
          "Arrange professional towing service",
          "Ensure tow operator is licensed and insured",
          "Understand towing fees and procedures",
          "Never attempt unsafe towing",
          "Know your roadside assistance coverage",
          "Have emergency contact numbers",
          "Follow tow truck instructions",
          "Secure vehicle properly for transport",
        ],
      },
    ],
  },
  {
    id: "traffic-signs-lights",
    title: "Traffic Signs and Lights",
    description:
      "Master Ontario traffic signs, signals, and pavement markings to communicate effectively with other road users and navigate safely.",
    icon: "🚦",
    estimatedTime: "55 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "regulatory-signs",
        title: "Regulatory Signs (Permissions and Prohibitions)",
        content:
          "Regulatory signs give commands or prohibitions. Red circles with slashes indicate prohibitions (no parking, no left turn). Blue rectangles provide information (hospital, school zone). Green signs show permitted movements. Always obey regulatory signs - they are legal requirements.",
        keyPoints: [
          "Regulatory signs give commands or prohibitions",
          "Red circles with slashes = prohibitions",
          "Blue rectangles provide information",
          "Green signs show permitted movements",
          "Always obey regulatory signs",
          "They are legal requirements",
          "Most common violations involve regulatory signs",
          "Learn common regulatory signs for your area",
        ],
      },
      {
        id: "warning-signs",
        title: "Warning Signs (Hazards and Conditions Ahead)",
        content:
          "Warning signs alert you to potential hazards ahead. Yellow diamond shapes indicate warnings. Common examples include curves, intersections, pedestrian crossings, and animal crossings. Reduce speed and prepare for the hazard when you see warning signs.",
        keyPoints: [
          "Warning signs alert to potential hazards",
          "Yellow diamond shape indicates warnings",
          "Reduce speed when seeing warning signs",
          "Prepare for the hazard ahead",
          "Common warnings: curves, intersections",
          "Also warn of: pedestrians, animals, road work",
          "Placed before the hazard begins",
          "Help you adjust speed and position",
        ],
      },
      {
        id: "temporary-condition-signs",
        title: "Temporary Condition Signs (Construction and Detours)",
        content:
          "Orange signs indicate temporary conditions, usually construction zones. These signs have black symbols on orange backgrounds. Follow detour routes as directed. Fines are doubled in construction zones. Be extra cautious around workers and equipment.",
        keyPoints: [
          "Orange signs indicate temporary conditions",
          "Usually related to construction zones",
          "Black symbols on orange backgrounds",
          "Follow detour routes as directed",
          "Fines doubled in construction zones",
          "Extra caution around workers",
          "Watch for equipment and barriers",
          "Stay alert for changing conditions",
        ],
      },
      {
        id: "information-direction-signs",
        title: "Information and Direction Signs (Destinations and Services)",
        content:
          "Information signs help you navigate and find services. Blue signs show highway information, brown signs indicate recreational areas, and white signs provide general information. These signs guide you to destinations and services throughout your journey.",
        keyPoints: [
          "Information signs help with navigation",
          "Blue signs show highway information",
          "Brown signs indicate recreational areas",
          "White signs provide general information",
          "Guide you to destinations",
          "Show available services",
          "Help with trip planning",
          "Important for unfamiliar areas",
        ],
      },
      {
        id: "traffic-lights",
        title: "Traffic Lights (Green, Yellow, Red, Arrows, Advance Signals)",
        content:
          "Traffic lights control intersection movement. Green means go, but yield to pedestrians and vehicles already in intersection. Yellow means prepare to stop safely. Red means stop. Arrow signals apply only to the indicated lane. Advance signals warn of upcoming lights.",
        keyPoints: [
          "Traffic lights control intersection movement",
          "Green means go, but yield to others",
          "Yellow means prepare to stop safely",
          "Red means complete stop",
          "Arrow signals apply to specific lanes only",
          "Advance signals warn of upcoming lights",
          "Right turn on red allowed where permitted",
          "Emergency vehicles override signals",
        ],
      },
      {
        id: "pedestrian-signals",
        title: "Pedestrian Signals and Intersection Signals",
        content:
          "Pedestrian signals show walking person (walk) or raised hand (don't walk). Countdown timers show seconds remaining. Intersection signals may include left-turn arrows or bike signals. Always yield to pedestrians in crosswalks, even without signals.",
        keyPoints: [
          "Pedestrian signals show walk/don't walk",
          "Countdown timers show remaining seconds",
          "Always yield to pedestrians in crosswalks",
          "Even without signals present",
          "Left-turn arrows serve specific lanes",
          "Bike signals for bicycle movements",
          "Push button for pedestrian signals",
          "Emergency buttons available at signals",
        ],
      },
      {
        id: "pavement-markings",
        title: "Pavement Markings (Lines, Crosswalks, Arrows)",
        content:
          "Pavement markings guide traffic flow and indicate rules. Solid yellow lines separate opposing traffic. Broken yellow lines allow passing. White lines separate same-direction traffic. Crosswalks are marked with white stripes. Arrows show turning lanes.",
        keyPoints: [
          "Pavement markings guide traffic flow",
          "Solid yellow lines separate opposing traffic",
          "Broken yellow lines allow passing",
          "White lines separate same-direction traffic",
          "Crosswalks marked with white stripes",
          "Arrows indicate turning lanes",
          "Stop lines show where to stop",
          "Edge lines mark road boundaries",
        ],
      },
      {
        id: "special-signs",
        title: "Special Signs (Bilingual, Emergency Response)",
        content:
          "Ontario uses bilingual signs in designated areas. Emergency response signs show evacuation routes, emergency access points, and emergency services. Special signs may include variable message signs showing real-time conditions, weather warnings, or construction updates.",
        keyPoints: [
          "Bilingual signs used in designated areas",
          "Emergency response signs show evacuation routes",
          "Emergency access points clearly marked",
          "Variable message signs show real-time info",
          "Weather warnings and construction updates",
          "Special event routing signs",
          "School zone and playground signs",
          "Transit and HOV lane designations",
        ],
      },
    ],
  },
  {
    id: "keeping-your-license",
    title: "Keeping Your Driver's Licence",
    description:
      "Understand licence renewal, penalties, demerit points, and how to maintain your driving privileges in Ontario.",
    icon: "📜",
    estimatedTime: "40 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "licence-renewal",
        title: "Licence Renewal Procedures",
        content:
          "Ontario driver's licences must be renewed before expiration. Renew online, by phone, or in person. Vision tests required for most renewals. Medical examinations may be required for certain conditions. Fees vary by licence class. Early renewal recommended to avoid lapse.",
        keyPoints: [
          "Renew before licence expires",
          "Online, phone, or in-person renewal",
          "Vision tests required for most renewals",
          "Medical exams for certain conditions",
          "Fees vary by licence class",
          "Early renewal recommended",
          "Bring current licence and ID",
          "Photo taken for new licence",
        ],
      },
      {
        id: "senior-drivers",
        title: "Senior Drivers (80+) Requirements and Testing",
        content:
          "Drivers 80 and older must renew annually and complete vision and knowledge tests. Medical examination may be required. Enhanced testing evaluates fitness to drive safely. Some seniors may need to surrender their licence or accept restrictions based on medical advice.",
        keyPoints: [
          "Annual renewal for drivers 80+",
          "Vision and knowledge tests required",
          "Medical examination may be required",
          "Enhanced fitness evaluation",
          "May surrender licence if medically advised",
          "Restrictions possible based on evaluation",
          "Enhanced testing for safety",
          "Regular monitoring of driving ability",
        ],
      },
      {
        id: "graduated-requalification",
        title: "Graduated Licensing Requalification",
        content:
          "New drivers must complete G1 and G2 phases successfully. G1 requires 12 months (8 with driver education), G2 requires 12 months. Road tests evaluate driving competence. Successful completion grants full driving privileges with continued zero BAC and demerit point restrictions.",
        keyPoints: [
          "Complete G1 and G2 phases successfully",
          "G1 lasts 12 months (8 with driver education)",
          "G2 lasts 12 months minimum",
          "Road tests evaluate competence",
          "Successful completion grants full privileges",
          "Zero BAC continues after G2",
          "Demerit point restrictions remain",
          "Insurance rates remain higher",
        ],
      },
      {
        id: "changing-info",
        title: "Changing Name or Address",
        content:
          "Report name changes (marriage, divorce, legal change) within 30 days. Address changes must be reported within 6 days. Update licence at ServiceOntario or online. Failure to update information can result in licence suspension. Keep information current for traffic violations and insurance.",
        keyPoints: [
          "Report name changes within 30 days",
          "Address changes within 6 days",
          "Update licence at ServiceOntario or online",
          "Failure results in suspension",
          "Keep information current",
          "Important for traffic violations",
          "Insurance requires current info",
          "Legal requirement for accuracy",
        ],
      },
      {
        id: "driver-laws",
        title: "Driver's Licence Laws and Penalties",
        content:
          "Ontario has strict laws governing driving privileges. Driving without a valid licence carries severe penalties. Falsifying information on licence applications is a criminal offense. Professional licences require additional qualifications. Special rules apply for commercial and professional drivers.",
        keyPoints: [
          "Strict laws govern driving privileges",
          "Severe penalties for driving without licence",
          "Falsifying information is criminal",
          "Professional licences require qualifications",
          "Commercial drivers have special rules",
          "Medical conditions must be reported",
          "International licences have time limits",
          "Lost or stolen licences must be reported",
        ],
      },
      {
        id: "demerit-points",
        title: "Demerit Point System (Novice vs. Fully Licensed Drivers)",
        content:
          "Ontario uses a demerit point system to track driving violations. Novice drivers (first 2 years) get licence suspension at 6 points, fully licensed at 15 points. Points remain for 2 years. Some violations carry immediate suspensions. Safe driving keeps points low.",
        keyPoints: [
          "Demerit points track violations",
          "Novice drivers suspend at 6 points",
          "Fully licensed suspend at 15 points",
          "Points remain for 2 years",
          "Some violations cause immediate suspension",
          "Safe driving keeps points low",
          "Insurance rates affected by points",
          "Point reduction through safe driving",
        ],
      },
      {
        id: "driving-offences",
        title: "Table of Driving Offences and Point Values",
        content:
          "Common violations include speeding (2-7 points), careless driving (6 points), and failure to yield (3 points). Serious offenses like racing carry immediate suspension. DUI offenses result in Criminal Code suspensions. Points vary by offense severity and driver experience.",
        keyPoints: [
          "Speeding violations: 2-7 points",
          "Careless driving: 6 points",
          "Failure to yield: 3 points",
          "Racing: immediate suspension",
          "DUI: Criminal Code suspension",
          "Points vary by offense severity",
          "Novice vs fully licensed penalties differ",
          "Insurance surcharge for points",
        ],
      },
      {
        id: "licence-suspension",
        title: "Licence Suspension Reasons and Procedures",
        content:
          "Licences suspended for demerit points, medical reasons, unpaid fines, or criminal convictions. Administrative suspensions for 30 days. Court-ordered suspensions vary by offense. Appeal process available for disputed suspensions. Reinstatement requires fees and possibly retesting.",
        keyPoints: [
          "Suspended for points, medical, fines, convictions",
          "Administrative suspension: 30 days",
          "Court-ordered varies by offense",
          "Appeal process available",
          "Reinstatement requires fees",
          "May require retesting",
          "Professional licence additional requirements",
          "Record affects future insurance",
        ],
      },
      {
        id: "escalating-sanctions",
        title: "Escalating Sanctions and Dangerous Behaviours",
        content:
          "Repeat violations result in increasingly severe penalties. Dangerous behaviors like street racing lead to immediate licence suspension and vehicle impoundment. Escalating sanctions protect public safety. Multiple offenses within short periods result in longer suspensions.",
        keyPoints: [
          "Repeat violations increase penalties",
          "Dangerous behaviors cause immediate suspension",
          "Street racing leads to vehicle impoundment",
          "Escalating sanctions protect safety",
          "Multiple offenses increase suspension length",
          "Professional consequences possible",
          "Criminal charges for extreme violations",
          "Vehicle seizure for repeated offenses",
        ],
      },
      {
        id: "impaired-driving",
        title: "Impaired Driving Laws and Consequences",
        content:
          "Ontario has zero tolerance for impaired driving. Criminal Code penalties include fines, imprisonment, and licence suspension. Refusal to provide breath sample carries same penalties as DUI conviction. Ignition interlock devices required for reinstatement. Criminal record affects employment and travel.",
        keyPoints: [
          "Zero tolerance for impaired driving",
          "Criminal Code penalties apply",
          "Fines, imprisonment, suspension",
          "Refusal equals DUI conviction",
          "Ignition interlock required",
          "Criminal record affects employment",
          "Travel restrictions possible",
          "Long-term consequences",
        ],
      },
      {
        id: "remedial-measures",
        title: "Criminal Code Suspensions and Remedial Measures",
        content:
          "Criminal Code suspensions result from impaired driving or dangerous driving convictions. Remedial measures include alcohol education programs, victim impact panels, and assessment programs. Successful completion required for reinstatement. Multiple offenses result in longer suspensions and mandatory minimums.",
        keyPoints: [
          "Criminal Code suspensions for serious offenses",
          "Remedial measures required",
          "Alcohol education programs",
          "Victim impact panels",
          "Assessment programs mandatory",
          "Successful completion for reinstatement",
          "Multiple offenses increase penalties",
          "Mandatory minimum sentences apply",
        ],
      },
    ],
  },
  {
    id: "your-vehicle",
    title: "Your Vehicle",
    description:
      "Learn about vehicle maintenance, registration, insurance, and legal requirements to keep your vehicle roadworthy and compliant with Ontario law.",
    icon: "🚗",
    estimatedTime: "50 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "vehicle-maintenance",
        title: "Vehicle Maintenance and Inspection",
        content:
          "Regular vehicle maintenance prevents breakdowns and ensures safety. Ontario requires annual safety inspections for vehicles over 5 years old. Check fluids, tires, brakes, lights, and exhaust systems regularly. Keep maintenance records for insurance and resale purposes.",
        keyPoints: [
          "Regular maintenance prevents breakdowns",
          "Annual safety inspections required over 5 years",
          "Check fluids, tires, brakes, lights regularly",
          "Inspect exhaust systems for emissions",
          "Keep detailed maintenance records",
          "Follow manufacturer's service schedule",
          "Address warning lights immediately",
          "Professional inspections recommended",
        ],
      },
      {
        id: "driver-habits",
        title: "Driver Habits for Safety Checks",
        content:
          "Develop daily safety checking habits. Before driving, walk around vehicle checking tires, lights, and body damage. Check mirrors and controls. Listen for unusual sounds while driving. Regular checks prevent accidents and costly repairs. Make safety checks part of your routine.",
        keyPoints: [
          "Develop daily safety checking habits",
          "Walk around vehicle before driving",
          "Check tires, lights, body damage",
          "Inspect mirrors and controls",
          "Listen for unusual sounds",
          "Regular checks prevent accidents",
          "Costly repairs avoided with checks",
          "Make safety checks routine",
        ],
      },
      {
        id: "maintenance-schedules",
        title: "Regular Maintenance Schedules",
        content:
          "Follow manufacturer's recommended maintenance schedule. Oil changes every 5,000-8,000 km, brake inspections every 10,000 km, tire rotations every 8,000 km. Replace air filters, spark plugs, and belts as scheduled. Keep receipts for warranty and insurance purposes.",
        keyPoints: [
          "Follow manufacturer's maintenance schedule",
          "Oil changes every 5,000-8,000 km",
          "Brake inspections every 10,000 km",
          "Tire rotations every 8,000 km",
          "Replace filters, plugs, belts as scheduled",
          "Keep receipts for warranty",
          "Insurance may cover some maintenance",
          "Track maintenance in owner's manual",
        ],
      },
      {
        id: "winter-maintenance",
        title: "Winter Maintenance and Emergency Supplies",
        content:
          "Ontario winters require special vehicle preparation. Use winter tires with proper tread depth. Keep emergency kit with blankets, flashlight, booster cables, and non-perishable food. Check antifreeze, battery, and heating system. Know winter driving techniques and limitations.",
        keyPoints: [
          "Winter tires essential in Ontario",
          "Proper tread depth required",
          "Emergency kit with essentials",
          "Check antifreeze regularly",
          "Battery and heating system inspection",
          "Know winter driving techniques",
          "Be prepared for breakdowns",
          "ServiceOntario emergency kit recommendations",
        ],
      },
      {
        id: "tire-maintenance",
        title: "Tire Selection, Maintenance, and Replacement",
        content:
          "Proper tires critical for safety. Check tread depth (minimum 1.5mm). Rotate tires every 8,000 km. Maintain proper inflation (check monthly). Replace tires every 6 years regardless of tread. Winter tires required November-March in northern Ontario. All-season tires acceptable elsewhere.",
        keyPoints: [
          "Proper tires critical for safety",
          "Minimum tread depth 1.5mm",
          "Rotate tires every 8,000 km",
          "Check inflation monthly",
          "Replace every 6 years",
          "Winter tires required Nov-Mar north",
          "All-season tires acceptable south",
          "Match tires by brand and type",
        ],
      },
      {
        id: "vehicle-registration",
        title: "Vehicle Registration and Insurance Requirements",
        content:
          "Ontario vehicles must be registered annually. Display current plates and validation sticker. Insurance mandatory for all vehicles. Minimum coverage includes third-party liability. Optional coverages include collision and comprehensive. Report changes within 6 days. Keep insurance card in vehicle.",
        keyPoints: [
          "Annual vehicle registration required",
          "Display current plates and stickers",
          "Insurance mandatory for all vehicles",
          "Minimum third-party liability coverage",
          "Optional collision and comprehensive",
          "Report changes within 6 days",
          "Keep insurance card in vehicle",
          "Update registration when selling",
        ],
      },
      {
        id: "new-resident-requirements",
        title: "New Resident Requirements",
        content:
          "New Ontario residents have 30 days to register vehicle and obtain licence. Transfer out-of-province registration and insurance. May need to retake licence tests. Vehicle inspection may be required. Update ownership documents. Professional vehicles have additional requirements.",
        keyPoints: [
          "30 days to register vehicle and licence",
          "Transfer out-of-province registration",
          "Update insurance to Ontario",
          "May need to retake licence tests",
          "Vehicle inspection may be required",
          "Update ownership documents",
          "Professional vehicles additional requirements",
          "Bring out-of-province documents",
        ],
      },
      {
        id: "auto-insurance-fraud",
        title: "Auto Insurance Fraud Protection",
        content:
          "Ontario has strict anti-fraud laws. Report suspicious claims immediately. Insurance fraud affects all drivers through higher rates. Common fraud includes staged accidents, inflated repair costs, and false injury claims. Cooperate with investigations. Honest claims processed efficiently.",
        keyPoints: [
          "Strict anti-fraud laws in Ontario",
          "Report suspicious claims immediately",
          "Fraud increases rates for all drivers",
          "Staged accidents illegal",
          "Inflated repair costs fraudulent",
          "False injury claims prosecuted",
          "Cooperate with investigations",
          "Honest claims processed efficiently",
        ],
      },
      {
        id: "towing-regulations",
        title: "Towing Regulations and Procedures",
        content:
          "Towing requires proper equipment and licensing. Maximum tow weight varies by vehicle class. Use proper hitch and safety chains. Check trailer brakes and lights. Follow speed limits and lane restrictions. Professional towing services licensed and insured. Understand towing laws and penalties.",
        keyPoints: [
          "Towing requires proper equipment",
          "Licensing required for commercial towing",
          "Maximum tow weight by vehicle class",
          "Proper hitch and safety chains required",
          "Check trailer brakes and lights",
          "Follow speed limits and restrictions",
          "Professional services licensed and insured",
          "Understand towing laws and penalties",
        ],
      },
      {
        id: "trailer-requirements",
        title: "Trailer Requirements and Safety",
        content:
          "Trailers must be registered and insured. Safety chains and hitch required. Maximum width 2.6m, length varies by type. Reflectors and lights required. Weight distribution important for stability. Secure cargo properly. Know trailer driving techniques and limitations.",
        keyPoints: [
          "Trailers must be registered and insured",
          "Safety chains and hitch required",
          "Maximum width 2.6m",
          "Length varies by trailer type",
          "Reflectors and lights required",
          "Proper weight distribution essential",
          "Secure cargo to prevent shifting",
          "Learn trailer driving techniques",
        ],
      },
    ],
  },
  {
    id: "off-road-vehicles",
    title: "Off-Road Vehicles and Snowmobiles",
    description:
      "Learn the regulations and safety practices for operating snowmobiles, ATVs, and other off-road vehicles in Ontario.",
    icon: "🏔️",
    estimatedTime: "35 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "snowmobile-licensing",
        title: "Snowmobile Licensing and Registration",
        content:
          "Snowmobiles require operator licensing and vehicle registration. Operators 16+ need valid driver's licence or snowmobile permit. Under 16 require special permit with supervision. Annual registration required. Display registration stickers. Know age restrictions and licensing requirements for different trail systems.",
        keyPoints: [
          "Snowmobile operator licensing required",
          "16+ need valid driver's licence or permit",
          "Under 16 require special permit",
          "Annual registration required",
          "Display registration stickers",
          "Age restrictions vary by trail",
          "Different licensing for trail systems",
          "Check local regulations",
        ],
      },
      {
        id: "helmet-safety",
        title: "Helmet and Safety Equipment Requirements",
        content:
          "Ontario law requires approved helmets for all snowmobile operators and passengers. Helmets must meet safety standards and be properly fitted. Additional equipment includes protective clothing, gloves, and boots. Eye protection required. Know proper helmet fitting and replacement schedules.",
        keyPoints: [
          "Approved helmets required for all",
          "Helmets must meet safety standards",
          "Proper helmet fitting essential",
          "Protective clothing recommended",
          "Gloves and boots for safety",
          "Eye protection required",
          "Replace helmets after impact",
          "Check helmet condition regularly",
        ],
      },
      {
        id: "operating-locations",
        title: "Operating Locations and Restrictions",
        content:
          "Snowmobiles permitted on designated trails and frozen waterways. Private property requires landowner permission. Provincial parks have specific regulations. Crown land has seasonal restrictions. Know where snowmobiling is prohibited. Respect wildlife areas and environmental restrictions.",
        keyPoints: [
          "Permitted on designated trails only",
          "Private property requires permission",
          "Provincial parks have regulations",
          "Crown land seasonal restrictions",
          "Prohibited in certain areas",
          "Respect wildlife areas",
          "Environmental restrictions apply",
          "Check local bylaws",
        ],
      },
      {
        id: "trail-permits",
        title: "Trail Permits and Public Trail Systems",
        content:
          "Ontario Trail Network requires permits for access. Annual permits available for residents and non-residents. Different permit types for different trail systems. Emergency contact information required. Trail conditions and closures posted online. Respect trail etiquette and yield to other users.",
        keyPoints: [
          "Ontario Trail Network requires permits",
          "Annual permits for residents/non-residents",
          "Different permit types available",
          "Emergency contact info required",
          "Check trail conditions online",
          "Trail closures posted regularly",
          "Respect trail etiquette",
          "Yield to other trail users",
        ],
      },
      {
        id: "speed-limits",
        title: "Speed Limits and Traffic Rules",
        content:
          "Snowmobile speed limits vary by area. Maximum 50 km/h on most trails. Slower in residential and crossing areas. Stop at all road crossings. Yield to pedestrians and other vehicles. Maintain safe following distances. Adjust speed for conditions. Know right-of-way rules.",
        keyPoints: [
          "Speed limits vary by area",
          "Maximum 50 km/h on most trails",
          "Slower in residential areas",
          "Stop at all road crossings",
          "Yield to pedestrians and vehicles",
          "Maintain safe following distances",
          "Adjust speed for conditions",
          "Know right-of-way rules",
        ],
      },
      {
        id: "snowmobile-signals",
        title: "Snowmobile Signals and Signs",
        content:
          "Snowmobile signs indicate trail directions, hazards, and restrictions. Hand signals used for communication. Standard signals for turning, stopping, and caution. Respect trail signs and markers. Know meaning of colored markers and buoys. Watch for wildlife crossing signs and speed zone markers.",
        keyPoints: [
          "Trail signs indicate directions",
          "Hand signals for communication",
          "Standard signals for turning/stopping",
          "Respect all trail signs",
          "Know colored markers meaning",
          "Watch for wildlife signs",
          "Speed zone markers important",
          "Trail closures clearly marked",
        ],
      },
      {
        id: "atv-regulations",
        title: "Off-Road Vehicle (ATV) Regulations",
        content:
          "ATVs require licensing and registration. Operators 16+ need valid licence. Under 16 require supervision and special permits. Helmet laws apply. Operating hours and locations restricted. Noise and environmental regulations enforced. Know ATV-specific safety requirements and operating restrictions.",
        keyPoints: [
          "ATV licensing and registration required",
          "16+ need valid licence",
          "Under 16 require supervision",
          "Helmets required by law",
          "Operating hours restricted",
          "Locations may be restricted",
          "Noise regulations apply",
          "Environmental protection rules",
        ],
      },
      {
        id: "atv-road-use",
        title: "All-Terrain Vehicle Road Use Exceptions",
        content:
          "Limited ATV road use allowed in specific circumstances. Must have valid licence and registration. Slow speeds and right lane only. Flag requirements for visibility. Local bylaws may restrict road use. Emergency or essential purposes only. Know specific road use regulations and exceptions.",
        keyPoints: [
          "Limited road use allowed",
          "Valid licence and registration required",
          "Slow speeds and right lane only",
          "Flag requirements for visibility",
          "Local bylaws may restrict",
          "Emergency purposes only",
          "Know specific regulations",
          "Check road conditions",
        ],
      },
      {
        id: "offroad-safety",
        title: "Safety Practices and Preparation",
        content:
          "Off-road vehicle operation requires special preparation. Check weather conditions and trail status. Carry emergency equipment and supplies. Know vehicle capabilities and limitations. Group riding safety practices. Environmental awareness and responsible operation. Regular equipment maintenance and inspection.",
        keyPoints: [
          "Check weather and trail conditions",
          "Carry emergency equipment",
          "Know vehicle capabilities",
          "Group riding safety practices",
          "Environmental awareness essential",
          "Responsible operation required",
          "Regular equipment maintenance",
          "Vehicle inspection before use",
        ],
      },
      {
        id: "impaired-offroad",
        title: "Impaired Driving Laws for Off-Road Vehicles",
        content:
          "Ontario's impaired driving laws apply to all vehicles including snowmobiles and ATVs. Zero tolerance for alcohol and drugs. Same penalties as highway driving. Criminal Code applies. Refusal to testing carries same penalties. Ignition interlock may be required. Education and treatment programs available.",
        keyPoints: [
          "Impaired laws apply to all vehicles",
          "Zero tolerance for alcohol/drugs",
          "Same penalties as highway driving",
          "Criminal Code applies",
          "Refusal equals conviction",
          "Ignition interlock may be required",
          "Education programs available",
          "Treatment options exist",
        ],
      },
    ],
  },
];

export function getChapterById(id: string): StudyGuideChapter | undefined {
  return studyGuideData.find((chapter) => chapter.id === id);
}

export function getSectionById(
  chapterId: string,
  sectionId: string
): StudyGuideSection | undefined {
  const chapter = getChapterById(chapterId);
  return chapter?.sections.find((section) => section.id === sectionId);
}
