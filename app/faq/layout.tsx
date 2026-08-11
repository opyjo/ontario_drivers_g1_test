import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { g1FaqCategories } from "@/lib/quiz/faq";
import { absoluteUrl, publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Test Frequently Asked Questions",
  description:
    "Find answers about Ontario G1 eligibility, identification, test-day requirements, fees, results, and next steps.",
  path: "/faq",
});

export default function FAQLayout({ children }: Readonly<{ children: ReactNode }>) {
  const questions = g1FaqCategories.flatMap((category) => category.faqs);

  return (
    <>
      <JsonLd
        id="faq-page-json-ld"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${absoluteUrl("/faq")}#faq-page`,
          url: absoluteUrl("/faq"),
          inLanguage: "en-CA",
          mainEntity: questions.map((question) => ({
            "@type": "Question",
            name: question.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: question.a,
            },
          })),
        }}
      />
      {children}
    </>
  );
}
