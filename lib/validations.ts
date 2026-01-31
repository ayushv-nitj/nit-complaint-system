import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
  email: z.string().email().endsWith("@nitjsr.ac.in", "Must use NIT Jamshedpur email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  department: z.string().optional(),
  hostel: z.string().optional(),
})

export const complaintSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description is too long"),
  category: z.enum(["HOSTEL", "MESS", "ACADEMIC", "INTERNET_NETWORK", "INFRASTRUCTURE", "OTHERS"]),
  location: z.string().optional(),
})

export const remarkSchema = z.object({
  remarks: z.string().min(1, "Remark cannot be empty").max(500, "Remark is too long"),
})

export const statusUpdateSchema = z.object({
  status: z.enum(["CLAIMED", "IN_PROGRESS", "RESOLVED"]),
  remarks: z.string().min(1, "Remarks required for status update").max(500),
})