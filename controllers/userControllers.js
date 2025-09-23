import pool from "../db.js";
import * as User from "../models/userModels.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.createUser(fullname, email, hashedPassword);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
export async function getTestapi(req, res) {
  try {
    // test query sederhana
    const result = await pool.query("SELECT NOW()");
    
    res.status(200).json({
      message: "DB Connected ✅",
      dbTime: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "DB Connection Failed ❌",
      details: err.message,
    });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password, "tesss");
        
    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    const user = await User.getUserByEmail(email);

    if (!user) return res.status(400).json({ error: "Invalid" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

// Logout 
export async function logout(req, res) {
  res.status(200).json({ message: "Logout successful" });
}
