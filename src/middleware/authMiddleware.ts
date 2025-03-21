import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/JwtUtil";

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

const authMiddleware = (roles: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    try {
      const decoded = verifyToken(token);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authMiddleware;
