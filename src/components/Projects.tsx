import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import Section from './common/Section';
import { fetchGitHubRepos, type GitHubRepo } from '../utils/githubApi';
import { GITHUB_USERNAME } from '../config/github';
import portfolioData from '../data/portfolioData.json';

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const data = await fetchGitHubRepos(GITHUB_USERNAME);
                if (data.length === 0) {
                    throw new Error("No repositories found or API error.");
                }
                // Sort by stars (descending), then by updated date
                const sortedData = data.sort((a, b) => {
                    if (b.stargazers_count !== a.stargazers_count) {
                        return b.stargazers_count - a.stargazers_count;
                    }
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                });
                setRepos(sortedData);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load GitHub projects. Showing local portfolio data.");
                // Fallback to local data mapped to GitHubRepo structure
                const localRepos: GitHubRepo[] = portfolioData.projects.map((p, i) => ({
                    id: i,
                    name: p.title,
                    description: p.description,
                    html_url: p.github,
                    homepage: p.link,
                    topics: p.tech,
                    stargazers_count: 0,
                    language: "N/A",
                    updated_at: new Date().toISOString()
                }));
                setRepos(localRepos);
            } finally {
                setLoading(false);
            }
        };
        loadRepos();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRepos = repos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(repos.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <Section id="projects" title="Featured Projects" subtitle="Loading from GitHub...">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse border border-white/10" />
                    ))}
                </div>
            </Section>
        );
    }

    return (
        <Section id="projects" title="Featured Projects" subtitle={error ? error : `Showing ${repos.length} repositories from GitHub`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentRepos.map((repo, index) => (
                    <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-white/60 dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors flex flex-col h-full"
                    >
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-foreground dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                                    {repo.name}
                                </h3>
                                <div className="flex gap-2">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/50 dark:bg-white/10 rounded-full hover:bg-primary hover:text-white text-foreground dark:text-white transition-colors"
                                        title="View Code"
                                    >
                                        <Github size={18} />
                                    </a>
                                    {repo.homepage && (
                                        <a
                                            href={repo.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/50 dark:bg-white/10 rounded-full hover:bg-primary hover:text-white text-foreground dark:text-white transition-colors"
                                            title="View Live"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-muted-foreground dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                {repo.description || "No description available."}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.language && (
                                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {repo.language}
                                        </span>
                                    )}
                                    {repo.topics?.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className="px-2 py-1 text-xs rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white/10 pt-4">
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500" />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork size={14} />
                                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let p = i + 1;
                            if (totalPages > 5) {
                                if (currentPage > 3) p = currentPage - 2 + i;
                                if (p > totalPages) p = totalPages - 4 + i; // Keep 5 items visible
                                if (p < 1) p = i + 1;
                            }

                            if (p > totalPages) return null;

                            return (
                                <button
                                    key={p}
                                    onClick={() => paginate(p)}
                                    className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === p
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white/60 dark:bg-white/5 border-gray-200 dark:border-white/10 text-foreground dark:text-white hover:bg-primary/10'
                                        }`}
                                >
                                    {p}
                                </button>
                            );
                        }).filter(Boolean)}
                    </div>

                    <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </Section>
    );
};

export default Projects;
