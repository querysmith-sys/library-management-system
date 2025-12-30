import { Layout } from "../layout";
import { Booktable } from "../booktable";
import axios from "axios";
import { useState } from "react";


interface ReceiptData {
    transaction_id: number,
    book_id: number,
    issue_date: Date,
    due_date: Date,
    member_id: number
}

export function IssueReturnpage()  {
const [receiptData,setreceiptData] = useState<ReceiptData>();
// const [returnData,setreturnData] = useState
const [showIssueForm, setShowIssueForm] = useState<boolean>(false);
const [showReturnForm, setShowReturnForm] = useState<boolean>(false);
const [bookId, setBookId] = useState<number>(0);
const [memberId, setMemberId] = useState<number>(0);
const [dueDate, setDueDate] = useState<string>("");
const [transactionId, setTransactionId] = useState<number>(0);
const [bookIDReturn, setBookIDReturn] = useState<number>(0);
const [fineAmount, setFineAmount] = useState<number>(0);

    const handleIssueBook = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
            const body = {
                book_id: bookId,
                member_id: memberId,
                date: dueDate
            }
            const res = await axios.post('http://localhost:3000/api/issue-book', body);
            if(res.status === 200) {
                setreceiptData(res.data.receipt);
            }
        } catch (error) {
            console.log("Error Handle Issue Book: ",error);
        }
    }
//       complete return book function
    const handleReturnBook = async(event: React.FormEvent) => {
        event.preventDefault();
        // try {
        //     const body = {
        //       transaction_id: transactionId,
        //       book_id: bookIDReturn,
        //       fine_amt: fineAmount
        //     }
        //     const res = await axios.post('http://localhost:3000/api/return-book', body);
        // } catch (error) {
        //     console.log("Error Handle Return Book: ",error);
        // }
    }
    const openIsuueForm = () => {
          setShowIssueForm(true);
    }

    const openReturnForm = () => {
          setShowReturnForm(true);
    }

     return (
        
        <Layout>
                <div>
                    <Booktable />
                </div>
                <div className="mt-4 flex gap-4 justify-start">
                    <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" onClick={openIsuueForm}>Issue Book</button>
                    <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" onClick={openReturnForm}>Return Book</button>
                </div>
                {showIssueForm && (
                          <div>
                            <h1>Issue Book Form</h1>
                            <form onSubmit={handleIssueBook} className="flex gap-3 items-center">
                              <label className="font-semibold" htmlFor="">BookID</label>
                              <input className="border p-2 rounded" type="number" min="0" value={bookId} onChange={(e) => setBookId(Number(e.target.value))}/>
                              <label className="font-semibold" htmlFor="Member ID">MemberID</label>
                              <input className="border p-2 rounded" type="number" min="0" value={memberId} onChange={(e) => setMemberId(Number(e.target.value))}/>
                              <label className="font-semibold" htmlFor="due-date">Due-Date</label>
                              <input className="border p-2 rounded" type="datetime-local" id="due-date" name="Due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                              <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" type="submit">Submit</button>
                              <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" onClick={() => setShowIssueForm(false)}>Cancel</button>
                            </form>
                          </div>
                )}
                {showReturnForm && (
                    <div>
                      <h1>Return Book Form</h1>
                      <form onSubmit={handleReturnBook} className="flex gap-3 items-center"> 
                         <input className="border p-2 rounded" type="number" min="0" placeholder="Transaction ID" value={transactionId} onChange={(e) => setTransactionId(Number(e.target.value))}/>
                         <input className="border p-2 rounded" type="number" min="0" placeholder="Book ID" value={bookIDReturn} onChange={(e) => setBookIDReturn(Number(e.target.value))}/>
                         <input className="border p-2 rounded" type="number" min="0" placeholder="Fine Amount" value={fineAmount} onChange={(e) => setFineAmount(Number(e.target.value))}/>
                         <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" type="submit">Submit</button>
                         <button className="border-2 rounded border-black p-2 text-[16px] hover:bg-gray-50 cursor-pointer" onClick={() => setShowReturnForm(false)}>Cancel</button>
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
                                <li>Issue Date: {new Date(receiptData.issue_date).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}</li>
                                <li>Due Date: {new Date(receiptData.due_date).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}</li>
                                </>      
                        </ul>
                    ) : (
                        <p>No transaction yet</p>
                    )}

                </div>
        </Layout>
        
     )
}