'use server';

import { signIn, signOut } from './auth';
import prisma from './db';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import { generateRandomPassword, groupedTransactions, validateEmail } from './functionHelper';
import { sendDynamicEmail } from './nodeMailer';
/* DATA TYPES */
import { IncomeOutcomeResult, GroupedTransaction, SearchedTransaction } from './dataTypes';

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
export const forgotPassword = async (previousState, formData: FormData) => {
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
  date?: string
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
      const transactions = await prisma.transaction.findMany({
        where: {
          user_id: userId,
        },
        orderBy: {
          date: 'desc',
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
/*** TRANSACTIONS END ***/
