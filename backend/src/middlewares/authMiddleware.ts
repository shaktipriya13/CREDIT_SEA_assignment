// // // import { Request, Response, NextFunction } from "express";
// // // import jwt from "jsonwebtoken";

// // // interface DecodedUser {
// // //     id: string;
// // //     role: string;
// // // }

// // // interface AuthRequest extends Request {
// // //     user?: DecodedUser;
// // // }

// // // const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
// // //     let token: string | undefined;
// // //     let authHeader = req.headers.authorization || req.headers.Authorization;

// // //     if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
// // //         token = authHeader.split(" ")[1];
// // //     }

// // //     if (!token) {
// // //         return res.status(401).json({ message: "No token, authorization denied" });
// // //     }

// // //     try {
// // //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
// // //         req.user = decoded;  // Attach the decoded user to request
// // //         console.log("The decoded user is: ", req.user);
// // //         next();
// // //     } catch (error) {
// // //         return res.status(400).json({ message: "Token is not valid." });
// // //     }
// // // };

// // // export default verifyToken;
// // import { Request, Response, NextFunction } from "express";
// // import jwt from "jsonwebtoken";

// // // Define the structure of the decoded JWT payload
// // interface DecodedUser {
// //     id: string;
// //     role: string;
// // }

// // // Extend Request to include the `user` property
// // interface AuthRequest extends Request {
// //     user?: DecodedUser;
// // }

// // const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
// //     let token: string | undefined;
// //     let authHeader = req.headers.authorization || req.headers.Authorization;

// //     // Ensure authHeader is a string and starts with "Bearer"
// //     if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
// //         token = authHeader.split(" ")[1];
// //     }

// //     if (!token) {
// //         res.status(401).json({ message: "No token, authorization denied" });
// //         return;
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
// //         req.user = decoded; // Attach decoded user info to request object
// //         console.log("Decoded user:", req.user);
// //         next();
// //     } catch (error) {
// //         res.status(400).json({ message: "Token is not valid." });
// //     }
// //     else{
// //         res.status(401).json({ message: "No token, authorization denied" });

// //     }
// // };

// // export default verifyToken;
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// // Define the structure of the decoded JWT payload
// interface DecodedUser {
//     id: string;  // User ID from JWT payload
//     role: string;  // User role from JWT payload
// }

// // Extend Request to include the `user` property
// interface AuthRequest extends Request {
//     user?: DecodedUser;  // Optional user property attached after decoding JWT
// }

// const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
//     let token: string | undefined;
//     let authHeader = req.headers.authorization || req.headers.Authorization;

//     // Ensure authHeader is a string and starts with "Bearer"
//     if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];  // Extract token from "Bearer <token>"
//     }

//     if (!token) {
//         res.status(401).json({ message: "No token, authorization denied" });
//         return;
//     }

//     try {
//         // Verify and decode the token using the secret key
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        
//         // Attach decoded user info to request object
//         req.user = decoded;
//         console.log("Decoded user:", req.user);
        
//         next();  // Move to the next middleware or route handler
//     } catch (error) {
//         res.status(400).json({ message: "Token is not valid." });
//     }
// };

// export default verifyToken;
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
    id: string;
    role: string;
}

interface AuthRequest extends Request {
    user?: DecodedUser;
}

// Middleware to verify JWT token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token: string | undefined;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        req.user = decoded;
        console.log("Decoded user:", req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid." });
    }
};

// Middleware to check user roles
const authMiddleware = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Forbidden: You don't have permission" });
            return;
        }

        next();
    };
};

export { verifyToken, authMiddleware };
