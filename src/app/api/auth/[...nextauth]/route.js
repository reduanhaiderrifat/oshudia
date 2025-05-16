import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDocs, collection } from "firebase/firestore"; 
import { db } from "@/lib/firebaseConfig"; 

export const authOptions = {
  secret: process.env.TOKEN_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2* 365 * 24 * 60 * 60, // 2 years
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) return null;

          const usersRef = collection(db, "users");
          const snapshot = await getDocs(usersRef);

          let matchedUser = null;

          snapshot.forEach((doc) => {
            const user = doc.data();
            if (user.email === email) {
              matchedUser = user;
            }
          });

          if (!matchedUser) return null;

          const isPasswordValid = await bcrypt.compare(
            password,
            matchedUser.password
          );
          if (!isPasswordValid) return null;

          return { email: matchedUser.email, role: matchedUser.role,name:matchedUser.name };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {

        token.email = user.email;
        token.role = user.role;
        token.name=user.name;
        
      }
      return token; // Add user data to JWT token
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name=token.name;
    

      return session; // Attach user data to session
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
