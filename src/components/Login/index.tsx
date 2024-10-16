import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../assets/icons/store.svg?react';
import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const LoginComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
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
        <button type="submit" className={styles.loginBtn} onClick={handleLogin}>
          Sign in
        </button>
        <p className={styles.desc}>
          By signing-in you agree to the eShop Website Condition of Use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <Link className={styles.registerBtn} to="/register">
          Create your eShop Account
        </Link>
      </form>
    </div>
  );
};

export default LoginComponent;
