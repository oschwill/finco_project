import { MutableRefObject } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

/* DATA TYPES */
import { Transactions, GroupedTransaction } from './dataTypes';
import { getReportChartData } from './action';

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

export const maskCreditCardNumber = (creditCardNumber: string) => {
  const str = creditCardNumber.toString();

  const hiddenNumbers = str
    .slice(0, -4)
    .replace(/./g, '*')
    .replace(/(.{4})/g, '$1 ');

  const visibleNumbers = str.slice(-4);

  return {
    hiddenNumbers,
    visibleNumbers,
  };
};

export const lockFutureDays = (): { max: string } => {
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const time = today.toTimeString().split(' ')[0].substring(0, 5);
  const dateTimeAttributes = { max: `${date}T${time}` };

  return dateTimeAttributes;
};

export const groupedTransactions = (transactions: Transactions[]): GroupedTransaction[] => {
  return transactions.reduce((acc, transaction) => {
    // Datum extrahieren und als Key verwenden
    const transactionDate = reverseString(transaction.date.toISOString().split('T')[0]);
    const transactionDay = new Date(transaction.date).toLocaleString('en-US', { weekday: 'long' });

    // Überprüfen ob für dieses Datum bereits ein Eintrag existiert
    const existingGroup = acc.find(
      (group: GroupedTransaction) => group.headLine === transactionDate
    );

    if (existingGroup) {
      // Wenn ja füge die aktuelle Transaktion zu diesem Datum hinzu
      existingGroup.data.push(transaction);
    } else {
      // Wenn nein erstelle einen neuen Eintrag für dieses Datum
      acc.push({
        headDay: transactionDay,
        headLine: transactionDate,
        data: [transaction],
      });
    }

    return acc;
  }, []);
};

const reverseString = (str: string): string => {
  const reversedDateArray = str.split('-').reverse();

  const reversedDate = reversedDateArray.join('-');

  return reversedDate;
};

export const formatCustomDate = (date: Date, timeZone: string): string => {
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    timeZone,
    day: '2-digit',
    month: 'short', // ShortForm des Monats, June => jun
    year: 'numeric',
  });

  const timeFormat = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
  });

  // Formatieren des Datums und der Uhrzeit getrennt
  const formattedDate = dateFormat.format(date);
  const formattedTime = timeFormat.format(date);

  const result = `${formattedTime}, ${formattedDate}`;

  return result;
};

export const addLeadingZero = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

/* CHART FUNCTION */
export const buildChart = async (
  chartRef: MutableRefObject<Chart | null>,
  userId: number,
  chartType: string
) => {
  const data = await getReportChartData(userId);

  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  if (chartRef.current) {
    chartRef.current.destroy();
  }

  const configBar: ChartConfiguration = {
    type: chartType as 'bar' | 'line' | 'radar',
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: 'All Transactions',
          data: data.map((row) => row.value),
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    },
  };

  chartRef.current = new Chart(ctx, configBar);
};
