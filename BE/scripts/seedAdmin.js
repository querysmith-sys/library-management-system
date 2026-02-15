// seed for creation admin user
import bcrypt from "bcrypt";
import pool from "../src/config/db.js";
const adminCreation = async () => {
    try {
        const userRole = 'admin';
        const queryResult = await pool.query(`SELECT * FROM users WHERE role = $1 AND deleted_at IS NULL`, [userRole]);
        if (queryResult.rows.length > 0) {
            return console.log("No more Admin can be created");
        }
        const role = 'admin';
        const adminName = "mocha";
        const adminEmail = "mocha@example.com";
        const temp_admin_password = await bcrypt.hash("admin@123", 10);

        await pool.query(`INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)`, [adminName, adminEmail, temp_admin_password, role]);
        console.log("admin created.");
        process.exit(0);
    } catch (error) {
        console.log("Something Went Wrong.")
    }
}

adminCreation();