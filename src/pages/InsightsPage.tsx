import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const SECRET = import.meta.env.VITE_METRICS_SECRET_KEY as string

// ── Types ────────────────────────────────────────────────────
interface Visit { visited_at: string }
interface ChartPoint { label: string; visitas: number }

// ── Aggregation helpers ───────────────────────────────────────
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function isoDay(d: Date) { return d.toISOString().slice(0, 10) }
function isoMonth(d: Date) { return d.toISOString().slice(0, 7) }
function isoMonday(d: Date) {
    const c = new Date(d)
    c.setDate(d.getDate() - ((d.getDay() + 6) % 7))
    return isoDay(c)
}

function byDay(visits: Visit[], n = 30): ChartPoint[] {
    const map: Record<string, number> = {}
    const now = new Date()
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now); d.setDate(d.getDate() - i)
        map[isoDay(d)] = 0
    }
    visits.forEach(v => { const k = v.visited_at.slice(0, 10); if (k in map) map[k]++ })
    return Object.entries(map).map(([k, c]) => ({ label: k.slice(5).replace('-', '/'), visitas: c }))
}

function byWeek(visits: Visit[], n = 12): ChartPoint[] {
    const map: Record<string, number> = {}
    const now = new Date()
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now); d.setDate(d.getDate() - i * 7)
        map[isoMonday(d)] = 0
    }
    visits.forEach(v => {
        const k = isoMonday(new Date(v.visited_at))
        if (k in map) map[k]++
    })
    let week = 1
    return Object.entries(map).map(([, c]) => ({ label: `Sem ${week++}`, visitas: c }))
}

function byMonth(visits: Visit[], n = 12): ChartPoint[] {
    const map: Record<string, number> = {}
    const now = new Date()
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        map[isoMonth(d)] = 0
    }
    visits.forEach(v => { const k = v.visited_at.slice(0, 7); if (k in map) map[k]++ })
    return Object.entries(map).map(([k, c]) => ({
        label: MONTHS[parseInt(k.split('-')[1]) - 1],
        visitas: c
    }))
}

// KPIs
function kpiToday(v: Visit[]) {
    const t = isoDay(new Date())
    return v.filter(x => x.visited_at.slice(0, 10) === t).length
}
function kpiWeek(v: Visit[]) {
    const mon = new Date(); mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7)); mon.setHours(0,0,0,0)
    return v.filter(x => new Date(x.visited_at) >= mon).length
}
function kpiMonth(v: Visit[]) {
    const prefix = isoMonth(new Date())
    return v.filter(x => x.visited_at.startsWith(prefix)).length
}

