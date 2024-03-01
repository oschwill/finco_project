import { checkCookieIfExists } from './functionHelper';

export const authConfig = {
  // Weiterleitung an die login falls nicht authorisiert
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.credit_card = user.credit_card;
        // evnetuell noch weitere Parameter für admin roles etc...
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.credit_card = token.credit_card;
      }
      return session;
    },
    async authorized({ auth, request }) {
      // Hier geben wir an welche Authorisierung/Authentifizierung der User hat wenn er bestimmte Seiten besucht
      const user = auth?.user;
      /* LOGIN SITES */
      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');
      /*REGISTER SITES */
      const isOnSetUpAccountPage = request.nextUrl?.pathname.startsWith('/register/setupAccount');
      const isOnRegisterPage = request.nextUrl?.pathname.startsWith('/register');
      /* MAIN SITES */
      const isOnAccountPage = request.nextUrl?.pathname.startsWith('/account');
      const isOnHomePage = request.nextUrl?.pathname.startsWith('/home');
      const isOnReportsPage = request.nextUrl?.pathname.startsWith('/reports');
      const isOnTransactionPage = request.nextUrl?.pathname.startsWith('/transaction');

      /* Hier kommt die Berechtigung für alle Seiten nach dem Login noch rein */
      if (
        (isOnAccountPage && !user) ||
        (isOnHomePage && !user) ||
        (isOnReportsPage && !user) ||
        (isOnTransactionPage && !user)
      ) {
        return false;
      }

      // wenn eingeloggt dann leiten wir auf die hauptseite um /home
      if ((isOnLoginPage && user) || (isOnSetUpAccountPage && user) || (isOnRegisterPage && user)) {
        return Response.redirect(new URL('/home', request.nextUrl));
      }

      return true;
    },
  },
};
