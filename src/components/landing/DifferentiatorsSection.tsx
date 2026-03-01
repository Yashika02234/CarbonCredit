export default function DifferentiatorsSection() {
  const items = [
    {
      title: "Integrity is computed, not declared",
      description:
        "Offset continuously evaluates project data, verification history, and registry signals to produce integrity scores that evolve over time.",
    },
    {
      title: "Full lifecycle traceability",
      description:
        "Every credit is traceable across issuance, transfers, and retirement — preserving context, not just records.",
    },
    {
      title: "Neutral by design",
      description:
        "Offset does not sell credits or optimize for volume. Its role is to provide independent, auditable signals for decision-makers.",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-white">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-4xl font-medium mb-6">
          How Offset Is Different
        </h2>

        <p className="text-gray-600 max-w-2xl mb-20">
          Offset is built as neutral infrastructure for trust — not as a marketplace
          or registry replacement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-medium mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
