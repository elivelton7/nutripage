import { ChevronDown } from 'lucide-react'

interface Props {
    targetId: string
    label?: string
}

const C = { sage: '#4A6B53', muted: '#5F6C63', border: '#E0DBD4' }

export default function SectionDivider({ targetId, label }: Props) {
    const scrollTo = (e: React.MouseEvent) => {
        e.preventDefault()
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 40px', gap: '10px' }}>
            {label && (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>
                    {label}
                </span>
            )}
            <button
                onClick={scrollTo}
                aria-label={`Ir para ${label ?? targetId}`}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: `1.5px solid ${C.border}`,
                    backgroundColor: 'transparent', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    animation: 'dividerBounce 2s ease-in-out infinite',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.sage; e.currentTarget.style.borderColor = C.sage }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = C.border }}
            >
                <ChevronDown size={16} color={C.sage} />
            </button>
            <style>{`
                @keyframes dividerBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
            `}</style>
        </div>
    )
}
