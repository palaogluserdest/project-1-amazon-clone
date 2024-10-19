// eslint-disable-next-line
import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';
import { FC, useContext, useEffect, useState } from 'react';
import { ProductsProps, UserProps } from '../../types/types';
import { StateContext } from '../../provider/StateProvider';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFS } from '../../utils/user';

type ProductCardProps = {
  product: ProductsProps;
};

const Product: FC<ProductCardProps> = ({ product }) => {
  const [ratingStar, setRatingStar] = useState<number | undefined>(product.rating.rate);
  const { addToBasket } = useContext(StateContext);
  const [userData, setUserData] = useState<UserProps | null>(null);

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStar(newRating);
  };

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchUser = await getUserFromFS(user.uid);
        setUserData(fetchUser);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [userData]);

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
            <Link
              className={styles.productDetailButton}
              to={`/product/${product.id}`}
              target="_blank"
            >
              Go to Detail
            </Link>
            {userData?.isAuth && (
              <button className={styles.productButton} onClick={handleAddToBasket}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
