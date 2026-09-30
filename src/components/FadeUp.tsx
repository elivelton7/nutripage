import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeUpProps {
    children: ReactNode
    delay?: number
    className?: string
    duration?: number
}

/**
 * Scroll-triggered fade-up animation using Framer Motion.
 * Wraps any content and reveals it smoothly when it enters the viewport.
 */
export default function FadeUp({ children, delay = 0, className = '', duration = 0.7 }: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
