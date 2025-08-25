"use client";

import { Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

const KeyPoints = ({ points }: { points: string[] }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50 rounded-2xl transform transition-transform group-hover:scale-[1.01]" />
      <div className="relative bg-white/90 backdrop-blur-sm border border-amber-100/60 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              Key Points to Remember
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Essential information for your success
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {points.map((point, index) => {
            if (point.includes("\n") || point.includes("•")) {
              const [mainPoint, ...subItems] = point
                .split(/\n|•/)
                .filter((item) => item.trim());
              return (
                <div
                  key={index}
                  className="group/item relative bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-shadow">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-900 font-semibold leading-relaxed text-lg">
                          {mainPoint.trim()}
                        </span>
                      </div>
                      {subItems.length > 0 && (
                        <div className="ml-7 space-y-2">
                          {subItems.map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <ArrowRight className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                              <span className="leading-relaxed">
                                {subItem.trim()}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="group/item relative bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-shadow">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-900 font-semibold leading-relaxed text-lg">
                      {point}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeyPoints;
