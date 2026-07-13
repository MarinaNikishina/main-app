import {
  Badge,
  Button,
  ButtonSize,
  ButtonVariants,
  Down12Icon,
  HStack,
  Link,
  Text,
  VStack,
} from '@moysklad/uikit'
import { subscription } from '../../data/mockData'
import { OverflowHint } from '../OverflowHint/OverflowHint'
import styles from './SubscriptionCard.module.css'

export function SubscriptionCard() {
  return (
    <section className={styles.card}>
      <VStack size="s12" className={styles.body}>
        <HStack size="s16" className={styles.titleRow}>
          <Text.H3>Подписка</Text.H3>
          <HStack size="s8">
            <Badge label={subscription.status} variant="green" />
            <Badge label={subscription.discount} variant="orange" />
          </HStack>
        </HStack>

        <div className={styles.fields}>
          <div className={styles.field}>
            <Text.Caption colorToken="secondary">Тариф</Text.Caption>
            <OverflowHint text={subscription.tariff} className={styles.ellipsis}>
              <Link href="#" className={styles.ellipsis}>
                {subscription.tariff}
              </Link>
            </OverflowHint>
          </div>
          <div className={styles.field}>
            <Text.Caption colorToken="secondary">Стоимость</Text.Caption>
            <Text.Body>
              {subscription.price} {subscription.period}
            </Text.Body>
          </div>
          <div className={styles.fieldGrow}>
            <Text.Caption colorToken="secondary">Автопродление</Text.Caption>
            <button type="button" className={styles.autoRenewValue}>
              <OverflowHint text={subscription.autoRenew} className={styles.autoRenewText}>
                <Text.Body className={styles.autoRenewText}>{subscription.autoRenew}</Text.Body>
              </OverflowHint>
              <Down12Icon />
            </button>
          </div>
        </div>

        <HStack size="s16" className={styles.actions}>
          <Button variant={ButtonVariants.ADDITIONAL} size={ButtonSize.L}>
            {subscription.changeCta}
          </Button>
          <Button variant={ButtonVariants.FRAMELESS} size={ButtonSize.L}>
            {subscription.selectTariffCta}
          </Button>
        </HStack>

        <div className={styles.footnote}>
          <Text.Body>
            Доступно добавление опций в текущую подписку.
            <br />
            Оплата только за&nbsp;оставшиеся&nbsp;дни.{' '}
            <Link href="#">{subscription.footnoteLink}</Link>
          </Text.Body>
        </div>
      </VStack>
    </section>
  )
}
