// // import { Request, Response, NextFunction } from "express";

// // interface AuthenticatedRequest extends Request {
// //     user?: {
// //         role: string;
// //     };
// // }

// // const authorizeRoles = (...allowedRoles: string[]) => {
// //     return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //         if (!req.user || !allowedRoles.includes(req.user.role)) {
// //             return res.status(403).json({ message: "Access denied" });
// //         }
// //         next();
// //     };
// // };

// // export default authorizeRoles;
// import { Request, Response, NextFunction } from "express";

// interface AuthenticatedRequest extends Request {
//     user?: {
//         id: string;  // Ensure 'id' is included
//         role: string;
//     };
// }

// const authorizeRoles = (...allowedRoles: string[]) => {
//     return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//         if (!req.user || !allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Access denied" });
//         }
//         next();
//     };
// };

// export default authorizeRoles;
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;  // Ensuring 'id' is included
        role: string;
    };
}

const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
};

export default authorizeRoles;
