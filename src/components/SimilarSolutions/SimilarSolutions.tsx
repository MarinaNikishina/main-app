import { useState } from 'react'
import {
  Badge,
  Button,
  ButtonSize,
  ButtonVariants,
  Left20Icon,
  Right20Icon,
  SegmentButton,
  Text,
  VStack,
} from '@moysklad/uikit'
import { similarFilters, similarSolutions } from '../../data/mockData'
import { OverflowHint } from '../OverflowHint/OverflowHint'
import styles from './SimilarSolutions.module.css'

export function SimilarSolutions() {
  const [filter, setFilter] = useState('all')

  return (
    <section className={styles.section}>
      <div className={styles.subheader}>
        <VStack size="s8" className={styles.titleBlock}>
          <Text.H3>Похожие решения</Text.H3>
          <SegmentButton.Group
            className={styles.filters}
            value={filter}
            onChange={(value) => setFilter(String(value))}
            aria-label="Категории похожих решений"
          >
            {similarFilters.map((item) => (
              <SegmentButton key={item.id} value={item.id}>
                {item.label}
                {item.count != null ? ` ${item.count}` : ''}
              </SegmentButton>
            ))}
          </SegmentButton.Group>
        </VStack>
        <div className={styles.nav}>
          <Button
            isIconButton
            variant={ButtonVariants.ADDITIONAL}
            size={ButtonSize.L}
            aria-label="Назад"
          >
            <Left20Icon />
          </Button>
          <Button
            isIconButton
            variant={ButtonVariants.ADDITIONAL}
            size={ButtonSize.L}
            aria-label="Вперёд"
          >
            <Right20Icon />
          </Button>
        </div>
      </div>

      <div className={styles.list}>
        {similarSolutions.map((item) => (
          <article key={item.id} className={styles.card}>
            <img src={item.logo} alt="" className={styles.logo} />
            <VStack size="s16" className={styles.cardBody}>
              <VStack size="s12" className={styles.mainText}>
                <VStack size="s8">
                  <OverflowHint text={item.title} className={styles.cardTitle}>
                    <Text.H4 className={styles.cardTitle}>{item.title}</Text.H4>
                  </OverflowHint>
                  <OverflowHint text={item.vendor} className={styles.vendor}>
                    <Text.Caption className={styles.vendor}>{item.vendor}</Text.Caption>
                  </OverflowHint>
                </VStack>
                <OverflowHint text={item.description} className={styles.description}>
                  <Text.Body className={styles.description}>{item.description}</Text.Body>
                </OverflowHint>
              </VStack>
              <div className={styles.badges}>
                {item.badges.map((badge) => (
                  <Badge key={badge.text} label={badge.text} variant={badge.variant} />
                ))}
              </div>
            </VStack>
          </article>
        ))}
      </div>
    </section>
  )
}
