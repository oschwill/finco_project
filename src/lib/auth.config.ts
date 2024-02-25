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

        // evnetuell noch weitere Parameter für admin roles etc...
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    authorized({ auth, request }) {
      console.log(request);
      // Hier geben wir an welche Authorisierung/Authentifizierung der User hat wenn er bestimmte Seiten besucht
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');
      const isOnSetUpAccountPage = request.nextUrl?.pathname.startsWith('/register/setupAccount');

      /* Hier kommt die Berechtigung für alle Seiten nach dem Login noch rein */
      // to be continued...

      // wenn eingeloggt dann leiten wir auf die hauptseite um /home
      if (isOnLoginPage && user) {
        return Response.redirect(new URL('/home', request.nextUrl));
      }

      // Wenn keine register Daten zur Verfügung stehen aber die setUpAccount Seite annavigiert wird, leiten wir weiter auf register
      // if (isOnSetUpAccountPage && !checkCookieIfExists('tmpRegister')) {
      //   return Response.redirect(new URL('/register', request.nextUrl));
      // }

      return true;
    },
  },
};
