// import express from "express";
// import verifyToken from "../middlewares/authMiddleware";
// import authorizeRoles from "../middlewares/roleMiddleware";

// const router = express.Router();

// // only admin can access this route
// router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
//     res.json({ message: "Welcome Admin" });
// });

// // both admin and verifier can access this route
// router.get("/verifier", verifyToken, authorizeRoles("admin", "verifier"), (req, res) => {
//     res.json({ message: "Welcome verifier" });
// });

// // all can access this route
// router.get("/user", verifyToken, authorizeRoles("admin", "verifier"), (req, res) => {
//     res.json({ message: "Welcome user" });
// });

// export default router;
// import express from "express";
// import verifyToken from "../middlewares/authMiddleware";
// import authorizeRoles from "../middlewares/roleMiddleware";

// const router = express.Router();

// // Only admin can access this route
// router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
//     res.json({ message: "Welcome Admin" });
// });

// // Both admin and verifier can access this route
// router.get("/verifier", verifyToken, authorizeRoles("admin", "verifier"), (req, res) => {
//     res.json({ message: "Welcome Verifier" });
// });

// // All users can access this route
// router.get("/user", verifyToken, (req, res) => {
//     res.json({ message: "Welcome User" });
// });

// export default router;
import express from "express";
import { verifyToken, authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Only admin can access this route
router.get("/admin", verifyToken, authMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

// Both admin and verifier can access this route
router.get("/verifier", verifyToken, authMiddleware(["admin", "verifier"]), (req, res) => {
    res.json({ message: "Welcome Verifier" });
});

// All users can access this route
router.get("/user", verifyToken, (req, res) => {
    res.json({ message: "Welcome User" });
});

export default router;