// ── Sub-components ───────────────────────────────────────────
function KPICard({ label, value, sub }: { label: string; value: number; sub?: string }) {
    return (
        <div style={{
            background: '#1E293B', border: '1px solid #334155',
            borderRadius: 16, padding: '24px 28px'
        }}>
            <p style={{ color: '#94A3B8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{label}</p>
            <p style={{ color: '#F0FDF4', fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{value.toLocaleString('pt-BR')}</p>
            {sub && <p style={{ color: '#64748B', fontSize: 12, marginTop: 6 }}>{sub}</p>}
        </div>
    )
}

type Tab = 'daily' | 'weekly' | 'monthly'
function Chart({ data, type }: { data: ChartPoint[]; type: Tab }) {
    const color = '#4ADE80'
    const axisStyle = { fill: '#64748B', fontSize: 11 }
    return (
        <ResponsiveContainer width="100%" height={280}>
            {type === 'daily'
                ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                        <XAxis dataKey="label" tick={axisStyle} interval={4} />
                        <YAxis allowDecimals={false} tick={axisStyle} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F0FDF4' }} />
                        <Area type="monotone" dataKey="visitas" stroke={color} fill="url(#grad)" strokeWidth={2} dot={false} />
                    </AreaChart>
                )
                : (
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                        <XAxis dataKey="label" tick={axisStyle} />
                        <YAxis allowDecimals={false} tick={axisStyle} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F0FDF4' }} />
                        <Bar dataKey="visitas" fill={color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                )
            }
        </ResponsiveContainer>
    )
}

// ── Main Component ───────────────────────────────────────────
interface InsightsPageProps { secretKey: string }

export default function InsightsPage({ secretKey }: InsightsPageProps) {
    const [visits, setVisits] = useState<Visit[]>([])
    const [clicks, setClicks] = useState<{ target: string; clicked_at: string }[]>([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState<Tab>('daily')

    // ── Reset modal state ─────────────────────────────────────
    const RESET_PASSWORD = 'NM@z3r4r!2025#xZ'
    const [showReset, setShowReset] = useState(false)
    const [resetInput, setResetInput] = useState('')
    const [resetStatus, setResetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [resetMsg, setResetMsg] = useState('')

    const handleReset = async () => {
        if (resetInput !== RESET_PASSWORD) {
            setResetStatus('error')
            setResetMsg('Senha incorreta.')
            return
        }
        setResetStatus('loading')
        // Delete all rows (neq id 0 matches everything)
        const { error } = await supabase.from('page_visits').delete().neq('id', 0)
        if (error) {
            setResetStatus('error')
            setResetMsg(`Erro: ${error.message}`)
        } else {
            setResetStatus('success')
            setResetMsg('Contador zerado com sucesso!')
            setVisits([])
            setShowReset(false)
            setResetInput('')
            setResetStatus('idle')
            setResetMsg('')
        }
    }

    // Block indexation regardless of key validity
    useEffect(() => {
        const meta = document.createElement('meta')
        meta.name = 'robots'; meta.content = 'noindex, nofollow'
        document.head.appendChild(meta)
        document.title = '404 – Not Found'
        return () => { document.head.removeChild(meta) }
    }, [])

    const isValid = SECRET && secretKey === SECRET

    useEffect(() => {
        if (!isValid) return
        document.title = 'Insights – NutriMariah'

        const since = new Date()
        since.setMonth(since.getMonth() - 13)
        const sinceISO = since.toISOString()

        Promise.all([
            supabase.from('page_visits').select('visited_at').gte('visited_at', sinceISO).order('visited_at', { ascending: true }),
            supabase.from('link_clicks').select('target, clicked_at').gte('clicked_at', sinceISO),
        ]).then(([visitsRes, clicksRes]) => {
            setVisits((visitsRes.data as Visit[]) ?? [])
            setClicks((clicksRes.data as { target: string; clicked_at: string }[]) ?? [])
            setLoading(false)
        })
    }, [isValid])

    // 404 for wrong/missing key
    if (!isValid) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#94A3B8', fontFamily: 'system-ui, sans-serif' }}>
                <p style={{ fontSize: 80, fontWeight: 800, color: '#1E293B', lineHeight: 1 }}>404</p>
                <p style={{ fontSize: 16, marginTop: 12 }}>Página não encontrada.</p>
            </div>
        )
    }

    const daily = byDay(visits)
    const weekly = byWeek(visits)
    const monthly = byMonth(visits)

    const chartData = tab === 'daily' ? daily : tab === 'weekly' ? weekly : monthly

    const tabStyle = (t: Tab): React.CSSProperties => ({
        padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: 'pointer', border: 'none',
        background: tab === t ? '#16A34A' : '#1E293B',
        color: tab === t ? '#fff' : '#64748B',
        transition: 'all 0.15s'
    })

    return (
        <div style={{ minHeight: '100vh', background: '#0F172A', color: '#F0FDF4', fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', padding: '0 0 60px' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid #1E293B', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <p style={{ color: '#4ADE80', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>NutriMariah</p>
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>Painel de Métricas</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#334155', background: '#1E293B', padding: '4px 12px', borderRadius: 20 }}>
                        {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    {/* Reset button */}
                    <button
                        onClick={() => { setShowReset(true); setResetStatus('idle'); setResetMsg(''); setResetInput('') }}
                        style={{
                            background: '#1E293B', border: '1px solid #3F1515', color: '#F87171',
                            padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#3F1515' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#1E293B' }}
                    >
                        🗑 Zerar Contador
                    </button>
                </div>
            </div>

            {/* ── Reset modal ── */}
            {showReset && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 100,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
                }}>
                    <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 20, padding: 32, width: '100%', maxWidth: 400 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>⚠️ Zerar Contador</h2>
                        <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
                            Esta ação irá <strong style={{ color: '#F87171' }}>apagar permanentemente</strong> todos os registos de visitas.<br />
                            Digite a senha para confirmar.
                        </p>
                        <input
                            type="password"
                            value={resetInput}
                            onChange={e => { setResetInput(e.target.value); setResetStatus('idle'); setResetMsg('') }}
                            onKeyDown={e => e.key === 'Enter' && handleReset()}
                            placeholder="Senha de confirmação"
                            autoFocus
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: 10,
                                background: '#0F172A', border: '1px solid #334155',
                                color: '#F0FDF4', fontSize: 14, marginBottom: 12,
                                outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                        {resetMsg && (
                            <p style={{ fontSize: 13, marginBottom: 12, color: resetStatus === 'success' ? '#4ADE80' : '#F87171' }}>
                                {resetStatus === 'success' ? '✓' : '✗'} {resetMsg}
                            </p>
                        )}
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={() => setShowReset(false)}
                                style={{ flex: 1, padding: '11px', borderRadius: 10, background: '#0F172A', border: '1px solid #334155', color: '#94A3B8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReset}
                                disabled={resetStatus === 'loading' || !resetInput}
                                style={{
                                    flex: 1, padding: '11px', borderRadius: 10,
                                    background: resetStatus === 'loading' ? '#3F1515' : '#7F1D1D',
                                    border: 'none', color: '#FCA5A5',
                                    fontSize: 13, fontWeight: 700, cursor: resetStatus === 'loading' ? 'wait' : 'pointer',
                                    opacity: !resetInput ? 0.5 : 1, transition: 'all 0.2s',
                                }}
                            >
                                {resetStatus === 'loading' ? 'A apagar…' : 'Confirmar Reset'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 0' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', paddingTop: 80, color: '#334155' }}>A carregar dados…</div>
                ) : (
                    <>
                        {/* KPI Cards – Visitas */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                            <KPICard label="Total de acessos" value={visits.length} sub="desde o início" />
                            <KPICard label="Este mês" value={kpiMonth(visits)} />
                            <KPICard label="Esta semana" value={kpiWeek(visits)} />
                            <KPICard label="Hoje" value={kpiToday(visits)} />
                        </div>

                        {/* Conversões Panel */}
                        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 16, padding: '20px 24px', marginBottom: 24 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#64748B', marginBottom: 16 }}>
                                Conversões via Site
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                                {/* WhatsApp */}
                                {(() => {
                                    const wa = clicks.filter(c => c.target === 'whatsapp')
                                    const waToday = wa.filter(c => c.clicked_at.slice(0, 10) === isoDay(new Date())).length
                                    const waMonth = wa.filter(c => c.clicked_at.startsWith(isoMonth(new Date()))).length
                                    return (
                                        <>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📱 WhatsApp · Total</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#4ADE80', lineHeight: 1 }}>{wa.length}</p>
                                            </div>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📱 WhatsApp · Este mês</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#4ADE80', lineHeight: 1 }}>{waMonth}</p>
                                            </div>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📱 WhatsApp · Hoje</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#4ADE80', lineHeight: 1 }}>{waToday}</p>
                                            </div>
                                        </>
                                    )
                                })()}
                                {/* Instagram */}
                                {(() => {
                                    const ig = clicks.filter(c => c.target === 'instagram')
                                    const igToday = ig.filter(c => c.clicked_at.slice(0, 10) === isoDay(new Date())).length
                                    const igMonth = ig.filter(c => c.clicked_at.startsWith(isoMonth(new Date()))).length
                                    return (
                                        <>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📸 Instagram · Total</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#A78BFA', lineHeight: 1 }}>{ig.length}</p>
                                            </div>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📸 Instagram · Este mês</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#A78BFA', lineHeight: 1 }}>{igMonth}</p>
                                            </div>
                                            <div style={{ background: '#0F172A', borderRadius: 12, padding: '16px 20px' }}>
                                                <p style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>📸 Instagram · Hoje</p>
                                                <p style={{ fontSize: 32, fontWeight: 800, color: '#A78BFA', lineHeight: 1 }}>{igToday}</p>
                                            </div>
                                        </>
                                    )
                                })()}
                            </div>
                        </div>

                        {/* Chart Panel */}
                        <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 20, padding: '28px 24px' }}>
                            {/* Tab switcher */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#CBD5E1', margin: 0 }}>
                                    {tab === 'daily' ? 'Visitas — Últimos 30 dias' : tab === 'weekly' ? 'Visitas — Últimas 12 semanas' : 'Visitas — Últimos 12 meses'}
                                </h2>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button style={tabStyle('daily')} onClick={() => setTab('daily')}>Diário</button>
                                    <button style={tabStyle('weekly')} onClick={() => setTab('weekly')}>Semanal</button>
                                    <button style={tabStyle('monthly')} onClick={() => setTab('monthly')}>Mensal</button>
                                </div>
                            </div>

                            <Chart data={chartData} type={tab} />
                        </div>

                        {/* Footer note */}
                        <p style={{ textAlign: 'center', color: '#1E293B', fontSize: 11, marginTop: 32 }}>
                            Dados anonimizados · Sem coleta de dados pessoais · Conformidade LGPD
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
