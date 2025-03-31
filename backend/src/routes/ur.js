const express = require('express');
const verifyToken = require("../middlewares/authMiddleware")
const authorizeToken = require("../middlewares/roleMiddleware")

const router = express.Router();

// only admin can access this route
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
})
// both admin and verifier can access this route
router.get("/verifier", verifyToken, authorizeRoles("admin", "verifier"), (req, res) => {
    res.json({ message: "Welcome verifier" });
})
// all can access this route
router.get("/user", verifyToken, authorizeRoles("admin", "verifier"), (req, res) => {
    res.json({ message: "Welcome user" });
})

module.exports = router;