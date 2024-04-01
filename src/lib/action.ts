'use server';

import { auth, signIn, signOut } from './auth';
import prisma from './db';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import {
  addLeadingZero,
  generateRandomPassword,
  groupedTransactions,
  validateEmail,
} from './functionHelper';
import { sendDynamicEmail } from './nodeMailer';
/* DATA TYPES */
import {
  IncomeOutcomeResult,
  GroupedTransaction,
  StartCurrentCapitalResult,
  TransactionStatistic,
  CharDataPoint,
} from './dataTypes';
import { dynamicRegisterSchema, validateData } from './validate';

/*** LOGIN/LOGOUT START ***/
export const loginUser = async (previousState: undefined, formData: FormData): Promise<any> => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', {
      email,
      password,
    });

    return {};
  } catch (error) {
    if (error.type && error.type.includes('CredentialsSignin')) {
      return { error: 'Invalid username or password' };
    }

    throw error;
  }
};

export const handleGithubLogin = async () => {
  await signIn('github');
};

export const handleGoogleLogin = async () => {
  await signIn('google');
};

export const handleLogout = async () => {
  await signOut({ redirectTo: '/login' });
};
/*** LOGIN/LOGOUT END ***/

/*** FORGOT PASSWORD START ***/
export const forgotPassword = async (previousState: undefined, formData: FormData) => {
  const email = formData.get('email') as string | null;

  if (!email) {
    return {
      error: 'Please fill in you Email Address',
    };
  }

  // Email kurz checken
  if (!validateEmail(email)) {
    return {
      error: 'No valid email-Address',
    };
  }

  try {
    // Neues Password generieren und als temp Password abspeichern
    const tempPassword = generateRandomPassword(8);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);
    // password in die db schreiben
    const updateData = await prisma.user.update({
      where: {
        email,
      },
      data: {
        temp_password: hashedPassword,
        created_temp_password: new Date(),
      },
    });

    if (!updateData) {
      return {
        hasSend: true,
      };
    }

    // Email Template einlesen und versenden
    let htmlTemplate = await fs.readFile(
      `${process.env.EMAIL_TEMPLATE_PATH}/forgotPassword.html`,
      'utf8'
    );

    // Wir tauschen die placeholder aus
    htmlTemplate = htmlTemplate.replace('%username%', updateData.name);
    htmlTemplate = htmlTemplate.replace('%password%', tempPassword);

    const hasSend = await sendDynamicEmail({
      email: updateData.email,
      subject: 'Password Reset',
      text: htmlTemplate,
      html: htmlTemplate,
    });

    if (!hasSend) {
      throw new Error();
    }

    return {
      hasSend: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Error sending',
    };
  }
};
/*** FORGOT PASSWORD END ***/

/*** VERIFY USER START ***/
export const checkSlug = async (token: String, email: String) => {
  'use server';

  let hasData: any;

  try {
    // Abfrage ob token und email exitiert sonst redirect
    hasData = await prisma.user.findUnique({
      where: {
        email: email as string,
        register_token: token as string,
      },
    });

    return hasData;
  } catch (error) {
    console.log('ERROR', error);
    return null;
  }
};

export const checkVerify = async (previousState: undefined, formData: FormData) => {
  const userResult = Number(formData.get('captcha'));
  const serverResult = Number(formData.get('result'));
  const token = formData.get('token');
  const email = formData.get('email');

  if (userResult !== serverResult) {
    return {
      error: 'wrong result',
    };
  }

  // Verify Status auf true setten
  try {
    const updateUser = await prisma.user.update({
      where: {
        email: email as string,
        register_token: token as string,
      },
      data: {
        register_token: null,
        is_verified: true,
      },
    });

    console.log(updateUser);

    if (updateUser) {
      return {
        success: true,
      };
    }

    throw new Error();
  } catch (error) {
    console.log(error);
    return {
      error: 'an unexpected error occurred',
    };
  }
};
/*** VERIFY USER END ***/
/*** TRANSACTIONS START ***/
export const getIncomeOutcomeByUser = async (userId: number): Promise<IncomeOutcomeResult> => {
  try {
    // Holen uns die Summe aus alle Incomes
    const incomeSum = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: Number(userId),
        transaction_type: 'income',
      },
    });

    // Holen uns die Summe aus alle Expenses
    const expenseSum = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: Number(userId),
        transaction_type: 'expense',
      },
    });

    const result: IncomeOutcomeResult = {
      incomeSum: Number(incomeSum._sum.amount) || 0,
      expenseSum: Number(expenseSum._sum.amount) || 0,
    };

    return result;
  } catch (error) {
    return null;
  }
};

export const getStartCurrentCapitalByUser = async (
  userId: number
): Promise<StartCurrentCapitalResult> => {
  try {
    // Holen uns die Summe aus alle Incomes
    const capitalData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        start_capital: true,
        total_capital: true,
      },
    });

    const result: StartCurrentCapitalResult = {
      startCapital: Number(capitalData.start_capital) || 0,
      currentCapital: Number(capitalData.total_capital) || 0,
    };

    return result;
  } catch (error) {
    return null;
  }
};

export const getAllTransactions = async (userId: number): Promise<GroupedTransaction[]> => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const convertedTransactions = transactions.map((item) => ({
      ...item,
      amount: item.amount.toNumber(),
    }));
    const transactionByDate = groupedTransactions(convertedTransactions);

    return transactionByDate;
  } catch (error) {
    console.log(error);
  }
};

