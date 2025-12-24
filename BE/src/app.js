import express from 'express'
import pool from './config/db.js'
import {issueBook, returnBook, calculateFine}  from './services/libraryservices.js'

const router = express.Router();



// check sum function

const checksum =  (isbn) => {
    let lastdigit = isbn % 10;
    let isbnExceptLastdigit = Math.floor(isbn / 10); 
    let arrayofNumbers = Array.from(String(isbnExceptLastdigit),Number)
    let sum = 0;
     for(let i = 0; i < arrayofNumbers.length; i++) {
        sum+=arrayofNumbers[i] * ((i+1) % 2 == 0 ? 3:1);
     }
    let result  = (10 - (sum % 10)) % 10;
    if (result == lastdigit) {
        return true;
    }else {
        return false;
    }
}

// problem1:what if two users try to issue the same book at the same time 

// Routes defined here
router.post('/addbook', async(req,res,next) => {
    try {
        const {title, author, isbn, total_copies, available_copies} =  req.body;
        // sanitization
        const sanitizedtitle  = title.trim().replace(/<[^>]*>?/gm, "");
        const sanitizedauthor = author.trim().replace(/<[^>]*>?/gm, "");
        // validation
        if(checksum(isbn) == false) {
            return res.status(400).json({success:"false",error:"isbn is not valid"});
        }
        if(sanitizedtitle.length == 0 || sanitizedauthor.length == 0) {
            return res.status(400).json({success:"false",error:"title or author is invalid"});
        }
        if(total_copies < 0 || available_copies < 0) {
            return res.status(400).json({success:"false",error:"total_copies and available_copies are invalid"});
        }
        const queryResult = await pool.query(`INSERT INTO books (title, author, isbn, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5)`,[sanitizedtitle, sanitizedauthor, isbn, total_copies, available_copies]);
        if(queryResult.rowCount == 0){
            return res.status(500).json({success:"false",error:"query was not excepted"});
        }
        return res.status(200).json({success:"true",message:"book successfully added"});
    } catch (error) {
        next(error);
    }
})


router.post('/registermember', async(req,res,next) => {
    try {
        const {membername, memberemail} = req.body;
        const sanitizedmembername = membername.trim().replace(/<[^>]*?/gm, "");
        const sanitizedmemberemail = memberemail.trim().replace(/<[^>]*?/gm, "");
        const queryResult = await pool.query(`INSERT INTO members (membername, memberemail) VALUES ($1, $2)`,[sanitizedmembername,sanitizedmemberemail]);
        if(queryResult.rowCount == 0){
             return res.status(500).json({success:"false",error:"query was not excepted"});
        }
        return res.status(200).json({success:"true",message:"member successfully added"});
    } catch (error) {
        next(error);
    }
})


router.get('/issuebook', async(req,res,next) => {
    try {
        const {book_id, member_id, date} = req.body;
        const regexPatternforDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if(!book_id || !member_id || !date) {
            return res.status(404).json({success:"false", message:"provide bookid, memberid and date"});
        }
        if(!Number.isInteger(book_id) || !Number.isInteger(member_id) || !regexPatternforDate.test(date)) {
           return res.status(400).json({success:"false", message:"invalid bookid, memberid or date"});
        }
        const due_date = new Date(date).toISOString();
        const transcript = await issueBook(book_id, member_id, due_date);
        if(transcript == false) {
             return res.status(400).json({success:"false", error:"issuebook operation failed"});
        }
        return res.status(200).json({success:"true",data:transcript});
    } catch (error) {
        next(error);
    }
})

router.put('/returnbook', async(req,res,next) => {
    try {
        const {transaction_id, book_id, fine_amt} = req.body;
        if(!transaction_id || !book_id || !fine_amt) {
            return res.status(404).json({success:"false",message:"provide user input"});
        }
        if(!Number.isInteger(transaction_id) || !Number.isInteger(book_id) || !Number.isInteger(fine_amt)) {
            return res.status(400).json({success:"false",error:"invalid user input"});
        }
        const isReturned = await returnBook(transaction_id,book_id);
        if(!isReturned) {
            return res.status(404).json({success:"false",error:"return book operation failed"});
        }
        // calculate fine for the same
        const result =  await pool.query(`SELECT (CURRENT_DATE - due_date::date) * $1 AS fine FROM transactions WHERE transaction_id = $2 AND book_id = $3 AND CURRENT_TIMESTAMP > due_date`,[fine_amt, transaction_id, book_id]);
        return res.status(200).json({success:"true",message:"returned book operation successfull",fine:result.rowCount == 0 ? 0:result.rows[0]});
    } catch (error) {
        next(error);
    }
})

router.get('/generatefineReport', async(req,res) => {
     try {
        const {fine_amt, member_id} = req.body;
        if(!fine_amt || !member_id) {
            return res.status(400).json({success:"false",error:"please enter required input"});
        }
        if(!Number.isInteger(fine_amt) || !Number.isInteger(member_id)) {
            return res.status(400).json({success:"false",error:"invalid input"});
        }
        const result = await calculateFine(fine_amt, member_id);
        if (result == false) {
            return res.status(404).json({success:"false",message:"no fine record found"});
        }
        return res.status(200).json({success:"true",data:result});

     } catch (error) {
        next(error);
     }
})

export default router




