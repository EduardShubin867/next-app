import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import z from 'zod';
import { mongodb } from '@/app/lib/mongodb';

export const authOption = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'your username' },
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
};

export const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
