import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          // Mock successful login
          let name = credentials.email.split("@")[0];
          // capitalize name nicely
          name = name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, " ");
          return { id: "user_1", name: name, email: credentials.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "secret_for_local_development_only_123"
});

export { handler as GET, handler as POST };
