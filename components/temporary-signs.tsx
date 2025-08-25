"use client"

const TemporarySigns = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Temporary signs are orange and alert you to roadwork, detours, and changing road conditions. These signs have the highest priority and require immediate attention from drivers.
      </p>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚧</span>
          Road Work & Construction Signs
        </h4>
        <p className="text-orange-700 mb-4">
          These orange signs warn of construction zones, road work, and temporary traffic conditions. Always follow their instructions for safety.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/road-work-ahead-sign.png" alt="Road Work Ahead" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Road Work Ahead</p>
            <p className="text-xs text-gray-600">Construction area</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/workers-ahead-sign.png" alt="Workers Ahead" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Workers Ahead</p>
            <p className="text-xs text-gray-600">Personnel present</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/construction-zone-sign.png" alt="Construction Zone" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Construction Zone</p>
            <p className="text-xs text-gray-600">Work in progress</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/detour-sign.png" alt="Detour" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Detour</p>
            <p className="text-xs text-gray-600">Alternate route</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/flag-person-sign.png" alt="Flag Person" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Flag Person</p>
            <p className="text-xs text-gray-600">Traffic control</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/lane-closure-sign.png" alt="Lane Closure" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Lane Closure</p>
            <p className="text-xs text-gray-600">Lane blocked</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/single-lane-ahead-sign.png" alt="Single Lane Ahead" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Single Lane Ahead</p>
            <p className="text-xs text-gray-600">Traffic merging</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/temporary_signs/reduced-speed-ahead-sign.png" alt="Reduced Speed Ahead" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Reduced Speed</p>
            <p className="text-xs text-gray-600">Slow down required</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemporarySigns
