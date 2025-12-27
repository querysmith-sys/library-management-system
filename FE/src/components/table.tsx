
export function Table() {
    return (
    
<div className="max-h-64 overflow-y-auto mt-6 border border-gray-300">
  <table className="w-full border-collapse text-sm text-gray-800">
    <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
        <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
          Book ID
        </th>
        <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
          Title
        </th>
        <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
          Author
        </th>
        <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
          ISBN
        </th>
        <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
          Total
        </th>
        <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
          Available
        </th>
      </tr>
    </thead>

    <tbody>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-3 py-2">1</td>
        <td className="border border-gray-300 px-3 py-2">Clean Code</td>
        <td className="border border-gray-300 px-3 py-2">Robert C. Martin</td>
        <td className="border border-gray-300 px-3 py-2">9780132350884</td>
        <td className="border border-gray-300 px-3 py-2 text-center">10</td>
        <td className="border border-gray-300 px-3 py-2 text-center">4</td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-3 py-2">2</td>
        <td className="border border-gray-300 px-3 py-2">Design Patterns</td>
        <td className="border border-gray-300 px-3 py-2">Erich Gamma</td>
        <td className="border border-gray-300 px-3 py-2">9780201633610</td>
        <td className="border border-gray-300 px-3 py-2 text-center">7</td>
        <td className="border border-gray-300 px-3 py-2 text-center">
          2
        </td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-3 py-2">3</td>
        <td className="border border-gray-300 px-3 py-2">You Don’t Know JS</td>
        <td className="border border-gray-300 px-3 py-2">Kyle Simpson</td>
        <td className="border border-gray-300 px-3 py-2">9781491904244</td>
        <td className="border border-gray-300 px-3 py-2 text-center">12</td>
        <td className="border border-gray-300 px-3 py-2 text-center">9</td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-3 py-2">4</td>
        <td className="border border-gray-300 px-3 py-2">C++</td>
        <td className="border border-gray-300 px-3 py-2">Amy Jatson</td>
        <td className="border border-gray-300 px-3 py-2">9781492904244</td>
        <td className="border border-gray-300 px-3 py-2 text-center">12</td>
        <td className="border border-gray-300 px-3 py-2 text-center">9</td>
      </tr>

     <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-3 py-2">5</td>
        <td className="border border-gray-300 px-3 py-2">Rust</td>
        <td className="border border-gray-300 px-3 py-2">kiris salmon</td>
        <td className="border border-gray-300 px-3 py-2">9781492904244</td>
        <td className="border border-gray-300 px-3 py-2 text-center">12</td>
        <td className="border border-gray-300 px-3 py-2 text-center">7</td>
      </tr>   
      
    </tbody>
  </table>
</div>


    )
}