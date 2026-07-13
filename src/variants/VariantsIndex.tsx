import {
  introGroup,
  mediaCardsLabel,
  removedVariants,
  variantGroups,
  variantsForGroup,
} from './data'
import type { AboutVariantConfig } from './types'
import styles from './VariantsIndex.module.css'

function VariantList({
  items,
  muted,
}: {
  items: AboutVariantConfig[]
  muted?: boolean
}) {
  return (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={muted ? styles.cardMuted : styles.card}>
          <a
            href={`#/v/${item.id}`}
            className={muted ? styles.cardLinkDetailed : styles.cardLink}
          >
            <span className={styles.num}>{item.id}</span>
            {muted ? (
              <span className={styles.cardBody}>
                <strong className={styles.cardTitle}>{mediaCardsLabel(item.mediaCount)}</strong>
                <span className={styles.cardSummary}>{item.summary}</span>
                <span className={styles.tags}>
                  <span>{item.textLength === 'short' ? 'текст короткий' : 'текст длинный'}</span>
                  <span>
                    медиа: {item.mediaCount}
                    {item.includeVideo ? ' · есть видео' : ''}
                  </span>
                  <span>{item.compact ? 'после установки' : 'до установки / полный'}</span>
                  <span>{item.composition ?? item.layout}</span>
                </span>
              </span>
            ) : (
              <strong className={styles.cardTitle}>{mediaCardsLabel(item.mediaCount)}</strong>
            )}
          </a>
        </li>
      ))}
    </ol>
  )
}

export function VariantsIndex() {
  const groups = [introGroup, ...variantGroups]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Редизайн · блок «О решении»</p>
        <h1 className={styles.title}>Варианты компоновки</h1>
        <p className={styles.lead}>
          Группы объединены общим дизайном; внутри группы отличается число медиа-карточек.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{group.title}</h2>
          <p className={styles.sectionLead}>{group.lead}</p>
          <VariantList items={variantsForGroup(group)} />
        </section>
      ))}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Убранные варианты</h2>
        <p className={styles.sectionLead}>
          Архив сценариев, снятых с основного списка. По-прежнему можно открыть и сравнить.
        </p>
        <VariantList items={removedVariants} muted />
      </section>
    </div>
  )
}
