export const formatErrorMessage = (errorMessage: string): string => {
  // Entferne Gänsefüßchen aus dem String
  let formattedMessage = errorMessage.replace(/"/g, '');
  let firstLetter = formattedMessage.charAt(0).toLocaleUpperCase();
  let remainingMessage = formattedMessage.slice(1);

  return `${firstLetter}${remainingMessage}`;
};

export const checkCookieIfExists = (cookieName: string): boolean => {
  'use client';
  const cookies = document.cookie.split(';');

  // Durchlaufen aller Cookies
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // existiert der cookie Name?
    if (cookie.startsWith(cookieName + '=')) {
      return true;
    }
  }

  return false;
};

/* KREDIT KARTE CHECKEN  */
const isValidCreditCardNumber = (value: string): boolean => {
  const num = value.replace(/\D/g, '');

  let sum = 0;
  let shouldDouble = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const generateRandomPassword = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#';
  let password = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters.charAt(index);
  }
  return password;
};
