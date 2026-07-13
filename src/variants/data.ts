import { assets } from '../data/assets'
import { descriptionBlocks } from '../data/mockData'
import type { AboutVariantConfig, MediaItem } from './types'

export const shortDescription = [
  'ЧАТЫ: Переписывайтесь с клиентами в WhatsApp, MAX, Telegram и ВКонтакте прямо из чата в МойСклад.',
  'УВЕДОМЛЕНИЯ: Автоматические уведомления клиентам и администраторам по шаблонам.',
  'РАССЫЛКА: Массовая каскадная рассылка сообщений по контрагентам.',
]

export const longDescription = descriptionBlocks

const mediaPool: MediaItem[] = [
  {
    id: 'v1',
    src: assets.videoMain,
    kind: 'video',
    title: 'Обзор: чаты и уведомления',
  },
  {
    id: 'i1',
    src: assets.gallery1,
    kind: 'image',
    title: 'Чат с клиентом в МойСклад',
  },
  {
    id: 'i2',
    src: assets.gallery2,
    kind: 'image',
    title: 'Шаблоны уведомлений',
  },
  {
    id: 'i3',
    src: assets.gallery3,
    kind: 'image',
    title: 'Каскадная рассылка',
  },
  {
    id: 'i4',
    src: assets.gallery4,
    kind: 'image',
    title: 'Подключение каналов',
  },
  {
    id: 'i5',
    src: assets.gallery5,
    kind: 'image',
    title: 'Профили менеджеров',
  },
  {
    id: 'i6',
    src: assets.gallery1,
    kind: 'image',
    title: 'Файлы в переписке',
  },
  {
    id: 'i7',
    src: assets.gallery2,
    kind: 'image',
    title: 'ИИ-ассистент в чате',
  },
]

export function buildMedia(count: number, includeVideo: boolean): MediaItem[] {
  if (count <= 0) return []
  const images = mediaPool.filter((item) => item.kind === 'image')
  const video = mediaPool.find((item) => item.kind === 'video')
  const result: MediaItem[] = []

  if (includeVideo && video) {
    result.push(video)
  }

  for (const image of images) {
    if (result.length >= count) break
    result.push({ ...image, id: `${image.id}-${result.length}` })
  }

  return result.slice(0, count)
}

export const baseVariants: AboutVariantConfig[] = [
  {
    id: 1,
    slug: 'text-only',
    title: 'Только текст',
    summary: 'Длинное описание, медиа нет. Текст на всю ширину той же карточки.',
    layout: 'split',
    textShare: 1,
    textLength: 'long',
    compact: false,
    mediaCount: 0,
    includeVideo: false,
    series: 'base',
  },
  {
    id: 3,
    slug: 'one-video',
    title: 'Одно видео · 50/50',
    summary: 'Короткий текст + видео 16:9 с бейджем. Клик открывает галерею.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'short',
    compact: false,
    mediaCount: 1,
    includeVideo: true,
    stageTitleSize: 'body',
    series: 'base',
  },
  {
    id: 35,
    slug: 'gallery-one-static',
    title: 'Галерея · одна карточка',
    summary: 'Как вариант 5: длинный текст и кадр 16:9, без слайдера и нумерации в подписи.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: true,
    showThumbs: false,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 36,
    slug: 'gallery-two-static',
    title: 'Галерея · две карточки',
    summary:
      'Как вариант 5: длинный текст и 2 превью того же размера, без слайдера.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 2,
    includeVideo: true,
    stageNav: 'none',
    thumbSlots: 3,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 37,
    slug: 'gallery-three-static',
    title: 'Галерея · три карточки',
    summary:
      'Как вариант 5: длинный текст и 3 превью того же размера, без слайдера.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 3,
    includeVideo: true,
    stageNav: 'none',
    thumbSlots: 3,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 5,
    slug: 'gallery-three',
    title: 'Галерея · слайдер в превью',
    summary:
      'Длинный текст + видео и фото. В ряду 3 превью прежнего размера; стрелки на кадрах, hover и хинт.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 7,
    includeVideo: true,
    stageNav: 'thumbs',
    thumbSlots: 3,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 30,
    slug: 'gallery-four-fixed-thumbs',
    title: 'Галерея 2 · размер как у 8',
    summary:
      'Как вариант 6: длинный текст и слайдер, но 2 кадра (видео + фото). Превью того же размера, по левому краю.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 2,
    includeVideo: true,
    thumbSlots: 8,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 6,
    slug: 'gallery-max',
    title: 'Максимум медиа · 8 кадров',
    summary: 'Длинный текст + видео и 7 фото. Медиа 50%, слайдер обязателен.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 8,
    includeVideo: true,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 34,
    slug: 'one-video-caption-below',
    title: 'Одно видео · подпись снизу',
    summary: 'Как вариант 29: одно видео без слайдера и нумерации, подпись под карточкой.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: true,
    showThumbs: false,
    captionPlacement: 'below',
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 29,
    slug: 'gallery-three-no-thumbs',
    title: 'Галерея 3+ · без превью',
    summary: 'Как вариант 5 без ленты превью: видео и фото, стрелки на кадре, подпись под карточкой.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 4,
    includeVideo: true,
    showThumbs: false,
    captionPlacement: 'below',
    stickyMediaTop: 20,
    series: 'base',
  },
]

