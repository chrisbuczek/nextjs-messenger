import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { prisma } from '@/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    // Credentials({
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     email: { label: 'email', type: 'text' },
    //     password: { label: 'password', type: 'password' },
    //   },
    //   authorize: async (credentials) => {
    //     let user = null;

    //     // logic to salt and hash password
    //     const hashedPassword = await bcrypt.hash(
    //       credentials.password as string,
    //       12,
    //     );

    //     // logic to verify if the user exists
    //     user = await prisma.user.findFirst({
    //       where: {
    //         email: credentials.email as string,
    //       },
    //     });

    //     if (!user || user.hashedPassword === null) {
    //       // No user found, so this is their first attempt to login
    //       // Optionally, this is also the place you could do a user registration
    //       throw new Error('Invalid credentials.');
    //     }

    //     const isCorrectPassword = await bcrypt.compare(
    //       hashedPassword,
    //       user.hashedPassword,
    //     );

    //     if (!isCorrectPassword) {
    //       throw new Error('Invalid credentials.');
    //     }

    //     // return user object with their profile data
    //     return user;
    //   },
    // }),
  ],
  debug: true,
});
