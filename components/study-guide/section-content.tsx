"use client";

import { FileText, BookOpen } from "lucide-react";

const SectionContent = ({ content }: { content: string | React.ReactNode }) => {
  if (typeof content === "string") {
    return (
      <div className="group relative">
        <div className="absolute inset-0 transform rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 transition-transform group-hover:scale-[1.01] dark:from-blue-950/30 dark:to-indigo-950/30" />
        <div className="relative rounded-2xl border border-blue-100/60 bg-card/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-border">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 space-y-6">
              {content.includes("<img") ? (
                <div className="space-y-6 text-lg font-light leading-7 tracking-wide text-muted-foreground">
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
                            className="flex items-center gap-3 rounded-lg bg-muted/50 p-2"
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
                                <p className="text-xs font-semibold leading-snug text-foreground">
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
                        className="text-lg font-light leading-7 tracking-wide text-muted-foreground"
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
                    className="text-lg font-light leading-7 tracking-wide text-muted-foreground"
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
      <div className="absolute inset-0 transform rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 transition-transform group-hover:scale-[1.01] dark:from-blue-950/30 dark:to-indigo-950/30" />
      <div className="relative rounded-2xl border border-blue-100/60 bg-card/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-border">
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
