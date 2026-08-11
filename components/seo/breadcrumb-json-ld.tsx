import { JsonLd } from "./json-ld";

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ id, items }: Readonly<{ id: string; items: BreadcrumbItem[] }>) {
  return (
    <JsonLd
      id={id}
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
