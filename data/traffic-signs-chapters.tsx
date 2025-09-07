import { StudyGuideChapter } from "./study-guide";

export const trafficSignsChapter: StudyGuideChapter = {
  id: "traffic-signs",
  title: "Traffic Signs & Signals",
  description:
    "Master the meaning of regulatory, warning, and information signs essential for safe driving.",
  icon: "🚦",
  estimatedTime: "35 min",
  sections: [
    {
      id: "traffic-signs-overview",
      title: "Traffic Signs Overview",
      content: "",
      keyPoints: [
        "Always obey traffic signs - they are legal requirements",
        "Stop signs require complete stops behind the stop line",
        "Yield signs mean give right-of-way to other traffic",
        "School zones require extra caution for children",
        "One-way signs indicate traffic flows in single direction",
        "Red signs typically indicate prohibitions or stops",
      ],
    },
    {
      id: "information-signs",
      title: "Information Signs",
      content: "",
      keyPoints: [
        "Blue signs provide motorist services information",
        "Green signs guide you to destinations",
        "Hospital signs help in medical emergencies",
        "Gas station signs show fuel availability",
        "Rest area signs indicate safe stopping places",
        "Airport signs guide to air travel facilities",
      ],
    },
    {
      id: "temporary-signs",
      title: "Temporary Signs",
      content: "",
      keyPoints: [
        "Orange signs take priority over regular signs",
        "Always follow detour instructions",
        "Reduce speed in construction zones",
        "Watch for workers and equipment",
        "Expect lane changes and closures",
        "Flag persons have authority to stop traffic",
      ],
    },
    {
      id: "traffic-signs-collection",
      title: "Traffic Signs Collection",
      content: "",
      keyPoints: [
        "Regulatory signs are red and white",
        "Prohibition signs indicate what you cannot do",
        "Special lane signs designate restricted areas",
        "School signs require extra caution",
        "Emergency signs indicate important services",
        "Always follow posted restrictions",
      ],
    },
    {
      id: "warning-signs",
      title: "Warning Signs",
      content: "",
      keyPoints: [
        "Yellow signs warn of hazards ahead",
        "Always reduce speed when you see warning signs",
        "Prepare for road conditions changes",
        "Watch for pedestrians and cyclists",
        "School crossing signs require extra caution",
        "Road work signs indicate construction areas",
      ],
    },
  ],
};
