import { useState } from 'react'
import { Button, ButtonSize, ButtonVariants, Link, Text, VStack } from '@moysklad/uikit'
import { instruction } from '../../data/mockData'
import { AccessRightsSidepage } from '../AccessRightsSidepage/AccessRightsSidepage'
import styles from './InstructionAside.module.css'

export function InstructionAside() {
  const [accessOpen, setAccessOpen] = useState(false)

  return (
    <>
      <aside className={styles.aside}>
        <div className={styles.card}>
          <VStack size="s8" className={styles.text}>
            <Text.H4>{instruction.title}</Text.H4>
            <Text.Body>{instruction.subtitle}</Text.Body>
          </VStack>
          <Link href="#">{instruction.link}</Link>
        </div>
        <div className={styles.accessCard}>
          <Button
            type="button"
            variant={ButtonVariants.FRAMELESS}
            size={ButtonSize.M}
            noPadding
            className={styles.accessButton}
            onClick={() => setAccessOpen(true)}
          >
            {instruction.accessLink}
          </Button>
        </div>
      </aside>
      <AccessRightsSidepage isOpen={accessOpen} onClose={() => setAccessOpen(false)} />
    </>
  )
}
