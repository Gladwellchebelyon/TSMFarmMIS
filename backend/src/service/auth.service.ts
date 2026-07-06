import prisma from "../lib/prisma";
import { LoginDTO, RegisterDTO } from "../types/auth.types";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const registerUser = async (data: RegisterDTO) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role as any,
      phone: data.phone,
    },
  });

  // Remove password before returning
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const loginUser = async (data: LoginDTO) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isPasswordValid = await comparePassword(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const token = generateToken(
    user.id,
    user.role
  );

  // Remove password before returning
  const { password, ...userWithoutPassword } = user;

  return {
    message: "Login successful.",
    token,
    user: userWithoutPassword,
  };
};
