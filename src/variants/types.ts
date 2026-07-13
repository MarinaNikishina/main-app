export type MediaKind = 'image' | 'video'

export type MediaItem = {
  id: string
  src: string
  kind: MediaKind
  title: string
}

export type AboutLayout =
  | 'split'
  | 'split-flip'
  | 'stack-media'
  | 'stack-text'
  | 'composition'
  | 'composition-stack-top'
  | 'composition-stack-bottom'

/** Компоновки без обязательного большого кадра (3+ медиа, длинный текст) */
export type CompositionLayout =
  | 'tiles'
  | 'rail'
  | 'rail-plain'
  | 'quad'
  | 'triple'
  | 'playlist'
  | 'bento'
  | 'pairs'
  | 'pairs-below'

export type TextLength = 'short' | 'long'

export type AboutVariantConfig = {
  id: number
  slug: string
  title: string
  summary: string
  layout: AboutLayout
  composition?: CompositionLayout
  /** Доля колонки текста в split (≤0.5 для composition). Медиа = 1 − textShare */
  textShare: number
  textLength: TextLength
  compact: boolean
  mediaCount: number
  includeVideo: boolean
  /** Показывать ленту превью в MediaStage (по умолчанию true) */
  showThumbs?: boolean
  /** Число слотов для ширины превью (как при N кадрах); выравнивание влево */
  thumbSlots?: number
  /** Куда ставить стрелки слайдера: на большой кадр, в ряд превью или скрыть */
  stageNav?: 'stage' | 'thumbs' | 'none'
  /** Подпись кадра: поверх или под карточкой */
  captionPlacement?: 'overlay' | 'below'
  /** Размер подписи на большом кадре */
  stageTitleSize?: 'h4' | 'body'
  /** Нумерация подписей: «1. Название» */
  numberCaptions?: boolean
  /** Макс. высота блока «О решении» (px); текст с прокруткой */
  blockMaxHeight?: number
  /**
   * Где полоса прокрутки при blockMaxHeight:
   * - `text` (по умолчанию) — у колонки текста
   * - `edge` — у правого края блока; медиа sticky сверху
   */
  scrollPlacement?: 'text' | 'edge'
  /** Закрепить медиа при скролле страницы; доп. отступ сверху под полосой навигации (px) */
  stickyMediaTop?: number
  /** Серия на оглавлении */
  series?: 'base' | 'composition' | 'stack'
}
