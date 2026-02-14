-- drop table if exist
DROP TABLE IF EXISTS transactions,
books,
members;

-- create members table
CREATE TABLE
    members (
        member_id SERIAL PRIMARY KEY, --use SERIAL or GENERATED ALWAYS AS IDENTITY
        membername VARCHAR(50) NOT NULL,
        memberemail VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
    );

-- create books table
CREATE TABLE
    books (
        book_id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        author VARCHAR(50) NOT NULL,
        isbn VARCHAR(20) UNIQUE,
        total_copies INT NOT NULL CHECK (total_copies >= 0),
        available_copies INT NOT NULL CHECK (
            available_copies >= 0
            AND available_copies <= total_copies
        ),
        removed_at TIMESTAMP DEFAULT NULL
    );

-- create transactions table
CREATE TABLE
    transactions (
        transaction_id SERIAL PRIMARY KEY,
        member_id INT NOT NULL,
        book_id INT NOT NULL,
        issue_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        due_date TIMESTAMPTZ NOT NULL,
        return_date TIMESTAMPTZ,
        CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES members (member_id),
        CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books (book_id)
    );
-- -- create clerks table
-- CREATE TABLE
--     clerks (
--         clerk_id SERIAL PRIMARY KEY,
--         clerkname VARCHAR(50) NOT NULL,
--         clerkemail VARCHAR(50) UNIQUE NOT NULL,
--         created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
--         deleted_at TIMESTAMP DEFAULT NULL
--     );
