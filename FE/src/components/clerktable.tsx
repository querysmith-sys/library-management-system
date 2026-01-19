import { useEffect, useState } from "react";
import { Basetable } from "./basetable";
import axios from "axios";

interface ClerkDataTypes {
  clerk_id: number;
  clerkname: string;
  clerkemail: string;
  created_at: Date;
}

export function Clerktable() {
  const [clerkData, setClerkData] = useState<ClerkDataTypes[]>([]);
  useEffect(() => {
    const fetchClerkData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/clerks");
        setClerkData(res.data.clerkData.rows);
      } catch (error) {
        console.log("Error fetching clerk Data:", error);
      }
    };
    fetchClerkData();
  }, []);

  const columns = [
    { key: "clerk_id", label: "Clerk ID" },
    { key: "clerkname", label: "Clerk Name" },
    { key: "clerkemail", label: "Clerk Email" },
    { key: "created_at", label: "Created At" },
  ];
  return (
    <Basetable
      columns={columns}
      data={clerkData}
      renderRow={(Clerk) => (
        <tr key={Clerk.clerk_id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-3 py-2">{Clerk.clerk_id}</td>
          <td className="border border-gray-300 px-3 py-2">
            {Clerk.clerkname}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {Clerk.clerkemail}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {Clerk.created_at.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </td>
        </tr>
      )}
    />
  );
}
