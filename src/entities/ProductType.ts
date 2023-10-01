export type Product = {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};
