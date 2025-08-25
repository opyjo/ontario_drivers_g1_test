"use client"

const TrafficSignsCollection = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Explore our comprehensive collection of traffic signs organized by category. These signs are essential for understanding road rules and ensuring safe driving practices.
      </p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Regulatory Signs Overview
          </h4>
          <img src="/images/traffic-signs/regulatory-signs-1.png" alt="Regulatory Signs Part 1" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
          <p className="text-gray-600 mt-3 text-center">Part 1: Basic regulatory signs controlling traffic movement</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚫</span>
            Prohibition Signs
          </h4>
          <img src="/images/traffic-signs/prohibition-signs-1.png" alt="Prohibition Signs Part 1" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
          <p className="text-gray-600 mt-3 text-center">Signs that prohibit certain actions or vehicle types</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🛣️</span>
            Special Lane Signs
          </h4>
          <img src="/images/traffic-signs/special-lane-signs.png" alt="Special Lane Signs" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
          <p className="text-gray-600 mt-3 text-center">Signs designating special lanes for specific vehicle types</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            School & Emergency Signs
          </h4>
          <img src="/images/traffic-signs/school-emergency-signs.png" alt="School and Emergency Signs" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
          <p className="text-gray-600 mt-3 text-center">Signs related to school zones and emergency services</p>
        </div>
      </div>
    </div>
  )
}

export default TrafficSignsCollection
