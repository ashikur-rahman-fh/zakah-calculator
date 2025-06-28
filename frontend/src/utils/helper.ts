export const calculateZakah = (amount: number): number => {
  return Math.ceil(amount * 2.5) / 100;
};
