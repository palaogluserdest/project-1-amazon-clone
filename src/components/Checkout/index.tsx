import styles from './styles.module.scss';
import CheckoutProduct from '../CheckoutProduct';

const CheckoutComponent = () => {
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
              <CheckoutProduct />
              <CheckoutProduct />
            </div>
            <div className={styles.checkoutSummary}>
              <h2 className={styles.summaryTitle}>Summary</h2>
              <div className={styles.summaryItems}>
                <span className={styles.summary}>
                  Subtotal(2 items):{' '}
                  <strong>
                    <small>$</small>23,92
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
