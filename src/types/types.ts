import { Timestamp } from 'firebase/firestore';

export type ProductsProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export interface BasketItemProps extends ProductsProps {
  quantity?: number;
}

// # User Types

export type UserProps = {
  uid: string;
  email: string;
  name: string;
  isAuth: boolean;
  createdAt: Timestamp;
};
