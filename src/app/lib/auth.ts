import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const client = await MongoClient.connect(MONGODB_URI);
      const usersCollection = client.db('krasnoebedstvie').collection('users');

      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        await usersCollection.insertOne({
          name: user.name,
          email: user.email,
          role: 'user',
        });
      }
      await client.close();
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
      } else {
        const client = await MongoClient.connect(MONGODB_URI);
        const usersCollection = client
          .db('krasnoebedstvie')
          .collection('users');
        const existingUser = await usersCollection.findOne({
          email: token.email,
        });
        token.role = existingUser?.role || 'user';
        await client.close();
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
