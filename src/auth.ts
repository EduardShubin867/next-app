import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongodb from '@/app/lib/mongodb';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string(), password: z.string().min(2) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const db = await mongodb();
                    const user = await db.collection('users').findOne({ username });
                    if (!user) return null;

                    if (user && user.password === credentials.password) {
                        return {
                            id: user._id.toString(),
                            name: user.username,
                        };
                    } else {
                        return null;
                    }
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && typeof token.id === 'string') {
                session.user.id = token.id;
                session.user.name = token.name;
            }
            return session;
        },
    },
});
