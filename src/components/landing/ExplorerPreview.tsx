export default function ExplorerPreview() {
  const rows = [
    {
      id: "OX-IND-2391",
      methodology: "REDD+",
      registry: "Verra",
      issuance: "120,000",
      vintage: "2022",
      status: "Active",
      trust: "0.82",
      verified: "2024-11-03 14:22 UTC",
    },
    {
      id: "OX-BRA-8821",
      methodology: "ARR",
      registry: "Gold Standard",
      issuance: "45,500",
      vintage: "2021",
      status: "Partially Retired",
      trust: "0.76",
      verified: "2024-10-18 09:41 UTC",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">

        <h2 className="text-4xl font-medium mb-4">
          Explorer Preview
        </h2>

        <p className="text-gray-600 max-w-xl mb-10">
          Read-only access to verified project data, issuance history,
          and integrity signals.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-6 py-4">Project ID</th>
                <th className="px-6 py-4">Methodology</th>
                <th className="px-6 py-4">Registry</th>
                <th className="px-6 py-4">Issuance</th>
                <th className="px-6 py-4">Vintage</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Trust</th>
                <th className="px-6 py-4">Last Verified</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-6 py-4 font-mono">{row.id}</td>
                  <td className="px-6 py-4">{row.methodology}</td>
                  <td className="px-6 py-4">{row.registry}</td>
                  <td className="px-6 py-4">{row.issuance}</td>
                  <td className="px-6 py-4">{row.vintage}</td>
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4">{row.trust}</td>
                  <td className="px-6 py-4 text-gray-500">{row.verified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Explorer is read-only. Write access is restricted to verified issuers and auditors.
        </p>

      </div>
    </section>
  );
}
