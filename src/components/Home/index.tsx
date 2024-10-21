import { useContext } from 'react';
import Product from '../Product';
import styles from './styles.module.scss';
import { StateContext } from '../../provider/StateProvider';

const HomeComponent = () => {
  const { products } = useContext(StateContext);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <img
            src="/src/assets/images/ecommerce-hero-img.jpg"
            alt="ecommerce hero image"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.productsWrapper}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
