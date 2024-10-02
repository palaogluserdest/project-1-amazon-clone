import styles from './styles.module.scss';
import CheckoutProduct from '../CheckoutProduct';
import { useContext } from 'react';
import { StateContext } from '../../provider/StateProvider';

const CheckoutComponent = () => {
  const { stateBasket, itemCountCalculator, priceCalculator } = useContext(StateContext);

  const totalCount = itemCountCalculator();
  const totalPrice = priceCalculator();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.ads}>
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt="ads"
            className={styles.adsImg}
          />
        </div>
        <div className={styles.checkout}>
          <h1 className={styles.checkoutTitle}>Your Shopping Basket</h1>
          <div className={styles.checkoutWrapper}>
            <div className={styles.checkoutItems}>
              {stateBasket.map((basketItem) => (
                <CheckoutProduct key={basketItem.id} {...basketItem} />
              ))}
            </div>
            <div className={styles.checkoutSummary}>
              <h2 className={styles.summaryTitle}>Summary</h2>
              <div className={styles.summaryItems}>
                <span className={styles.summary}>
                  Subtotal({totalCount} items):{' '}
                  <strong>
                    <small>$</small>
                    {totalPrice.toFixed(2)}
                  </strong>
                </span>
                <div className={styles.summaryCheckboxGroup}>
                  <input id="summaryCb" type="checkbox" />
                  <label htmlFor="summaryCb">This order contains a gift</label>
                </div>
                <button className={styles.summaryButton}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;
