import React from 'react'
import { Camera, Image as ImageIcon } from 'lucide-react'

interface PhotoPlaceholderProps {
    label: string
    sublabel?: string
    dimensions?: string
    currentSrc?: string
    aspectRatio?: string
    height?: string | number
    className?: string
    style?: React.CSSProperties
}

export default function PhotoPlaceholder({
    label,
    sublabel,
    dimensions = 'Proporção recomendada: 4:5',
    currentSrc,
    aspectRatio = '4/5',
    height = '100%',
    className = '',
    style = {},
}: PhotoPlaceholderProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-3xl border border-dashed border-[#A3B899] bg-[#EAEFE8] shadow-sm transition-all duration-300 hover:border-[#4A6B53] ${className}`}
            style={{
                aspectRatio,
                height,
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
        >
            {currentSrc ? (
                <>
                    <img
                        src={currentSrc}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Badge indicativo de espaço reservado para troca */}
                    <div
                        className="absolute bottom-4 left-4 right-4 bg-[#14261C]/85 backdrop-blur-md text-[#FAF8F5] py-2 px-3 rounded-xl border border-white/20 flex items-center justify-between text-xs"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <Camera size={14} className="text-[#8BA898] shrink-0" />
                            <span className="font-medium truncate">{label}</span>
                        </div>
                        <span className="text-[10px] text-[#A3B899] uppercase tracking-wider shrink-0 ml-2">
                            Espaço Reservado
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
                    {/* Ícone estilizado */}
                    <div className="w-16 h-16 rounded-2xl bg-[#D8E2D5] border border-[#BACBB5] flex items-center justify-center mb-4 text-[#4A6B53] shadow-inner">
                        <Camera size={28} strokeWidth={1.75} />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE6DA] text-[#2F4A37] text-[11px] font-semibold tracking-wider uppercase mb-2">
                        <ImageIcon size={12} />
                        Espaço Reservado para Foto
                    </div>

                    <h4 className="font-serif text-xl font-normal text-[#14261C] mb-1">
                        {label}
                    </h4>

                    {sublabel && (
                        <p className="font-sans text-xs text-[#5F6C63] mb-3 leading-relaxed">
                            {sublabel}
                        </p>
                    )}

                    <span className="inline-block text-[11px] font-mono text-[#4A6B53] bg-white/70 px-2.5 py-1 rounded-md border border-[#BACBB5]/60">
                        {dimensions}
                    </span>
                </div>
            )}
        </div>
    )
}