export const compositionVariants: AboutVariantConfig[] = [
  {
    id: 26,
    slug: 'comp-pairs-below-one',
    title: 'Одна карточка · подпись снизу',
    summary:
      'Как вариант 21, но одна картинка того же размера, без слайдера. Медиа закрепляется сверху при скролле страницы.',
    layout: 'composition',
    composition: 'pairs-below',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: false,
    stickyMediaTop: 20,
    series: 'composition',
  },
  {
    id: 39,
    slug: 'comp-pairs-below-one-scroll-edge',
    title: 'Одна карточка · высота 540 · скролл справа',
    summary:
      'Как вариант 26: одна карточка с подписью снизу. Блок «О решении» до 540px; скролл у правого края, медиа фиксируется сверху.',
    layout: 'composition',
    composition: 'pairs-below',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: false,
    blockMaxHeight: 540,
    scrollPlacement: 'edge',
    series: 'composition',
  },
  {
    id: 32,
    slug: 'comp-pairs-below-two',
    title: 'Две карточки · подпись снизу без слайдера',
    summary: 'Как вариант 21: две средние карточки с подписью снизу, без слайдера.',
    layout: 'composition',
    composition: 'pairs-below',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 2,
    includeVideo: true,
    stickyMediaTop: 20,
    series: 'composition',
  },
  {
    id: 21,
    slug: 'comp-pairs-below',
    title: 'Две карточки · подпись снизу',
    summary:
      'Две средние карточки и листание парами. Подпись под превью; стрелки на кадрах.',
    layout: 'composition',
    composition: 'pairs-below',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    stickyMediaTop: 20,
    numberCaptions: true,
    series: 'composition',
  },
]

export const stackCompositionVariants: AboutVariantConfig[] = [
  {
    id: 27,
    slug: 'stack-top-one',
    title: 'Медиа сверху · 1 карточка',
    summary: 'Как вариант 25, но одна карточка того же размера, без слайдера.',
    layout: 'composition-stack-top',
    composition: 'triple',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: false,
    series: 'stack',
  },
  {
    id: 28,
    slug: 'stack-top-duo',
    title: 'Медиа сверху · 2 карточки',
    summary: 'Как вариант 25, но две карточки того же размера, без слайдера.',
    layout: 'composition-stack-top',
    composition: 'triple',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 2,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 33,
    slug: 'stack-top-triple-static',
    title: 'Медиа сверху · 3 карточки без слайдера',
    summary: 'Как вариант 25: 3 карточки в ряд того же размера, без слайдера. Текст ≤50% ниже.',
    layout: 'composition-stack-top',
    composition: 'triple',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 3,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 25,
    slug: 'stack-top-triple',
    title: 'Медиа сверху · 3 карточки',
    summary: 'Как вариант 24: 3 карточки в ряд, слайдер со стрелками на кадрах. Текст ≤50% ниже.',
    layout: 'composition-stack-top',
    composition: 'triple',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    numberCaptions: true,
    series: 'stack',
  },
  {
    id: 31,
    slug: 'stack-top-pairs-static',
    title: 'Медиа сверху · две карточки без слайдера',
    summary: 'Как вариант 18: две средние карточки сверху, текст ≤50% ниже. Без слайдера.',
    layout: 'composition-stack-top',
    composition: 'pairs',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 2,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 18,
    slug: 'stack-top-pairs',
    title: 'Медиа сверху · две карточки',
    summary: 'Сверху две средние карточки; стрелки слайдера справа на уровне заголовка.',
    layout: 'composition-stack-top',
    composition: 'pairs',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'stack',
  },
]

