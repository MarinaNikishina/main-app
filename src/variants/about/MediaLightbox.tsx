import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Button,
  ButtonSize,
  Left20Icon,
  RemoveClose20Icon,
  Right20Icon,
  Text,
  TextColor,
} from '@moysklad/uikit'
import type { MediaItem } from '../types'
import styles from './MediaLightbox.module.css'

type MediaLightboxProps = {
  items: MediaItem[]
  activeIndex: number
  onClose: () => void
  onChangeIndex: (index: number) => void
}

export function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: MediaLightboxProps) {
  const active = items[activeIndex]
  const showSlider = items.length > 1

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && showSlider) {
        onChangeIndex((activeIndex + 1) % items.length)
      }
      if (event.key === 'ArrowLeft' && showSlider) {
        onChangeIndex((activeIndex - 1 + items.length) % items.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, items.length, onChangeIndex, onClose, showSlider])

  if (!active) return null

  return createPortal(
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр медиа"
      onClick={onClose}
    >
      <div className={styles.lightboxBar} onClick={(event) => event.stopPropagation()}>
        <Text.Body colorToken={TextColor.invert}>
          {active.title}
          {showSlider ? ` · ${activeIndex + 1}/${items.length}` : ''}
        </Text.Body>
        <Button
          isIconButton
          size={ButtonSize.L}
          className={styles.lightboxClose}
          aria-label="Закрыть"
          onClick={onClose}
        >
          <RemoveClose20Icon />
        </Button>
      </div>
      <div className={styles.lightboxStage} onClick={(event) => event.stopPropagation()}>
        {showSlider ? (
          <Button
            isIconButton
            size={ButtonSize.L}
            className={styles.lightboxNav}
            aria-label="Предыдущее"
            onClick={() => onChangeIndex((activeIndex - 1 + items.length) % items.length)}
          >
            <Left20Icon />
          </Button>
        ) : null}
        <img src={active.src} alt={active.title} className={styles.lightboxImage} />
        {showSlider ? (
          <Button
            isIconButton
            size={ButtonSize.L}
            className={styles.lightboxNav}
            aria-label="Следующее"
            onClick={() => onChangeIndex((activeIndex + 1) % items.length)}
          >
            <Right20Icon />
          </Button>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
