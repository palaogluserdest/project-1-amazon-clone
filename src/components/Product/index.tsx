// eslint-disable-next-line
import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';
import { FC, useContext, useState } from 'react';
import { ProductsProps } from '../../types/types';
import { StateContext } from '../../provider/StateProvider';

type ProductCardProps = {
  product: ProductsProps;
};

const Product: FC<ProductCardProps> = ({ product }) => {
  const [ratingStar, setRatingStar] = useState<number | undefined>(product.rating.rate);
  const { addToBasket } = useContext(StateContext);

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStar(newRating);
  };

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.productItem}>
          <h2 className={styles.productTitle}>{product.title}</h2>
          <span className={styles.productPrice}>${product.price}</span>
          <div className={styles.productRating}>
            <ReactStars
              value={ratingStar}
              count={5}
              onChange={handleStarRatingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <div className={styles.productBtnGroup}>
            <button className={styles.productDetailButton}>Go to Detail</button>
            <button className={styles.productButton} onClick={handleAddToBasket}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
