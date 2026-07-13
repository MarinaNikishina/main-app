import { HStack, Link, Text, VStack } from '@moysklad/uikit'
import { developer } from '../../data/mockData'
import styles from './DeveloperCard.module.css'

export function DeveloperCard() {
  return (
    <section className={styles.card}>
      <VStack size="s16">
        <VStack size="s12">
          <Text.H3>Разработчик</Text.H3>
          <HStack size="s24" className={styles.vendorRow}>
            <Text.Body>{developer.name}</Text.Body>
            <Link href="#">{developer.moreSolutions}</Link>
          </HStack>
        </VStack>
        <div className={styles.contacts}>
          <div className={styles.field}>
            <Text.Caption colorToken="secondary">Сайт</Text.Caption>
            <Link href="#">{developer.website}</Link>
          </div>
          <div className={styles.field}>
            <Text.Caption colorToken="secondary">Почта</Text.Caption>
            <Link href={`mailto:${developer.email}`}>{developer.email}</Link>
          </div>
          <div className={styles.field}>
            <Text.Caption colorToken="secondary">Мессенджеры</Text.Caption>
            <HStack size="s24" className={styles.messengers}>
              {developer.messengers.map((messenger) => (
                <Link key={messenger.name} href="#" className={styles.messenger}>
                  <img src={messenger.icon} alt="" width={12} height={12} />
                  {messenger.name}
                </Link>
              ))}
            </HStack>
          </div>
        </div>
      </VStack>
    </section>
  )
}
