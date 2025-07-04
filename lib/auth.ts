import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Commented out for credentials provider
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 Auth attempt:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          console.log('👤 User found:', user ? 'Yes' : 'No');

          if (!user || !user.password) {
            console.log('❌ User not found or no password');
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log('🔑 Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('❌ Invalid password');
            return null;
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          console.log('✅ Auth successful for:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error('🚨 Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful sign in, redirect to dashboard
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      // Allows relative callback URLs
      else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || (() => {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET is required in production. Please set this environment variable.");
    }
    console.warn("⚠️  NEXTAUTH_SECRET not set. Using development secret. Set this for production.");
    return "dev-secret-key-change-in-production";
  })(),
}; 