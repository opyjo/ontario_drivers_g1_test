export interface StudyGuideSection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  practiceQuestions?: number[];
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
    id: "getting-started",
    title: "Getting Your License",
    description:
      "Complete guide to Ontario's Graduated Licensing System (GLS), license classifications, requirements, and the step-by-step process to get your G1, G2, and full G license.",
    icon: "📋",
    estimatedTime: "45 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "requirements",
        title: "Requirements for Driving in Ontario",
        content:
          "Ontario residents must be at least 16 years old and have a valid Ontario driver's licence. If you have just become an Ontario resident, you have 60 days to continue to use your existing driver's licence and apply for an Ontario driver's licence.\n\nVisitors to Ontario must be at least 16 years old, have a valid driver's licence from their home province, state or country, and must have an international driver's permit from their own country if visiting Ontario for more than 3 months. Visitors are not eligible for an Ontario driver's licence.\n\nDriving is a privilege - not a right. Ontario is a road safety leader in Canada and North America, with measures in place to maintain this record and improve driver behaviour.",
        keyPoints: [
          "Must be at least 16 years old",
          "Ontario residents need valid Ontario driver's licence",
          "New residents have 60 days to apply for Ontario licence",
          "Visitors need valid licence from home jurisdiction",
          "International permit required for visits over 3 months",
          "Visitors cannot get Ontario driver's licence",
          "Driving is a privilege, not a right",
        ],
      },
      {
        id: "license-classes",
        title: "Driver's License Classifications",
        content:
          "Ontario has 12 different classes of licences, each qualifying you to drive different types of vehicles. The class of licence you have must match the type of vehicle you are driving.\n\nClass G - Cars, vans, small trucks, or combinations up to 11,000 kg (towed vehicle max 4,600 kg)\nClass G1 - Level One of graduated licensing with restrictions\nClass G2 - Level Two of graduated licensing with some restrictions\n\nCommercial Classes:\nClass A - Any tractor-trailer combination, plus Class D and G vehicles\nClass B - School purpose buses, plus Classes C, D, E, F, and G\nClass C - Regular buses, plus Classes D, F, and G\nClass D - Vehicles over 11,000 kg or trucks with trailers over 4,600 kg, plus Class G\nClass E - School buses (max 24 passengers), plus Classes F and G\nClass F - Regular buses (max 24 passengers) and ambulances, plus Class G\n\nMotorcycle Classes:\nClass M - All motorcycles, motor tricycles, limited-speed motorcycles, and mopeds\nClass M1 - Level One motorcycle licensing with restrictions\nClass M2 - Level Two motorcycle licensing with some restrictions\n\nSpecial endorsements include 'Z' for air brakes and 'T' for recreational vehicles up to 14,000 kg.",
        keyPoints: [
          "12 different license classes available",
          "License class must match vehicle type",
          "Class G required for cars, vans, small trucks",
          "Class G prerequisite for most other licenses",
          "Commercial classes for buses and trucks",
          "Motorcycle classes separate from car licenses",
          "Special endorsements for air brakes and RVs",
        ],
      },
      {
        id: "gls-overview",
        title: "Graduated Licensing System Overview",
        content:
          "Ontario's Graduated Licensing System (GLS) lets new drivers gain skills and experience in low-risk environments. The two-step licensing process takes at least 20 months to complete and is designed to develop better, safer drivers.\n\nStatistics show that new drivers of all ages are far more likely than experienced drivers to be involved in serious or fatal collisions. The GLS helps address this by providing structured learning phases.\n\nTo apply for a licence, you must be at least 16 years old, pass a vision test, and pass a test of your knowledge of the rules of the road and traffic signs. After passing these tests, you enter Level One and get a Class G1 licence. You must then pass two road tests to become fully licensed - the first moves you to Level Two (Class G2), and the second gives you full Class G driving privileges.",
        keyPoints: [
          "Two-step process taking at least 20 months",
          "Helps develop safer drivers through progressive learning",
          "New drivers face significantly higher collision risks",
          "Must be 16+ years old to apply",
          "Requires vision test and knowledge test",
          "Two road tests required for full licensing",
          "G1 → G2 → Full G license progression",
        ],
      },
      {
        id: "g1-license",
        title: "Level One (Class G1) License",
        content:
          "Level One lasts 12 months, but can be reduced to 8 months if you complete an approved driver education course. The Ministry encourages all new drivers to take an approved course to learn proper driving skills and knowledge.\n\nG1 Restrictions:\n- Zero blood alcohol level - no drinking and driving\n- Must not drive alone - accompanying driver required in front passenger seat\n- Accompanying driver must have valid Class G (or higher) licence with at least 4 years experience and blood alcohol under 0.05%\n- Each person must have working seatbelt\n- No driving on 400-series highways with posted speeds over 80 km/h\n- No driving on QEW, Don Valley Parkway, Gardiner Expressway (GTA), E.C. Row Expressway (Windsor), or Conestoga Parkway (Kitchener-Waterloo)\n- No driving between midnight and 5 a.m.\n- Exception: If accompanied by driving instructor, may drive on any road\n\nG1 Knowledge Test Requirements:\n- Study the Official MTO Driver's Handbook\n- Bring two pieces of identification\n- Money for test fees (cash, debit, or credit)\n- Glasses/contacts if needed for driving",
        keyPoints: [
          "12-month duration (8 months with driver education)",
          "Zero blood alcohol level required",
          "Must drive with qualified supervisor at all times",
          "Supervisor needs 4+ years experience, under 0.05% BAC",
          "No 400-series highways or major expressways",
          "No driving between midnight and 5 a.m.",
          "Driving instructor allows highway driving",
          "Must pass knowledge test and vision test",
        ],
      },
      {
        id: "g2-license",
        title: "Level Two (Class G2) License",
        content:
          "Level Two lasts at least 12 months and provides more driving privileges due to increased experience. You reach this level by passing the G1 exit road test.\n\nG2 Restrictions:\n- Zero blood alcohol level required\n- Each person must have working seatbelt\n- Additional restrictions for drivers 19 and under between midnight and 5 a.m.:\n  - First 6 months: Only one passenger aged 19 or under\n  - After 6 months until age 20 or full G: Up to three passengers aged 19 or under\n\nExemptions to passenger restrictions:\n- Fully licensed driver in front passenger seat\n- Passengers are immediate family members (guardian, blood relatives, marriage, common-law, or adoption)\n\nG2 Exit Test Requirements:\n- Must have highway driving experience (80+ km/h speed limits)\n- Complete Declaration of Highway Driving Experience form\n- Bring vehicle in good working order\n- Money for test fees\n- Glasses/contacts if needed\n- Arrive 30 minutes before appointment\n\nNote: All drivers 21 and under must maintain zero blood alcohol level regardless of license class.",
        keyPoints: [
          "Minimum 12-month duration at Level Two",
          "More privileges than G1 license",
          "Zero blood alcohol still required",
          "Passenger restrictions for drivers 19 and under",
          "Restrictions only apply midnight to 5 a.m.",
          "Family members exempt from passenger limits",
          "Highway driving experience required for exit test",
          "All drivers 21 and under: zero blood alcohol",
        ],
      },
      {
        id: "application-process",
        title: "License Application Process",
        content:
          "To apply for a licence, you must show proof of your legal name and date of birth with original, valid documents. Photocopies and expired documents are not acceptable.\n\nPrimary Identification (one required):\n- Canadian or foreign passport\n- Canadian Citizenship Card with photo\n- Permanent Resident Card (PRC)\n- Record of Landing (Form 1000)\n- Confirmation of Permanent Residence (Form IMM 5292)\n- Temporary immigration documents (various IMM forms)\n\nAdditional Documents (if needed):\n- Canadian or U.S. Birth Certificate\n- Marriage certificate for name changes\n- Change-of-name certificate\n- Court orders for adoption, name change, or divorce\n- Sworn affidavit for missing birth date information\n\nApplication Location:\nBring documents to a DriveTest Centre or Travel Point. Phone ahead or check www.drivetest.ca for locations and hours.\n\nFees:\nYou must pay when applying. Fee includes knowledge test, first road test, and five-year licensing fee. Additional charges apply for second road test and retests.",
        keyPoints: [
          "Original, valid documents required",
          "Proof of legal name and complete birth date needed",
          "Multiple acceptable forms of identification",
          "Additional documents may be required",
          "Apply at DriveTest Centre or Travel Point",
          "Fees include tests and 5-year licensing",
          "Extra charges for retests",
        ],
      },
      {
        id: "road-tests",
        title: "Road Test Information",
        content:
          "Road tests check your driving skills in real traffic conditions. You'll be tested on your ability to follow traffic rules and practice safe driving.\n\nScheduling:\n- Schedule by internet, phone, or in-person at DriveTest Centre\n- Contact: 647-776-0331 or 1-888-570-6110\n- Online: DriveTest.ca\n\nTest Requirements:\n- Bring appropriate vehicle in good working condition\n- Vehicle must be plated and insured\n- G1 drivers: accompanying driver must come to test centre\n- G2 drivers: arrange alternate transportation in case of failure\n- No pets or passengers except examiner\n- No driving instructors, friends, or translators during test\n\nTest Restrictions:\n- Electronic driving aids not permitted (auto-parking, lane monitoring, cruise control, backup cameras)\n- Must demonstrate manual driving skills\n- Set time frame for each test\n- Cannot be asked to do anything illegal\n\nAfter the Test:\n- Complete report provided explaining any mistakes\n- Must wait 10 days between retests\n- 50% fee lost for out-of-order tests\n- No refund for cancellations under 48 hours or no-shows",
        keyPoints: [
          "Tests real-world driving skills and knowledge",
          "Schedule online, by phone, or in person",
          "Vehicle must be roadworthy, plated, insured",
          "No electronic driving aids allowed",
          "Must demonstrate manual driving skills",
          "10-day wait between retests required",
          "Detailed feedback provided after each test",
        ],
      },
      {
        id: "new-residents",
        title: "New Ontario Residents",
        content:
          "If you're a new Ontario resident with a valid driver's licence from another province or country, you can use that licence for 60 days. To continue driving after 60 days, you must get an Ontario licence.\n\nReciprocating Jurisdictions:\nOntario has licence-exchange agreements with all Canadian provinces/territories, plus Australia, Austria, Belgium, France, Germany, Great Britain, Ireland, Isle of Man, Japan, New Zealand, Northern Ireland, Republic of Korea, Switzerland, Taiwan, and United States.\n\nWith Reciprocal Agreement:\n- Receive full Class G licence with equivalent experience\n- Less than 2 years experience: may enter Level Two (G2)\n- Total 2 years experience required for full G licence\n\nNon-Reciprocating Jurisdictions:\n- Must pass vision test, knowledge test, and pay fees\n- Receive G1 licence initially\n- May take G1 exit test with 12 months combined experience\n- 8 months with approved driver education course\n- Must provide proof of foreign driving experience\n- Ministry may accept declaration for up to 12 months\n- Over 12 months: need authenticated letter from embassy/consulate\n- 24 months total experience required for G2 exit test\n- Only experience within past 3 years counts",
        keyPoints: [
          "60-day grace period with existing licence",
          "Reciprocal agreements with many countries",
          "Full G licence possible with equivalent experience",
          "Non-reciprocal: start with G1 licence",
          "Combined experience counts toward requirements",
          "Proof of foreign experience required",
          "Only recent experience (3 years) accepted",
        ],
      },
      {
        id: "driving-schools",
        title: "Choosing a Driving School",
        content:
          "A beginner driver education (BDE) course from a ministry-approved driving school can teach essential skills and attitudes for safe driving. The course may make you eligible to take your road test sooner and provide insurance savings.\n\nBDE Course Benefits:\n- Reduces Level One time from 12 to 8 months\n- May provide car insurance discounts\n- Teaches strategic driving techniques\n- Covers risk perception and management\n- Includes freeway and night driving\n- Addresses adverse weather conditions\n\nCourse Requirements:\n- Minimum 40 hours total instruction\n- At least 20 hours classroom instruction\n- 10 hours in-vehicle instruction\n- 10 hours flexible instruction (classroom, computer, simulator, homework)\n- Taught by ministry-licensed instructors\n- Only at ministry-licensed schools\n\nChoosing a School Checklist:\n- Ministry approval and current licensing\n- Comprehensive course information package\n- Adequate classroom facilities\n- Low student-to-teacher ratios\n- Modern audiovisual equipment\n- Qualified, experienced instructors\n- Regular instructor upgrading\n- Student progress evaluation\n- Modern training materials\n- Vehicle provided for road test\n- Clear contract terms and costs\n- Consumer protection insurance\n- Good reputation and references",
        keyPoints: [
          "BDE courses reduce G1 waiting period by 4 months",
          "May provide insurance premium savings",
          "Minimum 40 hours instruction required",
          "20 hours classroom, 10 hours in-vehicle, 10 flexible",
          "Only ministry-approved schools can offer BDE",
          "Covers advanced driving techniques and conditions",
          "Choose schools with good facilities and reputation",
        ],
      },
    ],
  },
  {
    id: "safe-driving",
    title: "Essential Driving Skills",
    description:
      "Comprehensive guide to essential driving skills including defensive driving principles, vehicle preparation, road sharing, and handling various driving situations.",
    icon: "🛡️",
    estimatedTime: "90 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "fundamentals",
        title: "Safe and Responsible Driving Fundamentals",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Being a safe and responsible driver requires a perfect combination of knowledge, skill, and attitude. It's not just about following rules—it's about understanding why those rules exist and how they protect everyone on the road.</p>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🛡️ The Three Pillars of Safe Driving</h4>
            <div class="grid md:grid-cols-3 gap-4 text-sm">
              <div class="bg-white rounded-lg p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-2">Knowledge</h5>
                <p class="text-blue-700">Understanding traffic laws, road signs, and safe driving practices</p>
              </div>
              <div class="bg-white rounded-lg p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-2">Skill</h5>
                <p class="text-blue-700">Mastering vehicle control, observation, and decision-making abilities</p>
              </div>
              <div class="bg-white rounded-lg p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-2">Attitude</h5>
                <p class="text-blue-700">Maintaining patience, courtesy, and respect for others on the road</p>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Legal Framework of Driving</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⚖️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Traffic Laws and Enforcement</h4>
                  <ul class="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Federal, provincial, and municipal governments create laws</li>
                    <li>• Police from all levels enforce traffic regulations</li>
                    <li>• Violations can result in fines, jail time, or license suspension</li>
                    <li>• Driving with suspended license leads to vehicle impoundment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🤝</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Shared Responsibility</h4>
                  <ul class="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Every driver shares responsibility for safety</li>
                    <li>• You can be held liable even if another driver is at fault</li>
                    <li>• Focus on what you can control to prevent collisions</li>
                    <li>• Defensive driving protects you and others</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">The Art of Predictable and Courteous Driving</h3>

          <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-indigo-800 mb-2">🎯 Predictable Driving</h4>
                <p class="text-indigo-700 text-sm mb-3">Other road users should be able to anticipate your actions based on standard driving practices:</p>
                <ul class="space-y-2 text-sm text-indigo-600">
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Signal turns and lane changes well in advance</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Maintain consistent speeds when safe to do so</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Position your vehicle appropriately for your intended maneuvers</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Use headlights and signals to communicate your intentions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-indigo-800 mb-2">🙏 Courteous Driving</h4>
                <p class="text-indigo-700 text-sm mb-3">Creating a positive driving environment benefits everyone:</p>
                <ul class="space-y-2 text-sm text-indigo-600">
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Allow space for others to merge or change lanes</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Avoid cutting off other vehicles</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Signal intentions clearly and promptly</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                    <span>Be patient with slower drivers when it's safe to pass</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">💡 Key Safety Philosophy</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="bg-white rounded p-3 border border-green-300">
                <p class="text-green-800 font-medium mb-1">Beyond Obedience</p>
                <p class="text-green-600">Safe driving isn't just about following rules—it's about understanding that every action affects the safety of others on the road.</p>
              </div>
              <div class="bg-white rounded p-3 border border-green-300">
                <p class="text-green-800 font-medium mb-1">Personal Responsibility</p>
                <p class="text-green-600">Even when others make mistakes, you have a responsibility to do everything possible to avoid a collision.</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🚗 Practical Applications</h4>
            <ul class="space-y-2 text-sm text-blue-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Intersection approach:</strong> Reduce speed, check mirrors, signal intentions, yield when required</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Lane changes:</strong> Check blind spots, signal early, allow adequate space for the maneuver</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Following distance:</strong> Maintain space to stop safely, increase distance in poor conditions</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Adverse conditions:</strong> Reduce speed, increase following distance, use appropriate lighting</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "Requires combination of knowledge, skill, and attitude",
          "Must know and follow traffic laws from all government levels",
          "Everyone responsible for avoiding collisions",
          "Must be predictable and courteous to other road users",
          "Breaking traffic laws can result in fines, jail, or license loss",
          "Suspended license driving can result in vehicle impoundment",
        ],
      },
      {
        id: "defensive-driving",
        title: "Defensive Driving Principles",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Defensive driving is about anticipating potential hazards and taking proactive measures to avoid dangerous situations before they become emergencies. It's a strategic approach that prioritizes prevention over reaction.</p>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🛡️ Defensive Driving Mission</h4>
            <p class="text-red-700 text-sm">The goal is to see potential dangers before they happen and have enough time to respond safely. This requires constant awareness, anticipation, and preparation for the unexpected.</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">The Three Pillars of Defensive Driving</h3>

          <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">👁️</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-blue-800">Visibility - See and Be Seen</h4>
                  <p class="text-blue-700 text-sm mb-3">Maintaining awareness of your surroundings and ensuring others can see you:</p>
                  <ul class="space-y-2 text-sm text-blue-600">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Scan the road ahead, sides, and behind constantly</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Check mirrors every 5-8 seconds</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Look 15-20 seconds ahead in traffic</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Use signal lights to communicate intentions</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Keep headlights on in low visibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚗</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-green-800">Space Management</h4>
                  <p class="text-green-700 text-sm mb-3">Creating and maintaining safe distances around your vehicle:</p>
                  <ul class="space-y-2 text-sm text-green-600">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Maintain 2-3 second following distance</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Keep space on all sides of your vehicle</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Allow extra space in adverse conditions</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Create escape routes when stopped</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Leave gaps in traffic for merging vehicles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">💬</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-purple-800">Communication</h4>
                  <p class="text-purple-700 text-sm mb-3">Clear communication with other road users:</p>
                  <ul class="space-y-2 text-sm text-purple-600">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Make eye contact at intersections</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Signal intentions well in advance</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Use horn appropriately for warnings</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Flash lights to warn of hazards</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Position vehicle to be clearly visible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Anticipate dangerous situations before they happen",
          "Based on three principles: visibility, space, communication",
          "Keep eyes constantly moving and scanning",
          "Check mirrors every five seconds",
          "Maintain space cushion on all sides",
          "Greatest collision risk is in front of vehicle",
          "Make eye contact and signal intentions clearly",
          "Use horn to get attention when necessary",
        ],
      },
      {
        id: "getting-ready",
        title: "Getting Ready to Drive",
        content:
          "Before you drive, make sure you are comfortable with your physical, mental and emotional state, your vehicle and the conditions in which you will be driving. If you have doubts about any of them, don't drive.\n\nBe Physically and Mentally Alert\n\nYou must be in good physical and mental condition to drive. Don't drive when you are sick or injured or when you have been drinking alcohol or taking any drug or medication that may reduce your ability to drive. Don't drive when you are tired - you might fall asleep at the wheel, risking the lives of others. Even if you don't fall asleep, fatigue affects your driving ability. Your thinking slows down and you miss seeing things. Don't drive when you are upset or angry. Strong emotions can reduce your ability to think and react quickly.\n\nKnow Your Vehicle\n\nGet to know your vehicle before you drive it. There are many types of vehicles available today with many different characteristics, including fuel ignition systems, anti-lock brakes, four-wheel drive, and systems for traction control and stability control. Many newer vehicles offer technologies that assist drivers with steering, braking and accelerating to help you stay within your lane, avoid or reduce collisions, and maintain safe following distances.\n\nCheck the vehicle owner's manual to learn how these systems work, how to properly operate them, and to understand their limitations. No matter what technologies are available in your vehicle, you must always pay attention to how they operate, be ready to take over control of the vehicle in the event of an unusual situation, and recognize that you remain responsible for all driving tasks.\n\nMake sure you know where all the controls and instruments are and what they do. Check that all warning lights and gauges work. Watch for a warning light that stays on after you drive away; it could mean a serious problem with your vehicle. Get to know the controls well enough to turn on wipers and washers, headlights, high beams, heater and defroster without having to look.",
        keyPoints: [
          "Check physical, mental, and emotional state before driving",
          "Don't drive when sick, tired, upset, or impaired",
          "Familiarize yourself with vehicle's specific features and technologies",
          "Learn all controls and instruments locations",
          "Understand driver assistance technology limitations",
          "You remain responsible for all driving tasks",
          "Practice using essential controls without looking",
          "Monitor warning lights and gauges for problems",
        ],
      },
      {
        id: "seating-mirrors",
        title: "Seating Position and Mirror Adjustment",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Proper seating position and mirror adjustment are fundamental to safe driving. They ensure maximum visibility, comfort, and control while minimizing blind spots that can hide other vehicles, pedestrians, and cyclists.</p>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Seating Position Fundamentals</h3>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-blue-800 mb-2">🪑 Proper Driving Position</h4>
                <ul class="space-y-2 text-sm text-blue-700">
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Seat height</strong> - adjust so you can see over dashboard clearly</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Back support</strong> - recline slightly for comfort and control</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Head restraint</strong> - position to protect head and neck</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Arm reach</strong> - elbows slightly bent at steering wheel</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-blue-800 mb-2">🛞 Steering Wheel Position</h4>
                <ul class="space-y-2 text-sm text-blue-700">
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Hand position</strong> - 9 o'clock and 3 o'clock position</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Airbag clearance</strong> - maintain proper distance</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Controls access</strong> - reach all controls without moving</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <span><strong>Instrument visibility</strong> - clear view of all gauges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Mirror Adjustment for Maximum Visibility</h3>

          <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🔄</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-green-800">Interior Rearview Mirror</h4>
                  <ul class="space-y-2 text-sm text-green-700 mt-2">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Position to show center of rear window</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Clear view of traffic behind you</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Minimize rear headrest obstruction</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>Adjust for night driving glare</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⬅️</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-blue-800">Left Side Mirror</h4>
                  <ul class="space-y-2 text-sm text-blue-700 mt-2">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Lean toward window to adjust</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Just see rear corner of your vehicle</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Maximize view of lane beside you</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span>Minimize overlap with interior mirror</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">➡️</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-purple-800">Right Side Mirror</h4>
                  <ul class="space-y-2 text-sm text-purple-700 mt-2">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Lean toward center to adjust</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Just see rear corner of your vehicle</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Maximize view of adjacent lane</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                      <span>Minimize overlap with interior mirror</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🚨 Understanding Blind Spots</h4>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 class="font-bold text-red-700 mb-2">What Are Blind Spots?</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• Areas not visible in mirrors</li>
                  <li>• Typically back left and right</li>
                  <li>• Vary by vehicle size and design</li>
                  <li>• Can hide vehicles, cyclists, pedestrians</li>
                  <li>• Larger in taller vehicles</li>
                </ul>
              </div>
              <div>
                <h5 class="font-bold text-red-700 mb-2">How to Check Blind Spots</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• Turn head and look over shoulder</li>
                  <li>• Use shoulder checks before maneuvers</li>
                  <li>• Check before changing lanes</li>
                  <li>• Check before turning at intersections</li>
                  <li>• Practice with someone walking around vehicle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Adjust mirrors to minimize blind spots",
          "Interior mirror should show center of rear window",
          "Position side mirrors to just see rear of car",
          "Avoid mirror overlap for better coverage",
          "Shoulder checks only way to see blind spots",
          "Learn your vehicle's specific blind spot locations",
          "Most vehicles have blind spots back left and right",
          "Practice with someone walking around vehicle",
        ],
      },
      {
        id: "seatbelts-safety",
        title: "Seatbelts and Child Safety",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Seatbelts and child safety restraints are the most important safety features in any vehicle. They protect lives in crashes and are required by law. Understanding proper usage and installation is crucial for all drivers and passengers.</p>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🚨 Legal Requirement</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-red-700">Seatbelts:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>All drivers and passengers must wear seatbelts</li>
                  <li>Fine up to $500 for violations</li>
                  <li>2 demerit points on license</li>
                  <li>Applies to all seating positions with belts</li>
                </ul>
              </div>
              <div>
                <strong class="text-red-700">Child Restraints:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>Children under 8 must use approved restraints</li>
                  <li>Proper installation required</li>
                  <li>Failure can result in fines up to $1,000</li>
                  <li>Child safety is driver's responsibility</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Adult Seatbelt Safety</h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🔒</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-blue-800">Proper Seatbelt Use</h4>
                  <ul class="space-y-2 text-sm text-blue-700 mt-3">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span><strong>Shoulder belt:</strong> Across chest, not under arm or behind back</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span><strong>Lap belt:</strong> Low and tight across hips, not across abdomen</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span><strong>No twisting:</strong> Belts should lie flat against body</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                      <span><strong>Regular checks:</strong> Ensure belts aren't frayed or damaged</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🛡️</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-green-800">Why Seatbelts Save Lives</h4>
                  <ul class="space-y-2 text-sm text-green-700 mt-3">
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span><strong>Reduce serious injury risk by 50%</strong> in collisions</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span><strong>Prevent ejection</strong> from vehicle in rollover crashes</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span><strong>Work with airbags</strong> for maximum protection</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span><strong>Essential in all seating positions</strong> with belt systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Child Restraint Systems</h3>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 class="font-bold text-yellow-800 mb-2">👶 Child Restraint Requirements by Age</h4>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div class="bg-white rounded p-3 border border-yellow-300">
                <h5 class="font-bold text-yellow-800 mb-1">Under 1 year</h5>
                <p class="text-yellow-600">Rear-facing car seat</p>
                <p class="text-yellow-500 text-xs mt-1">Until at least 1 year and 20 lbs</p>
              </div>
              <div class="bg-white rounded p-3 border border-yellow-300">
                <h5 class="font-bold text-yellow-800 mb-1">1-4 years</h5>
                <p class="text-yellow-600">Forward-facing car seat</p>
                <p class="text-yellow-500 text-xs mt-1">With harness system</p>
              </div>
              <div class="bg-white rounded p-3 border border-yellow-300">
                <h5 class="font-bold text-yellow-800 mb-1">4-8 years</h5>
                <p class="text-yellow-600">Booster seat</p>
                <p class="text-yellow-500 text-xs mt-1">Until seatbelt fits properly</p>
              </div>
              <div class="bg-white rounded p-3 border border-yellow-300">
                <h5 class="font-bold text-yellow-800 mb-1">8+ years</h5>
                <p class="text-yellow-600">Seatbelt only</p>
                <p class="text-yellow-500 text-xs mt-1">When properly fitted</p>
              </div>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Seatbelts required for all occupants",
          "Drivers face fines and demerit points for non-compliance",
          "Proper positioning: shoulder strap over shoulder, lap belt over hips",
          "Airbags supplement, don't replace seatbelts",
          "Child restraint requirements based on age, weight, height",
          "Rear-facing seats for infants under 20 lbs",
          "Booster seats for children 40-80 lbs under age 8",
          "Back seat safest for children under 13",
        ],
      },
      {
        id: "lighting-systems",
        title: "Vehicle Lighting Systems",
        content:
          "Turn on Headlights at Night and in Poor Conditions\n\nHeadlights enable you to see the roadway in front of your vehicle when visibility is poor, as well as making your vehicle visible to others. Your vehicle's headlights must shine a white light that can be seen at least 150 metres in front and is strong enough to light up objects 110 metres away.\n\nHeadlights are required to be turned on between one-half hour before sunset and one-half hour after sunrise, and any other time of poor light conditions, such as fog, snow or rain, which keeps you from clearly seeing people or vehicles less than 150 metres away.\n\nHigh Beam and Low Beam Rules:\n\nWhen you use high-beam headlights, remember to switch to low beams within 150 metres of an oncoming vehicle. Use your low beams when you are less than 60 metres behind another vehicle unless you are passing it. These rules apply to all roads, including divided ones.\n\nDaytime Running Lights\n\nDaytime running lights are specifically designed to make your vehicle more visible during times of good light conditions, and are automatically activated when your vehicle is in operation. Your daytime running lights are not to be used as headlights during poor lighting conditions. They provide an inappropriate form of light that may cast glare onto others or deactivate other required light systems, such as tail lights.\n\nImportant Guidelines:\n\nDon't drive with only one headlight or with lights that are not aimed properly. Have your full lighting system checked regularly, keep them clean, and replace burned-out bulbs as soon as possible. Parking lights are only for parking. In low light, use your headlights, not parking lights. Driving with your vehicle's full lighting system set to automatic is recommended, if your vehicle is equipped with this option.",
        keyPoints: [
          "Headlights required 30 min before sunset to 30 min after sunrise",
          "Must use in poor visibility conditions under 150m",
          "Switch to low beams within 150m of oncoming traffic",
          "Low beams when following within 60m",
          "Daytime running lights for good conditions only",
          "Keep all lights clean and properly aimed",
          "Replace burned-out bulbs immediately",
          "Use automatic lighting system if available",
        ],
      },
      {
        id: "driving-along",
        title: "Driving Along - Basic Techniques",
        content:
          "Always be aware of traffic around you as you drive. Develop a routine for looking ahead, behind and from side to side. Check your mirrors every five seconds or so, and check your blind spots by turning your head to look over your shoulder. Keep other drivers out of your blind spot by changing your speed and don't drive in other vehicles' blind spots.\n\nSteer Smoothly\n\nAll steering should be smooth and precise. You should do most steering and lane changes without taking either hand off the wheel. You must be able to steer in a straight line while shifting gears, adjusting controls or checking your blind spot. Picture the steering wheel as a clock and place your hands at nine o'clock and three o'clock.\n\nUse of Turn Signals and Brake Lights\n\nSignals tell other drivers what you want to do, alerting them to your intention to turn or stop. Use your turn signals and brake lights to signal before stopping, slowing down, turning, changing lanes, leaving the road or moving out from a parked position. Give the correct signal well before taking the action and make sure other drivers can see it. Check that the way is clear before you act, just signalling is not enough.\n\nKeep Right\n\nKeep to the right of the road or in the right-hand lane on multi-lane roads unless you want to turn left or pass another vehicle. This is especially important if you are driving more slowly than other vehicles.\n\nObey Speed Limits\n\nObey the maximum speed limit posted on signs along the road, but always drive at a speed that will let you stop safely. This means driving below the maximum speed in bad weather, in heavy traffic or in construction zones. Where there are no posted speed limits, the maximum speed is 50 km/h in cities, towns and villages, and 80 km/h elsewhere.\n\nCruise control is a driver aid that can improve fuel economy and prevent you from inadvertently exceeding the speed limit. However, there are some circumstances in which cruise control should not be used, such as adverse driving conditions (wet, icy or slippery roads), in heavy traffic or when you are feeling fatigued.",
        keyPoints: [
          "Check mirrors every five seconds",
          "Maintain space cushion around vehicle",
          "Smooth, precise steering with hands at 9 and 3",
          "Signal well before all maneuvers",
          "Keep right except when turning left or passing",
          "Obey posted speed limits and adjust for conditions",
          "Default speeds: 50 km/h urban, 80 km/h rural",
          "Use cruise control appropriately, not in adverse conditions",
        ],
      },
      {
        id: "following-distance",
        title: "Maintaining Safe Following Distance",
        content:
          "As a general rule, drive at the same speed as traffic around you without going over the speed limit. Leave a cushion of space around your vehicle to let other drivers see you and to avoid a collision.\n\nWhenever you follow another vehicle, you need enough space to stop safely if the other vehicle brakes suddenly. A safe following distance is at least two seconds behind the vehicle in front of you. This lets you see around the vehicle ahead and gives you enough distance to stop suddenly.\n\nTo give yourself a two-second space, follow these steps:\n\nPick a marker on the road ahead, such as a road sign or telephone pole. When the rear of the vehicle ahead passes the marker, count 'one thousand and one, one thousand and two'. When the front of your vehicle reaches the marker, stop counting. If you reach the marker before you count 'one thousand and two,' you are following too closely.\n\nRemember that the two-second rule gives a minimum following distance. It applies only to ideal driving conditions. You will need extra space in certain situations, such as bad weather, when following motorcycles or large trucks, or when carrying a heavy load.\n\nObey Police\n\nWhen police officers are directing traffic, you must follow their directions, even if the directions are different from traffic lights or signs. When a police officer signals you to pull your vehicle over, you must pull over as far to the right as you safely can and come to a complete stop. Stay in your vehicle and wait for the police officer. You must immediately, upon the police officer's request, surrender your driver's licence, vehicle permit (or copy) and insurance.",
        keyPoints: [
          "Minimum two-second following distance in ideal conditions",
          "Provides time and space to stop safely",
          "Measure using fixed objects and counting method",
          "Increase distance in poor conditions or behind large vehicles",
          "Extra space needed when carrying heavy loads",
          "Follow police directions over traffic signals",
          "Must immediately provide documents when requested",
          "Pull far right and stop completely when signaled",
        ],
      },
      {
        id: "sharing-road",
        title: "Sharing the Road with Other Road Users",
        content:
          "Ontario's roads accommodate many road users, including pedestrians, motorcycles, bicycles, large trucks, buses and farm machinery. Be aware of other road users, the speed at which they travel and the space they occupy on the road.\n\nSharing the Road with Pedestrians\n\nRoad safety is a responsibility that is shared between pedestrians and drivers. Watch for children – Drive slowly and cautiously through school zones, residential areas and any other location where children may be walking or playing. Watch for all crosswalks – not all crosswalks are marked, but nearly all intersections have crosswalks. Do not pass a vehicle stopped at a crosswalk.\n\nWatch for seniors or pedestrians with disabilities who need extra caution and courtesy from drivers, as they may be slow in crossing the road. Pedestrians who are blind or with a visual disability may use a white cane or guide dog. Drivers of hybrid or electric vehicles should be aware that vision-impaired people often rely on the sound of an engine before entering an intersection.\n\nSharing the Road with Cyclists\n\nBicycles and mopeds travelling at a lower speed than other traffic are expected to ride about one metre from the curb or parked cars. However, they can use any part of the lane if necessary for safety. When passing a cyclist, drivers of motor vehicles must maintain a minimum distance of one metre, where practical between their vehicle and the cyclist. Failure to do so may result in a fine and two demerit points.\n\nDo not follow too closely behind cyclists. They do not have brake lights to warn you when they are slowing or stopping. At intersections, when turning right, signal and check your mirrors and the blind spot to your right to make sure you do not cut off a cyclist. When turning left, you must stop and wait for oncoming bicycles to pass before turning.\n\nSharing the Road with Large Commercial Vehicles\n\nIt is extremely important to know how to drive safely when sharing the road with large commercial vehicles such as tractor-trailers and buses. Large commercial vehicles have big blind spots on both sides. Avoid tailgating a large vehicle. Remember that if you can't see the driver's face in the large vehicle's side-view mirror, the driver cannot see you.\n\nLarge commercial vehicles require a much longer distance to stop than smaller vehicles. When passing a large vehicle, do not cut in front closely. Allow more room when passing a large vehicle. When making a right turn, a large vehicle may need to first swing wide to the left to avoid hitting the right curb. Do not move up into the space that opens up in the right lane.",
        keyPoints: [
          "Roads accommodate many different types of users",
          "Extra caution needed around children and seniors",
          "Not all crosswalks are marked - most intersections have them",
          "Maintain 1-meter distance when passing cyclists",
          "Cyclists can use full lane width for safety",
          "Large vehicles have bigger blind spots and stopping distances",
          "Don't cut in front of large vehicles after passing",
          "Watch for wide turns by large vehicles",
        ],
      },
      {
        id: "intersections",
        title: "Driving Through Intersections",
        content:
          "Be alert as you come to intersections and look carefully for pedestrians, cyclists, other motor vehicles, yield signs, stop signs and traffic lights. Be sure to scan any sidewalks and paths/trails as well as the roadways.\n\nControlled Intersections\n\nControlled intersections have traffic lights, yield signs or stop signs to control traffic. At a controlled intersection where you face a green light, drive carefully through the intersection at a steady speed. If the light has been green for a while, be prepared to stop when it turns yellow. Where you face a red light, come to a complete stop and wait until the light turns green.\n\nAt a controlled intersection where you face a yield sign, slow down or stop if necessary and wait until the way is clear before driving through the intersection. At a controlled intersection where you face a stop sign, come to a complete stop. Drive through the intersection only when the way is clear.\n\nUncontrolled Intersections\n\nUncontrolled intersections have no signs or traffic lights. They are usually found in areas where there is not much traffic. Be extra careful around these intersections. If two vehicles come to an uncontrolled intersection from different roads at the same time, the driver on the left must let the driver on the right go first. This is called yielding the right-of-way.\n\nYielding the Right-of-Way\n\nThere are times when you must yield the right-of-way:\n\nAt an intersection without signs or lights, yield to a vehicle approaching before you, and if you arrive at the same time, the vehicle approaching from the right has the right-of-way. At an intersection with stop signs at all corners, yield to the first vehicle to come to a complete stop. If two vehicles stop at the same time, the vehicle on the left must yield to the vehicle on the right. If you are turning left or right, you must yield the right-of-way to approaching traffic and pedestrians. When entering a road from a private road or driveway, you must yield to vehicles on the road and pedestrians on the sidewalk. You must yield and wait for pedestrians to completely cross the road at pedestrian crossovers and school crossings with crossing guards",
        keyPoints: [
          "Scan for all road users including pedestrians and cyclists",
          "Controlled intersections have traffic control devices",
          "Come to complete stop at red lights and stop signs",
          "Uncontrolled intersections require extra caution",
          "Right-of-way goes to vehicle on right when arriving simultaneously",
          "Always yield when turning left or right",
          "Yield when entering from private roads or driveways",
          "Wait for pedestrians to completely cross at crossovers",
        ],
      },
      {
        id: "stopping",
        title: "Stopping Safely and Properly",
        content:
          "Knowing how to stop safely and properly is an important driving skill. Safe and responsible drivers see stops ahead, check their mirrors, begin braking early and stop smoothly. Use your right foot for both brake and gas pedals so you won't step on both pedals at the same time.\n\nWhere to Stop\n\nYou must come to a complete stop for all stop signs and red traffic lights. Stop at the stop line if it is marked on the pavement. If there is no stop line, stop at the crosswalk, marked or not. If there is no crosswalk, stop at the edge of the sidewalk. If there is no sidewalk, stop at the edge of the intersection. Wait until the way is clear before entering the intersection.\n\nStopping at Railway Crossings\n\nAll railway crossings on public roads in Ontario are marked with large red and white 'X' signs. When you come to a railway crossing:\n\nSlow down, listen and look both ways to make sure the way is clear before crossing the tracks. If a train is coming, stop at least five metres from the nearest rail or gate. Never race a train to a crossing. If there are signal lights, wait until they stop flashing before crossing. Never drive around, under or through a railway gate or barrier. Avoid stopping in the middle of railway tracks. If you get trapped on a crossing, immediately get everyone out and away from the vehicle.\n\nStopping for School Buses\n\nYou must stop whenever you approach a stopped school bus with its upper alternating red lights flashing, regardless of whether you are behind the bus or approaching it from the front. When approaching the bus from the front, stop at a safe distance. If you are coming from behind the bus, stop at least 20 metres away. Do not go until the bus moves or the lights have stopped flashing.\n\nIf you are on a road with a median strip, only vehicles coming from behind the bus must stop. You must obey the school bus law on any road, no matter how many lanes or what the speed limit.\n\nStopping for Pedestrian Crossovers\n\nPedestrian crossovers are designated areas that allow pedestrians to safely cross roads where there are no traffic lights. Drivers including cyclists must yield the right-of-way to pedestrians in the crossover. Only when pedestrians have crossed and are safely on the sidewalk can drivers and cyclists proceed. You must not pass any vehicle within 30 metres of a pedestrian crossover.",
        keyPoints: [
          "Begin braking early and stop smoothly",
          "Use right foot for both brake and gas pedals",
          "Stop at stop line, crosswalk, or intersection edge",
          "Stop at least 5 metres from railway crossings when train coming",
          "Never race trains or drive around railway barriers",
          "Stop for school buses with flashing red lights",
          "Stop 20 metres behind school bus, safe distance in front",
          "Yield to pedestrians at crossovers and wait until they're clear",
        ],
      },
      {
        id: "changing-directions",
        title: "Changing Directions - Turns and Maneuvers",
        content:
          "Before you turn a corner, back up, change lanes or turn around, you need to know what is beside and behind you. Always check your mirrors and over your shoulder to make sure the way is clear and you have enough space to complete the move safely.\n\nTurning a Corner\n\nTo turn a corner, signal well before the turn. When the way is clear, move into the proper lane. Signal your turn and look from side to side and check your blind spots to make sure the way is clear. Slow down before you enter the turn; the sharper the turn, the slower you should go. To keep full control of the vehicle, finish braking before you turn the steering wheel.\n\nRight Turns\n\nUnless signs or pavement markings tell you not to, always begin and end a right turn close to the right side of the road. To make a right turn, signal well before the turn and move into the right-hand lane when the way is clear. Look ahead, left, right and left again before starting to turn. Check your right rear blind spot. Let cyclists, limited-speed motorcycles, or moped riders go through the intersection before you turn.\n\nRight Turn on a Red Light\n\nUnless a sign tells you not to, you may make a right turn facing a red light as long as you first come to a complete stop and wait until the way is clear. Remember to signal your turn and yield to pedestrians and others using the road.\n\nLeft Turns\n\nUnless signs or pavement markings tell you not to, always begin and end a left turn in the far left lane in your direction. To make a left turn, signal well before the turn and move into the far left lane when the way is clear. Look ahead, behind, left, right and left again and check your blind spots. Make your turn when the way is clear.\n\nWhen you are stopped at an intersection waiting for approaching traffic to clear, don't turn your steering wheel to the left until you can complete the turn. With your wheels turned to the left, your vehicle could be pushed into the path of oncoming traffic.\n\nBacking Up\n\nTake extra care and move slowly when backing up (reversing) your vehicle. Before you begin, check that the way is clear behind you. Be especially careful to look for children and cyclists. While firmly holding the steering wheel, put the gear selector in reverse and turn sideways in your seat to look over your shoulder in the direction you are moving.\n\nTurning Around\n\nThe simplest and safest way to turn around is to drive around the block. In cases where this is not possible, a U-turn or a three-point turn may be necessary. Before you make a U-turn, check to make sure there is no sign saying not to. It is illegal to make a U-turn on a curve in the road, on or near a railway crossing or hilltop, or near a bridge or tunnel that blocks your view. Never make a U-turn unless you can see at least 150 metres in both directions.",
        keyPoints: [
          "Check mirrors and blind spots before all direction changes",
          "Signal well before turning and ensure way is clear",
          "Slow down before entering turns, finish braking before steering",
          "Right turns: stay close to right side of road",
          "Right on red allowed after complete stop unless prohibited",
          "Left turns: use far left lane, don't pre-turn steering wheel",
          "Backing up: move slowly, check for children and cyclists",
          "U-turns illegal on curves, hills, or near obstructions",
        ],
      },
      {
        id: "changing-positions",
        title: "Changing Positions - Lane Changes and Passing",
        content:
          "Changing your position on the road involves changing lanes or overtaking and passing another vehicle. Before beginning, be sure you have enough space and time to complete the move safely.\n\nChanging Lanes\n\nChanging lanes is a movement from one lane to another on roads with two or more lanes in the same direction. Never change lanes without giving the proper signal and looking to make sure the move can be made safely.\n\nSteps for Making a Lane Change:\n\nCheck your mirrors for a space in traffic where you can enter safely. Check your blind spot by looking over your shoulder in the direction of the lane change. Signal that you want to move left or right. Check again to make sure the way is clear. Steer gradually into the new lane. Do not slow down, maintain the same speed or gently increase it.\n\nNever make sudden lane changes by cutting in front of another vehicle, including bicycles. Avoid unnecessary lane changes or weaving from lane to lane. Don't change lanes in or near an intersection.\n\nPassing\n\nPassing is changing lanes to move past a slower vehicle. Never overtake and pass another vehicle unless you are sure you can do so without danger to yourself or others. Don't pass moving snow plows under any conditions.\n\nSteps for Passing a Vehicle:\n\nUse your left-turn signal to show that you want to pass and check that the way is clear ahead and behind before moving into the passing lane. Watch for bicycles and small vehicles that may be hidden from view in front of the vehicle you are about to pass. Change lanes only after signalling. After overtaking, signal that you want to move back into the lane you started from. When you can see the entire front of the vehicle you are passing in your inside mirror, make the lane change.\n\nPassing within 30 metres of a pedestrian crossover is not permitted. Don't attempt to pass when approaching the crest of a hill or on a curve where your vision of oncoming traffic is obstructed.\n\nPassing at Night\n\nBe very careful when you pass other vehicles at night:\n\nSwitch your headlights to low beams as you approach a vehicle from behind. Signal, check your mirrors and blind spot, and pull out to pass. As you move alongside the vehicle you are passing, switch on your high beams. When you can see all of the front of the vehicle you are passing in your rear view mirror, you are far enough ahead to pull back into the right lane",
        keyPoints: [
          "Ensure adequate space and time before changing positions",
          "Always signal and check blind spots before lane changes",
          "Maintain or increase speed when changing lanes",
          "Never make sudden lane changes or cut off other vehicles",
          "Don't pass on hills, curves, or near crossovers",
          "Check for hidden vehicles before passing",
          "Use mirrors to judge safe distance when returning to lane",
          "Special procedures for passing at night with headlight management",
        ],
      },
      {
        id: "parking",
        title: "Parking Along Roadways",
        content:
          "Since parking rules change from road to road and place to place, always watch for and obey signs that say you may not stop or limit stopping, standing or parking. Be aware that not all parking by-laws are posted on signs.\n\nBasic Parking Rules:\n\nNever park on the travelled part of a road. Drive off the road onto the shoulder if you must stop. Never park on a curve, hill or anywhere you do not have a clear view for at least 125 metres in both directions. Do not park where you will block a vehicle already parked or where you will block a sidewalk, crosswalk, pedestrian crossing or road entrance. Do not park within three metres of a fire hydrant, on or within 100 metres of a bridge or within six metres of a public entrance to a hotel, theatre or public hall when it is open to the public. Do not park within nine metres of an intersection or within 15 metres if it is controlled by traffic lights. Do not park within 15 metres of the nearest rail of a level railway crossing. Do not park where you will get in the way of traffic or snow clearing.\n\nOpening Doors Safely\n\nNever open the door of your parked vehicle without first making sure that you will not endanger any other person or vehicle or interfere with traffic. Generally, a good practice is to use the Dutch reach method, meaning you open the driver's door with your right hand as this will force a shoulder check at the same time. Take extra precautions to avoid opening a door in the path of cyclists, who often ride close to parked cars.\n\nParallel Parking\n\nParallel parking means parking a vehicle with its wheels parallel and next to the curb or side of the road. To parallel park on the right-hand side of the road, find a space that is about one and one-half times longer than your vehicle.\n\nSteps for Parallel Parking:\n\nDrive alongside the vehicle ahead of the empty space, leaving about a metre between the vehicles. Slowly and carefully reverse into the space, turning the steering wheel fully toward the curb. When you can see the outside rear corner of the vehicle in front of your space, straighten your wheels as you continue to reverse. Turn the steering wheel fully toward the road to bring your vehicle in line with the curb. If your vehicle is not parallel to the curb, drive forward to straighten. Set the parking brake and move the gear selector into park.\n\nParking on a Hill\n\nWhen parking facing downhill, turn your front wheels towards the curb or right shoulder. When facing uphill with a curb, turn the steering wheel to the left so the wheels are turned towards the road. When facing uphill without a curb, turn the wheels sharply to the right. Always set the parking brake and turn off the engine.",
        keyPoints: [
          "Observe all posted parking signs and local bylaws",
          "Never park on travelled roadway - use shoulder if needed",
          "Maintain clear sight lines of 125 metres in both directions",
          "Specific distance restrictions from fire hydrants, intersections, railways",
          "Use Dutch reach method when opening doors",
          "Check for cyclists before opening doors",
          "Parallel parking requires space 1.5 times vehicle length",
          "Turn wheels appropriately when parking on hills",
        ],
      },
      {
        id: "freeway-driving",
        title: "Freeway Driving",
        content:
          "A freeway - also called an expressway - is a high-speed, multi-lane road. On a freeway, traffic going in each direction is separated and ramps let vehicles enter and exit. Vehicle speed is higher on a freeway than on other roads, so driving can be more demanding and difficult. However, because there are no intersections, bicycles or pedestrians, freeway driving can be safer for experienced drivers.\n\nEntering a Freeway\n\nThere are usually two parts to a freeway entrance: an entrance ramp and an acceleration lane. As you move along the freeway entrance ramp, look ahead and check your mirrors and blind spots to assess the traffic. As you leave the ramp you enter the acceleration lane. In the acceleration lane, drivers increase their speed to the speed of traffic on the freeway before they merge with it. Signal and increase your speed to merge smoothly with traffic. Freeway drivers should move over, if it is safe to do so, leaving room for merging vehicles.\n\nDriving Along a Freeway\n\nOnce on the freeway, a safe driver travels at a steady speed, looking forward and anticipating what's going to happen on the road ahead. Traffic should keep to the right, using the left lanes for passing. Look ahead to where you are going to be in the next 15 to 20 seconds, or as far ahead as you can see. Keep scanning and check your mirrors frequently.\n\nStay clear of large vehicles. Because of their size, they block your view more than other vehicles. Leave space around your vehicle. Use the far left lane of a multi-lane freeway to pass traffic moving slower than the speed limit, but don't stay there. Drive in the right-hand lane when possible.\n\nLeaving a Freeway\n\nThere are usually three parts to a freeway exit: a deceleration lane for slowing down, an exit ramp and an intersection. When leaving the freeway, signal that you want to move into the deceleration lane, but do not slow down. When you are in the lane, reduce your speed gradually to the speed shown for the exit ramp. Check your speedometer to make sure you are going slowly enough. You may not realize how fast you are going because you are used to the high speed of the freeway.\n\nHigh Occupancy Vehicle (HOV) Lanes\n\nHOV lanes are specially designed lanes designated for use by certain types of vehicles with a specified number of occupants. HOV lanes on provincial highways are reserved for vehicles carrying at least two people. The HOV lane is separated from the other general traffic lanes by a striped buffer zone. It is illegal and unsafe to cross the striped buffer pavement markings.\n\nCertain vehicles are exempt from the HOV lane rules. Buses can use an HOV lane at any time, regardless of the number of occupants. Emergency vehicles are also exempt. Commercial motor vehicles must have two or more people and be less than 6.5 metres in total length to be in the HOV lane. Single-occupant taxis and airport limousines are permitted. Vehicles with the 'Green' licence plate are permitted with any number of occupants.",
        keyPoints: [
          "High-speed, multi-lane roads with separated traffic directions",
          "Use acceleration lane to match freeway speed before merging",
          "Keep right except for passing, scan 15-20 seconds ahead",
          "Stay clear of large vehicles that block visibility",
          "Use deceleration lane when exiting, check speedometer",
          "HOV lanes require minimum 2 occupants on provincial highways",
          "Don't cross striped buffer zones of HOV lanes",
          "Various exemptions exist for buses, emergency vehicles, green plates",
        ],
      },
      {
        id: "particular-situations",
        title: "Dealing with Particular Situations",
        content:
          "Aggressive Driving and Road Rage\n\nAggressive-driving behaviours, such as tailgating, speeding, failing to yield the right-of-way and cutting in front of someone too closely, may cause other drivers to become frustrated and angry. Avoid becoming angry on the road by:\n\nKnowing the warning signs of stress and combating them. Making a conscious decision not to take your problems with you when driving. Taking breaks on long trips every few hours. Not competing with another driver or retaliating. Not trying to 'educate' other drivers. Not taking other drivers' mistakes personally. Planning your route in advance. Driving in a courteous and considerate manner.\n\nIf you feel threatened by another driver: stay in your vehicle and lock the doors, call police if you have a cell phone, use your horn and signals to attract attention, and if you believe you are being followed, drive to a police station or busy public place.\n\nDrowsy Driving\n\nDrowsiness has been identified as a causal factor in a growing number of collisions. Tired drivers can be as impaired as drunk drivers. Studies show that collisions involving drowsiness tend to occur during late night/early morning hours (between 2 a.m. and 6 a.m.) or late afternoon (between 2 p.m. and 4 p.m.).\n\nWarning signs of dangerous drowsiness:\n\nDifficulty keeping your eyes open. Head keeps tilting forward. Mind keeps wandering and you can't concentrate. Frequent yawning. Can't remember details about the last few kilometres. Missing traffic lights and signals. Vehicle drifts into the next lane. Drifted off the road and narrowly avoided a crash.\n\nIf you have any of these symptoms, pull off the road and park in a safe, secure place. The only safe driver is a well-rested, alert driver.\n\nWorkers on the Road\n\nBe extra careful when driving through construction zones and areas where people are working on or near the road. When approaching a construction zone, proceed with caution and obey all warning signs. Often, lower speed limits are posted to increase worker safety. Drive carefully, do not change lanes, be ready for sudden stops and watch for workers and construction vehicles.\n\nRecent changes to the Highway Traffic Act have resulted in doubled fines for speeding in a construction zone when workers are present. It is also an offence to disobey STOP or SLOW signs displayed by a traffic-control person.\n\nAnimals on the Road\n\nCrashes involving animals (mainly moose and deer) are a growing problem. You may encounter domestic, farm or wild animals on the road anywhere in Ontario. Many areas have animal crossing signs which warn drivers of the danger. Be cautious when you see these signs, especially during dusk-to-dawn hours when wild animals are most active.\n\nTo reduce your chances of hitting an animal:\n\nReduce speed in darkness, rain and fog. Travel at a safe speed and stay alert. Watch for shining eyes at the roadside. Keep your windshield clean and headlights properly adjusted. Use high beams whenever possible and scan both sides of the road.\n\nIf you see an animal: slow down and sound your horn, be alert for other animals, don't try to drive around the animal, and if you wish to watch an animal, find a safe place to pull completely off the road.\n\nDistracted Driving\n\nDriving requires your full attention every time you get behind the wheel. Ontario's distracted driving laws apply to the use of hand-held communication/entertainment devices and certain display screens. While driving, it is illegal to:\n\nUse a phone or other hand-held wireless communication device to text or dial. Use a hand-held electronic entertainment device. View display screens unrelated to driving. Program a GPS device, except by voice commands.\n\nYou are allowed to use hands-free wireless communications devices with an earpiece, lapel button or Bluetooth. About 100 people are killed and 16,000 are injured by distracted drivers every year in Ontario.",
        keyPoints: [
          "Avoid aggressive driving behaviors and road rage situations",
          "Stay calm, don't retaliate, and drive courteously",
          "Recognize drowsy driving warning signs and pull over when tired",
          "Exercise extra caution in construction zones with workers",
          "Doubled fines for speeding in construction zones",
          "Watch for animals especially during dawn and dusk hours",
          "Distracted driving laws prohibit hand-held device use",
          "Hands-free devices are permitted while driving",
        ],
      },
      {
        id: "night-weather",
        title: "Driving at Night and in Bad Weather",
        content:
          "At night and in weather conditions such as rain, snow or fog, you cannot see as far ahead, even with headlights. Slow down when driving at night, especially on unlit roads and whenever weather conditions reduce your visibility.\n\nOverdriving Your Headlights\n\nYou are overdriving your headlights when you go so fast that your stopping distance is farther than you can see with your headlights. This is dangerous because you may not give yourself enough room to make a safe stop. Reflective road signs can mislead you, making you believe you can see farther than you really can.\n\nGlare\n\nGlare is dazzling light that makes it hard for you to see. When meeting oncoming vehicles with bright headlights at night, look up and beyond and slightly to the right of the oncoming lights. In daytime glare, use your sun visor or sunglasses. When you enter a tunnel on a bright day, slow down to let your eyes adjust, remove your sunglasses and turn on your headlights.\n\nFog\n\nFog is a thin layer of cloud resting on the ground that can reduce visibility for drivers. The best thing to do is to avoid driving in fog. Check weather forecasts and if there is a fog warning, delay your trip until it clears.\n\nTips for driving safely in fog:\n\nSlow down gradually and drive at a speed that suits the conditions. Make sure the full lighting system of your vehicle is turned on. Use your low-beam headlights (high beams reflect off moisture droplets). Use fog lights if available, in addition to low beams. Be patient. Avoid passing, changing lanes and crossing traffic. Use pavement markings to help guide you. Increase your following distance. If fog is too dense to continue, pull completely off the road.\n\nRain\n\nRain makes road surfaces slippery, especially as the first drops fall. With more rain, tires make less contact with the road. If there is too much water or if you are going too fast, your tires may ride on top of the water (hydroplaning). Make sure you have good tires with deep tread, and slow down when the road is wet.\n\nAvoid driving in puddles. A puddle can hide a large pothole, cause spray that obstructs vision, harm nearby pedestrians or drown your engine. Water can also make your brakes less effective.\n\nSnow and Ice\n\nSnow may be hard-packed and slippery as ice, rutted, or smooth and soft. Look ahead and anticipate what you must do based on the conditions. Slow down on rutted, snowy roads. Avoid sudden steering, braking or accelerating that could cause a skid. Do not use cruise control during snow and other inclement weather.\n\nAs temperatures drop below freezing, wet roads become icy. Sections in shaded areas or on bridges freeze first. If the road ahead looks like black and shiny asphalt, be suspicious - it may be black ice. Generally, asphalt in winter should look gray-white in colour.\n\nSkids\n\nA skid may happen when one or more tires lose their grip with the road's surface. Most skids result from driving too fast for road conditions. To avoid a skid on a slippery road, drive at a reduced speed and operate the vehicle's controls in a smooth and constrained manner.\n\nIf your vehicle begins to skid, try not to panic. Ease off on the accelerator or brake and on a very slippery surface slip the transmission into neutral if you can. Continue to steer in the direction you wish to go. Be careful not to oversteer.",
        keyPoints: [
          "Slow down at night and in poor weather conditions",
          "Don't overdrive your headlights - maintain safe stopping distance",
          "Look slightly right when facing oncoming headlight glare",
          "Use low beams in fog, not high beams",
          "Avoid driving in fog when possible",
          "Rain causes hydroplaning - slow down and avoid puddles",
          "Snow and ice require reduced speed and smooth control inputs",
          "Black ice appears shiny on road surface",
          "If skidding, ease off controls and steer in desired direction",
        ],
      },
      {
        id: "emergencies",
        title: "Dealing with Emergencies",
        content:
          "If you drive often or travel alone, you need to be ready to deal with emergencies. Here are some suggestions for coping with common road emergencies.\n\nIf Your Brakes Fail\n\nTry pumping the brake pedal to temporarily restore hydraulic brake pressure. If this does not work, apply the parking brake gently but firmly while holding the release button. Total brake failure is very rare on modern vehicles. If your brakes do fail and you manage to stop, do not drive away. Call for help.\n\nIf Your Gas Pedal Sticks\n\nFirst try to lift the pedal by slipping your foot under it. Do not reach down with your hands while the vehicle is moving. If this does not work, turn on your hazard lights, shift to neutral and stop as soon as you safely can, preferably off the road. Turn off the ignition and call for help.\n\nIf Your Headlights Go Out\n\nCheck the switch immediately. If the lights stay out, turn on your hazard lights and bring your vehicle to a safe stop off the road. It is dangerous and illegal to drive at night without lights.\n\nIf You Have Trouble on a Freeway\n\nAt the first sign of trouble, begin to pull over. Check your mirrors, put on your hazard lights, take your foot off the gas pedal and pull over to the nearest shoulder as quickly as possible. Never stop in the driving lanes. Be careful getting out of your vehicle. If possible, leave through the door away from traffic. While you wait for help, stay in your vehicle with the doors locked.\n\nIf Your Wheels Go Off the Pavement\n\nDon't panic. Grip the steering wheel firmly. Take your foot off the gas pedal to slow down. Avoid heavy braking. When the vehicle is under control, steer toward the pavement. Be prepared to correct your steering and increase speed when your wheels are fully back on the pavement.\n\nIf a Tire Blows Out\n\nBlowouts can cause tremendous steering and wheel vibration, but don't be alarmed. Take your foot off the gas pedal to slow down and steer the vehicle firmly in the direction you want to go. Bring the vehicle to a stop off the road.\n\nIn a Collision Where Someone is Injured\n\nEvery driver involved in a collision must stay at the scene and give all possible assistance. In a collision with injuries, possible fuel leaks or serious vehicle damage:\n\nCall for help or have someone else call. Turn off all engines and turn on emergency flashers. Set up warning signals, but do not let anyone smoke or light matches near vehicles. If you are trained in first aid, treat injuries within your level of training. If not trained, use common sense (cover person with jacket for shock). Stay with injured people until help arrives.\n\nIn a Collision Where No One is Injured\n\nIf vehicles are drivable, move them as far off the road as possible. Call police (by law, must report collisions with injuries or damage exceeding $2,000). Give all possible help and exchange information. Get names, addresses and phone numbers of all witnesses. Take photos of the collision scene if safe to do so. If your vehicle must be towed, get the name and licence number of the tow truck operator. Contact your insurance company as soon as possible",
        keyPoints: [
          "Pump brakes if they fail, use parking brake gently",
          "Shift to neutral if gas pedal sticks, don't reach down while moving",
          "Pull over immediately if headlights fail at night",
          "On freeways, pull to shoulder at first sign of trouble",
          "If wheels go off pavement, don't panic, grip wheel firmly",
          "Tire blowouts: take foot off gas, steer firmly in desired direction",
          "Stay at collision scene and provide assistance",
          "Must report collisions with injuries or damage over $2,000",
        ],
      },
      {
        id: "efficient-driving",
        title: "Driving Efficiently",
        content:
          "Vehicles powered by gasoline and diesel give off air pollutants and gases such as oxides of carbon, nitrogen and sulphur, hydrocarbons and soot. These pollutants affect the quality of the air we breathe, our health, crop yields and even the global climate.\n\nHydrocarbons and oxides of nitrogen react in sunlight to form ground-level ozone, better known as smog. Global warming is the result of too much carbon dioxide and other gases trapping heat in our atmosphere. Cars are responsible for nearly half the carbon dioxide produced by all forms of transportation.\n\nBefore You Drive\n\nPlan ahead. Combine several errands into one trip. Avoid driving during rush hours. Pay attention to smog alerts. For short trips, consider walking or cycling. For longer trips, public transit is environmentally friendly. Carpool whenever possible.\n\nWhile Driving\n\nAvoid starting your vehicle unnecessarily. Turn off your vehicle if parked more than 10 seconds. Obey the speed limits (high speed uses more fuel). On the freeway, use overdrive gear and cruise control for better fuel efficiency. Remove unnecessary weight from your vehicle. Maintain your vehicle's aerodynamics (remove roof racks when not in use). Use air conditioning wisely (use windows/vents in city traffic, A/C at high speeds). Don't 'top-off' the tank when refueling.\n\nAt the Garage\n\nRegular maintenance will keep your vehicle running at maximum efficiency:\n\nKeep your vehicle's engine well tuned. Follow the recommended maintenance schedule. Have any fluid leaks checked by a specialist. Keep your tires properly inflated. Have your vehicle's alignment checked regularly.\n\n10 Ways to Make Ontario's Roads Safer:\n\nDon't drink and drive or drive when taking impairing medication. Always wear your seatbelt and ensure proper child restraints. Obey speed limits and slow down in poor conditions. Don't take risks: avoid cutting off, sudden lane changes, running yellows. Don't drive when tired, upset or sick. When in doubt, yield the right-of-way. Keep at least a two-second space behind other vehicles. Cut distractions: don't overcrowd vehicle or play loud music. Always check blind spots before changing lanes. Check traffic in all directions before entering intersections",
        keyPoints: [
          "Vehicles emit pollutants that cause smog and global warming",
          "Cars responsible for half of transportation carbon dioxide",
          "Plan trips to combine errands and avoid rush hours",
          "Turn off engine if parked more than 10 seconds",
          "High speeds and unnecessary weight increase fuel consumption",
          "Regular maintenance improves efficiency and reduces emissions",
          "Proper tire inflation and alignment reduce fuel use",
          "Follow 10 key safety practices for safer roads",
        ],
      },
    ],
  },
  {
    id: "traffic-signs",
    title: "Traffic Signs & Signals",
    description:
      "Master the meaning of regulatory, warning, and information signs essential for safe driving.",
    icon: "🚦",
    estimatedTime: "35 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "signs-overview",
        title: "Traffic Signs Overview",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Traffic signs give you important information about the law, warn you about dangerous conditions, and help you find your way. Signs use different symbols, colours, and shapes for easy identification and quick understanding.</p>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 class="font-semibold text-blue-800 mb-2">Traffic Sign Categories</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-blue-700">Regulatory Signs:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Control traffic movement</li>
                  <li>Show speed limits and restrictions</li>
                  <li>Usually red, white, or black backgrounds</li>
                </ul>
              </div>
              <div>
                <strong class="text-blue-700">Warning Signs:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Alert of potential hazards</li>
                  <li>Usually diamond-shaped with yellow background</li>
                  <li>Help you prepare for conditions ahead</li>
                </ul>
              </div>
              <div>
                <strong class="text-blue-700">Information Signs:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Provide guidance and directions</li>
                  <li>Show routes and destinations</li>
                  <li>Usually blue or green backgrounds</li>
                </ul>
              </div>
              <div>
                <strong class="text-blue-700">Temporary Signs:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Used during construction or special events</li>
                  <li>Often orange background with black symbols</li>
                  <li>Take precedence over permanent signs</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/signs-overview.png" alt="Traffic Signs Overview showing different categories and shapes" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Overview of traffic sign shapes, colors, and categories used in Ontario</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Essential Traffic Signs You Must Know</h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-sm">STOP</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Stop Sign</h4>
                  <ul class="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Eight-sided (octagonal) shape</li>
                    <li>• Red background with white letters</li>
                    <li>• Complete stop required</li>
                    <li>• Yield to all other traffic</li>
                    <li>• Proceed only when way is clear</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <span class="text-yellow-800 font-bold text-xs">SCHOOL</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">School Zone Sign</h4>
                  <ul class="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Five-sided pentagonal shape</li>
                    <li>• Fluorescent yellow/green background</li>
                    <li>• Speed limit 40 km/h when flashing</li>
                    <li>• Extra caution around children</li>
                    <li>• Watch for pedestrians and cyclists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-white border-2 border-red-500 rounded-full p-2">
                  <div class="w-8 h-8 bg-white border-2 border-red-500 rounded-sm flex items-center justify-center rotate-180">
                    <span class="text-red-600 font-bold text-sm">YIELD</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Yield Sign</h4>
                  <ul class="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Equilateral triangle shape</li>
                    <li>• White background with red border</li>
                    <li>• Stop if necessary to yield</li>
                    <li>• Let other traffic go first</li>
                    <li>• Proceed when way is clear</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-300 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-white border border-red-500 rounded-full p-2">
                  <div class="w-8 h-8 bg-white border-2 border-red-500 rounded-sm flex items-center justify-center transform rotate-45">
                    <span class="text-red-600 font-bold text-sm">X</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Railway Crossing Sign</h4>
                  <ul class="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• X-shaped (crossbuck)</li>
                    <li>• White background with red outline</li>
                    <li>• Warns of railway tracks ahead</li>
                    <li>• Slow down and look both ways</li>
                    <li>• Be prepared to stop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">🚨 Critical Safety Reminder</h4>
            <p class="text-green-700 text-sm">Always obey traffic signs, even when you think you know better. Signs are designed to keep you and others safe. Ignoring them can result in fines, license suspension, or serious accidents.</p>
          </div>
        </div>`,
        keyPoints: [
          "Signs provide legal information, warnings, and directions",
          "Different shapes, colors, and symbols for identification",
          "Stop signs require complete stops at designated locations",
          "School zone signs warn of children and require extra caution",
          "Yield signs mean let other traffic go first",
          "Railway crossing signs warn of train tracks ahead",
          "Four main categories: regulatory, warning, temporary, information",
        ],
      },
      {
        id: "regulatory-signs",
        title: "Regulatory Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Regulatory signs give directions that must be obeyed by law. They control traffic movement, set speed limits, and indicate what you can and cannot do. Disobeying regulatory signs can result in fines, demerit points, or license suspension.</p>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🚫 Regulatory Sign Characteristics</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-red-700">Permitted Activities:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>Green circle = You may do this</li>
                  <li>White background = General regulations</li>
                  <li>Black letters/symbols on white</li>
                </ul>
              </div>
              <div>
                <strong class="text-red-700">Prohibited Activities:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>Red circle with slash = Not allowed</li>
                  <li>Red background = Stop or prohibition</li>
                  <li>White letters on red background</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Common Regulatory Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚲</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Bicycle Route</h4>
                  <p class="text-sm text-green-700 mt-1">This road is an official bicycle route. Share the road with cyclists and watch for bicycle traffic.</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-xs">P</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Time-Limited Parking</h4>
                  <p class="text-sm text-blue-700 mt-1">You may park in the area between the signs only during the posted times. Used in pairs to mark parking zones.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-xs">HOV</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">HOV Lane</h4>
                  <p class="text-sm text-orange-700 mt-1">High-Occupancy Vehicle lane for cars with multiple passengers. Violators face fines and demerit points.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/basic-regulatory-signs.png" alt="Basic Regulatory Signs showing common traffic control signs" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Examples of basic regulatory signs that control traffic movement</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Speed and Movement Restrictions</h3>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-yellow-800 mb-2">Speed Limit Signs</h4>
                <div class="space-y-2 text-sm text-yellow-700">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-white border border-black rounded-full flex items-center justify-center text-xs font-bold">50</div>
                    <span>Residential and urban areas</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-white border border-black rounded-full flex items-center justify-center text-xs font-bold">80</div>
                    <span>Rural roads and highways</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-white border border-black rounded-full flex items-center justify-center text-xs font-bold">100</div>
                    <span>Expressways and major highways</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-bold text-yellow-800 mb-2">Passing Restrictions</h4>
                <div class="space-y-2 text-sm text-yellow-700">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-xs">🚫</span>
                    </div>
                    <span>No passing zone</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-white border-2 border-red-600 rounded-full flex items-center justify-center">
                      <span class="text-red-600 font-bold text-xs">↔</span>
                    </div>
                    <span>Two-way traffic ahead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/regulatory-hov-signs.png" alt="HOV and Regulatory Signs showing high-occupancy vehicle restrictions" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">HOV lane restrictions and special traffic control signs</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Prohibition and Restriction Signs</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 class="font-bold text-red-800 mb-2">Common Prohibitions</h4>
              <ul class="space-y-2 text-sm text-red-700">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                  <strong>No Pedestrians:</strong> Pedestrians not allowed on this road
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                  <strong>No Bicycles:</strong> Bicycles prohibited on this road
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                  <strong>No U-Turn:</strong> U-turns not permitted
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                  <strong>No Right Turn on Red:</strong> Right turn on red light prohibited
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 class="font-bold text-gray-800 mb-2">Lane Usage Rules</h4>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <strong>Keep Right:</strong> Stay to the right except when passing
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <strong>One Way:</strong> Traffic flows only in indicated direction
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <strong>Do Not Enter:</strong> Entry prohibited - wrong way
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <strong>Traffic Island:</strong> Keep right of traffic island
                </li>
              </ul>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/regulatory-signs-2.png" alt="Additional Regulatory Signs showing more traffic control examples" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Additional regulatory signs for various traffic control situations</p>
          </div>

          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 class="font-semibold text-purple-800 mb-2">💰 Fines and Penalties</h4>
            <p class="text-purple-700 text-sm mb-3">Violating regulatory signs can result in:</p>
            <div class="grid md:grid-cols-3 gap-4 text-sm">
              <div class="bg-purple-100 rounded p-2">
                <strong>Fines:</strong> $85-$500 depending on violation
              </div>
              <div class="bg-purple-100 rounded p-2">
                <strong>Demerit Points:</strong> 2-7 points on license
              </div>
              <div class="bg-purple-100 rounded p-2">
                <strong>License Suspension:</strong> Multiple violations
              </div>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Must be obeyed - they show traffic laws",
          "Usually rectangular or square with white/black background",
          "Green circles show permitted activities",
          "Red circles with lines show prohibited activities",
          "Include bicycle routes and parking regulations",
          "Cover turn restrictions and lane usage rules",
          "No stopping, standing, and parking have different meanings",
          "Signs used in pairs or groups to mark zones",
        ],
      },
      {
        id: "warning-signs",
        title: "Warning Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Warning signs alert you to potential hazards or changes in road conditions ahead. They help you prepare for dangerous situations and adjust your driving accordingly. Unlike regulatory signs that tell you what you must do, warning signs give you advance notice of conditions that require your attention.</p>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Warning Sign Characteristics</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-yellow-700">Design Features:</strong>
                <ul class="list-disc list-inside mt-1 text-yellow-600">
                  <li>Diamond-shaped (most common)</li>
                  <li>Bright yellow background</li>
                  <li>Black letters, symbols, or borders</li>
                  <li>Placed before the hazard</li>
                </ul>
              </div>
              <div>
                <strong class="text-yellow-700">Purpose:</strong>
                <ul class="list-disc list-inside mt-1 text-yellow-600">
                  <li>Alert drivers to hazards</li>
                  <li>Provide advance warning</li>
                  <li>Help drivers prepare and adjust</li>
                  <li>Reduce collision risk</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Curve and Bend Warning Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-400 rounded-sm flex items-center justify-center transform rotate-12">
                    <span class="text-yellow-800 font-bold text-sm">↻</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">Slight Bend</h4>
                  <p class="text-sm text-yellow-700 mt-1">Gentle curve or bend in the road ahead. Reduce speed slightly and stay in your lane.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-400 rounded-sm flex items-center justify-center transform rotate-45">
                    <span class="text-orange-800 font-bold text-sm">↻</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">Sharp Bend</h4>
                  <p class="text-sm text-orange-700 mt-1">Severe curve requiring significant speed reduction. Prepare to slow down considerably.</p>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-400 rounded-sm flex items-center justify-center">
                    <span class="text-red-800 font-bold text-sm">↺↻</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Winding Road</h4>
                  <p class="text-sm text-red-700 mt-1">Series of curves ahead. Reduce speed and prepare for multiple turns.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/warning-signs.png" alt="Warning Signs showing various curve and hazard warnings" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Warning signs for curves, intersections, and road hazards</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Intersection and Traffic Warning Signs</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-sm">X</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Intersection Ahead</h4>
                  <p class="text-sm text-blue-700 mt-1">Crossroad or intersection ahead. Be prepared to yield or stop. Check for traffic from all directions.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-sm">T</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">T-Intersection</h4>
                  <p class="text-sm text-purple-700 mt-1">Road ends ahead forming a T-junction. Traffic from the right has right-of-way.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">Roundabout</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Roundabout Ahead</h4>
                  <p class="text-sm text-green-700 mt-1">Traffic circle ahead. Yield to vehicles already in the circle. Traffic flows counter-clockwise.</p>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-indigo-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚸</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-indigo-800">Pedestrian Crossing</h4>
                  <p class="text-sm text-indigo-700 mt-1">Pedestrians may be crossing. Watch for people on foot and be prepared to stop.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Road Condition Warning Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-gray-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span class="text-gray-800 font-bold text-xs">🟨</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Bumpy Road</h4>
                  <p class="text-sm text-gray-700 mt-1">Uneven pavement or bumps ahead. Slow down to avoid damage to your vehicle.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-400 rounded-sm flex items-center justify-center">
                    <span class="text-orange-800 font-bold text-xs">🌉</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">Narrow Bridge</h4>
                  <p class="text-sm text-orange-700 mt-1">Bridge ahead is narrower than the road. Prepare to adjust your position.</p>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-400 rounded-sm flex items-center justify-center">
                    <span class="text-red-800 font-bold text-xs">⚡</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Overhead Wires</h4>
                  <p class="text-sm text-red-700 mt-1">Low clearance ahead. Reduce speed and be prepared to stop if necessary.</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-400 rounded-sm flex items-center justify-center">
                    <span class="text-blue-800 font-bold text-xs">🚧</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Road Work</h4>
                  <p class="text-sm text-blue-700 mt-1">Construction or maintenance work ahead. Watch for workers and equipment.</p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <span class="text-yellow-800 font-bold text-xs">🛑</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">Stop Ahead</h4>
                  <p class="text-sm text-yellow-700 mt-1">Stop sign ahead. Begin to slow down and prepare to stop.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-400 rounded-sm flex items-center justify-center">
                    <span class="text-green-800 font-bold text-xs">Y</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Yield Ahead</h4>
                  <p class="text-sm text-green-700 mt-1">Yield sign ahead. Prepare to yield right-of-way to other traffic.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/warning-signs-curves.png" alt="Warning Signs for Curves showing various bend and turn warnings" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Warning signs specifically for curves, bends, and road alignment changes</p>
          </div>

          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 class="font-semibold text-orange-800 mb-2">🚦 Speed Advisory Signs</h4>
            <p class="text-orange-700 text-sm mb-3">These signs are often placed below curve warnings to indicate the recommended maximum speed:</p>
            <div class="flex flex-wrap gap-4 justify-center">
              <div class="bg-white border border-orange-300 rounded-lg p-3 text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span class="text-orange-800 font-bold">30</span>
                </div>
                <p class="text-xs text-orange-700">Sharp curves</p>
              </div>
              <div class="bg-white border border-orange-300 rounded-lg p-3 text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span class="text-orange-800 font-bold">40</span>
                </div>
                <p class="text-xs text-orange-700">Moderate curves</p>
              </div>
              <div class="bg-white border border-orange-300 rounded-lg p-3 text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span class="text-orange-800 font-bold">60</span>
                </div>
                <p class="text-xs text-orange-700">Gentle curves</p>
              </div>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">⚠️ Critical Safety Reminders</h4>
            <ul class="space-y-2 text-sm text-red-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span>Warning signs are placed <strong>before</strong> the hazard, not at the hazard itself</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span>Always reduce speed when you see a warning sign, even if conditions seem fine</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span>Multiple warning signs together indicate complex hazards ahead</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span>Obey speed advisory signs - they are calculated based on road conditions</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "Warn of dangerous or unusual conditions ahead",
          "Usually diamond-shaped with yellow background",
          "Include curves, intersections, and road changes",
          "Roundabout signs show counter-clockwise traffic flow",
          "Speed advisory signs show safe curve speeds",
          "Bridge and pavement narrowing warnings",
          "Intersection and sideroad visibility warnings",
          "Community safety zones have increased fines",
        ],
      },
      {
        id: "school-traffic-signs",
        title: "School Zone and Traffic Control Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">School zone and traffic control signs are critical for maintaining safety around educational facilities, managing traffic flow at intersections, and protecting vulnerable road users. These signs help create safer environments for children, pedestrians, and all road users.</p>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 class="font-semibold text-yellow-800 mb-2">🏫 School Zone Safety Priority</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-yellow-700">Children First:</strong>
                <ul class="list-disc list-inside mt-1 text-yellow-600">
                  <li>Extra caution around schools</li>
                  <li>Watch for sudden pedestrian movements</li>
                  <li>Slower speeds for better reaction time</li>
                  <li>Be alert for crossing guards</li>
                </ul>
              </div>
              <div>
                <strong class="text-yellow-700">Legal Requirements:</strong>
                <ul class="list-disc list-inside mt-1 text-yellow-600">
                  <li>Maximum 40 km/h when lights flashing</li>
                  <li>Complete stops for school buses</li>
                  <li>Yield to pedestrians at crossovers</li>
                  <li>Doubled fines for violations</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">School Zone Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <span class="text-yellow-800 font-bold text-xs">SCHOOL</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">School Zone Sign</h4>
                  <p class="text-sm text-yellow-700 mt-1">Pentagonal shape with yellow background. Indicates school area where speed limits are reduced when children are present.</p>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚍</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">School Bus Stop</h4>
                  <p class="text-sm text-red-700 mt-1">Requires complete stop when bus signals are flashing. Stay stopped until lights stop or bus moves.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⚠️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">Playground Zone</h4>
                  <p class="text-sm text-orange-700 mt-1">Indicates area near playgrounds where children may be present. Reduce speed and watch for sudden movements.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/school-traffic-signs.png" alt="School Zone and Traffic Control Signs showing school safety and pedestrian warnings" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">School zone signs and traffic control signs for educational areas</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Traffic Control and Direction Signs</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">←</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Lane Direction Signs</h4>
                  <p class="text-sm text-blue-700 mt-1">Show which direction each lane must go. Arrows indicate required movements: left turn only, right turn only, or through traffic.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">→</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">One-Way Traffic</h4>
                  <p class="text-sm text-green-700 mt-1">Traffic flows only in the direction indicated by the arrow. Never drive against the flow of one-way traffic.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">↔</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">Two-Way Traffic</h4>
                  <p class="text-sm text-purple-700 mt-1">Traffic is coming from both directions. Watch for oncoming vehicles and follow standard road rules.</p>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-indigo-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚷</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-indigo-800">Do Not Enter</h4>
                  <p class="text-sm text-indigo-700 mt-1">Red octagon with white letters. Never enter this road - it's a wrong-way entrance that could cause head-on collisions.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Pedestrian and Safety Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-cyan-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚶</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-cyan-800">Pedestrian Crossover</h4>
                  <p class="text-sm text-cyan-700 mt-1">Marked area where pedestrians have right-of-way. Drivers must yield completely and wait until pedestrians are safely across.</p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-teal-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-teal-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🛑</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-teal-800">Stop for Pedestrians</h4>
                  <p class="text-sm text-teal-700 mt-1">Used at crosswalks where pedestrians have priority. Stop when pedestrians are waiting to cross.</p>
                </div>
              </div>
            </div>

            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-emerald-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚸</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-emerald-800">Children Crossing</h4>
                  <p class="text-sm text-emerald-700 mt-1">Warns of areas where children frequently cross. Slow down and be prepared to stop for pedestrians.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🚨 School Bus Safety Rules</h4>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 class="font-bold text-red-700 mb-2">When to Stop:</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• When red lights are flashing</li>
                  <li>• When stop arm is extended</li>
                  <li>• On two-lane and multi-lane roads</li>
                  <li>• From both directions when no median</li>
                  <li>• Until bus moves or lights stop</li>
                </ul>
              </div>
              <div>
                <h5 class="font-bold text-red-700 mb-2">Legal Penalties:</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• $400-$2,000 fine for violations</li>
                  <li>• 6 demerit points on license</li>
                  <li>• Possible license suspension</li>
                  <li>• Increased insurance rates</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🛣️ Lane Direction Sign Examples</h4>
            <div class="space-y-3 text-sm text-blue-700">
              <div class="bg-white rounded-lg p-3 border border-blue-300">
                <div class="font-bold mb-1">Example 1: Three-Lane Intersection</div>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="text-center">
                    <div class="bg-blue-100 rounded p-1 mb-1">Lane 1</div>
                    <div class="font-semibold">Left Turn Only</div>
                  </div>
                  <div class="text-center">
                    <div class="bg-blue-100 rounded p-1 mb-1">Lane 2</div>
                    <div class="font-semibold">Left or Straight</div>
                  </div>
                  <div class="text-center">
                    <div class="bg-blue-100 rounded p-1 mb-1">Lane 3</div>
                    <div class="font-semibold">Right Turn Only</div>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg p-3 border border-blue-300">
                <div class="font-bold mb-1">Example 2: Highway Exit</div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="text-center">
                    <div class="bg-blue-100 rounded p-1 mb-1">Left Lane</div>
                    <div class="font-semibold">Exit Only</div>
                  </div>
                  <div class="text-center">
                    <div class="bg-blue-100 rounded p-1 mb-1">Right Lane</div>
                    <div class="font-semibold">Through Traffic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">🚸 School Zone Best Practices</h4>
            <ul class="space-y-2 text-sm text-green-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Always obey flashing lights:</strong> Speed limit is 40 km/h maximum when lights are flashing, regardless of posted speed limit</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Watch for crossing guards:</strong> Obey their signals and directions - they have authority to stop traffic</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Be extra cautious:</strong> Children may not always follow the rules - anticipate their movements</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Never block the crosswalk:</strong> Stop behind the stop line to keep crosswalks clear for pedestrians</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "School zone speed limits apply when lights flashing",
          "Must stop for school buses with flashing signals",
          "Multi-lane highways require stops from both directions",
          "Lane direction signs show required travel directions",
          "One-way traffic signs indicate single direction flow",
          "Pedestrian crossovers require yielding to pedestrians",
          "Two-way left turn lanes for turning traffic only",
          "HOV lanes for specific vehicle types with time restrictions",
        ],
      },
      {
        id: "transit-hov-signs",
        title: "Transit and HOV Lane Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Transit and HOV lane signs designate special lanes and areas for specific types of vehicles or usage requirements. These signs help manage traffic flow, prioritize public transportation, and encourage carpooling to reduce congestion and environmental impact.</p>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🚌 Public Transit Priority</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-blue-700">Bus Lane Benefits:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Faster transit service</li>
                  <li>Reduced traffic congestion</li>
                  <li>Environmental benefits</li>
                  <li>Better on-time performance</li>
                </ul>
              </div>
              <div>
                <strong class="text-blue-700">Driver Responsibilities:</strong>
                <ul class="list-disc list-inside mt-1 text-blue-600">
                  <li>Never drive in bus lanes</li>
                  <li>Yield when buses signal to merge</li>
                  <li>Watch for bus priority signals</li>
                  <li>Obey time restrictions</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Public Transit Signs</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚌</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Bus Lane</h4>
                  <p class="text-sm text-blue-700 mt-1">Designated lane for buses only. Private vehicles are prohibited and subject to fines. Often marked with diamond symbols.</p>
                </div>
              </div>
            </div>

            <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-cyan-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚍</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-cyan-800">Bus Priority</h4>
                  <p class="text-sm text-cyan-700 mt-1">Found on back of buses. Reminds drivers to yield when bus signals intent to return to traffic lane from a bus stop.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🅿️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Bus Stop</h4>
                  <p class="text-sm text-green-700 mt-1">Designated area for buses to pick up and drop off passengers. Drivers must yield to merging buses.</p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚎</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">School Bus Loading</h4>
                  <p class="text-sm text-yellow-700 mt-1">Area where school buses load/unload without using red flashing lights. Regular traffic rules apply.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🛣️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">Road Fork</h4>
                  <p class="text-sm text-purple-700 mt-1">Indicates where the road branches or diverges. Shows direction of the fork and upcoming route options.</p>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-indigo-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚕</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-indigo-800">Taxi Stand</h4>
                  <p class="text-sm text-indigo-700 mt-1">Designated area for licensed taxis to pick up passengers. Other vehicles should not use this space.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/transit-hov-signs.png" alt="Transit and HOV Lane Signs showing bus lanes and special vehicle designations" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Transit signs showing bus lanes, priority signals, and public transportation designations</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">High Occupancy Vehicle (HOV) Signs</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">HOV</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">HOV Lane</h4>
                  <p class="text-sm text-orange-700 mt-1">High-occupancy vehicle lane requiring minimum number of passengers. Violators face fines and demerit points.</p>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚫</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">HOV Lane Restrictions</h4>
                  <p class="text-sm text-red-700 mt-1">Prohibits changing lanes into or out of HOV lanes in certain areas. Striped pavement markings reinforce this rule.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">2+</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Minimum Occupancy</h4>
                  <p class="text-sm text-green-700 mt-1">Shows the minimum number of occupants required to use the HOV lane (typically 2+ people).</p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-teal-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-teal-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🕐</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-teal-800">Time-Restricted HOV</h4>
                  <p class="text-sm text-teal-700 mt-1">HOV requirements apply only during specified hours. Check the time restrictions shown on the sign.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Special Lane Designations</h3>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/special-lane-signs.png" alt="Special Lane Signs showing various lane designations and restrictions" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Special lane signs for turn lanes, climbing lanes, and restricted vehicle types</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">↔</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">Two-Way Left Turn Lane</h4>
                  <p class="text-sm text-blue-700 mt-1">Center lane used for left turns in both directions. Never use for through traffic or right turns.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⤴️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">Climbing Lane</h4>
                  <p class="text-sm text-purple-700 mt-1">Extra lane for slow vehicles on uphill grades. Keep right except when passing in designated climbing areas.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚲</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">Bike Lane</h4>
                  <p class="text-sm text-green-700 mt-1">Designated lane for bicycle travel. Motor vehicles prohibited. Often marked with green paint and bicycle symbols.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🅿️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">Accessible Drop-off</h4>
                  <p class="text-sm text-orange-700 mt-1">Reserved curb area for vehicles with accessible parking permits to pick up and drop off passengers.</p>
                </div>
              </div>
            </div>

            <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-cyan-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⏰</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-cyan-800">Time-Restricted Lanes</h4>
                  <p class="text-sm text-cyan-700 mt-1">Lanes restricted to specific vehicles during certain hours. Check symbols and times posted.</p>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🛣️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Keep Right</h4>
                  <p class="text-sm text-red-700 mt-1">Stay in the right lane except when passing. Helps maintain traffic flow and prevents lane blocking.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 class="font-semibold text-orange-800 mb-2">🚗 HOV Lane Requirements & Exceptions</h4>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 class="font-bold text-orange-700 mb-2">Minimum Occupancy:</h5>
                <ul class="space-y-1 text-orange-600">
                  <li>• Provincial highways: 2+ people</li>
                  <li>• Some areas require 3+ people</li>
                  <li>• Motorcycles count as 2 people</li>
                  <li>• Children under 12 count as full passengers</li>
                </ul>
              </div>
              <div>
                <h5 class="font-bold text-orange-700 mb-2">Exempt Vehicles:</h5>
                <ul class="space-y-1 text-orange-600">
                  <li>• Buses (any occupancy)</li>
                  <li>• Emergency vehicles</li>
                  <li>• Green license plate vehicles</li>
                  <li>• Single-occupant taxis</li>
                  <li>• Airport limousines</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🚌 Public Transit Best Practices</h4>
            <ul class="space-y-2 text-sm text-blue-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Yield to buses:</strong> Always allow transit vehicles to merge back into traffic from bus stops</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Watch for signals:</strong> Bus priority signs may flash or change to indicate when to yield</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Never block bus lanes:</strong> These lanes ensure transit reliability and efficiency</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                <span><strong>Carpool for HOV access:</strong> Share rides to use HOV lanes and reduce traffic congestion</span>
              </li>
            </ul>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">⚠️ Penalties for Violations</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="bg-red-100 rounded p-3">
                <strong>Bus Lane Violation:</strong> $150-$500 fine
              </div>
              <div class="bg-red-100 rounded p-3">
                <strong>HOV Lane Violation:</strong> $110-$300 fine plus 3 demerit points
              </div>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Bus priority zones require yielding to buses",
          "School bus loading zones have special rules without signals",
          "HOV lanes for high-occupancy vehicles with minimum passengers",
          "Different symbols for buses, taxis, carpools, and bicycles",
          "Time restrictions may apply to special lanes",
          "Climbing lanes for slower traffic to keep right",
          "Road fork signs show direction changes",
          "Transit buses have right-of-way when signaling to merge",
        ],
      },
      {
        id: "prohibition-signs",
        title: "Prohibition and Restriction Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Prohibition and restriction signs indicate specific actions that are not allowed or are limited in certain areas. These signs are critical for traffic safety and help manage vehicle movements, protect vulnerable road users, and maintain order in high-traffic areas.</p>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">🚫 Prohibition Sign Characteristics</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-red-700">Common Features:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>Red circle with diagonal slash</li>
                  <li>White background with red border</li>
                  <li>Clear symbols and text</li>
                  <li>Used to prohibit specific actions</li>
                </ul>
              </div>
              <div>
                <strong class="text-red-700">Legal Importance:</strong>
                <ul class="list-disc list-inside mt-1 text-red-600">
                  <li>Violations result in fines</li>
                  <li>May include demerit points</li>
                  <li>Can affect insurance rates</li>
                  <li>Help prevent accidents</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Movement and Access Prohibitions</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-red-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚷</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-red-800">Do Not Enter</h4>
                  <p class="text-sm text-red-700 mt-1">Red octagon with white letters. Never enter this road - it's a wrong-way entrance that could cause head-on collisions.</p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-orange-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚫</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-orange-800">No Through Traffic</h4>
                  <p class="text-sm text-orange-700 mt-1">Prohibits driving straight through the intersection. You must turn or use a different route.</p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">↩️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">No U-Turn</h4>
                  <p class="text-sm text-yellow-700 mt-1">U-turns are prohibited at this location. Turn around using another route or intersection.</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">↺</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">No Left Turn</h4>
                  <p class="text-sm text-blue-700 mt-1">Left turns are prohibited at this intersection. You must go straight or turn right.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⏰</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">Time-Restricted Turn</h4>
                  <p class="text-sm text-purple-700 mt-1">The turn is prohibited only during specified hours (e.g., 7 AM - 9 AM, 4 PM - 6 PM).</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚦</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">No Right Turn on Red</h4>
                  <p class="text-sm text-green-700 mt-1">Right turns are not permitted when facing a red light at this intersection.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/prohibition-signs-1.png" alt="Prohibition Signs Set 1 showing various movement restrictions" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">First set of prohibition signs showing movement and access restrictions</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">User and Vehicle Restrictions</h3>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-cyan-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚷</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-cyan-800">No Pedestrians</h4>
                  <p class="text-sm text-cyan-700 mt-1">Pedestrians are prohibited from using this road. Often found on highways or restricted areas.</p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-teal-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-teal-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚲</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-teal-800">No Bicycles</h4>
                  <p class="text-sm text-teal-700 mt-1">Bicycles are not permitted on this road. Cyclists must use alternative routes.</p>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-indigo-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🏍️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-indigo-800">No Motorcycles</h4>
                  <p class="text-sm text-indigo-700 mt-1">Motorcycles are prohibited from using this road or area.</p>
                </div>
              </div>
            </div>

            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-emerald-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚜</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-emerald-800">No Farm Equipment</h4>
                  <p class="text-sm text-emerald-700 mt-1">Farm machinery and slow-moving equipment are not permitted on this road.</p>
                </div>
              </div>
            </div>

            <div class="bg-lime-50 border border-lime-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-lime-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-lime-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">❄️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-lime-800">Snowmobile Route</h4>
                  <p class="text-sm text-lime-700 mt-1">This road is designated as a snowmobile route. Motor vehicles may share the road with snowmobiles.</p>
                </div>
              </div>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-amber-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">♿</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-amber-800">Accessible Parking Only</h4>
                  <p class="text-sm text-amber-700 mt-1">This parking space is reserved for vehicles displaying a valid accessible parking permit.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/prohibition-signs-2.png" alt="Prohibition Signs Set 2 showing additional restrictions" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Second set of prohibition signs showing user and vehicle restrictions</p>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-4">Parking and Stopping Restrictions</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-gray-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span class="text-gray-800 font-bold text-xs">🛑</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">No Stopping</h4>
                  <p class="text-sm text-gray-700 mt-1">You may not stop your vehicle at any time in the area between the signs. This is the most restrictive parking prohibition.</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⏱️</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-800">No Standing</h4>
                  <p class="text-sm text-blue-700 mt-1">You may stop only for loading or unloading passengers. Continuous standing is prohibited.</p>
                </div>
              </div>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-green-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">🚫</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-green-800">No Parking</h4>
                  <p class="text-sm text-green-700 mt-1">You may stop only to load or unload merchandise. Parking for any other purpose is prohibited.</p>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <div class="bg-yellow-100 rounded-full p-2">
                  <div class="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center">
                    <span class="text-white font-bold text-xs">⏰</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">Time-Limited Parking</h4>
                  <p class="text-sm text-yellow-700 mt-1">You may park only during the times shown. Used in pairs to mark time-restricted parking zones.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">🅿️ Understanding Parking Restrictions</h4>
            <div class="grid md:grid-cols-3 gap-4 text-sm">
              <div class="bg-white rounded p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-1">No Stopping</h5>
                <p class="text-blue-600">Cannot stop vehicle for any reason</p>
                <p class="text-blue-500 text-xs mt-1">Highest level of restriction</p>
              </div>
              <div class="bg-white rounded p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-1">No Standing</h5>
                <p class="text-blue-600">Can stop only to load/unload passengers</p>
                <p class="text-blue-500 text-xs mt-1">Medium level of restriction</p>
              </div>
              <div class="bg-white rounded p-3 border border-blue-300">
                <h5 class="font-bold text-blue-800 mb-1">No Parking</h5>
                <p class="text-blue-600">Can stop to load/unload goods</p>
                <p class="text-blue-500 text-xs mt-1">Lowest level of restriction</p>
              </div>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">⚠️ Legal Consequences</h4>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 class="font-bold text-red-700 mb-2">Common Violations:</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• Ignoring turn restrictions: $85-$110 fine</li>
                  <li>• Illegal U-turn: $85-$110 fine, 2 demerit points</li>
                  <li>• Wrong-way driving: $200-$500 fine, 4 demerit points</li>
                  <li>• Parking violations: $30-$100 fine</li>
                </ul>
              </div>
              <div>
                <h5 class="font-bold text-red-700 mb-2">Special Penalties:</h5>
                <ul class="space-y-1 text-red-600">
                  <li>• Accessible parking violation: $400-$1,000 fine</li>
                  <li>• School zone violation: Doubled fines</li>
                  <li>• Construction zone: Doubled fines</li>
                  <li>• Multiple violations: License suspension</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">✅ Best Practices</h4>
            <ul class="space-y-2 text-sm text-green-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Always check for signs:</strong> Look for prohibition signs before making any maneuver</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Understand the differences:</strong> Know the distinction between no stopping, no standing, and no parking</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Check time restrictions:</strong> Some prohibitions only apply during certain hours</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                <span><strong>Respect accessible spaces:</strong> Never park in designated accessible parking areas without proper permit</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "Show activities that are not allowed",
          "Red circles with diagonal lines indicate prohibitions",
          "Turn restrictions apply at specific intersections",
          "Time-based restrictions shown with specific hours",
          "Accessible parking requires valid permits",
          "Some roads prohibit bicycles or pedestrians",
          "Special vehicle permissions like snowmobiles",
          "Different levels of stopping restrictions: no stopping, no standing, no parking",
        ],
      },
      {
        id: "information-direction-signs",
        title: "Information & Direction Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Information and direction signs provide guidance and help you navigate. They show routes, destinations, services, and important information about the road ahead.</p>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/information-direction-signs.png" alt="Information and Direction Signs" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Information signs that provide guidance and show available services</p>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-bold text-blue-800">Hospital Sign</h4>
              <p class="text-sm text-blue-700">Indicates medical facilities and emergency care centers along the route.</p>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 class="font-bold text-green-800">Route Markers</h4>
              <p class="text-sm text-green-700">Show highway numbers and route designations to help you follow specific routes.</p>
            </div>
          </div>
        </div>`,
        keyPoints: [
          "Provide guidance and show available services",
          "Use various colors for different types of information",
          "Blue signs indicate services and facilities",
          "Green signs show distances and directions",
          "Help with navigation and trip planning",
        ],
      },
      {
        id: "construction-temporary-signs",
        title: "Construction & Temporary Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Construction and temporary condition signs alert you to roadwork, detours, and changing road conditions. These signs are typically orange and black and have the highest priority over regular traffic signs.</p>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/construction-zone-signs.png" alt="Construction Zone Signs" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Construction signs that warn of road work, detours, and changing conditions</p>
          </div>

          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 class="font-semibold text-orange-800 mb-2">🚧 Key Construction Signs</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong class="text-orange-700">Road Work Ahead:</strong>
                <p class="text-orange-600">Indicates construction or maintenance work on or near the road. Slow down and be prepared for changes.</p>
              </div>
              <div>
                <strong class="text-orange-700">Workers Ahead:</strong>
                <p class="text-orange-600">Construction workers are present. Extra caution required. Fines are doubled for violations.</p>
              </div>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">⚠️ Critical Rules</h4>
            <ul class="space-y-2 text-sm text-red-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span><strong>Fines are doubled</strong> for speeding in construction zones with workers</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                <span>Orange signs <strong>take precedence</strong> over regular traffic signs</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "Orange signs indicate construction and temporary conditions",
          "Take precedence over regular traffic signs",
          "Fines doubled in construction zones with workers",
          "Follow flagger directions and detour routes",
          "Watch for changing road conditions and lane closures",
        ],
      },
      {
        id: "special-signs",
        title: "Special Traffic Signs",
        content: `<div class="space-y-6">
          <p class="text-lg leading-relaxed">Special traffic signs cover unique situations and specific road users. These signs help manage traffic for pedestrians, cyclists, emergency vehicles, and other special circumstances.</p>

          <div class="my-6 text-center">
            <img src="/images/traffic-signs/special-signs.png" alt="Special Traffic Signs" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p class="text-sm text-gray-600 mt-2 italic">Special signs for pedestrians, cyclists, and accessibility features</p>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-bold text-blue-800">Pedestrian Crossover</h4>
              <p class="text-sm text-blue-700">Designated area where pedestrians have right-of-way. Drivers must yield to people crossing.</p>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 class="font-bold text-green-800">Accessible Parking</h4>
              <p class="text-sm text-green-700">Reserved for vehicles displaying valid accessible person parking permit.</p>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 class="font-bold text-purple-800">Bicycle Lane</h4>
              <p class="text-sm text-purple-700">Designated lane for bicycle travel. Motor vehicles may not use this lane.</p>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 class="font-bold text-orange-800">Bus Stop</h4>
              <p class="text-sm text-orange-700">Designated area for buses to pick up and drop off passengers.</p>
            </div>
          </div>

          <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 class="font-semibold text-indigo-800 mb-2">♿ Accessibility Features</h4>
            <ul class="space-y-2 text-sm text-indigo-700">
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                <span>Accessible parking spaces are larger and closer to entrances</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                <span>Always be extra cautious around mobility devices and service animals</span>
              </li>
            </ul>
          </div>
        </div>`,
        keyPoints: [
          "Special signs for pedestrians, cyclists, and emergency services",
          "Accessible parking and loading zones have specific requirements",
          "Emergency vehicles always have right-of-way",
          "Pedestrians have priority in designated crosswalks",
          "School buses have special rules with red flashing lights",
        ],
      },
    ],
  },

  {
    id: "rules-of-road",
    title: "Rules of the Road",
    description:
      "Essential traffic laws including right-of-way, speed limits, and proper lane usage.",
    icon: "🛣️",
    estimatedTime: "40 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "right-of-way",
        title: "Right-of-Way Rules",
        content:
          "Right-of-way rules determine who goes first in traffic situations. At four-way stops, the vehicle that arrives first has the right-of-way. If vehicles arrive at the same time, the vehicle on the right goes first. Always yield to pedestrians in crosswalks and to emergency vehicles.",
        keyPoints: [
          "First to arrive at four-way stop goes first",
          "When arriving simultaneously, right vehicle goes first",
          "Always yield to pedestrians in crosswalks",
          "Emergency vehicles always have right-of-way",
          "Left turns yield to oncoming traffic",
        ],
      },
      {
        id: "speed-limits",
        title: "Speed Limits and Safe Speeds",
        content:
          "Speed limits show the maximum speed under ideal conditions. You must adjust your speed for weather, traffic, and road conditions. Typical limits are 50 km/h in residential areas, 40 km/h in school zones when children are present, and 100 km/h on highways unless posted otherwise.",
        keyPoints: [
          "Speed limits are maximums under ideal conditions",
          "Adjust speed for weather and road conditions",
          "Residential areas: typically 50 km/h",
          "School zones: 40 km/h when children present",
          "Highways: 100 km/h unless posted otherwise",
        ],
      },
    ],
  },
  {
    id: "sharing-road",
    title: "Sharing the Road",
    description:
      "How to safely interact with pedestrians, cyclists, motorcycles, and commercial vehicles.",
    icon: "🚴",
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "pedestrians-cyclists",
        title: "Pedestrians and Cyclists",
        content:
          "Pedestrians and cyclists are vulnerable road users who require extra care from drivers. Always yield to pedestrians in crosswalks, check for cyclists before opening car doors, and give cyclists at least 1 meter clearance when passing. Be especially cautious in school zones and playgrounds.",
        keyPoints: [
          "Always yield to pedestrians in crosswalks",
          "Check for cyclists before opening car doors",
          "Give cyclists at least 1 meter clearance when passing",
          "Extra caution in school zones and playgrounds",
          "Watch for pedestrians at intersections and driveways",
        ],
      },
      {
        id: "large-vehicles",
        title: "Sharing with Large Vehicles",
        content:
          "Trucks, buses, and other large vehicles have different capabilities and larger blind spots than cars. They need more time and space to stop, turn, and accelerate. Avoid cutting in front of large vehicles and never drive in their blind spot areas.",
        keyPoints: [
          "Large vehicles have bigger blind spots",
          "Need more time and space to stop",
          "Avoid cutting in front of large vehicles",
          "Pass quickly and safely on the left",
          "Never drive in blind spot 'no zones'",
        ],
      },
    ],
  },
  {
    id: "parking-stopping",
    title: "Parking & Stopping",
    description:
      "Legal parking requirements, parallel parking techniques, and prohibited stopping areas.",
    icon: "🅿️",
    estimatedTime: "20 min",
    difficulty: "Beginner",
    sections: [
      {
        id: "legal-parking",
        title: "Legal Parking Requirements",
        content:
          "When parking, you must park within 30 cm of the curb, in the direction of traffic flow. You cannot park within 9 meters of fire hydrants, in front of driveways, or in areas with posted restrictions. Always observe parking signs and time limits.",
        keyPoints: [
          "Park within 30 cm of the curb",
          "No parking within 9 meters of fire hydrants",
          "No parking in front of driveways",
          "Observe posted parking signs and time limits",
          "Park in the direction of traffic flow",
        ],
      },
      {
        id: "parallel-parking",
        title: "Parallel Parking Technique",
        content:
          "Parallel parking requires practice and proper technique. Find a space about 1.5 times your car length, pull alongside the front car, reverse while turning the steering wheel, then straighten and continue backing while turning the wheel in the opposite direction.",
        keyPoints: [
          "Find space 1.5 times your car length",
          "Pull alongside the front car",
          "Reverse while turning steering wheel right",
          "Straighten wheel when car is at 45-degree angle",
          "Continue backing while turning wheel left",
        ],
      },
    ],
  },
  {
    id: "emergencies",
    title: "Driving Emergencies",
    description:
      "How to handle breakdowns, accidents, and other emergency situations on the road.",
    icon: "🚨",
    estimatedTime: "25 min",
    difficulty: "Advanced",
    sections: [
      {
        id: "vehicle-breakdown",
        title: "Vehicle Breakdown Procedures",
        content:
          "When your vehicle breaks down, safety is the priority. Pull over to the right shoulder if possible, turn on hazard lights immediately, raise your hood to signal distress, and stay in your vehicle if on a busy highway. Call for help and wait for assistance.",
        keyPoints: [
          "Pull over to right shoulder if possible",
          "Turn on hazard lights immediately",
          "Raise hood to signal distress",
          "Stay in vehicle if on busy highway",
          "Call for help and wait for assistance",
        ],
      },
      {
        id: "accident-procedures",
        title: "Accident Procedures",
        content:
          "If involved in an accident, stop immediately and check for injuries. Call 911 if anyone is injured. Move vehicles out of traffic if safe to do so, exchange information with other drivers, and document the scene with photos if possible.",
        keyPoints: [
          "Stop immediately and check for injuries",
          "Call 911 if anyone is injured",
          "Move vehicles out of traffic if safe",
          "Exchange information with other drivers",
          "Document scene with photos if possible",
        ],
      },
    ],
  },
  {
    id: "environmental-driving",
    title: "Environmental & Efficient Driving",
    description:
      "Understanding environmental impact and techniques for fuel-efficient, eco-friendly driving.",
    icon: "🌱",
    estimatedTime: "20 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: "environmental-impact",
        title: "Environmental Impact of Driving",
        content:
          "Vehicles powered by gasoline and diesel give off air pollutants including carbon dioxide, nitrogen oxides, and hydrocarbons. These pollutants contribute to smog, acid rain, and global warming. Cars are responsible for nearly half the carbon dioxide produced by all forms of transportation.",
        keyPoints: [
          "Vehicles emit carbon dioxide and other pollutants",
          "Pollutants contribute to smog and acid rain",
          "Cars responsible for half of transportation CO2",
          "Global warming caused by trapped heat in atmosphere",
          "Public transit produces less CO2 per passenger",
        ],
      },
      {
        id: "efficient-driving",
        title: "Fuel-Efficient Driving Techniques",
        content:
          "You can reduce environmental impact and save money by planning trips, avoiding rush hours, carpooling, maintaining steady speeds, removing excess weight, and keeping your vehicle well-maintained. Turn off your engine if parked more than 10 seconds.",
        keyPoints: [
          "Plan ahead and combine errands into one trip",
          "Avoid driving during rush hours",
          "Carpool and use public transit when possible",
          "Maintain steady speeds and use cruise control",
          "Remove unnecessary weight from vehicle",
          "Keep vehicle well-maintained",
          "Turn off engine if parked more than 10 seconds",
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
