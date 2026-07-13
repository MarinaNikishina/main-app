import { useEffect, useState } from 'react'
import { CurrentSolutionPage } from './pages/CurrentSolutionPage'
import { allVariants } from './variants/data'
import { VariantShell } from './variants/VariantShell'
import { VariantsIndex } from './variants/VariantsIndex'

function parseRoute(hash: string) {
  const path = hash.replace(/^#/, '') || '/variants'
  if (path === '/' || path === '/variants') return { type: 'index' as const }
  if (path === '/current') return { type: 'current' as const }
  const match = path.match(/^\/v\/(\d+)$/)
  if (match) {
    const id = Number(match[1])
    const config = allVariants.find((item) => item.id === id)
    if (config) return { type: 'variant' as const, config }
  }
  return { type: 'index' as const }
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/variants'
    }
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const route = parseRoute(hash)

  if (route.type === 'current') return <CurrentSolutionPage />
  if (route.type === 'variant') return <VariantShell config={route.config} />
  return <VariantsIndex />
}
