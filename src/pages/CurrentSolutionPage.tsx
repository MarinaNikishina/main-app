import { AppHeader } from '../components/AppHeader/AppHeader'
import { ArticlesSection } from '../components/ArticlesSection/ArticlesSection'
import { BackLink } from '../components/BackLink/BackLink'
import { DescriptionSection } from '../components/DescriptionSection/DescriptionSection'
import { DeveloperCard } from '../components/DeveloperCard/DeveloperCard'
import { InstructionAside } from '../components/InstructionAside/InstructionAside'
import { SimilarSolutions } from '../components/SimilarSolutions/SimilarSolutions'
import { SolutionHero } from '../components/SolutionHero/SolutionHero'
import { SubscriptionCard } from '../components/SubscriptionCard/SubscriptionCard'
import styles from '../App.module.css'

/** Текущая карточка решения (до редизайна блока «О решении») */
export function CurrentSolutionPage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={styles.variantBar}>
        <div className={styles.variantBarInner}>
          <a href="#/variants" className={styles.back}>
            ← Все варианты редизайна
          </a>
          <span className={styles.currentLabel}>Текущая страница</span>
        </div>
      </div>
      <main className={styles.main}>
        <BackLink />
        <div className={styles.heroRow}>
          <SolutionHero />
          <InstructionAside />
        </div>
        <div className={styles.cardsRow}>
          <SubscriptionCard />
          <DeveloperCard />
        </div>
        <DescriptionSection />
        <ArticlesSection />
        <SimilarSolutions />
      </main>
    </div>
  )
}
