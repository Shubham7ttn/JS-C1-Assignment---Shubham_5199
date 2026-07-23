import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './PageLayout.module.scss';

function PageLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

export default PageLayout;
