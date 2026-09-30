import { Phone, Mail, Clock, MapPin, ExternalLink, Instagram } from 'lucide-react'
import FadeUp from '../components/FadeUp'
import { trackClick } from '../lib/trackClick'

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5514999999999'

const MAPS_EMBED_URL =
    'https://maps.google.com/maps?q=Tv+Jos%C3%A9+Ver%C3%ADssimo+26+Vila+Assis+Ja%C3%BA+SP+17210-220+Brasil&output=embed&z=17&hl=pt-BR'

const MAPS_DIRECTIONS = 'https://maps.app.goo.gl/RN1yD8QGsSDJAQk66'

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    card: '#F0EDE8',
    muted: '#5F6C63',
    border: '#E0DBD4',
}

const contactItems = [
    { Icon: Phone, label: 'WhatsApp / Telefone', value: '(14) 98100-6615', href: `https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de mais informações.`, external: true },
    { Icon: Mail, label: 'E-mail', value: 'nutrimariah@hotmail.com', href: 'mailto:nutrimariah@hotmail.com', external: false },
    { Icon: Instagram, label: 'Instagram', value: '@nutrimariah', href: 'https://instagram.com/nutrimariah', external: true },
]

const schedule = [
    { day: 'Segunda a Sexta', hours: '08:00 – 18:00' },
    { day: 'Sábado', hours: '09:00 – 13:00' },
    { day: 'Domingo', hours: 'Fechado' },
]

function InfoCard({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px' }}>
            {children}
        </div>
    )
}

export default function ContactSection() {
    return (
        <section id="contato" style={{ backgroundColor: C.cream, padding: '112px 0', scrollMarginTop: '90px' }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header */}
                <FadeUp>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage }}>
                                Fale Conosco
                            </span>
                            <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: C.sage }} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 300, color: C.deep, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                            Agende a sua Consulta
                        </h2>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: C.muted, maxWidth: '440px', margin: '0 auto', lineHeight: 1.8 }}>
                            Dê o primeiro passo para uma alimentação que transforma. Entre em contato agora.
                        </p>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>

                    {/* ── Left: Info cards ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Contact links */}
                        <FadeUp delay={0.05}>
                            <InfoCard>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400, color: C.deep, marginBottom: '28px' }}>
                                    Informações de Contato
                                </h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {contactItems.map(item => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                target={item.external ? '_blank' : undefined}
                                                rel={item.external ? 'noopener noreferrer' : undefined}
                                                onClick={() => {
                                                    if (item.label === 'WhatsApp / Telefone') trackClick('whatsapp')
                                                    if (item.label === 'Instagram') trackClick('instagram')
                                                }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
                                            >
                                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(20,38,28,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <item.Icon size={18} color={C.deep} />
                                                </div>
                                                <div>
                                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.06em', color: C.muted, marginBottom: '3px' }}>{item.label}</p>
                                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: C.deep }}>{item.value}</p>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </InfoCard>
                        </FadeUp>

                        {/* Schedule */}
                        <FadeUp delay={0.1}>
                            <InfoCard>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(20,38,28,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Clock size={18} color={C.deep} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 400, color: C.deep }}>
                                        Horários de Atendimento
                                    </h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                    {schedule.map((s, i) => (
                                        <div key={s.day} style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            padding: '12px 0',
                                            borderBottom: i < schedule.length - 1 ? `1px solid ${C.border}` : 'none',
                                        }}>
                                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: C.muted }}>{s.day}</span>
                                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: C.deep }}>{s.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                        </FadeUp>

                        {/* WhatsApp CTA */}
                        <FadeUp delay={0.15}>
                            <a
                                href={`https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de agendar uma consulta.`}
                                target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    backgroundColor: '#25D366', color: 'white',
                                    padding: '18px', borderRadius: '16px',
                                    fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
                                    textDecoration: 'none', letterSpacing: '0.02em',
                                    transition: 'opacity 0.25s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: 'white', flexShrink: 0 }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar pelo WhatsApp
                            </a>
                        </FadeUp>
                    </div>

                    {/* ── Right: Map + Address ── */}
                    <FadeUp delay={0.08}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Map */}
                            <div style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
                                <iframe
                                    src={MAPS_EMBED_URL}
                                    width="100%" height="380"
                                    style={{ border: 0, display: 'block' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização NutriMariah"
                                />
                            </div>

                            {/* Address */}
                            <InfoCard>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(20,38,28,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                        <MapPin size={18} color={C.deep} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, color: C.deep, marginBottom: '8px' }}>
                                            Endereço do Consultório
                                        </h4>
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: C.muted, lineHeight: 1.7, marginBottom: '20px' }}>
                                            Tv. José Veríssimo, 26 – Vila Assis<br />
                                            Jaú, SP · CEP 17210-220
                                        </p>
                                        <a
                                            href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600,
                                                color: C.deep, textDecoration: 'none',
                                                border: `1.5px solid ${C.border}`, padding: '10px 20px',
                                                borderRadius: '100px', letterSpacing: '0.03em',
                                                transition: 'all 0.25s ease',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.deep; e.currentTarget.style.color = '#FAF8F5'; e.currentTarget.style.borderColor = C.deep }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.deep; e.currentTarget.style.borderColor = C.border }}
                                        >
                                            Abrir no Google Maps
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </InfoCard>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    )
}
