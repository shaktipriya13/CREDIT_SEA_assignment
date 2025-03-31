// import express from 'express';
// import Application from '../models/application';
// import { authenticate } from '../middleware/auth';

// const router = express.Router();

// router.get('/stats', authenticate, async (req, res) => {
//   const stats = {
//     pending: await Application.countDocuments({ status: 'Pending' }),
//     verified: await Application.countDocuments({ status: 'Verified' }),
//     approved: await Application.countDocuments({ status: 'Approved' }),
//     rejected: await Application.countDocuments({ status: 'Rejected' }),
//   };
//   res.json(stats);
// });

// export default router;