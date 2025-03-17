require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 2001;

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/login", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Username and email are required" });
    }

    try {
        const newUser = await prisma.user.create({
            data: { name, email },
        });

        res.json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
