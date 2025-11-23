import React from 'react';
import { motion } from 'framer-motion';
import Section from './common/Section';
import portfolioData from '../data/portfolioData.json';

const Skills: React.FC = () => {
    const { skills } = portfolioData;

    // Type assertion since we changed the structure in JSON but TS might infer old type
    const categorizedSkills = skills as unknown as Array<{ title: string; skills: string[] }>;

    return (
        <Section id="skills" title="Tech Stack" subtitle="Technologies I work with">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categorizedSkills.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="bg-white/60 dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10"
                    >
                        <h3 className="text-xl font-bold text-primary mb-6 text-center">{category.title}</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {category.skills.map((skill) => (
                                <motion.div
                                    key={skill}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-colors"
                                >
                                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
