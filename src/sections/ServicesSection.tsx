import { MapPin, Monitor, ArrowRight, AlertCircle } from 'lucide-react'
import FadeUp from '../components/FadeUp'
import SectionDivider from '../components/SectionDivider'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { trackClick } from '../lib/trackClick'

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5514981006615'
const WA_LINK_DEFAULT = `https://wa.me/${WA_NUMBER}?text=Olá! Quero agendar meu acompanhamento nutricional.`
const WA_LINK_PRESENCIAL = `https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de agendar a modalidade presencial em Jaú.`
const WA_LINK_ONLINE = `https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de agendar a modalidade online.`

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    sectionBg: '#F3EFE8', // Tom ligeiramente contrastante para separar visualmente as seções
    card: '#FAF8F5',
    cardModalidade: '#FFFFFF',
    muted: '#5F6C63',
    border: '#E0DBD4',
    accent: '#25D366',
}

const bulletPoints = [
    'Não consegue ganhar massa muscular mesmo treinando com constância;',
    'Estagnou nos resultados;',
    'Não consegue ver os músculos marcados;',
    'Sente fadiga nos treinos;',
    'Quer evoluir e dar um passo a mais nos treinos (seja crossfit, corrida ou musculação);',
]

const servicesCards = [
    {
        id: 'presencial',
        Icon: MapPin,
        title: 'Modalidade presencial - Jaú SP',
        description:
            'Consulta completa com avaliação antropométrica, análise de exames e elaboração do plano alimentar totalmente personalizado pra sua necessidade. Acompanhamentos feitos a cada 45 dias para ajustes e reavaliação.',
        cta: 'Agendar Presencial',
        link: WA_LINK_PRESENCIAL,
        badge: 'Consultório · Jaú SP',
    },
    {
        id: 'online',
        Icon: Monitor,
        title: 'Modalidade online',
        description:
            'Consulta completa com avaliação antropométrica - feita via online, análise de exames e elaboração do plano alimentar totalmente personalizado pra sua necessidade. Acompanhamentos feitos a cada 45 dias para ajustes e reavaliação. As consultas são realizadas via google meet',
        cta: 'Agendar Online',
        link: WA_LINK_ONLINE,
        badge: 'Google Meet · Todo o Brasil & Mundo',
    },
]

