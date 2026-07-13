import { type MouseEvent, useState } from 'react'
import { Link, Text, VStack } from '@moysklad/uikit'
import { instruction } from '../../data/mockData'
import { AccessRightsSidepage } from '../AccessRightsSidepage/AccessRightsSidepage'
import styles from './InstructionAside.module.css'

export function InstructionAside() {
  const [accessOpen, setAccessOpen] = useState(false)

  function openAccess(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setAccessOpen(true)
  }

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
          <Link href="#access-rights" onClick={openAccess}>
            {instruction.accessLink}
          </Link>
        </div>
      </aside>
      <AccessRightsSidepage isOpen={accessOpen} onClose={() => setAccessOpen(false)} />
    </>
  )
}
