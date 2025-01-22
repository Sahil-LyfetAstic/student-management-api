import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

const generateToken = (payload: { id: string; role: string }): string => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}` ,{ expiresIn: '1h' });
  return token;
};


const verifyToken = (token: string): DecodedToken => {
  try {
    return jwt.verify(token, `${process.env.JWT_SECRET}`) as DecodedToken;
  } catch (error: any) {
    console.error("Token Verification Error:", error.message);
    throw new Error("Invalid token");
  }
};

export { generateToken, verifyToken };