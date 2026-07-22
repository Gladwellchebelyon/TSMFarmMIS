import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";

console.log("JWT_SECRET =", JWT_SECRET);

export const generateToken = (
  userId: number,
  role: string
): string => {
  const payload = {
    id: userId,
    role,
  };

  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
