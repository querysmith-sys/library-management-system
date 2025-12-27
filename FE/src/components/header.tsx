export function Header() {
  return (
    <div className="flex justify-between items-center py-2 px-2 border rounded mt-15">
      <div className="flex items-center gap-4">
        <img src="/libimg.avif" className="w-14 h-14" />
        <h1 className="text-[20px] font-bold">
          Library Management System
        </h1>
      </div>
      <button className="px-4 py-2 rounded text-[16px] border-2 border-blue-700 hover:bg-gray-50 cursor-pointer">
        Admin
      </button>
    </div>
  );
}
