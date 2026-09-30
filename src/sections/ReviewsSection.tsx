import { Star, ExternalLink } from 'lucide-react'
import FadeUp from '../components/FadeUp'
import SectionDivider from '../components/SectionDivider'

const GOOGLE_PROFILE_URL = 'https://maps.app.goo.gl/RN1yD8QGsSDJAQk66'

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    card: '#FFFFFF',
    muted: '#5F6C63',
    border: '#E0DBD4',
}

const reviews = [
    {
        id: 1,
        name: 'Jéssica Corrêa',
        date: 'Avaliação no Google',
        rating: 5,
        initials: 'JC',
        color: '#DDE8D8',
        comment: 'A melhor de jauuuuu ✨💪🏼 confio de olhos fechados!'
    },
    {
        id: 2,
        name: 'Marina Migliorucci',
        date: 'Avaliação no Google',
        rating: 5,
        initials: 'MM',
        color: '#E8DDD8',
        comment: 'A Mariah faz um trabalho incrível. Ela conseguiu me ajudar a mudar a minha alimentação e estamos vendo resultados lindos na minha saúde. Hoje tenho muito mais qualidade de vida e como super bem.'
    },
    {
        id: 3,
        name: 'Ana Clara',
        date: 'Avaliação no Google',
        rating: 5,
        initials: 'AC',
        color: '#D8DEE8',
        comment: 'A Mariah é uma profissional excepcional. Seu consultório é um espaço cuidadosamente projetado para proporcionar um ambiente aconchegante e acolhedor aos pacientes. Mariah me ofereceu uma experiência completa e muito positiva.'
    },
    {
        id: 4,
        name: 'Cassia Castro',
        date: 'Avaliação no Google',
        rating: 5,
        initials: 'CC',
        color: '#E8D8E0',
        comment: 'Recomendo de olhos fechados!! Uma ótima profissional que me ajudou a fazer melhores escolhas na alimentação para atingir melhores resultados!! 🖤'
    },
]

function Stars({ count }: { count: number }) {
    return (
        <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={13} color="#C8A951" fill="#C8A951" />
            ))}
        </div>
    )
}

export default function ReviewsSection() {
    return (
        <section id="avaliacoes" style={{ backgroundColor: C.cream, padding: '112px 0 0', scrollMarginTop: '90px' }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px 112px' }}>

                {/* Header */}
                <FadeUp>
                    <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage }}>
                                Depoimentos
                            </span>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 300, color: C.deep, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                            O que dizem os pacientes
                        </h2>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: C.muted, maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
                            Histórias reais e avaliações 5 estrelas no Google Maps.
                        </p>
                    </div>
                </FadeUp>

                {/* Reviews grid */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px', maxWidth: '1000px', margin: '0 auto 56px' }}>
                    {reviews.map((r, i) => (
                        <FadeUp key={r.id} delay={(i % 3) * 0.1}>
                            <div style={{
                                backgroundColor: C.card,
                                border: `1px solid ${C.border}`,
                                borderRadius: '20px',
                                padding: '28px',
                                overflow: 'hidden',
                                height: '100%',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(20,38,28,0.08)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                            >
                                {/* Top: avatar + name + Google icon */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                                        backgroundColor: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: C.deep
                                    }}>
                                        {r.initials}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: C.deep, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: C.muted, marginTop: '2px' }}>{r.date}</p>
                                    </div>
                                    {/* Google logo */}
                                    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>

                                {/* Stars */}
                                <div style={{ marginBottom: '14px' }}>
                                    <Stars count={r.rating} />
                                </div>

                                {/* Comment */}
                                <p style={{
                                    fontFamily: 'var(--font-sans)', fontSize: '14px', color: C.muted,
                                    lineHeight: 1.75, overflowWrap: 'break-word', wordBreak: 'break-word'
                                }}>
                                    "{r.comment}"
                                </p>
                            </div>
                        </FadeUp>
                    ))}
                </div>

                {/* See all button */}
                <FadeUp>
                    <div style={{ textAlign: 'center' }}>
                        <a
                            href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                color: C.deep, fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500,
                                textDecoration: 'none', border: `1.5px solid ${C.border}`,
                                padding: '13px 28px', borderRadius: '100px',
                                letterSpacing: '0.02em', transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.deep; e.currentTarget.style.color = '#FAF8F5'; e.currentTarget.style.borderColor = C.deep }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.deep; e.currentTarget.style.borderColor = C.border }}
                        >
                            Ver todas as avaliações no Google
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </FadeUp>
            </div>
            <SectionDivider targetId="#contato" label="Contato" />
        </section>
    )
}
