// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import User from '../models/user';

// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     'your-secret-key', // Store in .env
//     { expiresIn: '1h' }
//   );
//   res.json({ token });
// });

// export default router;