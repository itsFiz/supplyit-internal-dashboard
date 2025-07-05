import NextAuth from "next-auth";
import { Role } from "@/lib/rbac";

declare module "next-auth" {
  interface User {
    role?: Role;
    id?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    id?: string;
  }
} 