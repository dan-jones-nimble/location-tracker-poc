import { LogoutButton } from '../components';

import styles from './page.module.scss';

export default function Index() {
  return (
    <div className={styles.page}>
      <h1>Home page</h1>
      <LogoutButton />
    </div>
  );
}
