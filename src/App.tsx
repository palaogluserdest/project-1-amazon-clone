import styles from './App.module.scss';
import Navbar from './components/Navbar';
import Root from './Routers/root';

function App() {
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.header}>
          <Navbar />
        </nav>
        <main className={styles.main}>
          <Root />
        </main>
      </div>
    </>
  );
}

export default App;
