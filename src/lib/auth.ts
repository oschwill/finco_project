import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
import prisma from './db';

interface Credentials {
  email?: string;
  password?: string;
}

// normaler Login
const login = async (credentials: Credentials) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
        is_verified: true,
      },
    });

    if (!user) throw new Error('Wrong credentials');

    // Temp Password checken

    let isTempPassword = null;

    if (user.temp_password) {
      isTempPassword = await bcrypt.compare(credentials.password, user.temp_password);
    }

    const isPassword = await bcrypt.compare(credentials.password, user.password);

    if (isPassword || isTempPassword) {
      return user;
    }

    throw new Error('Wrong credentials');
  } catch (error) {
    console.log(error);
    throw new Error('Wrong credentials');
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          return user as any;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github' || account.provider === 'google') {
        // Hier schreiben wir später den User in die db, die von github oder google kommen
        try {
          const userData = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          });

          // Wenn der User nicht existiert legen wir den User mit den von Github mitgelieferten Daten an
          if (!userData) {
            await prisma.user.create({
              data: {
                name: profile.name as string,
                email: profile.email as string,
                image_profile_path: profile.avatar_url as string,
              },
            });
          } else {
            // Hängen wir die Creditcard Information an die session an / Später vielleicht noch mehr
            (user as any).credit_card = userData.credit_card as string;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
