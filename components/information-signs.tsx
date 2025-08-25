"use client"

const InformationSigns = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Information signs provide guidance to help you navigate and find services. These blue and green signs offer valuable information about destinations, facilities, and route guidance.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">ℹ️</span>
          Service & Destination Signs
        </h4>
        <p className="text-green-700 mb-4">
          These signs guide you to important services and destinations, helping you navigate unfamiliar areas safely.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/hospital-sign.png" alt="Hospital Sign" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Hospital</p>
            <p className="text-xs text-gray-600">Medical facility</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/gas-station-sign.png" alt="Gas Station" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Gas Station</p>
            <p className="text-xs text-gray-600">Fuel available</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/rest-area-sign.png" alt="Rest Area" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Rest Area</p>
            <p className="text-xs text-gray-600">Rest stop available</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/airport-sign.png" alt="Airport" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Airport</p>
            <p className="text-xs text-gray-600">Air travel access</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/park-entrance-sign.png" alt="Park Entrance" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Park Entrance</p>
            <p className="text-xs text-gray-600">Recreational area</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/camping-sign.png" alt="Camping" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Camping</p>
            <p className="text-xs text-gray-600">Campground available</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/lodging-sign.png" alt="Lodging" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Lodging</p>
            <p className="text-xs text-gray-600">Accommodation</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/food-services-sign.png" alt="Food Services" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Food Services</p>
            <p className="text-xs text-gray-600">Restaurant available</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/railway-station-sign.png" alt="Railway Station" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Railway Station</p>
            <p className="text-xs text-gray-600">Train station</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
            <img src="/images/information_signs/recreational-area-sign.png" alt="Recreational Area" className="mx-auto w-14 h-14 object-contain rounded" />
            <p className="text-sm font-medium text-gray-800 mt-2">Recreational Area</p>
            <p className="text-xs text-gray-600">Leisure activities</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationSigns
