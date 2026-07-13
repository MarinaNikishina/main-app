import { Link, Text, VStack } from '@moysklad/uikit'
import { instruction } from '../../data/mockData'
import styles from './InstructionAside.module.css'

export function InstructionAside() {
  return (
    <aside className={styles.aside}>
      <div className={styles.card}>
        <VStack size="s8" className={styles.text}>
          <Text.H4>{instruction.title}</Text.H4>
          <Text.Body>{instruction.subtitle}</Text.Body>
        </VStack>
        <Link href="#">{instruction.link}</Link>
      </div>
      <div className={styles.accessCard}>
        <Link href="#">{instruction.accessLink}</Link>
      </div>
    </aside>
  )
}
