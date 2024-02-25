'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { formatErrorMessage } from './functionHelper';
import { registerAccountSchema } from './validate';
import { redirect } from 'next/navigation';

export const registerUserForm = async (previousState, formData: FormData) => {
  const formObject = Object.fromEntries(formData.entries());
  const { name, email, password, terms } = formObject;

  const filteredObject = { name, email, password, terms };
  // formObject validieren
  const { value, error } = registerAccountSchema.validate(filteredObject);

  if (error) {
    return {
      error: {
        type: error.details[0].path[0],
        message: formatErrorMessage(error.details[0].message),
      },
    };
  }

  // Wir erzeugen temporären cookie zur Zwischenspeicherung
  const response = await fetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify(value),
  });

  if (response.ok) {
    redirect('/register/setupAccount');
  }

  return {
    error: {
      type: 'any',
      message: 'There went something wrong',
    },
  };
};

export const completeRegister = async (
  event: React.FormEvent<HTMLFormElement>,
  route: AppRouterInstance
) => {
  const formData = new FormData(event.currentTarget);
  const cardNumber = formData.get('cardNumber') as string | null;

  if (!cardNumber) {
    return false;
  }

  // Wir holen uns die CookieDaten
  const cookieData = await getCookieData();

  if (!cookieData) {
    // Wenn cookie abgelaufen oder nicht angelegt wurde leiten wir um
    route.push('/register');
    return;
  }

  // Cookie Data an die formData anhängen
  Object.entries(cookieData).forEach(([key, value]) => {
    if (key !== 'terms' && typeof value === 'string') {
      formData.append(key, value);
    }
  });

  // Nun senden wir an die api
  const response = await fetch(`/api/register`, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    // Weiterleiten auf die Login Seite
    route.push('/login');
    return true;
  }

  return false;
};

export const getCookieData = async () => {
  // Wir holen uns die CookieDaten
  const response = await fetch(`/api/session`, {
    method: 'GET',
    credentials: 'include',
  });

  const userData = await response.json();

  return JSON.parse(userData.data);
};
