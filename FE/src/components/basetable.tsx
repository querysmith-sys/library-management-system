interface BasetableProps<T> {
  columns: Array<{ key: string; label: string }>;
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

export function Basetable<T>({ columns, data, renderRow }: BasetableProps<T>) {
  return (
    <div className="max-h-64 overflow-y-auto mt-6 border border-gray-300">
      <table className="w-full border-collapse text-sm text-gray-800">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-gray-300 px-3 py-2 text-left font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="border border-gray-300 px-3 py-2 text-center"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
}
