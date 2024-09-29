import styles from './styles.module.scss';
import BasketIcon from '../../assets/icons/basket.svg?react';
import StoreLogo from '../../assets/icons/store.svg?react';
import SearchIcon from '../../assets/icons/search.svg?react';
import HamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg?react';
import { useEffect, useState } from 'react';
import MobilNavBar from '../MobilNavbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <StoreLogo className={styles.logoImg} width={40} height={40} />
          </Link>
          <h2 className={styles.logoTitle}>eShop</h2>
        </div>
        <div className={styles.search}>
          <input className={styles.searchInput} />
          <SearchIcon className={styles.searchIcon} width={30} height={30} />
        </div>
        <div className={styles.nav}>
          {windowSize > 648 && (
            <>
              <div className={styles.navItem}>
                <span className={styles.upLine}>Hello Guest</span>
                <span className={styles.downLine}>Sign In</span>
              </div>
              <div className={styles.navItem}>
                <span className={styles.upLine}>Your</span>
                <span className={styles.downLine}>Shop</span>
              </div>
              <div className={styles.navItem}>
                <Link to="/checkout" className={styles.navItemLink}>
                  <BasketIcon className={styles.basketIcon} width={30} height={50} />
                  <span className={`${styles.downLine} ${styles.basketCount}`}>0</span>
                </Link>
              </div>
            </>
          )}
          <div className={styles.hamburgerMenu}>
            {windowSize <= 648 && (
              <HamburgerMenuIcon width={40} height={40} onClick={handleHamburgerMenu} />
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && windowSize <= 648 && <MobilNavBar />}
    </>
  );
};

export default Navbar;
