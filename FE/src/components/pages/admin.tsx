import AdminLayout from "../adminLayout";
export function AdminPage() {
  return (
    <AdminLayout>
        {/* DASHBOARD CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

          {/* LEFT STATS PANEL */}
          <div className="md:col-span-1 bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Overview</h2>

            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Total Books</span>
                <span className="font-semibold">0</span>
              </li>
              <li className="flex justify-between">
                <span>Total Members</span>
                <span className="font-semibold">0</span>
              </li>
              <li className="flex justify-between">
                <span>Total Clerks</span>
                <span className="font-semibold">0</span>
              </li>
              <li className="flex justify-between text-red-600">
                <span>Overdue Books</span>
                <span className="font-semibold">0</span>
              </li>
            </ul>
          </div>

          {/* MAIN AREA */}
          <div className="md:col-span-3 bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">
              Welcome to the admin dashboard.  
              Use the controls above to manage clerks and books.
            </p>

            {/* Placeholder */}
            <div className="mt-6 border border-dashed rounded-lg h-48 flex items-center justify-center text-gray-400">
              Future charts / tables here
            </div>
          </div>

        </div>
    </AdminLayout>
  );
}
