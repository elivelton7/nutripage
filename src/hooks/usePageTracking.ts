import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Drop-in hook: call once per page/route to record a visit.
 * Fire-and-forget – never blocks rendering.
 * Stores only: visited_at (auto), path (string). No PII.
 * useRef guard prevents React StrictMode from double-inserting.
 */
export function usePageTracking(path = '/') {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return  // StrictMode guard
    tracked.current = true

    supabase
      .from('page_visits')
      .insert({ path })
      .then(({ error }) => {
        if (error) console.error('[tracking] insert failed:', error.message, error.code)
        else console.log('[tracking] visit recorded ✓', path)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
