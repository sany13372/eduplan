export const isValidINN = (inn: string) : boolean => {
  const getN = (index: number) : number => (parseInt(inn[index]));
  if (inn.length === 12) {
    const digit11 = ((
      7 * getN(0) + 2 * getN(1) + 4 * getN(2) +
      10 * getN(3) + 3 * getN(4) + 5 * getN(5) +
      9 * getN(6) + 4 * getN(7) + 6 * getN(8) +
      8 * getN(9)) % 11) % 10;

    const digit12 = ((
      3 * getN(0) + 7 * getN(1) + 2 * getN(2) +
      4 * getN(3) + 10 * getN(4) + 3 * getN(5) +
      5 * getN(6) + 9 * getN(7) + 4 * getN(8) +
      6 * getN(9) + 8 * getN(10)) % 11) % 10;

    return (getN(10) === digit11 && getN(11) === digit12);
  }

  if (inn.length === 10) {
    const dgt10 = ((
      2 * getN(0) + 4 * getN(1) + 10 * getN(2) +
      3 * getN(3) + 5 * getN(4) + 9 * getN(5) +
      4 * getN(6) + 6 * getN(7) + 8 * getN(8)
    ) % 11) % 10;
    return (getN(9) === dgt10);
  }

  return false;
}

export const isValidSNILS = (snils: string) => {
  if (snils.length !== 11) return false;

  const basePart = snils.substring(0, 9);
  const checkSum = parseInt(snils.substring(9, 11), 10);

  const resultByBasePart = [...basePart]
    .map(stringDigit => parseInt(stringDigit, 10))
    .reverse()
    .reduce((acc, current, idx) => (acc + current * (idx + 1)), 0);

  if (resultByBasePart < 100 && resultByBasePart === checkSum) return true;
  if (resultByBasePart === 100 && checkSum === 0) return true;

  const divisionReminder = resultByBasePart % 101;

  if (divisionReminder === 100 && checkSum === 0) return true;

  return divisionReminder === checkSum;
};