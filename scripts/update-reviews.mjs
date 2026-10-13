// Atualiza src/data/reviews.json com as avaliações 5 estrelas mais recentes do Google Maps.
// Fonte: SerpApi (engine google_maps_reviews). Requer a variável de ambiente SERPAPI_KEY.
// Segurança: se a API falhar ou vier com menos avaliações que o necessário, o arquivo atual é mantido.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const DATA_ID = '0x94b8a94b98981243:0x3a39b9ea8d650f3a' // Nutricionista Mariah Oréfice
const TOTAL = 4
const COLORS = ['#DDE8D8', '#E8DDD8', '#D8DEE8', '#E8D8E0']
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'reviews.json')

function initials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    const first = parts[0][0]
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
}

// Texto original do autor (a API pode devolver o texto traduzido em "snippet").
function commentOf(r) {
    const text = r.extracted_snippet?.original ?? r.snippet ?? ''
    return text.replace(/\s+/g, ' ').trim()
}

export function pickReviews(apiJson, total = TOTAL) {
    const list = Array.isArray(apiJson?.reviews) ? apiJson.reviews : []
    return list
        .filter(r => r.rating === 5 && r.user?.name && commentOf(r).length > 0)
        .slice(0, total)
        .map((r, i) => ({
            id: i + 1,
            name: r.user.name,
            date: 'Avaliação no Google',
            rating: 5,
            initials: initials(r.user.name),
            color: COLORS[i % COLORS.length],
            comment: commentOf(r),
        }))
}

async function main() {
    const key = process.env.SERPAPI_KEY
    if (!key) throw new Error('SERPAPI_KEY não definida')

    const url = new URL('https://serpapi.com/search.json')
    url.searchParams.set('engine', 'google_maps_reviews')
    url.searchParams.set('data_id', DATA_ID)
    url.searchParams.set('sort_by', 'newestFirst')
    url.searchParams.set('hl', 'pt-br')
    url.searchParams.set('api_key', key)

    const res = await fetch(url)
    if (!res.ok) throw new Error(`SerpApi respondeu ${res.status}`)
    const json = await res.json()
    if (json.error) throw new Error(`SerpApi: ${json.error}`)

    const reviews = pickReviews(json)
    if (reviews.length < TOTAL) {
        console.log(`Só ${reviews.length} avaliações válidas (precisa de ${TOTAL}). Mantendo arquivo atual.`)
        return
    }

    const next = JSON.stringify(reviews, null, 2) + '\n'
    let current = ''
    try { current = readFileSync(OUT, 'utf8') } catch { /* primeira execução */ }
    if (current === next) {
        console.log('Sem avaliações novas.')
        return
    }
    writeFileSync(OUT, next, 'utf8')
    console.log('reviews.json atualizado:', reviews.map(r => r.name).join(', '))
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main().catch(err => { console.error(err.message); process.exit(1) })
}
