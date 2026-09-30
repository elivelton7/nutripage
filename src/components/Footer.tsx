import { Instagram, Mail, Phone } from 'lucide-react'
import { trackClick } from '../lib/trackClick'


const LOGO_URL = 'https://xqppzwzeykwlitwzutcn.supabase.co/storage/v1/object/public/imagens/Gemini_Generated_Image_ossjsfossjsfossj.jfif'

const C = {
    deep: '#14261C',
    mid: '#1F3A2B',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    muted: '#8BA898',
    border: '#243320',
}

const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Quem sou Eu', href: '#quem-sou-eu' },
    { label: 'Acompanhamentos', href: '#acompanhamentos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Contato', href: '#contato' },
]

export default function Footer() {
    const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <footer style={{ backgroundColor: C.deep, color: C.muted }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '72px 24px 0' }}>
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '48px', paddingBottom: '64px', borderBottom: `1px solid ${C.border}` }}>

                    {/* Brand */}
                    <div>
                        <img
                            src={LOGO_URL}
                            alt="NutriMariah"
                            style={{ height: '48px', width: 'auto', objectFit: 'contain', marginBottom: '20px' }}
                        />
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.8, color: C.muted, maxWidth: '240px' }}>
                            Nutrição clínica e esportiva baseada em evidências — para uma vida com mais saúde e leveza.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.cream, marginBottom: '24px', opacity: 0.6 }}>
                            Navegação
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scroll(e, link.href)}
                                        style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: C.muted, textDecoration: 'none', transition: 'color 0.2s ease' }}
                                        onMouseEnter={e => { e.currentTarget.style.color = C.cream }}
                                        onMouseLeave={e => { e.currentTarget.style.color = C.muted }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.cream, marginBottom: '24px', opacity: 0.6 }}>
                            Contato
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { Icon: Phone, label: '(14) 98100-6615', href: 'tel:+5514981006615' },
                                { Icon: Mail, label: 'nutrimariah@hotmail.com', href: 'mailto:nutrimariah@hotmail.com' },
                                { Icon: Instagram, label: '@nutrimariah', href: 'https://instagram.com/nutrimariah' },
                            ].map(({ Icon, label, href }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        onClick={() => { if (href.includes('instagram')) trackClick('instagram') }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-sans)', fontSize: '14px', color: C.muted, textDecoration: 'none', transition: 'color 0.2s ease' }}
                                        onMouseEnter={e => { e.currentTarget.style.color = C.cream }}
                                        onMouseLeave={e => { e.currentTarget.style.color = C.muted }}
                                    >
                                        <Icon size={14} />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', padding: '24px 0', fontFamily: 'var(--font-sans)', fontSize: '12px', color: C.sage }}>
                    <p>© {new Date().getFullYear()} NutriMariah · Nutrição Clínica e Esportiva · Jaú, SP · CRN 3-57640</p>
                    <p>Desenvolvido com ❤️ e ciência.</p>
                </div>
            </div>
        </footer>
    )
}
