import { useState } from "react";
import { Layout } from "../layout";
import { Membertable } from "../membertable";
import api from "../../api/axios";
export function Memberpage() {
  const [OpenAddMember, setOpenAddMember] = useState(false);
  const [OpenEditMember, setOpenEditMember] = useState(false);
  const [OpenDeleteMember, setOpenDeleteMember] = useState(false);
  const [MemberName, setMemberName] = useState<string | undefined>(undefined);
  const [MemberEmail, setMemberEmail] = useState<string | undefined>(undefined);
  const [memberID, setMemberId] = useState<number>(0);

  function DialogboxAddMember() {
    setOpenAddMember(true);
  }

  function DialogboxEditMember() {
    setOpenEditMember(true);
  }

  function DialogboxDeleteMember() {
    setOpenDeleteMember(true);
  }

  async function handleAddMember() {
    try {
      const body = {
        membername: MemberName,
        memberemail: MemberEmail,
      };
      const res = await api.post("/api/clerk/add-members", body);
      if (res) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error Add-Member Operation:", error);
    }
  }

  async function handleEditMember() {
    try {
      const body = {
        membername: MemberName,
        memberemail: MemberEmail,
        member_id: memberID,
      };
      const res = await api.patch(
        `/api/clerk/edit-members`,
        body
      );
      if (res) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error Edit Member Operation:", error);
    }
  }

  async function handleDeleteMember() {
    try {
      const body = {
        member_id: memberID,
      };
      const res = await api.delete(
        `/api/clerk/archieve-members`,
         { data: body }
      );
      if (res) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error Delete Member Operation:", error);
    }
  }

  return (
    <Layout>
      <div>
        <Membertable />
      </div>
      <div className="mt-4 flex gap-4 justify-start">
        <button
          onClick={DialogboxAddMember}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer"
        >
          Add Member
        </button>
        <button
          onClick={DialogboxEditMember}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2"
        >
          Edit Member
        </button>
        <button
          onClick={DialogboxDeleteMember}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2"
        >
          Delete Member
        </button>
      </div>
      <div className="flex flex-col items-start">
        {OpenAddMember && (
          <div className="flex flex-wrap gap-3 items-center m-5 p-4 border rounded-lg bg-gray-50">
            <label className="font-semibold" htmlFor="name">
              Member Name:
            </label>
            <input
              id="name"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="John Doe"
              value={MemberName}
              onChange={(e) => setMemberName(e.target.value)}
            />

            <label className="font-semibold" htmlFor="email">
              Member Email:
            </label>
            <input
              id="email"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="john@email.com"
              value={MemberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />

            <button
              onClick={handleAddMember}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 rounded border hover:bg-gray-100"
              onClick={() => setOpenAddMember(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {OpenEditMember && (
          <div className="flex flex-wrap gap-3 items-center m-5 p-4 border rounded-lg bg-gray-50">
            <label className="font-semibold" htmlFor="edit-name">
              Member Name:
            </label>
            <input
              id="edit-name"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={MemberName}
              onChange={(e) => setMemberName(e.target.value)}
            />

            <label className="font-semibold" htmlFor="edit-email">
              Member Email:
            </label>
            <input
              id="edit-email"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={MemberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />

            <label className="font-semibold" htmlFor="edit-id">
              Member ID:
            </label>
            <input
              id="edit-id"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
              type="number"
              value={memberID}
              onChange={(e) => setMemberId(Number(e.target.value))}
            />

            <button
              onClick={handleEditMember}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 rounded border hover:bg-gray-100"
              onClick={() => setOpenEditMember(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {OpenDeleteMember && (
          <div className="flex gap-3 items-center m-5 p-4 border rounded-lg bg-red-50">
            <label className="font-semibold" htmlFor="delete-id">
              Member ID:
            </label>
            <input
              id="delete-id"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-24"
              type="number"
              value={memberID}
              onChange={(e) => setMemberId(Number(e.target.value))}
            />

            <button
              onClick={handleDeleteMember}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 rounded border hover:bg-gray-100"
              onClick={() => setOpenDeleteMember(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
