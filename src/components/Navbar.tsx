import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { trackClick } from '../lib/trackClick'

const LOGO_URL = 'https://xqppzwzeykwlitwzutcn.supabase.co/storage/v1/object/public/imagens/Gemini_Generated_Image_ossjsfossjsfossj.jfif'
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5514999999999'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de agendar uma consulta nutricional.`

const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Quem sou Eu', href: '#quem-sou-eu' },
    { label: 'Acompanhamentos', href: '#acompanhamentos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Contato', href: '#contato' },
]

const C = {
    deep: '#14261C',
    sage: '#4A6B53',
    cream: '#FAF8F5',
    border: '#E0DBD4',
    muted: '#5F6C63',
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const navBg = scrolled
        ? 'rgba(250,248,245,0.96)'
        : 'transparent'
    const navShadow = scrolled ? `0 1px 0 ${C.border}` : 'none'

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            backgroundColor: navBg,
            boxShadow: navShadow,
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'all 0.4s ease',
        }}>
            <nav style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

                    {/* Logo */}
                    <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')}
                        style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <img
                            src={LOGO_URL}
                            alt="NutriMariah"
                            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
                        />
                    </a>

                    {/* Desktop links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="hidden md:flex">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    letterSpacing: '0.04em',
                                    color: C.muted,
                                    textDecoration: 'none',
                                    transition: 'color 0.25s ease',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.deep)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* CTA Button */}
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackClick('whatsapp')}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                backgroundColor: C.deep, color: '#FAF8F5',
                                padding: '11px 24px', borderRadius: '100px',
                                fontSize: '13px', fontWeight: 600,
                                textDecoration: 'none', letterSpacing: '0.03em',
                                transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            {/* WhatsApp icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: '#FAF8F5', flexShrink: 0 }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Consulta
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: C.deep }}
                        aria-label="Menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div style={{
                    maxHeight: menuOpen ? '360px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                }} className="md:hidden">
                    <div style={{
                        backgroundColor: C.cream, borderRadius: '16px',
                        border: `1px solid ${C.border}`, marginBottom: '16px',
                        padding: '8px 0',
                    }}>
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                style={{
                                    display: 'block', padding: '14px 24px',
                                    fontSize: '14px', fontWeight: 500,
                                    color: C.muted, textDecoration: 'none',
                                    borderBottom: `1px solid ${C.border}`,
                                    transition: 'color 0.2s',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackClick('whatsapp')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                margin: '12px 16px', padding: '14px',
                                backgroundColor: C.deep, color: '#FAF8F5',
                                borderRadius: '12px', fontSize: '14px', fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Agendar Consulta
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
