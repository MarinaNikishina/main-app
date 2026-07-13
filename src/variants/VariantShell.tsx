import { useEffect, useRef } from 'react'
import { ArticlesSection } from '../components/ArticlesSection/ArticlesSection'
import { BackLink } from '../components/BackLink/BackLink'
import { DeveloperCard } from '../components/DeveloperCard/DeveloperCard'
import { InstructionAside } from '../components/InstructionAside/InstructionAside'
import { SimilarSolutions } from '../components/SimilarSolutions/SimilarSolutions'
import { SolutionHero } from '../components/SolutionHero/SolutionHero'
import { SubscriptionCard } from '../components/SubscriptionCard/SubscriptionCard'
import { AboutBlock } from './about/AboutBlock'
import {
  introGroup,
  mediaCardsLabel,
  removedVariants,
  variantGroups,
  variantsForGroup,
  type VariantGroup,
} from './data'
import type { AboutVariantConfig } from './types'
import styles from './VariantShell.module.css'

type VariantShellProps = {
  config: AboutVariantConfig
}

function PagerLink({
  item,
  active,
}: {
  item: AboutVariantConfig
  active: boolean
}) {
  return (
    <a
      href={`#/v/${item.id}`}
      className={active ? styles.pageActive : styles.pageLink}
      title={mediaCardsLabel(item.mediaCount)}
    >
      {item.id}
    </a>
  )
}

function findGroupForVariant(variantId: number): VariantGroup | undefined {
  const groups = [introGroup, ...variantGroups]
  return groups.find((group) => group.variantIds.includes(variantId))
}

export function VariantShell({ config }: VariantShellProps) {
  const isRemoved = removedVariants.some((item) => item.id === config.id)
  const group = findGroupForVariant(config.id)
  const pageRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const page = pageRef.current
    const bar = barRef.current
    if (!page || !bar) return

    const sync = () => {
      page.style.setProperty('--variant-bar-height', `${bar.offsetHeight}px`)
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={pageRef} className={styles.page}>
      <div ref={barRef} className={styles.variantBar}>
        <div className={styles.variantBarInner}>
          <div className={styles.variantBarTop}>
            <a href="#/variants" className={styles.back}>
              ← Все варианты
            </a>
            <div className={styles.meta}>
              <strong>
                {isRemoved
                  ? 'Убранный вариант'
                  : (group?.lead ?? config.title)}
              </strong>
              <span className={styles.summary}>{mediaCardsLabel(config.mediaCount)}</span>
            </div>
          </div>
          <nav className={styles.pager} aria-label="Варианты">
            <span className={styles.pagerGroup} title={introGroup.lead}>
              <span className={styles.pagerGroupLabel}>{introGroup.title}</span>
              <span className={styles.pagerGroupLinks}>
                {variantsForGroup(introGroup).map((item) => (
                  <PagerLink key={item.id} item={item} active={item.id === config.id} />
                ))}
              </span>
            </span>
            {variantGroups.map((item) => (
              <span key={item.id} className={styles.pagerGroup} title={item.lead}>
                <span className={styles.pagerGroupLabel}>{item.title}</span>
                <span className={styles.pagerGroupLinks}>
                  {variantsForGroup(item).map((variant) => (
                    <PagerLink
                      key={variant.id}
                      item={variant}
                      active={variant.id === config.id}
                    />
                  ))}
                </span>
              </span>
            ))}
          </nav>
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
        <AboutBlock config={config} />
        <ArticlesSection />
        <SimilarSolutions />
      </main>
    </div>
  )
}
