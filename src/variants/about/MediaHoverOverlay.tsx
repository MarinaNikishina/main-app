import type { MediaKind } from '../types'
import styles from './MediaHoverOverlay.module.css'

export const mediaHoverHostClass = styles.host

type MediaHoverOverlayProps = {
  kind: MediaKind
  /** l = 48px (большие карточки), s = 32px (небольшие) */
  size?: 'l' | 's'
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M16.5 12.8c0-1.5 1.6-2.4 2.9-1.6l16.4 10.4c1.2.8 1.2 2.5 0 3.2L19.4 35.2c-1.3.8-2.9-.1-2.9-1.6V12.8Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ZoomIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect
        x="7"
        y="7"
        width="34"
        height="34"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx="22" cy="22" r="7.5" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M27.8 27.8 34 34"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MediaHoverOverlay({ kind, size = 'l' }: MediaHoverOverlayProps) {
  const px = size === 'l' ? 48 : 32
  return (
    <span className={styles.overlay}>
      <span className={styles.icon}>
        {kind === 'video' ? <PlayIcon size={px} /> : <ZoomIcon size={px} />}
      </span>
    </span>
  )
}
