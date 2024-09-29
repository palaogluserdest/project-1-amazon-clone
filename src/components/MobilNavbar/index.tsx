import styles from './styles.module.scss';
import BasketIcon from '../../assets/icons/basket.svg?react';

const MobilNavBar = () => {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <span className={styles.upLine}>Hello Guest,</span>
            <span className={styles.downLine}>Sign In</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.upLine}>Your</span>
            <span className={styles.downLine}>Shop</span>
          </li>
          <li className={styles.navItem}>
            <BasketIcon className={styles.basketIcon} width={20} height={20} />
            <span className={`${styles.downLine} ${styles.basketCount}`}>0</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobilNavBar;
