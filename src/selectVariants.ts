export type Variant = {
  text: string;
  isActive: boolean;
  id: number;
};

export const selectVariants: Variant[] = [
  {
    text: "Less then 2000$",
    isActive: false,
    id: 0
  },
  {
    text: "From  2001$ to 3000$",
    isActive: false,
    id: 1
  },
  {
    text: "From 3001$ to 4000$",
    isActive: false,
    id: 2
  },
  {
    text: "From 4001$ to 5000$",
    isActive: true,
    id: 3
  },
];