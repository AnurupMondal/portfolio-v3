import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolioData.json';
import { getTechIcon } from '../utils/techIcons';

const Skills: React.FC = () => {
    const { skills } = portfolioData;

    // Flatten all skills into a single array
    const allSkills = skills.flatMap((category: any) => category.skills);

    // Split skills into two rows for visual interest
    const halfIndex = Math.ceil(allSkills.length / 2);
    const row1 = allSkills.slice(0, halfIndex);
    const row2 = allSkills.slice(halfIndex);

    const MarqueeRow = ({ items, direction = "left", speed = 25 }: { items: string[], direction?: "left" | "right", speed?: number }) => {
        return (
            <div className="flex overflow-hidden py-4 select-none relative z-10 w-full hover-pause group">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                <div
                    className={`flex gap-8 flex-shrink-0 px-4 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}
                    style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
                >
                    {[...items, ...items, ...items, ...items].map((skill, index) => (
                        <div
                            key={`${skill}-${index}`}
                            className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors min-w-max"
                        >
                            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                                {getTechIcon(skill)}
                            </span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section id="skills" className="py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-foreground dark:text-white">
                        Tech Stack
                    </h2>
                    <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
                        Technologies I work with
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </motion.div>
            </div>

            <div className="flex flex-col gap-8 w-full">
                <MarqueeRow items={row1} direction="left" speed={40} />
                <MarqueeRow items={row2} direction="right" speed={45} />
            </div>
        </section>
    );
};

export default Skills;
