import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsProps, UserProps } from '../../types/types';
import styles from './styles.module.scss';
import ReactStars from 'react-rating-stars-component';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFS } from '../../utils/user';
import { auth } from '../../../firebase';

type RouteParams = {
  productId: string;
};

const ProductDetail: FC = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const { productId } = useParams<RouteParams>();
  const [product, setProduct] = useState<ProductsProps>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [ratingStar, setRatingStar] = useState<number | undefined>();

  const handleStarRatingChanged = (newRating: number) => {
    setRatingStar(newRating);
  };

  useEffect(() => {
    const getProductFetcher = async (id: string) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        const data = await response.json();

        setProduct(data);
        setRatingStar(data.rating.rate);
      } catch (error: any) {
        setErrorMessage('Ürün bulanamadı');
      }
    };

    productId && getProductFetcher(productId);
  }, []);

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
      {product && (
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={product.image} alt={product.title} className={styles.productImg} />
          </div>
          <div className={styles.content}>
            <div className={styles.stars}>
              <ReactStars
                value={ratingStar}
                count={5}
                onChange={handleStarRatingChanged}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
            </div>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>
            <span className={styles.category}>Categories: {product.category}</span>
            <span className={styles.price}>
              <small>$</small>
              {product.price}
            </span>
            {userData?.isAuth && <button className={styles.addBtn}>Add to Basket</button>}
            {!userData?.isAuth && <p>Ürünü alabilmek için giriş yapın lütfen</p>}
          </div>
        </div>
      )}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </>
  );
};

export default ProductDetail;
