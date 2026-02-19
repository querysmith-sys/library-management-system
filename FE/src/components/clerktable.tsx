import {  useEffect, useState } from "react";
import { Basetable } from "./basetable";
import api from "../api/axios";

interface ClerkDataTypes {
  user_id: number;
  username: string;
  email: string;
  created_at: Date;
}

export function Clerktable() {
  const [clerkData, setClerkData] = useState<ClerkDataTypes[]>([]);
  useEffect(() => {
    const fetchClerkData = async () => {
      try {
        const res = await api.get("/api/admin/clerks");
        setClerkData(res.data.clerkData.rows);
      } catch (error) {
        console.log("Error fetching clerk Data:", error);
      }
    };
    fetchClerkData();
  }, []);

  const columns = [
    { key: "user_id", label: "Clerk ID" },
    { key: "username", label: "Clerk Name" },
    { key: "email", label: "Clerk Email" },
    { key: "created_at", label: "Created At" },
  ];
  return (
    <Basetable
      columns={columns}
      data={clerkData}
      renderRow={(Clerk) => (
        <tr key={Clerk.user_id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-3 py-2">{Clerk.user_id}</td>
          <td className="border border-gray-300 px-3 py-2">
            {Clerk.username}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {Clerk.email}
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
