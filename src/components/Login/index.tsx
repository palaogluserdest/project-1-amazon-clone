import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../assets/icons/store.svg?react';
import styles from './styles.module.scss';
import { useState } from 'react';
import { auth } from '../../firebase.ts';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = (e: SubmitEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const registerUser = (e: SubmitEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
        <button type="submit" className={styles.loginBtn}>
          Sign in
        </button>
        <p className={styles.desc}>
          By signing-in you agree to the eShop Website Condition of Use & Sale. Please see our
          Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <button className={styles.registerBtn}> Create your eShop Account </button>
      </form>
    </div>
  );
};

export default LoginComponent;
