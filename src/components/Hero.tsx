import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Award, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchGitHubProfile } from '../utils/githubApi';
import { GITHUB_USERNAME, AUTO_REFRESH_INTERVAL } from '../config/github';
import portfolioData from '../data/portfolioData.json';

const Hero: React.FC = () => {
    const { personalInfo, leadership } = portfolioData;
    const [profile, setProfile] = useState<{
        avatar_url: string;
        name: string | null;
        bio: string | null;
        location: string | null;
        created_at: string;
        followers: number;
        public_repos: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const githubProfile = await fetchGitHubProfile(GITHUB_USERNAME);
                if (githubProfile) {
                    setProfile(githubProfile as any);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();

        const refreshInterval = setInterval(() => {
            loadProfile();
        }, AUTO_REFRESH_INTERVAL);

        return () => clearInterval(refreshInterval);
    }, []);

    const displayName = profile?.name || personalInfo.name;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column - Sticky Intro */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                            className="mb-8 relative group"
                        >
                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                                {loading ? (
                                    <div className="w-full h-full bg-white/10 animate-pulse flex items-center justify-center text-4xl">
                                        👨‍💻
                                    </div>
                                ) : (
                                    <img
                                        src={profile?.avatar_url || personalInfo.avatar}
                                        alt={displayName}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://via.placeholder.com/150";
                                        }}
                                    />
                                )}
                            </div>

                            {/* Glowing Ring Effect */}
                            <div className="absolute inset-0 rounded-full border-2 border-primary/50 blur-md animate-pulse-slow -z-10 scale-110" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl -z-20 scale-125 opacity-50" />
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm shadow-lg shadow-primary/5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Available for Freelance Work
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold font-heading tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
                                Hi, I'm <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-x drop-shadow-sm">
                                    {displayName}
                                </span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
                                {personalInfo.role}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                                <Link
                                    to="/#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group"
                                >
                                    Contact Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/#projects"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white font-medium rounded-full hover:bg-white/80 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    View Projects
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex gap-6 text-gray-500 dark:text-gray-400 justify-center lg:justify-start">
                                <SocialLink href={personalInfo.github} icon={<Github size={24} />} label="GitHub" />
                                <SocialLink href={personalInfo.linkedin} icon={<Linkedin size={24} />} label="LinkedIn" />
                                <SocialLink href={personalInfo.instagram} icon={<Instagram size={24} />} label="Instagram" />
                                <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail size={24} />} label="Email" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column - The "About" Narrative */}
                    <div className="lg:col-span-7 space-y-8 mt-12 lg:mt-0" id="about">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden group"
                        >
                            {/* Decorative gradient blob inside card */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

                            <h3 className="text-3xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-3 relative z-10">
                                <span className="w-10 h-1.5 bg-gradient-to-r from-primary to-transparent rounded-full inline-block"></span>
                                About Me
                            </h3>

                            <div className="prose prose-invert max-w-none relative z-10">
                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {profile?.bio || personalInfo.bio}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                                    I am passionate about creating intuitive and dynamic user experiences.
                                    With a background in both design and development, I bring a unique perspective to every project.
                                    My journey involves constant learning and adapting to the latest technologies to build scalable solutions.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                                <InfoBadge icon={<MapPin size={16} />} text={profile?.location || personalInfo.location} />
                                {profile?.created_at && (
                                    <InfoBadge icon={<Calendar size={16} />} text={`Coding since ${new Date(profile.created_at).getFullYear()}`} />
                                )}
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                        >
                            <StatCard value="1+" label="Years Exp." color="text-primary" delay={0} />
                            <StatCard value="2+" label="Projects" color="text-secondary" delay={0.1} />
                            <StatCard value={profile?.public_repos || '20+'} label="Repositories" color="text-primary" delay={0.2} />
                            <StatCard value={profile?.followers || '10+'} label="Followers" color="text-secondary" delay={0.3} />
                        </motion.div>

                        {/* Leadership Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
                                <span className="w-10 h-1.5 bg-gradient-to-r from-secondary to-transparent rounded-full inline-block"></span>
                                Leadership & Service
                            </h3>
                            <div className="grid gap-4">
                                {leadership.map((item, index) => (
                                    <LeadershipCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white/50 dark:bg-white/5 rounded-full hover:bg-white/80 dark:hover:bg-white/10 text-gray-700 dark:text-white hover:scale-110 transition-all border border-gray-200 dark:border-white/5 hover:border-primary/50 group"
        aria-label={label}
    >
        {icon}
    </a>
);

const InfoBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 hover:border-primary/30 transition-colors">
        <span className="text-primary">{icon}</span>
        <span>{text}</span>
    </div>
);

const StatCard = ({ value, label, color, delay }: { value: string | number; label: string; color: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 text-center hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
    >
        <h4 className={`text-4xl font-bold ${color} mb-2 group-hover:scale-110 transition-transform duration-300`}>{value}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{label}</p>
    </motion.div>
);

const LeadershipCard = ({ item, index }: { item: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/5 transition-all hover:border-primary/30 group"
    >
        <div className="flex items-start gap-5">
            <div className={`p-3 rounded-xl ${item.type === 'leadership' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} group-hover:scale-110 transition-transform duration-300`}>
                {item.type === 'leadership' ? <Users size={24} /> : <Award size={24} />}
            </div>
            <div>
                <h4 className="text-lg font-bold text-foreground dark:text-white group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-primary/80 text-sm mb-3 font-medium">{item.organization} | {item.period}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    </motion.div>
);

export default Hero;
