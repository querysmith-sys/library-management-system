import { Booktable } from "../booktable";
import AdminLayout from "../adminLayout";
import { useState } from "react";
import axios from "axios";

function BookManagementPage() {
  const [opendialogbox, setopendialogbox] = useState<string>("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [isbn, setISBN] = useState<number | undefined>(undefined);
  const [total_copies, setTotalCopies] = useState<number | undefined>(
    undefined
  );
  const [available_copies, setAvailableCopies] = useState<number | undefined>(
    undefined
  );
  const [book_id, setBookId] = useState<number | undefined>(undefined);

  function dialogboxAddBook() {
    setopendialogbox("addbook");
  }
  function dialogboxEditBook() {
    setopendialogbox("editbook");
  }
  function dialogboxRemoveBook() {
    setopendialogbox("removebook");
  }

  async function addbookOperation() {
    try {
      const body = { title, author, isbn, total_copies, available_copies };
      const res = await axios.post("http://localhost:3000/api/add-book", body);
      alert(res.data.message);
    } catch (error) {
      console.log("Axios Book Request Failed:", error);
    }
  }
  async function editbookOperation() {
    try {
      const body = { title, author, total_copies, available_copies, book_id };
      const res = await axios.patch(
        `http://localhost:3000/api/edit-book`,
        body
      );
      alert(res.data.message);
    } catch (error) {
      console.log("Axios EditBook Request Failed: ", error);
    }
  }
  async function removebookOperation() {
    try {
      const body = { book_id };
      const res = await axios.delete(
        "http://localhost:3000/api/archieve-book",
        { data: body }
      );
      alert(res.data.message);
    } catch (error) {
      console.log("Axios removeBook Request Failed: ", error);
    }
  }

  return (
    <AdminLayout>
      <h1>Book Management Page</h1>
      <Booktable />
      <div className="flex items-center mt-5">
        <button
          onClick={dialogboxAddBook}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2"
        >
          Add Book
        </button>
        <button
          onClick={dialogboxEditBook}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2"
        >
          Edit Book
        </button>
        <button
          onClick={dialogboxRemoveBook}
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer ml-2"
        >
          Remove Book
        </button>
      </div>
      <div className="w-full space-y-6">
        {(opendialogbox === "addbook" || opendialogbox === "editbook") && (
          <div className="border border-black rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">
              {opendialogbox === "addbook" ? "Add Book Form" : "Edit Book Form"}
            </h2>

            <div className="flex flex-wrap items-end gap-6">
              <div className="flex items-center gap-2">
                <label className="font-medium">Title:</label>
                <input
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-40 border border-black rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="font-medium">Author:</label>
                <input
                  value={author}
                  type="text"
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-40 border border-black rounded px-2 py-1"
                />
              </div>

              {opendialogbox === "addbook" && (
                <div className="flex items-center gap-2">
                  <label className="font-medium">ISBN:</label>
                  <input
                    value={isbn}
                    type="number"
                    onChange={(e) => setISBN(Number(e.target.value))}
                    className="w-40 border border-black rounded px-2 py-1"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="font-medium">Total Copies:</label>
                <input
                  value={total_copies}
                  type="number"
                  onChange={(e) => setTotalCopies(Number(e.target.value))}
                  className="w-28 border border-black rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="font-medium">Available Copies:</label>
                <input
                  value={available_copies}
                  type="number"
                  onChange={(e) => setAvailableCopies(Number(e.target.value))}
                  className="w-28 border border-black rounded px-2 py-1"
                />
              </div>

              {opendialogbox === "editbook" && (
                <div className="flex items-center gap-2">
                  <label className="font-medium">Book ID:</label>
                  <input
                    value={book_id}
                    type="number"
                    onChange={(e) => setBookId(Number(e.target.value))}
                    className="w-24 border border-black rounded px-2 py-1"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 ml-auto">
                <button
                  onClick={
                    opendialogbox === "addbook"
                      ? addbookOperation
                      : editbookOperation
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  onClick={() => setopendialogbox("")}
                  className="border border-black px-6 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {opendialogbox === "removebook" && (
          <div className="border border-black rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Remove Book Form</h2>

            <div className="flex items-end gap-6">
              <div className="flex items-center gap-2">
                <label className="font-medium">Book ID:</label>
                <input
                  value={book_id}
                  type="number"
                  onChange={(e) => setBookId(Number(e.target.value))}
                  className="w-32 border border-black rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <button
                  onClick={removebookOperation}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  onClick={() => setopendialogbox("")}
                  className="border border-black px-6 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default BookManagementPage;
