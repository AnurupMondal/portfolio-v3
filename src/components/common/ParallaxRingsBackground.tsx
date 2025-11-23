import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ParallaxRingsBackground = () => {
    const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

    const rings = [
        { size: 700, opacity: 0.10, stiffness: 30, damping: 18 },
        { size: 560, opacity: 0.12, stiffness: 25, damping: 16 },
        { size: 430, opacity: 0.15, stiffness: 20, damping: 14 },
        { size: 310, opacity: 0.20, stiffness: 18, damping: 13 },
        { size: 220, opacity: 0.25, stiffness: 15, damping: 12 },
    ];

    const handleMove = (e: MouseEvent | TouchEvent) => {
        const x = "touches" in e ? e.touches[0].clientX : e.clientX;
        const y = "touches" in e ? e.touches[0].clientY : e.clientY;
        cursorX.set(x);
        cursorY.set(y);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
            {rings.map((ring, i) => {
                const x = useSpring(cursorX, { stiffness: ring.stiffness, damping: ring.damping });
                const y = useSpring(cursorY, { stiffness: ring.stiffness, damping: ring.damping });

                return (
                    <motion.div
                        key={i}
                        style={{ x, y }}
                        className="absolute rounded-full border border-primary/30"
                        animate={{
                            boxShadow: `0 0 120px 60px rgb(var(--primary) / ${ring.opacity})`,
                        }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <div
                            style={{
                                width: ring.size,
                                height: ring.size,
                                marginLeft: -ring.size / 2,
                                marginTop: -ring.size / 2,
                                borderRadius: "50%",
                                borderWidth: "2px",
                                borderColor: "rgb(var(--primary) / 0.25)",
                            }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ParallaxRingsBackground;
