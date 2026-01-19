import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(15, "Username must be at most 15 characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
      .string()
      .min(1, "password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&#^]/, "Must contain at least one special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(15, "Username must be at most 15 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*?&#^]/, "Must contain at least one special character"),
});
