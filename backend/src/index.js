const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect')
const authRoutes = require('./routes/authRoutes')

dbConnect();
// const db = 'mongosh "mongodb+srv://cluster0.sqwcgew.mongodb.net/" --apiVersion 1 --username ShaktiPriya'
const app = express();


// middleware
app.use(express.json());

// routes
app.use("api/auth/", authRoutes);
// start server

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})