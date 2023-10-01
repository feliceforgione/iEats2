export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: object[];
  status: string;
  createdAt: Date;
  intent_id?: String;
};
