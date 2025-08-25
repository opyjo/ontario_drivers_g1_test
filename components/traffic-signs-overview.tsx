"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const TrafficSignsOverview = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Master Ontario traffic signs with our comprehensive visual guide. Understanding these signs is crucial for safe driving and passing your licensing tests.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚦</span>
          Essential Traffic Signs Collection
        </h4>
        <p className="text-blue-700 mb-4">
          This comprehensive collection covers all major traffic signs you'll encounter on Ontario roads. Each sign serves a specific purpose to ensure safe and orderly traffic flow.
        </p>

        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/stop-sign.png" alt="Stop Sign" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Stop</p>
            <p className="text-xs text-gray-600">Complete stop required</p>
          </div>
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/yield-sign.png" alt="Yield Sign" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Yield</p>
            <p className="text-xs text-gray-600">Give right-of-way</p>
          </div>
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/no-right-turn-on-red-sign.png" alt="No Right Turn on Red" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">No Turn on Red</p>
            <p className="text-xs text-gray-600">Prohibited maneuver</p>
          </div>
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/do-not-enter-sign.png" alt="Do Not Enter" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Do Not Enter</p>
            <p className="text-xs text-gray-600">Wrong way</p>
          </div>
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/one-way-sign.png" alt="One Way" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">One Way</p>
            <p className="text-xs text-gray-600">Single direction</p>
          </div>
          <div className="text-center bg-white p-3 rounded-lg shadow-sm border">
            <img src="/images/content_signs/school-zone-sign.png" alt="School Zone" className="mx-auto w-16 h-16 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">School Zone</p>
            <p className="text-xs text-gray-600">Extra caution needed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrafficSignsOverview
