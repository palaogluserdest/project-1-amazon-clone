import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../assets/icons/store.svg?react';
import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import {
  createUserToAuth,
  createUserToFS,
  emailChecker,
  handleFirestoreError,
} from '../../utils/user';
import { Timestamp } from 'firebase/firestore';
import { mySwal, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert2';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // * Error Messages
  const handleErrorMessage = (eMessage: string) => {
    setErrorMessage(eMessage);

    showErrorAlert(errorMessage);

    return null;
  };

  // * Checking the email
  const checkedEmail = emailChecker(email);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!checkedEmail) return handleErrorMessage('Invalid email address');
      if (password !== rePassword)
        return handleErrorMessage('Password and Repeat Password must be match');

      const user = await createUserToAuth(email, password);

      const newUser = {
        uid: user.uid,
        name: name,
        email: email,
        isAuth: false,
        createdAt: Timestamp.fromDate(new Date()),
      };

      await createUserToFS(newUser);

      showSuccessAlert('Successfully. Please wait for log-in');

      setTimeout(() => {
        mySwal.close();
        navigate('/login');
      }, 1500);
    } catch (error: any) {
      const errorMessage = handleFirestoreError(error);
      handleErrorMessage(errorMessage);
      return null;
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
            value={rePassword}
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
        <button type="submit" className={styles.loginBtn} onClick={handleRegister}>
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
