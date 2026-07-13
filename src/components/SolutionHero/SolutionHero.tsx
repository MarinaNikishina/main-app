import { Badge, HStack, Link, Text, VStack } from '@moysklad/uikit'
import { assets } from '../../data/assets'
import { solution } from '../../data/mockData'
import styles from './SolutionHero.module.css'

export function SolutionHero() {
  return (
    <section className={styles.card}>
      <div className={styles.body}>
        <div className={styles.logoWrap}>
          <img src={assets.logo} alt="" className={styles.logo} />
          <img src={assets.logoOverlay} alt="" className={styles.logoOverlay} />
        </div>
        <VStack size="s20" className={styles.content}>
          <VStack size="s8">
            <Badge label={solution.status} variant="grey" />
            <VStack size="s4">
              <Text.H2>{solution.title}</Text.H2>
              <Text.Body className={styles.description}>{solution.description}</Text.Body>
            </VStack>
          </VStack>
          <div className={styles.metaRow}>
            <HStack size="s24" className={styles.meta}>
              <span className={styles.metaItem}>
                <img src={assets.iconDownload} alt="" width={16} height={16} />
                <Text.Body>{solution.installs}</Text.Body>
              </span>
              <span className={styles.metaItem}>
                <img src={assets.iconCalendar} alt="" width={16} height={16} />
                <Text.Body>{solution.publishedAt}</Text.Body>
              </span>
            </HStack>
            <HStack size="s16" className={styles.categories}>
              <Text.Body>Категории:</Text.Body>
              {solution.categories.map((category) => (
                <Link key={category} href="#">
                  {category}
                </Link>
              ))}
            </HStack>
          </div>
        </VStack>
      </div>
    </section>
  )
}
