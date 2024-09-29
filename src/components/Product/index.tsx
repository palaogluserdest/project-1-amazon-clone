// eslint-disable-next-line
import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';
import { FC, useState } from 'react';
import { ProductsProps } from '../../types/types';

const Product: FC<ProductsProps> = ({ title, rating, price, image }) => {
  const [ratingStar, setRatingStar] = useState<number | undefined>(rating.rate);

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStar(newRating);
  };

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.productItem}>
          <h2 className={styles.productTitle}>{title}</h2>
          <span className={styles.productPrice}>${price}</span>
          <div className={styles.productRating}>
            <ReactStars
              value={ratingStar}
              count={5}
              onChange={handleStarRatingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <button className={styles.productButton}>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default Product;
