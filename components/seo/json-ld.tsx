import Script from "next/script";

type JsonLdProps = {
  id: string;
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ id, data }: Readonly<JsonLdProps>) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
