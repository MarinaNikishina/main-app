import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import styles from './PasswordGate.module.css'

const AUTH_KEY = 'main-app-preview-auth'
/** SHA-256 of the preview password (utf-8). */
const PASSWORD_HASH =
  '2f7204a15c25f7a2c77b70e6daa4d8f8b94bb005959e0086fa22e36a6033186c'

async function sha256(text: string) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

type Props = {
  children: ReactNode
}

export function PasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === PASSWORD_HASH
    } catch {
      return false
    }
  })
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!unlocked) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
  }, [unlocked])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setChecking(true)
    setError(false)
    try {
      const hash = await sha256(value.trim())
      if (hash === PASSWORD_HASH) {
        sessionStorage.setItem(AUTH_KEY, PASSWORD_HASH)
        setUnlocked(true)
        return
      }
      setError(true)
    } finally {
      setChecking(false)
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div className={styles.overlay}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={styles.title}>Доступ к превью</h1>
        <p className={styles.lead}>Введите пароль, чтобы открыть варианты блока «О решении».</p>
        <label className={styles.label} htmlFor="preview-password">
          Пароль
        </label>
        <input
          id="preview-password"
          className={styles.input}
          type="password"
          autoComplete="current-password"
          autoFocus
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError(false)
          }}
        />
        {error ? <p className={styles.error}>Неверный пароль</p> : null}
        <button className={styles.button} type="submit" disabled={checking || !value.trim()}>
          Войти
        </button>
      </form>
    </div>
  )
}
