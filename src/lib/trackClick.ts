import { supabase } from './supabase'

export type ClickTarget = 'whatsapp' | 'instagram'

/**
 * Fire-and-forget click tracking.
 * Never blocks navigation – safe to call inside onClick of <a target="_blank">.
 */
export function trackClick(target: ClickTarget) {
    supabase
        .from('link_clicks')
        .insert({ target })
        .then(({ error }) => {
            if (error) console.error('[trackClick] ERRO:', error.message, '| code:', error.code)
            else console.log('[trackClick] registado ✓', target)
        })
}
