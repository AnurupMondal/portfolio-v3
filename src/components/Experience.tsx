import React, { useRef, useLayoutEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useVelocity,
} from "framer-motion";
import portfolioData from "../data/portfolioData.json";
import { getTechIcon } from "../utils/techIcons";

const Experience: React.FC = () => {
    const { experience } = portfolioData;
    const targetRef = useRef<HTMLDivElement>(null);

    const [cardWidth, setCardWidth] = useState(500);
    const [centerOffset, setCenterOffset] = useState(0);

    // Update dimensions on resize
    useLayoutEffect(() => {
        const handleResize = () => {
            // On mobile (<768px), use 85% of screen width. On larger screens, use fixed 500px.
            // Rounding to avoid subpixel rendering gaps
            const width = window.innerWidth < 768 ? Math.round(window.innerWidth * 0.85) : 500;
            setCardWidth(width);
            setCenterOffset(window.innerWidth / 2 - width / 2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalDistance = (experience.length - 1) * cardWidth;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Base mapping
    const rawX = useTransform(
        scrollYProgress,
        [0, 1],
        [centerOffset, centerOffset - totalDistance]
    );

    // Detect scroll velocity
    const scrollVelocity = useVelocity(scrollYProgress);

    // Momentum / flick boost
    const boostedX = useTransform(
        () => rawX.get() - scrollVelocity.get() * 300
    );

    // 🚫 no bounce — inertia styled
    const x = useSpring(boostedX, {
        stiffness: 170,
        damping: 70,
        mass: 0.6,
    });

    return (
        <section ref={targetRef} id="experience" className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-end md:items-center pb-20 md:pb-0 overflow-hidden">
                <div className="absolute top-8 left-4 right-4 md:top-24 md:left-12 md:right-auto z-20 pointer-events-none mix-blend-difference dark:mix-blend-normal">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 relative">
                            <span className="absolute -inset-1 blur-2xl bg-primary/20 rounded-full opacity-0 dark:opacity-50" />
                            <span className="relative bg-gradient-to-br from-foreground via-foreground/80 to-foreground/40 dark:from-white dark:via-white/90 dark:to-white/40 bg-clip-text text-transparent">
                                Experience
                            </span>
                            <span className="text-primary relative">.</span>
                        </h2>

                        <div className="relative pl-6 border-l-4 border-primary/50 backdrop-blur-sm bg-background/20 dark:bg-black/20 p-4 rounded-r-xl max-w-md">
                            <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 font-light leading-relaxed">
                                A timeline of my professional journey and key milestones.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm font-mono text-primary/80">
                                <span className="animate-pulse">→</span>
                                <span>Scroll to explore</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Timeline scroll container */}
                <motion.div style={{ x }} className="flex items-center gap-0">
                    {experience.map((job, index) => (
                        <div
                            key={job.id}
                            style={{ width: cardWidth }}
                            className="relative flex flex-col justify-center items-center h-[60vh] md:h-[70vh] flex-shrink-0 group"
                        >
                            {/* Top Section */}
                            <div className="flex-1 w-full flex items-end justify-center pb-8 md:pb-12 px-4">
                                {index % 2 === 0 && (
                                    <div className="relative w-full p-6 bg-white/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl backdrop-blur-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-primary/10">
                                        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-gray-200/50 dark:border-t-white/10" />
                                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-1">{job.role}</h3>
                                        <h4 className="text-lg text-primary mb-3 font-medium">{job.company}</h4>
                                        <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/50 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-default"
                                                >
                                                    {getTechIcon(tech)}
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Timeline Line + Dot */}
                            <div className="relative w-[102%] -ml-[1%] h-[2px] bg-gradient-to-r from-gray-200/50 via-gray-300/50 to-gray-200/50 dark:from-white/10 dark:via-white/20 dark:to-white/10 flex items-center justify-center">
                                <div className="absolute w-full h-full bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                                {/* Glowing Dot */}
                                <div className="relative w-6 h-6 flex items-center justify-center z-10">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                                    <div className="w-3 h-3 bg-background border-2 border-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)] transition-transform duration-300 group-hover:scale-125" />
                                </div>

                                <span
                                    className={`absolute font-mono text-sm font-bold text-primary/80 tracking-wider transition-all duration-300 ${index % 2 === 0 ? "top-8" : "bottom-8"
                                        }`}
                                >
                                    {job.period}
                                </span>
                            </div>

                            {/* Bottom Section */}
                            <div className="flex-1 w-full flex items-start justify-center pt-8 md:pt-12 px-4">
                                {index % 2 !== 0 && (
                                    <div className="relative w-full p-6 bg-white/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl backdrop-blur-xl hover:border-primary/50 transition-all duration-300 hover:translate-y-2 shadow-lg hover:shadow-primary/10">
                                        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-gray-200/50 dark:border-b-white/10" />
                                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-1">{job.role}</h3>
                                        <h4 className="text-lg text-primary mb-3 font-medium">{job.company}</h4>
                                        <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/50 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-default"
                                                >
                                                    {getTechIcon(tech, "text-sm")}
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
