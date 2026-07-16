import prisma from "../lib/prisma";
import { hashPassword } from "../utils/password";
import { RegisterDTO } from "../types/auth.types";
import { UserRole } from "../types/role";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

export const createUser = async (data: RegisterDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const allowedRoles = [
    UserRole.MANAGER,
    UserRole.SUPERVISOR,
    UserRole.ACCOUNTANT,
  ];

  if (!allowedRoles.includes(data.role as UserRole)) {
    throw new Error(
      "Invalid role. Only MANAGER, SUPERVISOR and ACCOUNTANT can be created."
    );
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role as UserRole,
      phone: data.phone,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const updateUser = async (
  id: number,
  data: Partial<RegisterDTO>
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullName: data.fullName,
      email: data.email,
      role: data.role as UserRole,
      phone: data.phone,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

export const toggleUserStatus = async (id: number) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: !existingUser.isActive,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};
