import styles from './styles.module.scss';
import BasketIcon from '../../assets/icons/basket.svg?react';
import StoreLogo from '../../assets/icons/store.svg?react';
import SearchIcon from '../../assets/icons/search.svg?react';
import HamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg?react';
import { useContext, useEffect, useState } from 'react';
import MobilNavBar from '../MobilNavbar';
import { Link } from 'react-router-dom';
import { StateContext } from '../../provider/StateProvider';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFS, logOutUser } from '../../utils/user';
import { UserProps } from '../../types/types';

const Navbar = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { itemCountCalculator } = useContext(StateContext);

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const totalItems = itemCountCalculator();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchUserData = await getUserFromFS(user.uid);
        if (fetchUserData) {
          setUserData(fetchUserData);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [userData]);

  return (
    <>
      <div className={styles.navbar}>
        <Link to="/">
          <div className={styles.logo}>
            <StoreLogo className={styles.logoImg} width={40} height={40} />
            <h2 className={styles.logoTitle}>eShop</h2>
          </div>
        </Link>
        <div className={styles.search}>
          <input className={styles.searchInput} />
          <SearchIcon className={styles.searchIcon} width={30} height={30} />
        </div>
        <div className={styles.nav}>
          {windowSize > 648 && (
            <>
              {!userData?.isAuth && (
                <Link to="/login">
                  <div className={styles.navItem}>
                    <span className={styles.upLine}>Hello Guest</span>
                    <span className={styles.downLine}>Sign In</span>
                  </div>
                </Link>
              )}
              {userData?.isAuth && (
                <div className={styles.navItem}>
                  <span className={styles.upLine}>Hello</span>
                  <span className={styles.downLine}>{userData.name}</span>
                </div>
              )}
              {!userData?.isAuth && (
                <Link
                  to="/checkout"
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff9f01',
                    borderRadius: '6px',
                    color: '#fff',
                    marginRight: '15px',
                  }}
                >
                  Register
                </Link>
              )}
              {userData?.isAuth && (
                <button
                  onClick={() => logOutUser(userData.uid)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff9f01',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Log out
                </button>
              )}
              {userData?.isAuth && (
                <div className={styles.navItem}>
                  <Link to="/checkout" className={styles.navItemLink}>
                    <BasketIcon className={styles.basketIcon} width={30} height={50} />
                    <span className={`${styles.downLine} ${styles.basketCount}`}>{totalItems}</span>
                  </Link>
                </div>
              )}
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
