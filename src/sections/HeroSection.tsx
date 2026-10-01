import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import FadeUp from '../components/FadeUp'
import { trackClick } from '../lib/trackClick'

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5514999999999'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de agendar uma consulta nutricional.`
const PHOTO_URL = 'https://xqppzwzeykwlitwzutcn.supabase.co/storage/v1/object/public/imagens/pagina%20inicial.jpg'

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    muted: '#5F6C63',
    border: '#E0DBD4',
    cardBg: '#E8EDE6',
}

export default function HeroSection() {
    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section
            id="inicio"
            style={{ backgroundColor: C.cream, minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center' }}
        >
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '64px 24px 80px', width: '100%' }}>

                {/* Grid: text | photo */}
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '72px', alignItems: 'center' }}>

                    {/* ── Left: Text content ── */}
                    <div>
                        {/* Label */}
                        <FadeUp>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                                <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                                <span style={{
                                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage
                                }}>
                                    Nutrição Clínica &amp; Esportiva · CRN 3-57640
                                </span>
                            </div>
                        </FadeUp>

                        {/* H1 */}
                        <FadeUp delay={0.1}>
                            <h1 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(28px, 3.8vw, 46px)',
                                fontWeight: 300,
                                lineHeight: 1.2,
                                color: C.deep,
                                marginBottom: '24px',
                                letterSpacing: '-0.01em',
                            }}>
                                Nutrição para quem quer treinar melhor, ganhar massa e definir o corpo!
                            </h1>
                        </FadeUp>

                        {/* Subtitle */}
                        <FadeUp delay={0.18}>
                            <p style={{
                                fontFamily: 'var(--font-sans)',
                                color: C.muted,
                                fontSize: '17px',
                                lineHeight: 1.7,
                                marginBottom: '36px',
                                maxWidth: '480px',
                                fontWeight: 400,
                            }}>
                                Nutrição para pessoas que treinam e buscam definição muscular 💚
                            </p>
                        </FadeUp>

                        {/* Location pills */}
                        <FadeUp delay={0.24}>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
                                {['📍 Presencial · Jaú, SP', '🖥️ Online · Todo o Brasil'].map(label => (
                                    <span key={label} style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '12px', fontWeight: 500,
                                        color: C.sage, letterSpacing: '0.04em',
                                        border: `1px solid ${C.border}`,
                                        padding: '7px 18px', borderRadius: '100px',
                                    }}>{label}</span>
                                ))}
                            </div>
                        </FadeUp>

                        {/* CTAs */}
                        <FadeUp delay={0.3}>
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                <a
                                    href={WA_LINK} target="_blank" rel="noopener noreferrer"
                                    onClick={() => trackClick('whatsapp')}
                                    className="btn-primary"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                        backgroundColor: C.deep, color: '#FAF8F5',
                                        padding: '15px 32px', borderRadius: '100px',
                                        fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em',
                                        textDecoration: 'none', transition: 'all 0.3s ease',
                                    }}
                                >
                                    Agendar Consulta
                                    <ArrowRight size={15} />
                                </a>
                                <a
                                    href="#acompanhamentos"
                                    onClick={(e) => scrollTo(e, '#acompanhamentos')}
                                    className="btn-outline"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                        color: C.deep, padding: '15px 32px', borderRadius: '100px',
                                        fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em',
                                        textDecoration: 'none', border: `1.5px solid ${C.border}`,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Conhecer Planos
                                </a>
                            </div>
                        </FadeUp>
                    </div>

                    {/* ── Right: Photo ── */}
                    <FadeUp delay={0.15} className="hidden lg:block">
                        <div style={{ position: 'relative', paddingBottom: '32px', paddingRight: '32px' }}>
                            {/* Decorative block behind photo */}
                            <div style={{
                                position: 'absolute', bottom: 0, right: 0,
                                width: '82%', height: '82%',
                                backgroundColor: C.cardBg, borderRadius: '20px', zIndex: 0,
                            }} />
                            <img
                                src={PHOTO_URL}
                                alt="Mariah, nutricionista esportiva"
                                style={{
                                    width: '100%', height: '560px',
                                    objectFit: 'cover', objectPosition: 'top center',
                                    borderRadius: '18px',
                                    position: 'relative', zIndex: 1,
                                    boxShadow: '0 20px 60px rgba(20,38,28,0.14)',
                                }}
                            />


                            {/* Floating stat */}
                            <div style={{
                                position: 'absolute', bottom: '48px', left: '-20px', zIndex: 2,
                                backgroundColor: 'white', borderRadius: '16px',
                                padding: '18px 24px',
                                boxShadow: '0 8px 32px rgba(20,38,28,0.12)',
                                minWidth: '148px',
                            }}>
                                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 400, color: C.deep, lineHeight: 1 }}>1600+</div>
                                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: C.muted, marginTop: '6px', letterSpacing: '0.05em', lineHeight: 1.5 }}>Pacientes<br />Atendidos no Mundo</div>
                            </div>
                        </div>
                    </FadeUp>
                </div>

                {/* Scroll cue */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '72px' }}
                    animate={{ y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                >
                    <a href="#quem-sou-eu" onClick={(e) => scrollTo(e, '#quem-sou-eu')}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>Explorar</span>
                        <ChevronDown size={18} color={C.sage} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
