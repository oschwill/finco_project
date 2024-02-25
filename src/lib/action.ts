'use server';

import { signIn, signOut } from './auth';

/*** LOGIN/LOGOUT START ***/
export const loginUser = async (previousState, formData: FormData): Promise<any> => {
  const { email, password } = Object.fromEntries(formData);

  try {
    const result = await signIn('credentials', {
      redirect: false, // Verhindert Weiterleitung und ermöglicht das Empfangen einer Antwort
      email,
      password,
    });

    if (result?.error) {
      return { error: result.error };
    }

    return {};
  } catch (error) {
    return { error: 'Wrong credentials' };
  }
};

export const handleGithubLogin = async () => {
  await signIn('github');
};

export const handleLogout = async () => {
  await signOut({ redirectTo: '/login' });
};
/*** LOGIN/LOGOUT END ***/
