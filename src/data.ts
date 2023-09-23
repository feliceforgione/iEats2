type Product = {
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

type Products = Product[];

export const featuredProducts: Products = [
  {
    id: 1,
    title: "Margherita",
    description: "fresh mozzarella, tomato sauce, basil",
    img: "/images/food/margherita.png",
    price: 11,
    options: [
      {
        title: "Personal",
        additionalPrice: 0,
      },
      {
        title: "Large",
        additionalPrice: 7,
      },
    ],
  },
  {
    id: 2,
    title: "Classic",
    description: "regular mozzarella, tomato sauce",
    img: "/images/food/classicpizza.png",
    price: 11,
    options: [
      {
        title: "Personal",
        additionalPrice: 0,
      },
      {
        title: "Large",
        additionalPrice: 7,
      },
    ],
  },
  {
    id: 3,
    title: "Hot Honey",
    description:
      "soppressata, honey with habanero peppers, mozzarella, tomato sauce",
    img: "/images/food/hothoney.png",
    price: 16,
    options: [
      {
        title: "Personal",
        additionalPrice: 0,
      },
      {
        title: "Large",
        additionalPrice: 9,
      },
    ],
  },
];
