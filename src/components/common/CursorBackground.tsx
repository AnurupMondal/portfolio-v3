import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorBackground = () => {
    const [mounted, setMounted] = useState(false);

    const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    const springConfig1 = { damping: 25, stiffness: 150, mass: 0.5 };
    const springConfig2 = { damping: 30, stiffness: 120, mass: 0.8 };
    const springConfig3 = { damping: 35, stiffness: 100, mass: 1.0 };
    const springConfig4 = { damping: 28, stiffness: 130, mass: 0.6 };

    const x1 = useSpring(cursorX, springConfig1);
    const y1 = useSpring(cursorY, springConfig1);
    const x2 = useSpring(cursorX, springConfig2);
    const y2 = useSpring(cursorY, springConfig2);
    const x3 = useSpring(cursorX, springConfig3);
    const y3 = useSpring(cursorY, springConfig3);
    const x4 = useSpring(cursorX, springConfig4);
    const y4 = useSpring(cursorY, springConfig4);

    useEffect(() => {
        setMounted(true);

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            cursorX.set(clientX);
            cursorY.set(clientY);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [cursorX, cursorY]);

    if (!mounted) return null;

    return (
        // z-[0] ensures blobs sit *above* background, but *below* page content
        <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
            {/* Blob 1 - Blue */}
            <motion.div
                className="absolute rounded-full blur-3xl bg-gradient-to-br from-blue-500/50 to-transparent"
                style={{
                    width: 600,
                    height: 600,
                    left: -300,
                    top: -300,
                    x: x1,
                    y: y1,
                }}
            />

            {/* Blob 2 - Purple */}
            <motion.div
                className="absolute rounded-full blur-3xl bg-gradient-to-br from-purple-500/40 to-transparent"
                style={{
                    width: 500,
                    height: 500,
                    left: -250,
                    top: -250,
                    x: x2,
                    y: y2,
                }}
            />

            {/* Blob 3 - Cyan */}
            <motion.div
                className="absolute rounded-full blur-3xl bg-gradient-to-br from-cyan-500/35 to-transparent"
                style={{
                    width: 450,
                    height: 450,
                    left: -225,
                    top: -225,
                    x: x3,
                    y: y3,
                }}
            />

            {/* Blob 4 - Pink */}
            <motion.div
                className="absolute rounded-full blur-3xl bg-gradient-to-br from-pink-500/40 to-transparent"
                style={{
                    width: 400,
                    height: 400,
                    left: -200,
                    top: -200,
                    x: x4,
                    y: y4,
                }}
            />
        </div>
    );
};

export default CursorBackground;
