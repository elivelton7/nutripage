import { GraduationCap, Award, Sparkles, CheckCircle2 } from 'lucide-react'
import FadeUp from '../components/FadeUp'
import SectionDivider from '../components/SectionDivider'
import PhotoPlaceholder from '../components/PhotoPlaceholder'

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    card: '#F0EDE8',
    muted: '#5F6C63',
    border: '#E0DBD4',
}

const credentials = [
    'Nutricionista (USC)',
    'Pós graduada Nutrição Esportiva e Obesidade (FMRP - USP)',
    'Pós graduanda Nutrição Esportiva, Estética e Saúde da Mulher (UNIGUAÇU)',
]

export default function AboutSection() {
    return (
        <section id="quem-sou-eu" style={{ backgroundColor: C.cream, padding: '112px 0 0', scrollMarginTop: '90px' }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px 80px' }}>

                {/* Section Header */}
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
                                Trajetória &amp; Propósito
                            </span>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: 300,
                            color: C.deep,
                            letterSpacing: '-0.01em',
                        }}>
                            Quem sou Eu
                        </h2>
                    </div>
                </FadeUp>

                {/* Grid: Photo Placeholder | Text & Credentials */}
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: '56px' }}>

                    {/* Coluna da Foto (Placeholder Visual Elegante) */}
                    <div className="lg:col-span-5">
                        <FadeUp delay={0.1}>
                            <div className="relative">
                                {/* Moldura decorativa atrás do placeholder */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: '-12px',
                                        backgroundColor: '#E5ECE3',
                                        borderRadius: '32px',
                                        zIndex: 0,
                                        transform: 'rotate(-1.5deg)',
                                    }}
                                />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <PhotoPlaceholder
                                        label="Foto de Perfil – Mariah Oréfice"
                                        sublabel="Retrato profissional em alta resolução da nutricionista esportiva"
                                        dimensions="Recomendado: 800 x 1000px · Vertical (4:5)"
                                        aspectRatio="4/5"
                                        currentSrc="https://xqppzwzeykwlitwzutcn.supabase.co/storage/v1/object/public/imagens/mariah%20colorido.jpg"
                                        style={{ boxShadow: '0 20px 50px rgba(20,38,28,0.12)' }}
                                    />
                                </div>

                                {/* Selo de Experiência / Pacientes */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '-20px',
                                        right: '-16px',
                                        zIndex: 2,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '18px',
                                        padding: '16px 22px',
                                        boxShadow: '0 12px 32px rgba(20,38,28,0.12)',
                                        border: `1px solid ${C.border}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '12px',
                                            backgroundColor: '#EAEFE8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: C.sage,
                                        }}
                                    >
                                        <Award size={22} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: C.deep, lineHeight: 1 }}>
                                            8 Anos
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: C.muted, marginTop: '3px' }}>
                                            +1.600 Pacientes no Mundo
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>

                    {/* Coluna de Texto e Credenciais */}
                    <div className="lg:col-span-7">
                        <FadeUp delay={0.2}>
                            <div style={{
                                backgroundColor: C.card,
                                borderRadius: '28px',
                                border: `1px solid ${C.border}`,
                                padding: '40px 44px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                    <Sparkles size={18} color={C.sage} />
                                    <span style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: C.sage
                                    }}>
                                        Mariah Oréfice
                                    </span>
                                </div>

                                {/* Texto Principal rigorosamente como solicitado */}
                                <div style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '16px',
                                    lineHeight: 1.85,
                                    color: C.deep,
                                    marginBottom: '32px',
                                }}>
                                    <p style={{ marginBottom: '20px' }}>
                                        Me chamo Mariah Oréfice e sou nutricionista esportiva há 8 anos, com mais de 1600 pacientes atendidos pelo mundo todo, sempre fui apaixonada por essa área e por esportes. Já estive na condição de me esforçar muito e não ter resultados de massa muscular, e quando entendi e aprendi que precisava COMER MELHOR, com mais comida e menos medo, tudo mudou.
                                    </p>
                                    <p style={{ color: C.muted }}>
                                        E meu objetivo e meta é te ajudar e direcionar nessa mudança de chave, para que entenda que para definir o corpo, melhorar a performance e treinar muito melhor, basta comer MELHOR e não ter medo o carboidrato. Eu quero e vou direcionar um plano que finalmente faça sentido pra sua vida.
                                    </p>
                                </div>

                                {/* Divisor sutil */}
                                <div style={{ height: '1px', backgroundColor: C.border, marginBottom: '28px' }} />

                                {/* Lista de Credenciais */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                        <GraduationCap size={18} color={C.deep} />
                                        <h3 style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: C.deep,
                                        }}>
                                            Formação &amp; Credenciais
                                        </h3>
                                    </div>

                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
                                        {credentials.map((cred) => (
                                            <li key={cred} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{
                                                    marginTop: '3px',
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#DCE6DA',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}>
                                                    <CheckCircle2 size={13} color={C.sage} />
                                                </div>
                                                <span style={{
                                                    fontFamily: 'var(--font-sans)',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    color: C.deep,
                                                    lineHeight: 1.6,
                                                }}>
                                                    {cred}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeUp>
                    </div>

                </div>

            </div>
            <SectionDivider targetId="#acompanhamentos" label="Acompanhamentos" />
        </section>
    )
}
