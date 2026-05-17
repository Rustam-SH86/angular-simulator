interface IUser {
  name: string;
  surname?: string;
  age: number;
  isMarried: boolean;
};

interface IVipUser extends IUser {
  bankAccount: number;
  bisnessStatus: string;
};

let appStatus: 'loading' | 'success' | 'error';
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

export function sumOfNumbers(a: number, b: number): number {
  return a + b;
};

export function getFormatedText(
  text: string,
  format: 'uppercase' | 'lowercase' | 'capitalize',
): string {
  switch (format) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  };
};

export function removeSymbol(text: string, symbol: string): string {
  return text.replaceAll(symbol, '');
};

const arrayOfUsers: IUser[] = [
  { name: 'Alex', surname: 'Ivanov', age: 35, isMarried: true },
  { name: 'Stiv', age: 55, isMarried: true },
  { name: 'Inna', surname: 'Vlasova', age: 22, isMarried: false },
];

const marriedUsers = arrayOfUsers.filter((user) => user.isMarried === true);
