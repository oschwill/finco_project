'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { formatErrorMessage } from './functionHelper';
import { addTransactionSchema, registerAccountSchema } from './validate';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';
import { handleGithubLogin } from './action';

export const registerUserForm = async (previousState, formData: FormData) => {
  const formObject = Object.fromEntries(formData.entries());
  const { name, email, password, passwordRepeat, terms } = formObject;

  const filteredObject = { name, email, password, passwordRepeat, terms };
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

  if (!response.ok) {
    const data = await response.json();

    if (data.email) {
      return {
        error: {
          type: 'email',
          message: 'This Email Address is not available',
        },
      };
    }

    return {
      error: {
        type: 'any',
        message: 'There went something wrong',
      },
    };
  }

  redirect('/register/setupAccount');
};

export const completeRegister = async (
  event: React.FormEvent<HTMLFormElement>,
  route: AppRouterInstance
) => {
  const formData = new FormData(event.currentTarget);
  const cardNumber = formData.get('cardNumber') as string | null;

  if (!cardNumber) {
    return { isValid: false, message: 'Please fill in your Cardnumber' };
  }

  // Wir holen uns die CookieDaten
  const cookieData = await getCookieData();

  if (!cookieData) {
    // Wenn cookie abgelaufen oder nicht angelegt wurde leiten wir um auf die erste register page
    route.push('/register');
    return { isValid: true, message: null };
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
    credentials: 'include',
  });

  if (response.ok) {
    // Weiterleiten auf die Login Seite
    route.push('/login?registered=true');
    return { isValid: true, message: null };
  }

  return { isValid: false, message: 'an unexpected error occurred' };
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

export const addTransaction = async (previousState, formData: FormData) => {
  const formObject = Object.fromEntries(formData.entries());

  // formObject validieren
  const { value, error } = addTransactionSchema.validate(formObject);

  if (error) {
    return {
      error: {
        type: error?.details[0]?.path[0],
        message: formatErrorMessage(error.details[0].message),
      },
    };
  }

  const result = await Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, add Transaction',
    customClass: {
      confirmButton: 'sweet-button confirm-button-class',
      cancelButton: 'sweet-button cancel-button-class',
    },
  });

  if (result.isConfirmed) {
    // Api Anfrage und Daten speichern!
    const response = await fetch(`/api/transaction`, {
      method: 'POST',
      body: JSON.stringify(value),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Created!',
        text: 'Your transaction has been created successfully',
        icon: 'success',
      });

      // nach success Formdaten clearn
      return {
        success: {
          type: 'success',
        },
      };
    }

    // Wenn ein Fehler auftritt
    Swal.fire({
      title: 'Error!',
      text: 'Your transaction could not be created successfully',
      icon: 'error',
    });

    return {
      error: {
        message: 'Your transaction could not be created successfully',
      },
    };
  }
};

export const changeCreditCardNumber = async (
  creditCardNumber: string,
  userId: number,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (creditCardNumber) {
    const data = {
      userId: userId,
      creditCardNumber: creditCardNumber,
    };

    const response = await fetch(`/api/register`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Neu einloggen
      handleGithubLogin();
      return;
    }

    setError(true);
  }
};
