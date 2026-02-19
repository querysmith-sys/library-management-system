import { Clerktable } from "../clerktable";
import AdminLayout from "../adminLayout";
import { useState } from "react";
import api from "../../api/axios";

function ClerkManagementPage() {
  const [opendialogbox, setopendialogbox] = useState<string>("");
  const [clerkname, setClerkName] = useState<string | undefined>(undefined);
  const [clerkemail, setClerkEmail] = useState<string | undefined>(undefined);
  const [clerkID, setClerkId] = useState<number>(0);

  async function handledeleteClerk() {
    try {
      const body = {
        clerk_id: clerkID,
      };
      const res = await api.delete(
        `/api/admin/archieve-clerk`,
        { data: body },
      );
      alert(res.data.message);
    } catch (error) {
      console.log("Axios DeleteClerk Request Failed:", error);
    }
  }
  async function handleeditClerk() {
    try {
      const body = {
        clerk_id: clerkID,
        clerkname: clerkname,
        clerkemail: clerkemail,
      };
      const res = await api.patch(
        `/api/admin/edit-clerk`,
        body
      );
      alert(res.data.message);
    } catch (error) {
      console.log("Axios EditClerk Request Failed:", error);
    }
  }
  async function handleaddClerk() {
    try {
      const body = {
        clerkname: clerkname,
        clerkemail: clerkemail,
      };
      const res = await api.post("/api/admin/add-clerk", body);
      alert(res.data.message);
    } catch (error) {
      console.log("Axios AddClerk Request Failed:", error);
    }
  }

  return (
    <AdminLayout>
      <h1>Clerk Management Page</h1>
      <Clerktable />
      <div className="space-y-6">
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setopendialogbox("addClerk")}
            className="rounded border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Add Clerk
          </button>

          <button
            onClick={() => setopendialogbox("editClerk")}
            className="rounded border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Edit Clerk
          </button>

          <button
            onClick={() => setopendialogbox("deleteClerk")}
            className="rounded border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Delete Clerk
          </button>
        </div>

        {/* Add Clerk */}
        {opendialogbox === "addClerk" && (
          <div className="rounded-lg border border-gray-300 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add Clerk Form</h2>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk Name</label>
              <input
                type="text"
                value={clerkname}
                onChange={(e) => setClerkName(e.target.value)}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk Email</label>
              <input
                type="text"
                value={clerkemail}
                onChange={(e) => setClerkEmail(e.target.value)}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleaddClerk}
                className="rounded bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setopendialogbox("");
                }}
                className="rounded border border-gray-400 px-5 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit Clerk */}
        {opendialogbox === "editClerk" && (
          <div className="rounded-lg border border-gray-300 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edit Clerk Form</h2>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk ID</label>
              <input
                type="number"
                min={0}
                value={clerkID}
                onChange={(e) => setClerkId(Number(e.target.value))}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk Name</label>
              <input
                value={clerkname}
                type="text"
                onChange={(e) => setClerkName(e.target.value)}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk Email</label>
              <input
                value={clerkemail}
                type="text"
                onChange={(e) => setClerkEmail(e.target.value)}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleeditClerk}
                className="rounded bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setopendialogbox("");
                }}
                className="rounded border border-gray-400 px-5 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Delete Clerk */}
        {opendialogbox === "deleteClerk" && (
          <div className="rounded-lg border border-gray-300 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">
              Delete Clerk Form
            </h2>

            <div className="flex items-center gap-4">
              <label className="w-28 text-sm font-medium">Clerk ID</label>
              <input
                type="number"
                value={clerkID}
                min={0}
                onChange={(e) => setClerkId(Number(e.target.value))}
                className="w-64 rounded border border-gray-400 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handledeleteClerk}
                className="rounded bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setopendialogbox("");
                }}
                className="rounded border border-gray-400 px-5 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ClerkManagementPage;
