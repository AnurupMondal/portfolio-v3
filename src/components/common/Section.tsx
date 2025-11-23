import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    title?: string;
    subtitle?: string;
}

const Section: React.FC<SectionProps> = ({ children, id, className = '', title, subtitle }) => {
    return (
        <section id={id} className={`py-20 md:py-32 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        {title && (
                            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-foreground dark:text-white">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
