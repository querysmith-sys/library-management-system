import { Basetable } from "./basetable";
import axios from "axios";
import { useEffect, useState } from "react";

interface TableData {
  book_id: number;
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
  available_copies: number;
}

export function Booktable() {
  const [tableData, settableData] = useState<TableData[]>([]);
  useEffect(() => {
    const fetchtableData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books");
        settableData(res.data.totalBooks.rows);
      } catch (error) {
        console.log("Error fetching table data.");
      }
    };
    fetchtableData();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socket.onmessage = (event) => {
      const updatedBook = JSON.parse(event.data);
      settableData((tableData) => {
        return tableData.map((book) =>
          book.book_id === updatedBook.book_id
            ? { ...book, available_copies: updatedBook.available_copies }
            : book
        );
      });
    };
    return () => socket.close();
  }, []);
  const columns = [
    { key: "book_id", label: "Book ID" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "isbn", label: "ISBN" },
    { key: "total_copies", label: "Total" },
    { key: "available_copies", label: "Available" },
  ];
  return (
    <Basetable
      columns={columns}
      data={tableData}
      renderRow={(book) => (
        <tr key={book.book_id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-3 py-2">{book.book_id}</td>
          <td className="border border-gray-300 px-3 py-2">{book.title}</td>
          <td className="border border-gray-300 px-3 py-2">{book.author}</td>
          <td className="border border-gray-300 px-3 py-2">{book.isbn}</td>
          <td className="border border-gray-300 px-3 py-2">
            {book.total_copies}
          </td>
          <td className="border border-gray-300 px-3 py-2">
            {book.available_copies}
          </td>
        </tr>
      )}
    ></Basetable>
  );
}
