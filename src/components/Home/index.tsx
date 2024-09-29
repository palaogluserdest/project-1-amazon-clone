import { useEffect, useState } from 'react';
import Product from '../Product';
import styles from './styles.module.scss';
import { ProductsProps } from '../../types/types';

const HomeComponent = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data: ProductsProps[] = await result.json();

      setProducts(data);
    };

    fetchProducts();
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <img
            src="src/assets/images/ecommerce-hero-img.jpg"
            alt="ecommerce hero image"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.productsWrapper}>
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
