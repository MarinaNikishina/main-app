import { navItems } from '../../data/mockData'
import styles from './AppHeader.module.css'

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} aria-hidden />
        <nav className={styles.nav} aria-label="Основное меню">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={item === 'Решения' ? styles.navItemActive : styles.navItem}
            >
              <span className={styles.navIcon} aria-hidden />
              <span className={styles.navLabel}>{item}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <button type="button" className={styles.iconBtn} aria-label="Уведомления" />
        <button type="button" className={styles.iconBtn} aria-label="Помощь" />
        <button type="button" className={styles.user}>
          <span className={styles.userText}>
            <span className={styles.userName}>Морозов С. В.</span>
            <span className={styles.userEmail}>admin@shoes</span>
          </span>
          <span className={styles.avatar} aria-hidden />
        </button>
      </div>
    </header>
  )
}
