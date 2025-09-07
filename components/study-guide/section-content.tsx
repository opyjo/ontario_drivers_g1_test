"use client";

import { FileText, BookOpen } from "lucide-react";

const SectionContent = ({ content }: { content: string | React.ReactNode }) => {
  if (typeof content === "string") {
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl transform transition-transform group-hover:scale-[1.01]" />
        <div className="relative bg-white/80 backdrop-blur-sm border border-blue-100/60 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 space-y-6">
              {content.includes("<img") ? (
                <div className="text-gray-700 leading-7 text-lg font-light tracking-wide space-y-6">
                  {content.split("\n\n").map((section, index) => {
                    if (section.includes("<img")) {
                      // Extract image info
                      const imgMatch = section.match(
                        /<img\s+src=['"]([^'"]*)['"]\s+alt=['"]([^'"]*)['"]\s*\/>/
                      );
                      if (imgMatch) {
                        const [, src, alt] = imgMatch;
                        const beforeImg = section
                          .substring(0, section.indexOf("<img"))
                          .trim();
                        const afterImg = section
                          .substring(section.indexOf("/>") + 2)
                          .trim();

                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={src}
                                alt={alt}
                                className="max-w-20 max-h-20 object-contain rounded-lg shadow-sm bg-white p-1"
                              />
                            </div>
                            <div className="flex-1">
                              {afterImg && (
                                <p className="text-gray-700 font-semibold text-xs leading-snug">
                                  {afterImg}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      }
                    }

                    // Regular paragraph content
                    return (
                      <p
                        key={index}
                        className="text-gray-700 leading-7 text-lg font-light tracking-wide"
                      >
                        {section.split("\n").map((line, lineIndex) => (
                          <span
                            key={lineIndex}
                            className="block mb-2 last:mb-0"
                          >
                            {line}
                          </span>
                        ))}
                      </p>
                    );
                  })}
                </div>
              ) : (
                content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 leading-7 text-lg font-light tracking-wide"
                  >
                    {paragraph.split("\n").map((line, lineIndex) => (
                      <span key={lineIndex} className="block mb-2 last:mb-0">
                        {line}
                      </span>
                    ))}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl transform transition-transform group-hover:scale-[1.01]" />
      <div className="relative bg-white/80 backdrop-blur-sm border border-blue-100/60 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 space-y-6">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
