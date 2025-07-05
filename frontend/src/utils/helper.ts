export const calculateZakah = (amount: number): number => {
  const sanitizedAmount = Math.ceil(amount * 100) / 100;
  return Math.ceil(sanitizedAmount * 2.5) / 100;
};
