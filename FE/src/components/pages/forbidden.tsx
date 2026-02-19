
// created a forbidden page for unauthorized access

export function Forbidden()  {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="bg-red-400 text-white p-4 rounded-lg">Forbidden Access</h1>
        </div>
    )
}