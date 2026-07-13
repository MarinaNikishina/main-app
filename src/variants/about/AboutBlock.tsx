import { useState, type CSSProperties } from 'react'
import { Text, VStack } from '@moysklad/uikit'
import { buildMedia } from '../data'
import type { AboutVariantConfig } from '../types'
import { AboutText } from './AboutText'
import { MediaBoard } from './MediaBoard'
import { MediaStage } from './MediaStage'
import styles from './AboutBlock.module.css'

type AboutBlockProps = {
  config: AboutVariantConfig
}

export function AboutBlock({ config }: AboutBlockProps) {
  const [pairsHeaderSlot, setPairsHeaderSlot] = useState<HTMLDivElement | null>(null)
  const media = buildMedia(config.mediaCount, config.includeVideo)
  const hasMedia = media.length > 0
  const hasComposition = Boolean(config.composition)
  const isStack =
    config.layout === 'stack-media' ||
    config.layout === 'stack-text' ||
    config.layout === 'composition-stack-top' ||
    config.layout === 'composition-stack-bottom'
  const isSideComposition = config.layout === 'composition'
  const mediaFirst =
    config.layout === 'split-flip' ||
    config.layout === 'stack-media' ||
    config.layout === 'composition-stack-top'
  const pairsNavInHeader = isStack && config.composition === 'pairs'
  const pairsNavOnSides = config.composition === 'pairs-below'
  const railNavOnSides = isStack || config.composition === 'rail-plain'

  const textShare =
    isSideComposition || config.layout.startsWith('composition-stack')
      ? Math.min(config.textShare, 0.5)
      : config.textShare

  const constrained = config.blockMaxHeight != null && config.blockMaxHeight > 0
  const scrollAtEdge = constrained && config.scrollPlacement === 'edge'
  const scrollInText = constrained && !scrollAtEdge
  const stickyMediaTop = config.stickyMediaTop
  const mediaSticky =
    scrollAtEdge || (stickyMediaTop != null && stickyMediaTop >= 0)
  const textColClass = [
    isStack && hasComposition ? styles.textColNarrow : styles.textCol,
    scrollInText ? styles.textColScroll : '',
  ]
    .filter(Boolean)
    .join(' ')

  const textCol = (
    <div className={textColClass}>
      <AboutText length={config.textLength} compact={config.compact} />
    </div>
  )

  const mediaCol = hasMedia ? (
    <div
      className={mediaSticky ? `${styles.mediaCol} ${styles.mediaColSticky}` : styles.mediaCol}
      style={
        stickyMediaTop != null && stickyMediaTop >= 0
          ? { top: `calc(var(--variant-bar-height, 0px) + ${stickyMediaTop}px)` }
          : undefined
      }
    >
      {hasComposition ? (
        <MediaBoard
          items={media}
          composition={config.composition!}
          railNav={railNavOnSides ? 'sides' : 'bottom'}
          railSize={
            isStack &&
            (config.composition === 'rail' ||
              config.composition === 'rail-plain' ||
              config.composition === 'quad')
              ? 'tall'
              : 'default'
          }
          pairsNav={pairsNavInHeader ? 'header' : pairsNavOnSides ? 'sides' : 'bottom'}
          pairsHeaderSlot={pairsHeaderSlot}
          numberCaptions={config.numberCaptions}
        />
      ) : (
        <MediaStage
          items={media}
          large={config.layout === 'stack-media'}
          showThumbs={config.showThumbs !== false}
          thumbSlots={config.thumbSlots}
          stageNav={config.stageNav}
          captionPlacement={config.captionPlacement}
          stageTitleSize={config.stageTitleSize}
        />
      )}
    </div>
  ) : null

  let gridTemplateColumns = '1fr'
  if (!isStack && hasMedia) {
    const mediaShare = 1 - textShare
    gridTemplateColumns = mediaFirst
      ? `minmax(0, ${mediaShare}fr) minmax(0, ${textShare}fr)`
      : `minmax(0, ${textShare}fr) minmax(0, ${mediaShare}fr)`
  }

  const layoutStyle: CSSProperties = { gridTemplateColumns }

  const body = (
    <>
      <div className={styles.headerRow}>
        <Text.H3>О решении</Text.H3>
        {pairsNavInHeader ? (
          <div ref={setPairsHeaderSlot} className={styles.headerControls} />
        ) : null}
      </div>
      <div
        className={`${styles.layout} ${isStack ? styles.stack : styles.split}${
          scrollInText ? ` ${styles.layoutConstrained}` : ''
        }${scrollAtEdge ? ` ${styles.layoutScrollEdge}` : ''}`}
        style={layoutStyle}
      >
        {mediaFirst ? (
          <>
            {mediaCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {mediaCol}
          </>
        )}
      </div>
    </>
  )

  const cardClass = [styles.card, constrained ? styles.cardConstrained : '']
    .filter(Boolean)
    .join(' ')

  const innerClass = scrollAtEdge
    ? `${styles.inner} ${styles.innerScrollEdge}`
    : constrained
      ? `${styles.inner} ${styles.innerConstrained}`
      : styles.inner

  return (
    <section
      className={cardClass}
      style={constrained ? { maxHeight: config.blockMaxHeight } : undefined}
    >
      {constrained ? (
        <div className={innerClass}>{body}</div>
      ) : (
        <VStack size="s12" className={styles.inner}>
          {body}
        </VStack>
      )}
    </section>
  )
}
