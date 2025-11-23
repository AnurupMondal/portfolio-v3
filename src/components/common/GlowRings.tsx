import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GlowRings = () => {
    const [mounted, setMounted] = useState(false);

    const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

    // Ring movement smoothness presets
    const configs = [
        { damping: 40, stiffness: 150, mass: 0.8 },
        { damping: 50, stiffness: 110, mass: 1.0 },
        { damping: 60, stiffness: 90, mass: 1.2 },
    ];

    const springs = configs.map((c) => ({
        x: useSpring(cursorX, c),
        y: useSpring(cursorY, c),
    }));

    useEffect(() => {
        setMounted(true);

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            cursorX.set(clientX);
            cursorY.set(clientY);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };
    }, [cursorX, cursorY]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
            {/* Glow Rings */}
            {springs.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border-[2px] border-primary/20"
                    style={{
                        width: 450 + i * 100,
                        height: 450 + i * 100,
                        left: -(450 + i * 100) / 2,
                        top: -(450 + i * 100) / 2,
                        x: s.x,
                        y: s.y,
                        filter: "blur(20px)",
                    }}
                />
            ))}

            {/* Soft center glow */}
            <motion.div
                className="absolute rounded-full bg-primary/30 blur-[80px]"
                style={{
                    width: 260,
                    height: 260,
                    left: -130,
                    top: -130,
                    x: springs[0].x,
                    y: springs[0].y,
                }}
            />
        </div>
    );
};

export default GlowRings;
