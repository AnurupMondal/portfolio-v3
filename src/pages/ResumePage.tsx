import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';
import resumeData from '../data/resumeData.json';

const ResumePage: React.FC = () => {
    const { header, education, links, skills, relevantCourses, experienceAndProjects, achievements, extraCurricular } = resumeData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                            Resume
                        </h1>
                        <p className="text-muted-foreground">
                            My professional journey, skills, and academic background.
                        </p>
                    </div>
                    <motion.a
                        href="https://drive.google.com/uc?export=download&id=1WxvNeaXtdzFSS3B2818SqjjQfCOYYEmq"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                        <Download size={18} />
                        Download PDF
                    </motion.a>
                </motion.div>

                {/* Resume Paper */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
                >
                    {/* Resume Header */}
                    <div className="p-8 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-2">{header.name}</h2>
                                <div className="text-lg text-primary font-medium mb-1">{header.title}</div>
                                <div className="text-muted-foreground">{header.subtitle}</div>
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-primary" />
                                    <a href={`mailto:${header.contact.email}`} className="hover:text-primary transition-colors">
                                        {header.contact.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-primary" />
                                    <span>{header.contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    <span>Bengaluru, India</span>
                                </div>
                                <div className="flex gap-3 mt-2">
                                    {links.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            title={link.name}
                                        >
                                            {link.name === 'GitHub' ? <Github size={20} /> :
                                                link.name === 'LinkedIn' ? <Linkedin size={20} /> :
                                                    <Globe size={20} />}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Education */}
                        <motion.section variants={itemVariants}>
                            <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                Education
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground">{edu.institution}</h4>
                                            <div className="text-primary font-medium">{edu.degree}</div>
                                        </div>
                                        <div className="text-right sm:text-right">
                                            <div className="font-mono text-sm text-muted-foreground bg-secondary/10 px-2 py-1 rounded inline-block mb-1">
                                                {edu.period}
                                            </div>
                                            <div className="text-sm font-medium text-foreground/80">{edu.score}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Skills */}
                        <motion.section variants={itemVariants}>
                            <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                Skills
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">Programming Languages</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.programmingLanguages.map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">Operating Systems & Tools</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {[...skills.operatingSystems, ...skills.software].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Experience & Projects */}
                        <motion.section variants={itemVariants}>
                            <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                Experience & Projects
                            </h3>
                            <div className="space-y-6">
                                {experienceAndProjects.map((item, index) => (
                                    <div key={index} className="relative pl-4 border-l-2 border-gray-200 dark:border-white/10">
                                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary" />
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                                                <div className="text-primary font-medium flex items-center gap-2">
                                                    {item.role}
                                                    {item.github && (
                                                        <a
                                                            href={item.github.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            <Github size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                                                {item.period}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Relevant Courses */}
                        <motion.section variants={itemVariants}>
                            <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                Relevant Courses
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {relevantCourses.map((course) => (
                                    <span key={course} className="px-3 py-1 border border-gray-200 dark:border-white/10 rounded-md text-sm text-muted-foreground">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </motion.section>

                        {/* Achievements & Extra Curricular */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.section variants={itemVariants}>
                                <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                    Achievements
                                </h3>
                                <div className="space-y-4">
                                    {achievements.map((achievement, index) => (
                                        <div key={index}>
                                            <h4 className="font-bold text-foreground">{achievement.title}</h4>
                                            <div className="text-sm text-primary mb-1">{achievement.organization}</div>
                                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                            {achievement.certificate && (
                                                <a
                                                    href={achievement.certificate.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"
                                                >
                                                    View Certificate <ExternalLink size={10} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section variants={itemVariants}>
                                <h3 className="text-xl font-bold border-b-2 border-primary/20 pb-2 mb-4 text-foreground">
                                    Extra Curricular
                                </h3>
                                <div className="space-y-4">
                                    {extraCurricular.map((activity, index) => (
                                        <div key={index}>
                                            <h4 className="font-bold text-foreground">{activity.title}</h4>
                                            <div className="text-sm text-primary mb-1">{activity.organization}</div>
                                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResumePage;