export const aboutVariants: AboutVariantConfig[] = (() => {
  const byId = new Map(
    [...baseVariants, ...compositionVariants, ...stackCompositionVariants].map((item) => [
      item.id,
      item,
    ]),
  )

  const pick = (ids: number[]) =>
    ids.map((id) => {
      const item = byId.get(id)
      if (!item) throw new Error(`Unknown variant id: ${id}`)
      return item
    })

  return [
    ...pick([1]),
    // Группы в заданной последовательности
    ...pick([34, 29]),
    ...pick([30, 6]),
    ...pick([35, 36, 37, 5]),
    ...pick([26, 39, 32, 21]),
    ...pick([27, 28, 33, 25]),
    ...pick([3, 31, 18]),
  ]
})()

/** Группы оглавления: общий дизайн, отличается числом карточек медиа */
export type VariantGroup = {
  id: string
  /** Номер группы: в0, в1, … */
  title: string
  lead: string
  /** Порядок вариантов в группе */
  variantIds: number[]
}

export const introGroup: VariantGroup = {
  id: 'text-only',
  title: 'в0',
  lead: 'Без карточек медиа',
  variantIds: [1],
}

export const variantGroups: VariantGroup[] = [
  {
    id: 'caption-below',
    title: 'в1',
    lead: 'Всегда одна большая карточка, м.б. со слайдером справа от текста',
    variantIds: [34, 29],
  },
  {
    id: 'gallery-thumbs-wide',
    title: 'в2',
    lead: 'Одна большая карточка и маленькие превью без слайдера справа от текста',
    variantIds: [35, 30, 6],
  },
  {
    id: 'gallery-thumbs-three',
    title: 'в3',
    lead: 'Одна большая карточка и до трёх средних превью со слайдером справа от текста',
    variantIds: [35, 36, 37, 5],
  },
  {
    id: 'pairs-below-side',
    title: 'в4',
    lead: 'До двух карточек со слайдером справа от текста',
    variantIds: [26, 39, 32, 21],
  },
  {
    id: 'stack-top-row',
    title: 'в5',
    lead: 'До трёх крупных карточек со слайдером над текстом',
    variantIds: [27, 28, 33, 25],
  },
  {
    id: 'video-and-pairs-top',
    title: 'в6',
    lead: 'До двух больших карточек над текстом',
    variantIds: [3, 31, 18],
  },
]

export const introVariants: AboutVariantConfig[] = baseVariants.filter((item) => item.id === 1)

export function mediaCardsLabel(count: number): string {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (count === 0) return 'Без карточек медиа'
  if (n > 10 && n < 20) return `${count} карточек медиа`
  if (n1 === 1) return `${count} карточка медиа`
  if (n1 >= 2 && n1 <= 4) return `${count} карточки медиа`
  return `${count} карточек медиа`
}

export function variantsForGroup(group: VariantGroup): AboutVariantConfig[] {
  const byId = new Map(aboutVariants.map((item) => [item.id, item]))
  return group.variantIds.map((id) => {
    const item = byId.get(id)
    if (!item) throw new Error(`Unknown variant id in group ${group.id}: ${id}`)
    return item
  })
}

