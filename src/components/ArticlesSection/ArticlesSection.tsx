import { Counter, HStack, Text, VStack } from '@moysklad/uikit'
import { article } from '../../data/mockData'
import { OverflowHint } from '../OverflowHint/OverflowHint'
import styles from './ArticlesSection.module.css'

export function ArticlesSection() {
  return (
    <section className={styles.card}>
      <VStack size="s12">
        <HStack size="s8" className={styles.header}>
          <Text.H3>Статьи</Text.H3>
          <Counter value={1} />
        </HStack>
        <article className={styles.article}>
          <img src={article.image} alt="" className={styles.image} />
          <VStack size="s8" className={styles.content}>
            <Text.Caption colorToken="secondary">{article.date}</Text.Caption>
            <VStack size="s8">
              <OverflowHint text={article.title} className={styles.title}>
                <Text.H4 className={styles.title}>{article.title}</Text.H4>
              </OverflowHint>
              <OverflowHint text={article.excerpt} className={styles.excerpt}>
                <Text.Body className={styles.excerpt}>{article.excerpt}</Text.Body>
              </OverflowHint>
            </VStack>
          </VStack>
        </article>
      </VStack>
    </section>
  )
}
