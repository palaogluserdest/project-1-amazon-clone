import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../assets/icons/store.svg?react';
import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import { emailChecker, getUserFromFS, handleFirestoreError, logInUser } from '../../utils/user';
import { mySwal, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const LoginComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // * Error Messages
  const handleErrorMessage = (eMessage: string) => {
    setErrorMessage(eMessage);

    showErrorAlert(errorMessage);

    return null;
  };

  const checkedEmail = emailChecker(email);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!checkedEmail) return handleErrorMessage('Invalid email address');

      // * Google Auth Log In
      const user = await logInUser(email, password);

      // * Get User Information from Google Firestore
      const fetchedUser = await getUserFromFS(user.uid);

      // * If There is a logged-in user, isAuth will be changed with true
      if (fetchedUser) {
        const userRefDoc = doc(db, 'users', fetchedUser.uid);
        await updateDoc(userRefDoc, {
          isAuth: true,
        });
      }

      showSuccessAlert('Please wait for home');

      setTimeout(() => {
        navigate('/');
        mySwal.close();
      }, 1500);
    } catch (error: any) {
      console.log(error.message, error.code);

      setErrorMessage(handleFirestoreError(error));
      showErrorAlert(errorMessage);
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
