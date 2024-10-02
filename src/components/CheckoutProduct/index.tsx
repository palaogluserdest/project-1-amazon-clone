import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';
import { FC, useContext, useState } from 'react';
import { BasketItemProps } from '../../types/types';
import { StateContext } from '../../provider/StateProvider';

const CheckoutProduct: FC<BasketItemProps> = ({ id, title, image, price, rating, quantity }) => {
  const [ratingStars, setRatingStars] = useState<number | undefined>(rating.rate);
  const { removeFromBasket } = useContext(StateContext);

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStars(newRating);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(id);
  };

  return (
    <>
      <div className={styles.checkoutItem}>
        <div className={styles.checkoutItemImg}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.checkoutItemContent}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.price}>
            <small>$</small>
            {price} x ({quantity} items)
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
          <button className={styles.checkoutButton} onClick={handleRemoveFromBasket}>
            Remove from Basket
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
