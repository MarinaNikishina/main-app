import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Hint, Placement, Text, TextColor } from '@moysklad/uikit'

type OverflowHintProps = {
  text: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

function isOverflowing(el: HTMLElement) {
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1
}

/** Обрезка часто на дочернем Text/Link, а не на обёртке — проверяем дерево. */
function hasOverflow(el: HTMLElement): boolean {
  if (isOverflowing(el)) return true
  for (const child of el.children) {
    if (child instanceof HTMLElement && hasOverflow(child)) return true
  }
  return false
}

/** Показывает Hint с полным текстом только если контент обрезан. */
export function OverflowHint({ text, children, className, style }: OverflowHintProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  const measure = useCallback(() => {
    const el = ref.current
    return el ? hasOverflow(el) : false
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      if (visible && !measure()) setVisible(false)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [measure, visible, text])

  return (
    <Hint
      overlay={
        <Text.Body colorToken={TextColor.invert}>{text}</Text.Body>
      }
      placement={Placement.TOP}
      visible={visible}
      onVisibleChange={(next) => {
        if (!next) {
          setVisible(false)
          return
        }
        setVisible(measure())
      }}
    >
      <span
        ref={ref}
        className={className}
        style={{ display: 'block', minWidth: 0, maxWidth: '100%', ...style }}
      >
        {children}
      </span>
    </Hint>
  )
}
