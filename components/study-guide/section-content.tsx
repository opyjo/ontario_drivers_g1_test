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
                <div
                  className="text-gray-700 leading-7 text-lg font-light tracking-wide"
                  dangerouslySetInnerHTML={{
                    __html: content
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br/>")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                      .replace(/<p><\/p>/g, "")
                      .replace(/<p><br\/>/g, "<p>")
                      .replace(/<br\/><\/p>/g, "</p>"),
                  }}
                />
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
