export default function WhoItsForSection() {
  const audiences = [
    {
      title: "Enterprise",
      description:
        "For organizations evaluating carbon credits at scale and requiring decision-grade signals, auditability, and consistent data across markets.",
    },
    {
      title: "Developers",
      description:
        "For teams integrating carbon intelligence into internal systems, analytics pipelines, and compliance workflows.",
    },
    {
      title: "Government & Regulators",
      description:
        "For public institutions overseeing market integrity, disclosure, and long-term climate accountability.",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-4xl font-medium mb-6">
          Who This Is For
        </h2>

        <p className="text-gray-600 max-w-2xl mb-20">
          Offset is designed for institutions that require verifiable integrity,
          not marketing claims.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {audiences.map((audience) => (
            <div key={audience.title}>
              <h3 className="text-xl font-medium mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
