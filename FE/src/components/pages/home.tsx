import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      
      {/* Header */}
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
            <img src="/libimg.avif" alt="img" className="w-20 mix-blend-multiply"/>
          <h1 className="text-xl font-semibold text-gray-800">
            Library Management System
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-14 max-w-6xl w-full items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Manage your library <br />
              <span className="text-blue-600">smartly & efficiently</span>
            </h2>

            <p className="mt-5 text-gray-600 text-lg max-w-lg">
              A modern library management system to handle books, members,
              clerks, and transactions with ease.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={() => {
                  navigate("/auth/login") //later change to admin login
                }}
              >
                Admin Login
              </button>

              <button
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                onClick={() => {
                  navigate("/auth/login") //later change to clerk login
                }}
              >
                Clerk Login
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white/80 backdrop-blur border rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              <StatCard title="Books" value="1,200+" />
              <StatCard title="Members" value="500+" />
              <StatCard title="Clerks" value="20+" />
              <StatCard title="Transactions" value="10k+" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © 2025 Dipok Dutta
      </footer>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 text-center bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

export default Home;
