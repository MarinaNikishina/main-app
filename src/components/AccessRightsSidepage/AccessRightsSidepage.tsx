import {
  Button,
  ButtonSize,
  ButtonVariants,
  Sidepage,
  SidepageContent,
  SidepageFooter,
  SidepageHeader,
  Text,
  VStack,
} from '@moysklad/uikit'
import { accessRights } from '../../data/mockData'
import styles from './AccessRightsSidepage.module.css'

type AccessRightsSidepageProps = {
  isOpen: boolean
  onClose: () => void
}

export function AccessRightsSidepage({ isOpen, onClose }: AccessRightsSidepageProps) {
  return (
    <Sidepage
      isOpen={isOpen}
      onClose={onClose}
      withBackdrop
      closeOnBackdropClick
      showShadow
      width={580}
      zIndex={200}
    >
      <SidepageHeader>
        <Text.H2>{accessRights.title}</Text.H2>
      </SidepageHeader>
      <SidepageContent>
        <VStack size="s8" className={styles.body}>
          <Text.H4>{accessRights.intro}</Text.H4>
          <VStack size="s8" className={styles.list}>
            {accessRights.items.map((item) => (
              <VStack key={item.label} size="s2" className={styles.item}>
                <Text.Body>{item.label}</Text.Body>
                <Text.Caption colorToken="secondary">{item.value}</Text.Caption>
              </VStack>
            ))}
          </VStack>
        </VStack>
      </SidepageContent>
      <SidepageFooter>
        <Button
          variant={ButtonVariants.FRAMELESS}
          size={ButtonSize.M}
          noPadding
          onClick={onClose}
        >
          {accessRights.closeLabel}
        </Button>
      </SidepageFooter>
    </Sidepage>
  )
}
