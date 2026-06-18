/**
 * Renders one or more JSON-LD nodes into a <script type="application/ld+json">.
 * Pass a single schema object or an array. Server component — emit it anywhere
 * in a page's tree. Builders live in @/lib/schema.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
