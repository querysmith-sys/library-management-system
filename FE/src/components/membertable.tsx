import api from "../api/axios";
import { useEffect, useState } from "react";
import { Basetable } from "./basetable";

interface MemberTableData {
  member_id: number;
  membername: string;
  memberemail: string;
  created_at: Date;
}

export function Membertable() {
  const [tableData, settableData] = useState<MemberTableData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/clerk/members");
      settableData(res.data.membersData.rows);
    };
    fetchData();
  }, []);
  const columns = [
    { key: "member_id", label: "Member ID" },
    { key: "membername", label: "Member Name" },
    { key: "memberemail", label: "Member Email" },
    { key: "created_at", label: "Created At" },
  ];
  return (
    <Basetable
      columns={columns}
      data={tableData}
      renderRow={(Member) => (
        <tr key={Member.member_id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-3 py-2">
            {Member.member_id}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {Member.membername}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {Member.memberemail}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {new Date(Member.created_at).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </td>
        </tr>
      )}
    ></Basetable>
  );
}