export const searchTransactionByValue = async (
  userId: number,
  input?: string,
  date?: Date
): Promise<GroupedTransaction[]> => {
  try {
    if (input) {
      const transactions = await prisma.transaction.findMany({
        where: {
          user_id: userId,
          category: {
            contains: input,
          },
        },
      });

      const convertedTransactions = transactions.map((item) => ({
        ...item,
        amount: item.amount.toNumber(),
      }));

      return [{ headDay: null, headLine: input, data: convertedTransactions }];
    }

    if (date) {
      // Wir splitten das Date zunächst einmal auf
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const day = date.getDate();

      // Wir erzeugen StartDate und EndDate
      const startDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, day + 1, 0, 0, 0));

      const transactions = await prisma.transaction.findMany({
        where: {
          user_id: userId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      const convertedTransactions = transactions.map((item) => ({
        ...item,
        amount: item.amount.toNumber(),
      }));

      const outputDate = `${year}/${addLeadingZero(month)}/${addLeadingZero(day)}`;

      return [{ headDay: null, headLine: outputDate, data: convertedTransactions }];
    }
  } catch (error) {
    console.log(error);
  }
};
/*** TRANSACTIONS END ***/
/*** REPORTS START ***/
export const getReportStatistics = async (userId: number): Promise<TransactionStatistic> => {
  try {
    // Anzahl aller Transaktionen
    const totalTransactions = await prisma.transaction.count({
      where: { user_id: userId },
    });

    // Anzahl aller income Transaktionen
    const incomeTransactions = await prisma.transaction.count({
      where: {
        user_id: userId,
        transaction_type: 'income',
      },
    });

    // Anzahl aller expense Transaktionen
    const expenseTransactions = await prisma.transaction.count({
      where: {
        user_id: userId,
        transaction_type: 'expense',
      },
    });

    // Datum der ersten Transaktion
    const firstTransactionDate = await prisma.transaction.findFirst({
      where: { user_id: userId },
      orderBy: { date: 'asc' },
      select: { date: true },
    });

    // Datum der letzten Transaktion
    const lastTransactionDate = await prisma.transaction.findFirst({
      where: { user_id: userId },
      orderBy: { date: 'desc' },
      select: { date: true },
    });

    // aktuelle Zeitzone
    const timeZone = await prisma.transaction.findFirst({
      where: { user_id: userId },
      select: { timezone: true },
    });

    // expense und income Wert holen
    const transValues = await getIncomeOutcomeByUser(userId);

    const result: TransactionStatistic = {
      totalTransactions: totalTransactions || 0,
      incomeTransactions: incomeTransactions || 0,
      expenseTransactions: expenseTransactions || 0,
      firstTransactionDate: firstTransactionDate ? firstTransactionDate.date : null,
      lastTransactionDate: lastTransactionDate ? lastTransactionDate.date : null,
      timeZone: timeZone ? timeZone.timezone : null,
      transValues: transValues,
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReportChartData = async (userId: number): Promise<CharDataPoint[]> => {
  try {
    // Holen uns das Startkapital
    const { start_capital } = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        start_capital: true,
      },
    });

    // Holen uns alle Incomes und Expenses
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
      select: {
        transaction_type: true,
        amount: true,
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Errechnen nun die Zwischensummen
    let runningTotal = Number(start_capital);
    const summarizedData: CharDataPoint[] = [];

    transactions.forEach((transaction) => {
      // Datum konvertieren 01/01/2024
      const formattedDate = transaction.date.toISOString().split('T')[0];

      // Summe aktualisieren
      if (transaction.transaction_type === 'income') {
        runningTotal += Number(transaction.amount);
      } else if (transaction.transaction_type === 'expense') {
        runningTotal -= Number(transaction.amount);
      }

      // Zwischensumme für das aktuelle Datum speichern
      summarizedData.push({ date: formattedDate, value: runningTotal });
    });

    return summarizedData;
  } catch (error) {
    console.log(error);
  }
};
/*** REPORTS END ***/

/*** USER START ***/
export const changeUserPassword = async (previousState: undefined, formData: FormData) => {
  const { oldPassword, newPassword, repeatNewPassword } = Object.fromEntries(formData);
  const { user } = await auth();
  const userId = (user as any).id;

  if (newPassword !== repeatNewPassword) {
    return {
      error: 'Password and repeated Password must be identical',
    };
  }

  if (oldPassword === newPassword) {
    return {
      error: 'Please choose another password',
    };
  }

  // formObject validieren
  const { value, error } = validateData(
    {
      password: newPassword,
      passwordRepeat: repeatNewPassword,
    },
    dynamicRegisterSchema
  );

  if (error) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }

  // old Password überprüfen
  try {
    // hole altes Password
    const query = await prisma.user.findUnique({
      where: {
        id: userId,
        account_type: 'finco',
      },
      select: {
        password: true,
      },
    });

    if (!query.password) {
      return {
        error: 'Something went wrong',
      };
    }

    const isPassword = await bcrypt.compare(oldPassword as string, query.password);

    // Checke ob altes Paawort korrekt ist
    if (!isPassword) {
      return {
        error: 'Something went wrong',
      };
    }

    // query für password change !!! => sollten danach direkt ausloggen? und eine email/oder token verschicken?
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword as string, salt);

    const updatePassword = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
        temp_password: null,
      },
    });

    if (updatePassword) {
      for (let key of formData.keys()) {
        formData.delete(key);
      }

      return {
        success: 'Your password has been successfully changed',
      };
    }

    throw new Error();
  } catch (error) {
    console.log(error);
    return {
      error: 'Something went wrong',
    };
  }
};
/*** USER END ***/
