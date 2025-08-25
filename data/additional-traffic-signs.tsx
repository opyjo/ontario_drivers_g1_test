export const additionalTrafficSignsData = [
  {
    id: "information-direction-signs",
    title: "Information & Direction Signs",
    content: `<div class="space-y-6">
      <p class="text-lg leading-relaxed">Information and direction signs provide guidance and help you navigate. They show routes, destinations, services, and important information about the road ahead. These signs use various colors and shapes to convey different types of information.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 class="font-semibold text-blue-800 mb-2">📍 Information Sign Characteristics</h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong class="text-blue-700">Common Colors:</strong>
            <ul class="list-disc list-inside mt-1 text-blue-600">
              <li>Blue = Services and facilities</li>
              <li>Green = Distance and directions</li>
              <li>Brown = Recreational areas</li>
              <li>White = General information</li>
            </ul>
          </div>
          <div>
            <strong class="text-blue-700">Shapes:</strong>
            <ul class="list-disc list-inside mt-1 text-blue-600">
              <li>Rectangular or square</li>
              <li>Various sizes depending on importance</li>
              <li>Arrow symbols for directions</li>
              <li>Symbols instead of text where possible</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-4">Guide and Destination Signs</h3>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-green-100 rounded-full p-2">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">→</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-green-800">Route Markers</h4>
              <p class="text-sm text-green-700 mt-1">Show highway numbers and route designations. Help you follow specific routes to your destination.</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-blue-100 rounded-full p-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">H</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-blue-800">Hospital</h4>
              <p class="text-sm text-blue-700 mt-1">Indicates medical facilities and emergency care centers along the route.</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-purple-100 rounded-full p-2">
              <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">⛽</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-purple-800">Gas Station</h4>
              <p class="text-sm text-purple-700 mt-1">Shows locations of fuel stations and service areas for vehicles.</p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-orange-100 rounded-full p-2">
              <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">🍴</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-orange-800">Food Services</h4>
              <p class="text-sm text-orange-700 mt-1">Indicates restaurants, diners, and food service facilities.</p>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-indigo-100 rounded-full p-2">
              <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">🛏️</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-indigo-800">Lodging</h4>
              <p class="text-sm text-indigo-700 mt-1">Shows hotels, motels, and accommodation facilities for travelers.</p>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-teal-100 rounded-full p-2">
              <div class="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">📞</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-teal-800">Telephone</h4>
              <p class="text-sm text-teal-700 mt-1">Indicates locations where emergency or public telephones are available.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-6 text-center">
        <img src="/images/traffic-signs/information-direction-signs.png" alt="Information and Direction Signs showing guide and service signs" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
        <p class="text-sm text-gray-600 mt-2 italic">Information signs that provide guidance and show available services</p>
      </div>

      <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 class="font-semibold text-purple-800 mb-2">🗺️ Navigation Tips</h4>
        <ul class="space-y-2 text-sm text-purple-700">
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
            <span>Plan your route before starting your trip to avoid confusion</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
            <span>Service signs (blue) show available facilities - watch for these when needed</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
            <span>Exit signs appear before the exit - be ready to change lanes</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
            <span>Use distance signs to estimate travel time and plan stops</span>
          </li>
        </ul>
      </div>
    </div>`,
    keyPoints: [
      "Provide guidance and show available services",
      "Use various colors for different types of information",
      "Blue signs indicate services and facilities",
      "Green signs show distances and directions",
      "Help with navigation and trip planning",
      "Show locations of gas stations, restaurants, and hotels",
    ],
  },
  {
    id: "construction-temporary-signs",
    title: "Construction & Temporary Signs",
    content: `<div class="space-y-6">
      <p class="text-lg leading-relaxed">Construction and temporary condition signs alert you to roadwork, detours, and changing road conditions. These signs are typically orange and black and have the highest priority over regular traffic signs when present.</p>

      <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 class="font-semibold text-orange-800 mb-2">🚧 Construction Sign Characteristics</h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong class="text-orange-700">Design Features:</strong>
            <ul class="list-disc list-inside mt-1 text-orange-600">
              <li>Bright orange background</li>
              <li>Black letters and symbols</li>
              <li>Diamond or rectangular shapes</li>
              <li>Flashing lights or flags sometimes used</li>
            </ul>
          </div>
          <div>
            <strong class="text-orange-700">Importance:</strong>
            <ul class="list-disc list-inside mt-1 text-orange-600">
              <li>Take precedence over regular signs</li>
              <li>Indicate changing conditions</li>
              <li>May be temporary or permanent</li>
              <li>Require immediate attention</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-4">Common Construction Signs</h3>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-orange-100 rounded-full p-2">
              <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">🚧</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-orange-800">Road Work Ahead</h4>
              <p class="text-sm text-orange-700 mt-1">Indicates construction, maintenance, or repair work on or near the road. Slow down and be prepared for changes.</p>
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
              <h4 class="font-bold text-red-800">Detour</h4>
              <p class="text-sm text-red-700 mt-1">Road is closed ahead. You must follow the detour route shown by arrows and signs.</p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-yellow-100 rounded-full p-2">
              <div class="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">⚠️</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-yellow-800">Workers Ahead</h4>
              <p class="text-sm text-yellow-700 mt-1">Construction workers are present. Extra caution required. Fines are doubled for violations.</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-blue-100 rounded-full p-2">
              <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">↓</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-blue-800">Lane Closed</h4>
              <p class="text-sm text-blue-700 mt-1">One or more lanes are closed ahead. Merge into the remaining open lanes.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-6 text-center">
        <img src="/images/traffic-signs/construction-zone-signs.png" alt="Construction Zone Signs showing road work and detour warnings" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
        <p class="text-sm text-gray-600 mt-2 italic">Construction signs that warn of road work, detours, and changing conditions</p>
      </div>

      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 class="font-semibold text-red-800 mb-2">⚠️ Critical Construction Zone Rules</h4>
        <ul class="space-y-2 text-sm text-red-700">
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
            <span><strong>Fines are doubled</strong> for speeding and other violations in construction zones with workers</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
            <span>Orange signs <strong>take precedence</strong> over regular traffic signs</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
            <span>Follow flagger directions - they have the authority to stop and direct traffic</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
            <span>Watch for sudden lane closures and changing road conditions</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-red-400 rounded-full mt-2"></span>
            <span>Be prepared for rough surfaces, uneven lanes, and temporary traffic patterns</span>
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
      "Be prepared for rough surfaces and uneven lanes",
    ],
  },
  {
    id: "special-signs",
    title: "Special Traffic Signs",
    content: `<div class="space-y-6">
      <p class="text-lg leading-relaxed">Special traffic signs cover unique situations and specific road users. These signs help manage traffic for pedestrians, cyclists, emergency vehicles, and other special circumstances that require specific rules and considerations.</p>

      <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h4 class="font-semibold text-indigo-800 mb-2">🎯 Special Sign Categories</h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong class="text-indigo-700">Pedestrian & Cyclist Signs:</strong>
            <ul class="list-disc list-inside mt-1 text-indigo-600">
              <li>Crosswalk and pedestrian areas</li>
              <li>Bicycle routes and paths</li>
              <li>School zone pedestrian warnings</li>
              <li>Accessible person parking</li>
            </ul>
          </div>
          <div>
            <strong class="text-indigo-700">Emergency & Service Signs:</strong>
            <ul class="list-disc list-inside mt-1 text-indigo-600">
              <li>Emergency vehicle priorities</li>
              <li>Fire station locations</li>
              <li>Hospital and medical facilities</li>
              <li>Accessible parking and loading</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-gray-900 mb-4">Pedestrian and Accessibility Signs</h3>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-blue-100 rounded-full p-2">
              <div class="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">🚶</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-blue-800">Pedestrian Crossover</h4>
              <p class="text-sm text-blue-700 mt-1">Designated area where pedestrians have right-of-way. Drivers must yield to people crossing.</p>
            </div>
          </div>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-green-100 rounded-full p-2">
              <div class="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">♿</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-green-800">Accessible Parking</h4>
              <p class="text-sm text-green-700 mt-1">Reserved for vehicles displaying valid accessible person parking permit.</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-purple-100 rounded-full p-2">
              <div class="w-8 h-8 bg-purple-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">🚲</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-purple-800">Bicycle Lane</h4>
              <p class="text-sm text-purple-700 mt-1">Designated lane for bicycle travel. Motor vehicles may not use this lane.</p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="bg-orange-100 rounded-full p-2">
              <div class="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
                <span class="text-white font-bold text-xs">🚌</span>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-orange-800">Bus Stop</h4>
              <p class="text-sm text-orange-700 mt-1">Designated area for buses to pick up and drop off passengers.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-6 text-center">
        <img src="/images/traffic-signs/special-signs.png" alt="Special Traffic Signs showing pedestrian and cyclist designations" class="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
        <p class="text-sm text-gray-600 mt-2 italic">Special signs for pedestrians, cyclists, and accessibility features</p>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 class="font-semibold text-green-800 mb-2">♿ Accessibility Considerations</h4>
        <ul class="space-y-2 text-sm text-green-700">
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
            <span>Accessible parking spaces are larger and closer to entrances</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
            <span>Blue curb markings indicate accessible loading zones</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
            <span>Pedestrian crossovers often have accessible features</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
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
      "Service signs help locate hospitals, fire stations, and facilities",
    ],
  },
];
