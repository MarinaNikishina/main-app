import { Link } from '@moysklad/uikit'
import { assets } from '../../data/assets'
import styles from './BackLink.module.css'

export function BackLink() {
  return (
    <Link href="#" className={styles.link}>
      <img src={assets.iconChevronLeft} alt="" width={8} height={8} />
      Назад
    </Link>
  )
}
