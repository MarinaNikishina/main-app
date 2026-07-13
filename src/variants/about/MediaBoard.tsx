import { useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  Button,
  ButtonSize,
  ButtonVariants,
  Left20Icon,
  Right20Icon,
  Text,
  TextColor,
} from '@moysklad/uikit'
import type { CompositionLayout, MediaItem } from '../types'
import { MediaHoverOverlay, mediaHoverHostClass } from './MediaHoverOverlay'
import { MediaLightbox } from './MediaLightbox'
import styles from './MediaBoard.module.css'

type MediaBoardProps = {
  items: MediaItem[]
  composition: CompositionLayout
  /** Для rail: стрелки снизу или по бокам ленты */
  railNav?: 'bottom' | 'sides'
  /** Высота кадра ленты: default ~146px, tall = 180px */
  railSize?: 'default' | 'tall'
  /** Для pairs: стрелки снизу, в слоте у заголовка или на кадрах */
  pairsNav?: 'bottom' | 'header' | 'sides'
  pairsHeaderSlot?: HTMLElement | null
  /** Нумерация подписей: «1. Название» */
  numberCaptions?: boolean
}

export function MediaBoard({
  items,
  composition,
  railNav = 'bottom',
  railSize = 'default',
  pairsNav = 'bottom',
  pairsHeaderSlot = null,
  numberCaptions = false,
}: MediaBoardProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [pairPage, setPairPage] = useState(0)
  const [quadPage, setQuadPage] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  const openAt = (index: number) => setLightboxIndex(index)

  if (items.length === 0) return null

  const tile = (
    item: MediaItem,
    index: number,
    className: string,
    showCaption = true,
    hoverSize: 'l' | 's' = 'l',
  ) => (
    <button
      key={item.id}
      type="button"
      className={`${className} ${mediaHoverHostClass}`}
      onClick={() => openAt(index)}
      aria-label={item.title}
    >
      <span className={styles.frame}>
        <img src={item.src} alt="" />
        {item.kind === 'video' ? <span className={styles.videoMark}>Видео</span> : null}
        <MediaHoverOverlay kind={item.kind} size={hoverSize} />
      </span>
      {showCaption ? (
        <Text.Caption className={styles.caption}>
          {numberCaptions ? `${index + 1}. ${item.title}` : item.title}
        </Text.Caption>
      ) : null}
    </button>
  )

  let body: ReactNode = null
  let pairsHeaderNav: ReactNode = null

  if (composition === 'tiles') {
    body = <div className={styles.tiles}>{items.map((item, index) => tile(item, index, styles.tile, true, 's'))}</div>
  }

  if (composition === 'quad' || composition === 'triple') {
    const pageSize = composition === 'triple' ? 3 : 4
    const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
    const page = Math.min(quadPage, pageCount - 1)
    const pageItems = items.slice(page * pageSize, page * pageSize + pageSize)
    const showNav = pageCount > 1
    const gridClass = composition === 'triple' ? styles.triple : styles.quad

    body = (
      <div
        className={[
          styles.quadWrap,
          composition === 'triple' ? styles.tripleWrap : styles.quadGridWrap,
          railSize === 'tall' ? styles.quadTall : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {showNav ? (
          <>
            <div className={styles.quadNavSide} data-side="prev">
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.railNavBtn}
                aria-label="Предыдущие"
                onClick={() => setQuadPage((value) => Math.max(0, value - 1))}
              >
                <Left20Icon />
              </Button>
            </div>
            <div className={styles.quadNavSide} data-side="next">
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.railNavBtn}
                aria-label="Следующие"
                onClick={() => setQuadPage((value) => Math.min(pageCount - 1, value + 1))}
              >
                <Right20Icon />
              </Button>
            </div>
          </>
        ) : null}
        <div className={gridClass}>
          {pageItems.map((item, offset) => {
            const index = page * pageSize + offset
            return tile(item, index, styles.quadCard, true)
          })}
        </div>
      </div>
    )
  }

  if (composition === 'rail' || composition === 'rail-plain') {
    const scrollStep = railSize === 'tall' ? 340 : 280
    const scrollRail = (direction: -1 | 1) => {
      railRef.current?.scrollBy({ left: direction * scrollStep, behavior: 'smooth' })
    }
    const showCaption = composition === 'rail'
    const single = items.length <= 1
    const showRailNav = !single
    const railCardClass = showCaption ? styles.railCard : styles.railCardPlain
    const wrapClass =
      railNav === 'sides'
        ? `${styles.railWrapSides} ${railSize === 'tall' ? styles.railSizeTall : ''}`
        : `${styles.railWrap} ${railSize === 'tall' ? styles.railSizeTall : ''}`

    const railTrack = (
      <div className={styles.rail} ref={railRef}>
        {items.map((item, index) => tile(item, index, railCardClass, showCaption, 's'))}
      </div>
    )

    body =
      railNav === 'sides' ? (
        <div className={wrapClass}>
          {showRailNav ? (
            <div className={styles.railNavSide} data-side="prev">
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.railNavBtn}
                aria-label="Назад"
                onClick={() => scrollRail(-1)}
              >
                <Left20Icon />
              </Button>
            </div>
          ) : null}
          {railTrack}
          {showRailNav ? (
            <div className={styles.railNavSide} data-side="next">
              <Button
                isIconButton
                size={ButtonSize.L}
                className={styles.railNavBtn}
                aria-label="Вперёд"
                onClick={() => scrollRail(1)}
              >
                <Right20Icon />
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={wrapClass}>
          {railTrack}
          {showRailNav ? (
            <div className={styles.railNav}>
              <Button
                isIconButton
                size={ButtonSize.L}
                variant={ButtonVariants.ADDITIONAL}
                aria-label="Назад"
                onClick={() => scrollRail(-1)}
              >
                <Left20Icon />
              </Button>
              <Button
                isIconButton
                size={ButtonSize.L}
                variant={ButtonVariants.ADDITIONAL}
                aria-label="Вперёд"
                onClick={() => scrollRail(1)}
              >
                <Right20Icon />
              </Button>
            </div>
          ) : null}
        </div>
      )
  }

  if (composition === 'playlist') {
    body = (
      <div className={styles.playlist}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={styles.playlistRow}
            onClick={() => openAt(index)}
          >
            <span className={`${styles.playlistThumb} ${mediaHoverHostClass}`}>
              <img src={item.src} alt="" />
              {item.kind === 'video' ? <span className={styles.videoMark}>Видео</span> : null}
              <MediaHoverOverlay kind={item.kind} size="s" />
            </span>
            <span className={styles.playlistMeta}>
              <Text.Body>{item.title}</Text.Body>
            </span>
          </button>
        ))}
      </div>
    )
  }

  if (composition === 'bento') {
    body = (
      <div className={styles.bento}>
        {items.map((item, index) =>
          tile(item, index, index === 0 ? styles.bentoFeature : styles.bentoCell, true, index === 0 ? 'l' : 's'),
        )}
      </div>
    )
  }

  if (composition === 'pairs' || composition === 'pairs-below') {
    const pageSize = 2
    const pageCount = Math.ceil(items.length / pageSize)
    const page = Math.min(pairPage, pageCount - 1)
    const slice = items.slice(page * pageSize, page * pageSize + pageSize)
    const captionBelow = composition === 'pairs-below'
    const numberPairTitles = !captionBelow
    const pairsGridClass = numberPairTitles ? styles.pairsGridWide : styles.pairsGrid

    const pairsControls =
      pageCount > 1 && pairsNav !== 'sides' ? (
        <div className={pairsNav === 'header' ? styles.pairsNavHeader : styles.pairsNav}>
          <Button
            isIconButton
            size={ButtonSize.L}
            variant={ButtonVariants.ADDITIONAL}
            aria-label="Предыдущая пара"
            onClick={() => setPairPage((value) => Math.max(0, value - 1))}
          >
            <Left20Icon />
          </Button>
          {pairsNav === 'header' ? null : (
            <Text.Caption colorToken="secondary">
              {page + 1} / {pageCount}
            </Text.Caption>
          )}
          <Button
            isIconButton
            size={ButtonSize.L}
            variant={ButtonVariants.ADDITIONAL}
            aria-label="Следующая пара"
            onClick={() => setPairPage((value) => Math.min(pageCount - 1, value + 1))}
          >
            <Right20Icon />
          </Button>
        </div>
      ) : null

    if (pairsNav === 'header') {
      pairsHeaderNav = pairsControls
    }

    body = (
      <div className={styles.pairs}>
        {captionBelow ? (
          <>
            <div className={styles.pairsStage}>
              {pageCount > 1 && pairsNav === 'sides' ? (
                <>
                  <div className={styles.pairsNavSide} data-side="prev">
                    <Button
                      isIconButton
                      size={ButtonSize.L}
                      className={styles.railNavBtn}
                      aria-label="Предыдущая пара"
                      onClick={() => setPairPage((value) => Math.max(0, value - 1))}
                    >
                      <Left20Icon />
                    </Button>
                  </div>
                  <div className={styles.pairsNavSide} data-side="next">
                    <Button
                      isIconButton
                      size={ButtonSize.L}
                      className={styles.railNavBtn}
                      aria-label="Следующая пара"
                      onClick={() => setPairPage((value) => Math.min(pageCount - 1, value + 1))}
                    >
                      <Right20Icon />
                    </Button>
                  </div>
                </>
              ) : null}
              <div className={styles.pairsGrid}>
                {slice.map((item, offset) => {
                  const index = page * pageSize + offset
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.pairCard} ${mediaHoverHostClass}`}
                      onClick={() => openAt(index)}
                      aria-label={item.title}
                    >
                      <span className={styles.pairFrame}>
                        <img src={item.src} alt="" />
                        {item.kind === 'video' ? (
                          <span className={styles.videoMark}>Видео</span>
                        ) : null}
                        <MediaHoverOverlay kind={item.kind} size="l" />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className={styles.pairsCaptions}>
              {slice.map((item, offset) => {
                const index = page * pageSize + offset
                const title = numberCaptions ? `${index + 1}. ${item.title}` : item.title
                return (
                  <Text.Caption key={`${item.id}-caption`} className={styles.pairCaptionBelow}>
                    {title}
                  </Text.Caption>
                )
              })}
            </div>
          </>
        ) : (
          <div className={pairsGridClass}>
            {slice.map((item, offset) => {
              const index = page * pageSize + offset
              const title = numberPairTitles ? `${index + 1}. ${item.title}` : item.title
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.pairCard} ${mediaHoverHostClass}`}
                  onClick={() => openAt(index)}
                  aria-label={item.title}
                >
                  <span className={styles.pairFrame}>
                    <img src={item.src} alt="" />
                    {item.kind === 'video' ? <span className={styles.videoMark}>Видео</span> : null}
                    <MediaHoverOverlay kind={item.kind} size="l" />
                    <span className={styles.pairScrim} />
                    <span className={styles.pairTitle}>
                      <Text.Body colorToken={TextColor.invert}>{title}</Text.Body>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
        {pairsNav === 'bottom' ? pairsControls : null}
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {body}
      {pairsHeaderNav && pairsHeaderSlot
        ? createPortal(pairsHeaderNav, pairsHeaderSlot)
        : null}
      {lightboxIndex != null ? (
        <MediaLightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChangeIndex={setLightboxIndex}
        />
      ) : null}
    </div>
  )
}
