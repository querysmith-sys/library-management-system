import pool from '../config/db.js'
import {broadcast} from  './websockets.js'
// Issue Book Service
const issueBook = async(book_id, member_id, due_date)=>{
    const client = await pool.connect();

    try {
        await client.query(`BEGIN`);
        const queryResult = await client.query(`UPDATE books SET available_copies = available_copies - 1 WHERE book_id = $1 AND available_copies > 0 RETURNING book_id, available_copies`,[book_id])
        if(queryResult.rowCount === 0) {
            await client.query(`ROLLBACK`)
            return false;
        }
        const transactionDetails = await client.query(`INSERT INTO transactions (member_id, book_id, due_date) VALUES ($1,$2,$3) RETURNING transaction_id, book_id, issue_date, due_date, member_id`,[member_id, book_id, due_date]);
        await client.query(`COMMIT`);
        broadcast(queryResult.rows[0]);
        return transactionDetails.rows[0];
    } catch (error) {
        await client.query(`ROLLBACK`);
        console.log('Isuue Book Operations Error: ',error);
        throw error
    }finally {
        client.release();
    }

}

// Return Book Service
const returnBook = async(transaction_id, book_id) => {
   const client = await pool.connect();

   try {
    await client.query(`BEGIN`);
    const queryResult = await client.query(`UPDATE transactions SET return_date = CURRENT_TIMESTAMP  WHERE transaction_id = $1 AND return_date IS NULL`,[transaction_id]);
    if(queryResult.rowCount == 0) {
        await client.query(`ROLLBACK`)
        return false;
    }
    const result = await client.query(`UPDATE books SET available_copies = available_copies + 1 WHERE book_id = $1 AND available_copies < total_copies RETURNING book_id, available_copies`,[book_id]);
    await client.query(`COMMIT`);
    broadcast(result.rows[0])
    return true
   } catch (error) {
     await client.query(`ROLLBACK`);
     console.log("Return Book Operations Error: ",error);
     throw error
   } finally {
       client.release()
   }
}
// Fine Calculation Service
const calculateFine = async(fine_amt, member_id) => {
    
    try {
         const queryResult =  await pool.query(`SELECT transaction_id, member_id, book_id, due_date, (CURRENT_DATE  - due_date) AS days_overdue,(CURRENT_DATE - due_date::date) * $1 AS fine FROM transactions WHERE return_date IS NULL AND CURRENT_TIMESTAMP > due_date AND member_id = $2`,[fine_amt, member_id]);
         if(queryResult.rowCount === 0) {
            return false;
         }
         return queryResult.rows;
    } catch (error) {
        console.log("Fine Operation Error: ",error);
        throw error
    }
}

export {issueBook, returnBook, calculateFine};