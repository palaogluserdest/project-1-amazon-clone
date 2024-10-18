import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../assets/icons/store.svg?react';
import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(`Login failed (${errorCode}): ${errorMessage}`);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Link to="/">
        <div className={styles.logoGroup}>
          <StoreLogo width={40} height={40} className={styles.logo} />
          <span className={styles.logoTitle}>eShop</span>
        </div>
      </Link>
      <form className={styles.formGroup}>
        <h1 className={styles.title}>Sign-in</h1>
        <div className={styles.emailGroup}>
          <label htmlFor="emailInput" className={styles.emailLabel}>
            E-mail
          </label>
          <input
            value={email}
            type="email"
            id="emailInput"
            className={styles.emailInput}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.emailGroup}>
          <label htmlFor="nameInput" className={styles.emailLabel}>
            Name
          </label>
          <input
            value={name}
            type="text"
            id="nameInput"
            className={styles.emailInput}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.passwordGroup}>
          <label htmlFor="passwordInput" className={styles.passwordLabel}>
            Password
          </label>
          <input
            value={password}
            type="password"
            id="passwordInput"
            className={styles.passwordInput}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.passwordGroup}>
          <label htmlFor="rePasswordInput" className={styles.passwordLabel}>
            Repeat Password
          </label>
          <input
            value={password}
            type="password"
            id="rePasswordInput"
            className={styles.passwordInput}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <p className={styles.desc}>
          By registering you agree to the eShop Website Condition of Use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <button type="submit" className={styles.loginBtn}>
          Register
        </button>
        <Link
          to="/login"
          style={{ textAlign: 'center', marginTop: '5px', textDecoration: 'none', color: '#000' }}
        >
          You have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