export default function ServicesSection() {
    return (
        <section
            id="acompanhamentos"
            style={{
                backgroundColor: C.sectionBg,
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                padding: '120px 0 80px',
                scrollMarginTop: '90px',
            }}
        >
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>

                {/* ── 1. Section Header ── */}
                <FadeUp>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                            <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: C.sage
                            }}>
                                Acompanhamento Nutricional
                            </span>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: 300,
                            color: C.deep,
                            letterSpacing: '-0.01em',
                            marginBottom: '16px',
                        }}>
                            Método Performa
                        </h2>
                    </div>
                </FadeUp>

                {/* ── 2. Bloco Introdutório: Método Performa + Bullet Points + Photo Placeholder ── */}
                <FadeUp delay={0.1}>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                        style={{
                            backgroundColor: C.card,
                            border: `1px solid ${C.border}`,
                            borderRadius: '32px',
                            padding: '44px',
                            boxShadow: '0 12px 40px rgba(20,38,28,0.04)',
                            marginBottom: '80px', // Espaçamento amplo antes da próxima sub-seção
                        }}
                    >
                        {/* Texto e Lista */}
                        <div className="lg:col-span-7">
                            <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '18px',
                                fontWeight: 600,
                                color: C.deep,
                                lineHeight: 1.6,
                                marginBottom: '28px',
                            }}>
                                Meu acompanhamento é baseado no Método Performa, voltado para pessoas que treinam ou simplesmente querem melhorar a composição corporal, e além disso:
                            </p>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, margin: 0 }}>
                                {bulletPoints.map((item, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                                        <div style={{
                                            marginTop: '3px',
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '8px',
                                            backgroundColor: '#DCE6DA',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            color: C.sage,
                                        }}>
                                            <AlertCircle size={15} />
                                        </div>
                                        <span style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '15px',
                                            color: C.deep,
                                            lineHeight: 1.6,
                                            fontWeight: 500,
                                        }}>
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Placeholder Estratégico para Foto de Treino / Método */}
                        <div className="lg:col-span-5">
                            <PhotoPlaceholder
                                label="Foto em Ação / Treino"
                                sublabel="Imagem mostrando rotina de treinos, esporte ou atendimento clínico"
                                dimensions="Recomendado: 800 x 600px (4:3) ou 800 x 800px"
                                aspectRatio="4/3"
                                style={{
                                    border: '1.5px dashed #A3B899',
                                    backgroundColor: '#FFFFFF',
                                }}
                            />
                        </div>
                    </div>
                </FadeUp>

                {/* ── 3. Transição & Cabeçalho dos Cards de Modalidade ── */}
                <FadeUp delay={0.15}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(28px, 4vw, 40px)',
                            fontWeight: 300,
                            color: C.deep,
                            marginBottom: '12px',
                        }}>
                            Escolha sua Modalidade
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '15px',
                            color: C.muted,
                            maxWidth: '480px',
                            margin: '0 auto',
                        }}>
                            Atendimento presencial com avaliação física em Jaú ou 100% online de qualquer lugar do mundo.
                        </p>
                    </div>
                </FadeUp>

                {/* ── 4. Cards de Acompanhamento (Presencial e Online) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px', marginBottom: '88px' }}>
                    {servicesCards.map((card, i) => (
                        <FadeUp key={card.id} delay={i * 0.12}>
                            <div
                                style={{
                                    backgroundColor: C.cardModalidade,
                                    border: `1px solid ${C.border}`,
                                    borderRadius: '28px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 30px rgba(20,38,28,0.04)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(20,38,28,0.09)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(20,38,28,0.04)'
                                }}
                            >
                                {/* Barra superior de destaque */}
                                <div style={{ height: '4px', backgroundColor: C.deep }} />

                                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    {/* Topo do card: ícone + badge */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '16px',
                                            backgroundColor: '#EAEFE8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: C.deep,
                                        }}>
                                            <card.Icon size={24} />
                                        </div>
                                        <span style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            letterSpacing: '0.06em',
                                            color: C.sage,
                                            border: `1px solid ${C.border}`,
                                            padding: '6px 16px',
                                            borderRadius: '100px',
                                            backgroundColor: C.cream,
                                        }}>
                                            {card.badge}
                                        </span>
                                    </div>

                                    {/* Cabeçalho / Título rigorosamente como solicitado */}
                                    <h4 style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '26px',
                                        fontWeight: 400,
                                        color: C.deep,
                                        marginBottom: '18px',
                                        lineHeight: 1.25,
                                    }}>
                                        {card.title}
                                    </h4>

                                    {/* Corpo do card rigorosamente como solicitado */}
                                    <p style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '15px',
                                        color: C.muted,
                                        lineHeight: 1.85,
                                        marginBottom: '36px',
                                        flex: 1,
                                    }}>
                                        {card.description}
                                    </p>

                                    {/* Botão de Agendamento do Card */}
                                    <a
                                        href={card.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackClick('whatsapp')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            backgroundColor: C.deep,
                                            color: '#FAF8F5',
                                            padding: '16px 24px',
                                            borderRadius: '14px',
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            letterSpacing: '0.02em',
                                            transition: 'opacity 0.25s ease',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                                    >
                                        {card.cta}
                                        <ArrowRight size={15} />
                                    </a>
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>

                {/* ── 5. Chamada para Ação (CTA) e Botão Grande Retangular ── */}
                <FadeUp delay={0.2}>
                    <div
                        style={{
                            backgroundColor: C.deep,
                            color: '#FAF8F5',
                            borderRadius: '32px',
                            padding: '56px 36px',
                            textAlign: 'center',
                            boxShadow: '0 24px 60px rgba(20,38,28,0.18)',
                        }}
                    >
                        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(22px, 3.2vw, 32px)',
                                fontWeight: 300,
                                lineHeight: 1.45,
                                marginBottom: '36px',
                                letterSpacing: '-0.01em',
                            }}>
                                Se uma dessas questões te incomodam, chegou a hora de um acompanhamento que caiba e faça sentido pra SUA rotina!
                            </p>

                            {/* Botão grande e retangular de destaque configurado para WhatsApp */}
                            <a
                                href={WA_LINK_DEFAULT}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackClick('whatsapp')}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    backgroundColor: '#25D366',
                                    color: '#FFFFFF',
                                    width: '100%',
                                    maxWidth: '480px',
                                    padding: '22px 36px',
                                    borderRadius: '12px', // Grande e Retangular
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    letterSpacing: '0.03em',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#20BA5A'
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 14px 36px rgba(37,211,102,0.4)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#25D366'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)'
                                }}
                            >
                                {/* Ícone oficial do WhatsApp */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    style={{ width: 22, height: 22, fill: 'white', flexShrink: 0 }}
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Falar no WhatsApp com a Nutri
                            </a>
                        </div>
                    </div>
                </FadeUp>

            </div>

            {/* Espaçamento generoso antes do divider */}
            <div style={{ marginTop: '48px' }}>
                <SectionDivider targetId="#avaliacoes" label="Avaliações" />
            </div>
        </section>
    )
}
