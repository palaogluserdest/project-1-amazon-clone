import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';
import { useState } from 'react';

const CheckoutProduct = () => {
  const [ratingStars, setRatingStars] = useState<number>(0);

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStars(newRating);
  };
  return (
    <>
      <div className={styles.checkoutItem}>
        <div className={styles.checkoutItemImg}>
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt=""
            className={styles.image}
          />
        </div>
        <div className={styles.checkoutItemContent}>
          <h2 className={styles.title}>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h2>
          <span className={styles.price}>
            <small>$</small>109,95
          </span>
          <div className={styles.rating}>
            <ReactStars
              value={ratingStars}
              count={5}
              onChange={handleStarRatingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <button className={styles.checkoutButton}>Remove from Basket</button>
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
