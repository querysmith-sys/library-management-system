import { useNavigate } from "react-router-dom";
function AdminLayout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate()
  function GoToClerkManagement() {
    navigate('/clerk');
  }

  function GoToBookManagement() {
    navigate('/book');
  }



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center px-4 py-3 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/libimg.avif" className="w-12 h-12" />
            <h1 className="text-xl font-bold">Library Management System</h1>
          </div>

          <div className="flex gap-3">
            <button 
            onClick={GoToClerkManagement}
            className="px-4 py-2 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              Clerk Management
            </button>
            <button 
            onClick={GoToBookManagement}
            className="px-4 py-2 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              Book Management
            </button>
          </div>
        </div>
        {children}
        <p className="text-center py-6 text-sm text-gray-500">
          © 2025 Dipok Dutta
        </p>
      </div>
    </div>
  );
}

export default AdminLayout;