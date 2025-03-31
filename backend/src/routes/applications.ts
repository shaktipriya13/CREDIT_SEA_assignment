// import express from "express";
// import { authMiddleware } from "../middlewares/authMiddleware";
// import Application from "../models/application";

// const router = express.Router();

// // Submit Application (Any User)
// router.post("/submit", authMiddleware(["verifier", "admin"]), async (req, res) => {
//   try {
//     const { userId, amount } = req.body;
//     const application = new Application({ userId, amount });
//     await application.save();
//     res.json({ message: "Application submitted successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to submit application" });
//   }
// });

// // Verifier can Verify or Reject
// router.post("/verify", authMiddleware(["verifier"]), async (req, res) => {
//   try {
//     const { applicationId } = req.body;
//     await Application.findByIdAndUpdate(applicationId, { status: "verified" });
//     res.json({ message: "Application verified!" });
//   } catch (err) {
//     res.status(500).json({ error: "Verification failed" });
//   }
// });

// // Admin can Approve or Reject
// router.post("/approve", authMiddleware(["admin"]), async (req, res) => {
//   try {
//     const { applicationId } = req.body;
//     await Application.findByIdAndUpdate(applicationId, { status: "approved" });
//     res.json({ message: "Application approved!" });
//   } catch (err) {
//     res.status(500).json({ error: "Approval failed" });
//   }
// });

// export default router;
// import express, { Request, Response } from "express";
// import { verifyToken, authMiddleware } from "../middlewares/authMiddleware";
// import Application from "../models/application";

// const router = express.Router();

// // Define the request body types
// interface ApplicationRequest extends Request {
//   body: {
//     userId?: string;
//     amount?: number;
//     applicationId?: string;
//   };
// }

// // 📌 Submit Loan Application (Any User)
// router.post("/submit", verifyToken, async (req: ApplicationRequest, res: Response) => {
//   try {
//     const { userId, amount } = req.body;

//     if (!userId || !amount) {
//       return res.status(400).json({ error: "User ID and amount are required." });
//     }

//     const application = new Application({ userId, amount, status: "pending" });
//     await application.save();

//     res.status(201).json({ message: "Application submitted successfully!", applicationId: application._id });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to submit application" });
//   }
// });

// // 📌 Verifier: Verify Applications
// router.post("/verify", verifyToken, authMiddleware(["verifier"]), async (req: ApplicationRequest, res: Response) => {
//   try {
//     const { applicationId } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ error: "Application ID is required." });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ error: "Application not found." });
//     }

//     if (application.status !== "pending") {
//       return res.status(400).json({ error: "Only pending applications can be verified." });
//     }

//     application.status = "verified";
//     await application.save();

//     res.json({ message: "Application verified successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Verification failed" });
//   }
// });

// // 📌 Admin: Approve Applications
// router.post("/approve", verifyToken, authMiddleware(["admin"]), async (req: ApplicationRequest, res: Response) => {
//   try {
//     const { applicationId } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ error: "Application ID is required." });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ error: "Application not found." });
//     }

//     if (application.status !== "verified") {
//       return res.status(400).json({ error: "Only verified applications can be approved." });
//     }

//     application.status = "approved";
//     await application.save();

//     res.json({ message: "Application approved successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Approval failed" });
//   }
// });

// // 📌 Admin or Verifier: Reject Applications
// router.post("/reject", verifyToken, authMiddleware(["admin", "verifier"]), async (req: ApplicationRequest, res: Response) => {
//   try {
//     const { applicationId } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ error: "Application ID is required." });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ error: "Application not found." });
//     }

//     if (application.status === "disbursed") {
//       return res.status(400).json({ error: "Cannot reject a disbursed loan." });
//     }

//     application.status = "rejected";
//     await application.save();

//     res.json({ message: "Application rejected successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Rejection failed" });
//   }
// });

// // 📌 Admin: Disburse Loan (Only if Approved)
// router.post("/disburse", verifyToken, authMiddleware(["admin"]), async (req: ApplicationRequest, res: Response) => {
//   try {
//     const { applicationId } = req.body;

//     if (!applicationId) {
//       return res.status(400).json({ error: "Application ID is required." });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ error: "Application not found." });
//     }

//     if (application.status !== "approved") {
//       return res.status(400).json({ error: "Loan can only be disbursed if it's approved." });
//     }

//     application.status = "disbursed";
//     await application.save();

//     res.json({ message: "Loan disbursed successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to disburse loan" });
//   }
// });

// export default router;
import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken, authMiddleware } from "../middlewares/authMiddleware";
import Application from "../models/application";

const router = express.Router();

// ✅ Define a proper Request Type
interface ApplicationBody {
  userId?: string;
  amount?: number;
  applicationId?: string;
}

// 📌 Submit Loan Application (Any User)
router.post("/submit", verifyToken, (async (req: Request<{}, {}, ApplicationBody>, res: Response) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount are required." });
    }

    const application = new Application({ userId, amount, status: "pending" });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully!", applicationId: application._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit application" });
  }
}) as RequestHandler);

// 📌 Verifier: Verify Applications
router.post("/verify", verifyToken, authMiddleware(["verifier"]), (async (req: Request<{}, {}, ApplicationBody>, res: Response) => {
  try {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    if (application.status !== "pending") {
      return res.status(400).json({ error: "Only pending applications can be verified." });
    }

    application.status = "verified";
    await application.save();

    res.json({ message: "Application verified successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
}) as RequestHandler);

// 📌 Admin: Approve Applications
router.post("/approve", verifyToken, authMiddleware(["admin"]), (async (req: Request<{}, {}, ApplicationBody>, res: Response) => {
  try {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    if (application.status !== "verified") {
      return res.status(400).json({ error: "Only verified applications can be approved." });
    }

    application.status = "approved";
    await application.save();

    res.json({ message: "Application approved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
}) as RequestHandler);

// 📌 Admin or Verifier: Reject Applications
router.post("/reject", verifyToken, authMiddleware(["admin", "verifier"]), (async (req: Request<{}, {}, ApplicationBody>, res: Response) => {
  try {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    if (application.status === "disbursed") {
      return res.status(400).json({ error: "Cannot reject a disbursed loan." });
    }

    application.status = "rejected";
    await application.save();

    res.json({ message: "Application rejected successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Rejection failed" });
  }
}) as RequestHandler);

// 📌 Admin: Disburse Loan (Only if Approved)
router.post("/disburse", verifyToken, authMiddleware(["admin"]), (async (req: Request<{}, {}, ApplicationBody>, res: Response) => {
  try {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    if (application.status !== "approved") {
      return res.status(400).json({ error: "Loan can only be disbursed if it's approved." });
    }

    application.status = "disbursed";
    await application.save();

    res.json({ message: "Loan disbursed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to disburse loan" });
  }
}) as RequestHandler);

export default router;
