import { WebSocketServer } from 'ws';
import pool from '../config/db.js'
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

 setInterval(async() => {
     const data = await pool.query(`SELECT COUNT(*) FROM books`);
    //  rows: [ { count: '1' } ]
     console.log(data.rows[0].count)
     if(data.rowCount === 0){
         console.log("database operation failed")
     }
     ws.send('Books Available: '+ data.rows[0].count);
  },1000)

//   ws.close('close' , () => {
//     console.log("connection closed")
// })
});
