import { useEffect, useId, useState } from 'react'
import {
  Button,
  ButtonSize,
  Hint,
  Left20Icon,
  Placement,
  Right20Icon,
  Text,
  TextColor,
} from '@moysklad/uikit'
import type { MediaItem } from '../types'
import { MediaHoverOverlay, mediaHoverHostClass } from './MediaHoverOverlay'
import { MediaLightbox } from './MediaLightbox'
import styles from './MediaStage.module.css'

type MediaStageProps = {
  items: MediaItem[]
  large?: boolean
  showThumbs?: boolean
  /** Ширина превью как при N слотах; ряд выровнен влево */
  thumbSlots?: number
  /** Стрелки на большом кадре, в строке превью или без стрелок */
  stageNav?: 'stage' | 'thumbs' | 'none'
  /** Подпись поверх кадра или под карточкой */
  captionPlacement?: 'overlay' | 'below'
  /** Размер подписи на кадре: H4 или как в парах (Body) */
  stageTitleSize?: 'h4' | 'body'
}

export function MediaStage({
  items,
  large,
  showThumbs = true,
  thumbSlots,
  stageNav = 'stage',
  captionPlacement = 'overlay',
  stageTitleSize = 'h4',
}: MediaStageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const labelId = useId()

  const active = items[activeIndex]
  const showSlider = items.length > 1
  const showThumbStrip = showSlider && showThumbs
  const navInThumbs = showSlider && stageNav === 'thumbs' && showThumbStrip
  const navOnStage = showSlider && stageNav === 'stage'
  const showSlideCounter = showSlider
  const captionBelow = captionPlacement === 'below'
  const fixedThumbSlots = thumbSlots != null && thumbSlots > 0 ? thumbSlots : null
  const thumbWrapStyle =
    fixedThumbSlots != null
      ? ({
          flex: '0 0 auto',
          width: `calc((100% - ${(fixedThumbSlots - 1) * 4}px) / ${fixedThumbSlots})`,
        } as const)
      : undefined
  const thumbsClassName = fixedThumbSlots != null ? styles.thumbsStart : styles.thumbs
  const thumbEntries = items.map((item, index) => ({ item, index }))
  const visibleThumbs =
    fixedThumbSlots != null && items.length > fixedThumbSlots
      ? (() => {
          const page = Math.floor(activeIndex / fixedThumbSlots)
          const maxStart = items.length - fixedThumbSlots
          const start = Math.min(page * fixedThumbSlots, maxStart)
          return thumbEntries.slice(start, start + fixedThumbSlots)
        })()
      : thumbEntries

  useEffect(() => {
    if (activeIndex >= items.length) setActiveIndex(0)
  }, [activeIndex, items.length])

  if (!active) return null

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + items.length) % items.length)
  }

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % items.length)
  }

  return (
    <div className={large ? styles.rootLarge : styles.root}>
      <div className={captionBelow ? styles.stageBlock : styles.stageOnly}>
        <div className={styles.stage}>
          <button
            type="button"
            className={`${styles.stageHit} ${mediaHoverHostClass}`}
            onClick={() => setLightboxOpen(true)}
            aria-labelledby={labelId}
          >
            <img src={active.src} alt="" className={styles.stageImage} />
            {active.kind === 'video' ? <span className={styles.videoBadge}>Видео</span> : null}
            <MediaHoverOverlay kind={active.kind} size="l" />
            {!captionBelow ? (
              <>
                <span className={styles.stageScrim} />
                <span className={styles.stageMeta}>
                  {stageTitleSize === 'body' ? (
                    <Text.Body id={labelId} className={styles.stageTitle} colorToken={TextColor.invert}>
                      {active.title}
                    </Text.Body>
                  ) : (
                    <Text.H4 id={labelId} className={styles.stageTitle} colorToken={TextColor.invert}>
                      {active.title}
                    </Text.H4>
                  )}
                  {showSlideCounter ? (
                    <Text.Caption colorToken={TextColor.invert} className={styles.counter}>
                      {activeIndex + 1} / {items.length}
                    </Text.Caption>
                  ) : null}
                </span>
              </>
            ) : null}
          </button>

          {navOnStage ? (
            <>
              <div className={styles.navPrev}>
                <Button
                  isIconButton
                  size={ButtonSize.L}
                  className={styles.navBtn}
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
                  className={styles.navBtn}
                  aria-label="Следующее"
                  onClick={goNext}
                >
                  <Right20Icon />
                </Button>
              </div>
            </>
          ) : null}
        </div>

        {captionBelow ? (
          <Text.Caption id={labelId} className={styles.captionBelow}>
            {showSlider
              ? `${activeIndex + 1} из ${items.length}. ${active.title}`
              : active.title}
          </Text.Caption>
        ) : null}
      </div>

      {showThumbStrip ? (
        <div className={styles.thumbsRow}>
          {navInThumbs ? (
            <div className={styles.navPrev}>
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.navBtn}
                aria-label="Предыдущее"
                onClick={goPrev}
              >
                <Left20Icon />
              </Button>
            </div>
          ) : null}
          <div className={thumbsClassName}>
            {visibleThumbs.map(({ item, index }) => (
              <Hint
                key={item.id}
                placement={Placement.BOTTOM}
                overlay={<Text.Body colorToken={TextColor.invert}>{item.title}</Text.Body>}
              >
                <span className={styles.thumbWrap} style={thumbWrapStyle}>
                  <button
                    type="button"
                    className={index === activeIndex ? styles.thumbActive : styles.thumb}
                    onClick={() => setActiveIndex(index)}
                    aria-label={item.title}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  >
                    <img src={item.src} alt="" />
                    {item.kind === 'video' ? <span className={styles.thumbVideo}>▶</span> : null}
                  </button>
                </span>
              </Hint>
            ))}
          </div>
          {navInThumbs ? (
            <div className={styles.navNext}>
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.navBtn}
                aria-label="Следующее"
                onClick={goNext}
              >
                <Right20Icon />
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      {lightboxOpen ? (
        <MediaLightbox
          items={items}
          activeIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setActiveIndex}
        />
      ) : null}
    </div>
  )
}
