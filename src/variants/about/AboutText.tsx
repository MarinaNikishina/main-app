import { useState } from 'react'
import { Button, ButtonSize, ButtonVariants, Text, VStack } from '@moysklad/uikit'
import { longDescription, shortDescription } from '../data'
import type { TextLength } from '../types'
import styles from './AboutText.module.css'

type AboutTextProps = {
  length: TextLength
  compact: boolean
}

export function AboutText({ length, compact }: AboutTextProps) {
  const [expanded, setExpanded] = useState(false)
  const blocks = length === 'short' ? shortDescription : longDescription
  const collapsed = compact && !expanded

  return (
    <VStack size="s12" className={styles.root}>
      <div className={collapsed ? styles.clamp : styles.full}>
        {blocks.map((block) => (
          <Text.Body key={block.slice(0, 28)} className={styles.paragraph}>
            {block}
          </Text.Body>
        ))}
      </div>
      {compact ? (
        <Button
          variant={ButtonVariants.FRAMELESS}
          size={ButtonSize.L}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Свернуть описание' : 'Показать полностью'}
        </Button>
      ) : null}
    </VStack>
  )
}
