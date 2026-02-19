import { Layout } from "../layout";
import { Booktable } from "../booktable";
import api from "../../api/axios";
import { useState } from "react";

interface ReceiptData {
  transaction_id: number;
  book_id: number;
  issue_date: Date;
  due_date: Date;
  member_id: number;
}

interface MemberFineCheckData {
  message: string;
  fine: {
    fine: number;
  };
}

export function IssueReturnpage() {
  const [receiptData, setreceiptData] = useState<ReceiptData>();
  const [returnData, setreturnData] = useState<MemberFineCheckData>();
  const [showIssueForm, setShowIssueForm] = useState<boolean>(false);
  const [showReturnForm, setShowReturnForm] = useState<boolean>(false);
  const [bookId, setBookId] = useState<number>(0);
  const [memberId, setMemberId] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [transactionId, setTransactionId] = useState<number>(0);
  const [bookIDReturn, setBookIDReturn] = useState<number>(0);
  const [fineAmount, setFineAmount] = useState<number>(0);

  const handleIssueBook = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        book_id: bookId,
        member_id: memberId,
        date: dueDate,
      };
      const res = await api.post(
        `/api/clerk/issue-book`,
        body
      );
      if (res.status === 200) {
        setreceiptData(res.data.receipt);
      }
    } catch (error) {
      console.log("Error Handle Issue Book: ", error);
    }
  };
  //       complete return book function
  const handleReturnBook = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        transaction_id: transactionId,
        book_id: bookIDReturn,
        fine_amt: fineAmount,
      };
      const res = await api.post(
        `/api/clerk/return-book`,
        body
      );
      setreturnData(res.data);
    } catch (error) {
      console.log("Error Handle Return Book: ", error);
    }
  };
  const openIsuueForm = () => {
    setShowIssueForm(true);
  };

  const openReturnForm = () => {
    setShowReturnForm(true);
  };

  return (
    <Layout>
      <div>
        <Booktable />
      </div>
      <div className="mt-4 flex gap-4 justify-start">
        <button
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer"
          onClick={openIsuueForm}
        >
          Issue Book
        </button>
        <button
          className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer"
          onClick={openReturnForm}
        >
          Return Book
        </button>
      </div>
      {showIssueForm && (
        <div className="m-5 p-4 border rounded-lg bg-gray-50">
          <h1 className="text-lg font-semibold mb-3">Issue Book Form</h1>

          <form
            onSubmit={handleIssueBook}
            className="flex flex-wrap gap-3 items-center"
          >
            <label className="font-semibold" htmlFor="BookID">
              Book ID:
            </label>
            <input
              id="BookID"
              className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="0"
              value={bookId}
              onChange={(e) => setBookId(Number(e.target.value))}
            />

            <label className="font-semibold" htmlFor="MemberID">
              Member ID:
            </label>
            <input
              id="MemberID"
              className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="0"
              value={memberId}
              onChange={(e) => setMemberId(Number(e.target.value))}
            />

            <label className="font-semibold" htmlFor="due-date">
              Due Date:
            </label>
            <input
              id="due-date"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded border hover:bg-gray-100"
              onClick={() => setShowIssueForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {showReturnForm && (
        <div className="m-5 p-4 border rounded-lg bg-gray-50">
          <h1 className="text-lg font-semibold mb-3">Return Book Form</h1>

          <form
            onSubmit={handleReturnBook}
            className="flex flex-wrap gap-3 items-center"
          >
            <label className="font-semibold" htmlFor="TransactionID">
              Transaction ID:
            </label>
            <input
              id="TransactionID"
              className="border p-2 rounded w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="0"
              value={transactionId}
              onChange={(e) => setTransactionId(Number(e.target.value))}
            />

            <label className="font-semibold" htmlFor="BookIDReturn">
              Book ID:
            </label>
            <input
              id="BookIDReturn"
              className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="0"
              value={bookIDReturn}
              onChange={(e) => setBookIDReturn(Number(e.target.value))}
            />

            <label className="font-semibold" htmlFor="fineAmt">
              Fine Amount:
            </label>
            <input
              id="fineAmt"
              className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="0"
              value={fineAmount}
              onChange={(e) => setFineAmount(Number(e.target.value))}
            />

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded border hover:bg-gray-100"
              onClick={() => setShowReturnForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="border mt-6 p-4 rounded border-gray-300">
        <h1 className="font-semibold">Recipt Details</h1>
        {receiptData ? (
          <ul>
            <>
              <li>Transaction ID: {receiptData.transaction_id}</li>
              <li>Book ID: {receiptData.book_id}</li>
              <li>Member ID: {receiptData.member_id}</li>
              <li>
                Issue Date:{" "}
                {new Date(receiptData.issue_date).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </li>
              <li>
                Due Date:{" "}
                {new Date(receiptData.due_date).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </li>
            </>
          </ul>
        ) : (
          <p>No transaction yet</p>
        )}
      </div>
      <div className="border mt-6 p-4 rounded border-gray-300">
        <h1 className="font-semibold">Member Fine Details</h1>
        {returnData ? (
          <>
            <p>Message: {returnData.message}</p>
            <ul>
              <li>Fine: {returnData.fine.fine}</li>
            </ul>
          </>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </Layout>
  );
}
