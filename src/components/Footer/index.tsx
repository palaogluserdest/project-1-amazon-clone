import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.sectionFirst}>
          <h3 className={styles.sectionTitle}>Section</h3>
          <ul className={styles.sectionItems}>
            <li className={styles.sectionItem}>
              <Link to="#">Home</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Features</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Pricing</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">FAQs</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">About</Link>
            </li>
          </ul>
        </div>
        <div className={styles.sectionSecond}>
          <h3 className={styles.sectionTitle}>Section</h3>
          <ul className={styles.sectionItems}>
            <li className={styles.sectionItem}>
              <Link to="#">Home</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Features</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Pricing</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">FAQs</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">About</Link>
            </li>
          </ul>
        </div>
        <div className={styles.sectionThird}>
          <h3 className={styles.sectionTitle}>Section</h3>
          <ul className={styles.sectionItems}>
            <li className={styles.sectionItem}>
              <Link to="#">Home</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Features</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">Pricing</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">FAQs</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link to="#">About</Link>
            </li>
          </ul>
        </div>
        <div className={styles.sectionFourth}>
          <h3 className={styles.title}>Subscribe to our newsletter</h3>
          <p className={styles.desc}>Monthly digest of what's new and exciting from us.</p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Write Email Address..." className={styles.input} />
            <button className={styles.subsBtn}>Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
