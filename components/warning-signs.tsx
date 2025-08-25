"use client"

const WarningSigns = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Warning signs alert you to potential hazards ahead and help you prepare for dangerous situations. These yellow signs with black symbols are crucial for safe driving.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Road Hazard Warnings
        </h4>
        <p className="text-yellow-700 mb-4">
          These signs warn of road conditions and hazards that require immediate attention and speed adjustments.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/slight-bend-sign.png" alt="Slight Bend" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Slight Bend</p>
            <p className="text-xs text-gray-600">Curve ahead</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/sharp-bend-sign.png" alt="Sharp Bend" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Sharp Bend</p>
            <p className="text-xs text-gray-600">Tight curve</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/intersection-ahead-sign.png" alt="Intersection Ahead" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Intersection</p>
            <p className="text-xs text-gray-600">Crossing roads</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/pedestrian-crossing-sign.png" alt="Pedestrian Crossing" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Pedestrian Crossing</p>
            <p className="text-xs text-gray-600">Watch for people</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/road-work-sign.png" alt="Road Work" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Road Work</p>
            <p className="text-xs text-gray-600">Construction area</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/bumpy-road-sign.png" alt="Bumpy Road" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Bumpy Road</p>
            <p className="text-xs text-gray-600">Uneven surface</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/school-crossing-sign.png" alt="School Crossing" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">School Crossing</p>
            <p className="text-xs text-gray-600">Children present</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/warning_signs/speed-hump-sign.png" alt="Speed Hump" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Speed Hump</p>
            <p className="text-xs text-gray-600">Speed reduction</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚧</span>
          Additional Warning Categories
        </h4>
        <p className="text-yellow-700 mb-4">More warning signs covering various road conditions and hazards.</p>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Curve and Bend Warnings</h5>
            <img src="/images/traffic-signs/warning-signs-curves.png" alt="Warning Signs - Curves" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p className="text-gray-600 mt-2 text-center">Signs warning of road curves and bends</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Road Condition Warnings</h5>
            <img src="/images/traffic-signs/warning-signs-road-conditions.png" alt="Warning Signs - Road Conditions" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p className="text-gray-600 mt-2 text-center">Signs warning of poor road conditions</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Traffic Hazard Warnings</h5>
            <img src="/images/traffic-signs/warning-signs-traffic.png" alt="Warning Signs - Traffic" className="mx-auto max-w-full h-auto rounded-lg border shadow-sm" />
            <p className="text-gray-600 mt-2 text-center">Signs warning of traffic-related hazards</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarningSigns
