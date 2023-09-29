export type Product = {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};
