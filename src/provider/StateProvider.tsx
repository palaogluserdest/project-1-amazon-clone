import { createContext, FC, useEffect, useState } from 'react';
import { ProductsProps } from '../types/types';

type StateContextProps = {
  products: ProductsProps[];
  stateBasket: BasketProductsProps[];
  addToBasket: (products: ProductsProps) => void;
  removeFromBasket: (productId: number) => void;
  removeAllProducts: () => void;
  itemCountCalculator: () => number;
  priceCalculator: () => number;
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

interface BasketProductsProps extends ProductsProps {
  quantity: number;
}

const StateContext = createContext<StateContextProps>({
  products: [],
  stateBasket: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  removeAllProducts: () => {},
  itemCountCalculator: () => 0,
  priceCalculator: () => 0,
});

const StateContextProvider: FC<StateContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [stateBasket, setStateBasket] = useState<BasketProductsProps[]>([]);

  // * Add Product to basket
  const addToBasket = (product: ProductsProps) => {
    setStateBasket((prevItems) => {
      const isProductInBasket = prevItems.find((item) => item.id === product.id);
      if (isProductInBasket) {
        return prevItems.map((item) => {
          return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // * Remove Product to Basket
  const removeFromBasket = (productId: number) => {
    setStateBasket((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  //  * Remove all Products
  const removeAllProducts = () => {
    setStateBasket([]);
  };

  const itemCountCalculator = (): number => {
    const itemsCount = stateBasket.map((item) => item.quantity);

    let itemsTotalCount = 0;

    itemsCount.forEach((item) => (itemsTotalCount += item));

    return itemsTotalCount;
  };

  const priceCalculator = (): number => {
    const itemsPrice = stateBasket.map((item) => item.price * item.quantity);
    let totalPrice = 0;
    itemsPrice.forEach((item) => (totalPrice += item));

    return totalPrice;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data: ProductsProps[] = await result.json();

      setProducts(data);
    };

    fetchProducts();
  });

  const value = {
    products,
    stateBasket,
    addToBasket,
    removeFromBasket,
    removeAllProducts,
    itemCountCalculator,
    priceCalculator,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export { StateContext, StateContextProvider };
