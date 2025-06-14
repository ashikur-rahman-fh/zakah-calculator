export const Amount = ({ amount, fontColor } : { amount : number, fontColor: string }) => {
  return <span className={`bg-white/20 rounded-md ${fontColor}`}>{amount.toString().padStart(6, ' ')}$</span>;
};
