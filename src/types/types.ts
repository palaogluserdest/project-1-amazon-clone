export type ProductsProps = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating: {
    rate?: number;
    count?: number;
  };
};