/** Варианты, снятые с основного списка — доступны из архива на оглавлении */
export const removedVariants: AboutVariantConfig[] = [
  {
    id: 2,
    slug: 'one-image',
    title: 'Одно фото · 50/50',
    summary: 'Короткий текст + 1 картинка 16:9. Базовый split без слайдера.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'short',
    compact: false,
    mediaCount: 1,
    includeVideo: false,
    series: 'base',
  },
  {
    id: 4,
    slug: 'two-images',
    title: 'Два кадра · превью + лента',
    summary: 'Короткий текст + 2 изображения. Главный кадр и миниатюры.',
    layout: 'split',
    textShare: 0.5,
    textLength: 'short',
    compact: false,
    mediaCount: 2,
    includeVideo: false,
    series: 'base',
  },
  {
    id: 7,
    slug: 'media-left',
    title: 'Медиа слева',
    summary: 'Та же сетка, колонки зеркально. Длинный текст + 4 кадра.',
    layout: 'split-flip',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 4,
    includeVideo: true,
    series: 'base',
  },
  {
    id: 8,
    slug: 'media-top',
    title: 'Медиа сверху на всю ширину',
    summary: 'Крупный 16:9 на всю контентную область, текст под ним. 5 кадров.',
    layout: 'stack-media',
    textShare: 1,
    textLength: 'short',
    compact: false,
    mediaCount: 5,
    includeVideo: true,
    series: 'base',
  },
  {
    id: 9,
    slug: 'pre-install',
    title: 'До установки · полный текст',
    summary: 'Текст шире (60%), медиа читаемое. Длинное описание без сжатия.',
    layout: 'split',
    textShare: 0.6,
    textLength: 'long',
    compact: false,
    mediaCount: 4,
    includeVideo: true,
    stickyMediaTop: 20,
    series: 'base',
  },
  {
    id: 10,
    slug: 'post-install',
    title: 'После установки · компакт',
    summary: 'Тот же каркас, что №9: текст свёрнут, медиа крупнее (40/60).',
    layout: 'split',
    textShare: 0.4,
    textLength: 'long',
    compact: true,
    mediaCount: 4,
    includeVideo: true,
    series: 'base',
  },
  {
    id: 11,
    slug: 'comp-tiles',
    title: 'Сетка равных превью',
    summary:
      'Текст слева ≤50%. Справа сетка 2×N средних 16:9 — без большого кадра. Клик → lightbox.',
    layout: 'composition',
    composition: 'tiles',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 12,
    slug: 'comp-rail',
    title: 'Горизонтальная лента карточек',
    summary:
      'Текст слева ≤50%. Справа горизонтальный слайдер средних карточек (~260px) с заголовками.',
    layout: 'composition',
    composition: 'rail',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 13,
    slug: 'comp-playlist',
    title: 'Плейлист · превью + подпись',
    summary:
      'Текст слева ≤50%. Справа вертикальный список: среднее превью + название. Скролл списка.',
    layout: 'composition',
    composition: 'playlist',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 14,
    slug: 'comp-bento',
    title: 'Bento · акцент + мозаика',
    summary:
      'Текст слева ≤50%. Справа один чуть крупнее сверху, остальные средней сеткой. Не fullscreen-hero.',
    layout: 'composition',
    composition: 'bento',
    textShare: 0.45,
    textLength: 'long',
    compact: false,
    mediaCount: 5,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 15,
    slug: 'comp-pairs',
    title: 'Две карточки · листание парами',
    summary:
      'Текст слева ≤50%. Сразу видны 2 средних кадра с заголовком на превью; стрелки листают парами.',
    layout: 'composition',
    composition: 'pairs',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 16,
    slug: 'stack-top-tiles',
    title: 'Медиа сверху · сетка превью',
    summary: 'Сверху сетка средних 16:9 на всю ширину, под ней текст ≤50%.',
    layout: 'composition-stack-top',
    composition: 'tiles',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 17,
    slug: 'stack-top-rail',
    title: 'Медиа сверху · горизонтальная лента',
    summary: 'Сверху лента средних карточек; стрелки слева и справа на кадрах, текст ≤50% ниже.',
    layout: 'composition-stack-top',
    composition: 'rail',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 19,
    slug: 'stack-bottom-bento',
    title: 'Медиа снизу · bento',
    summary: 'Сначала текст ≤50%, под ним bento-мозаика на всю ширину.',
    layout: 'composition-stack-bottom',
    composition: 'bento',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 5,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 20,
    slug: 'stack-bottom-playlist',
    title: 'Медиа снизу · плейлист',
    summary: 'Сначала текст ≤50%, под ним вертикальный плейлист превью.',
    layout: 'composition-stack-bottom',
    composition: 'playlist',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'stack',
  },
  {
    id: 22,
    slug: 'comp-rail-plain',
    title: 'Лента без подписей · стрелки на кадрах',
    summary:
      'Как вариант 12: текст слева 50%, горизонтальная лента. Без подписей; стрелки на карточках, как в 21.',
    layout: 'composition',
    composition: 'rail-plain',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 6,
    includeVideo: true,
    series: 'composition',
  },
  {
    id: 23,
    slug: 'stack-top-single',
    title: 'Медиа сверху · одно фото',
    summary: 'Как вариант 17, но одно изображение на всю ширину без слайдера. Текст ≤50% ниже.',
    layout: 'composition-stack-top',
    composition: 'rail',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 1,
    includeVideo: false,
    series: 'stack',
  },
  {
    id: 24,
    slug: 'stack-top-quad',
    title: 'Медиа сверху · 4 карточки по 25%',
    summary: 'Как вариант 17, но 4 карточки в ряд по 25% ширины, без слайдера. Текст ≤50% ниже.',
    layout: 'composition-stack-top',
    composition: 'quad',
    textShare: 0.5,
    textLength: 'long',
    compact: false,
    mediaCount: 4,
    includeVideo: true,
    series: 'stack',
  },
]

export const allVariants: AboutVariantConfig[] = [...aboutVariants, ...removedVariants]

