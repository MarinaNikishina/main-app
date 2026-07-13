import { useState } from 'react'
import {
  Badge,
  Button,
  ButtonSize,
  Left20Icon,
  Right20Icon,
  Text,
  VStack,
} from '@moysklad/uikit'
import { descriptionBlocks, galleryThumbs } from '../../data/mockData'
import styles from './DescriptionSection.module.css'

export function DescriptionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = galleryThumbs[activeIndex]

  const goPrev = () => {
    setActiveIndex((index) => (index === 0 ? galleryThumbs.length - 1 : index - 1))
  }

  const goNext = () => {
    setActiveIndex((index) => (index === galleryThumbs.length - 1 ? 0 : index + 1))
  }

  return (
    <section className={styles.card}>
      <div className={styles.layout}>
        <VStack size="s12" className={styles.about}>
          <Text.H3>О решении</Text.H3>
          <div className={styles.text}>
            {descriptionBlocks.map((block) => (
              <Text.Body key={block.slice(0, 24)} className={styles.paragraph}>
                {block}
              </Text.Body>
            ))}
          </div>
        </VStack>

        <div className={styles.media}>
          <div className={styles.mainMedia}>
            <img src={active.src} alt="" className={styles.mainImage} />
            {active.label ? (
              <div className={styles.videoBadge}>
                <Badge label={active.label} variant="white" />
              </div>
            ) : null}
            <div className={styles.navPrev}>
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.primaryL}
                aria-label="Предыдущее"
                onClick={goPrev}
              >
                <Left20Icon />
              </Button>
            </div>
            <div className={styles.navNext}>
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.primaryL}
                aria-label="Следующее"
                onClick={goNext}
              >
                <Right20Icon />
              </Button>
            </div>
          </div>
          <div className={styles.thumbs}>
            {galleryThumbs.map((thumb, index) => (
              <button
                key={`${thumb.src}-${index}`}
                type="button"
                className={index === activeIndex ? styles.thumbActive : styles.thumb}
                onClick={() => setActiveIndex(index)}
              >
                <img src={thumb.src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
