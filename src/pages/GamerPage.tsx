import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, ChevronRight, Star, Zap, Target, Swords, Car, MonitorPlay } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import gamerVideosData from '../data/gamerVideos.json';
import LaptopVideoPlayer, { type Video } from '../components/LaptopVideoPlayer';
import gamingBg from '../assets/gaming-bg.png';

// Game Data with Themes
const GAMES = [
    {
        id: 'valorant',
        name: 'VALORANT',
        color: '#FF4655',
        icon: Target,
        description: 'Tactical 5v5 Shooter',
        gradient: 'from-[#FF4655] to-[#111]'
    },
    {
        id: 'marvel-rivals',
        name: 'MARVEL RIVALS',
        color: '#F0B132',
        icon: Zap,
        description: 'Super Hero Team-Based PvP',
        gradient: 'from-[#F0B132] to-[#4A2C00]'
    },
    {
        id: 'genshin',
        name: 'GENSHIN IMPACT',
        color: '#4E7CFF',
        icon: Star,
        description: 'Open-World Action RPG',
        gradient: 'from-[#4E7CFF] to-[#1A2B55]'
    },
    {
        id: 'f1-2026',
        name: 'F1 2026',
        color: '#E10600',
        icon: Car,
        description: 'Next Gen Racing Simulation',
        gradient: 'from-[#E10600] to-[#000]'
    },
    {
        id: 'fifa-2025',
        name: 'FIFA 2025',
        color: '#32CD32',
        icon: Trophy,
        description: 'The World\'s Game',
        gradient: 'from-[#32CD32] to-[#0B3B0B]'
    },
    {
        id: 'cs2',
        name: 'COUNTER STRIKE 2',
        color: '#F49D1A',
        icon: Swords,
        description: 'Premier Tactical Shooter',
        gradient: 'from-[#F49D1A] to-[#2D2D2D]'
    }
];

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
    }
    return null;
};

// Fetch video metadata
const fetchVideoMetadata = async (videoId: string): Promise<{ title: string; uploadDate: string } | null> => {
    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        return {
            title: data.title || 'Untitled Video',
            uploadDate: new Date().toISOString().split('T')[0],
        };
    } catch (error) {
        return null;
    }
};

const GamerPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    useEffect(() => {
        const loadVideos = async () => {
            setIsLoading(true);
            const videosWithMetadata = await Promise.all(
                gamerVideosData.videos.map(async (video) => {
                    const youtubeId = getYouTubeVideoId(video.url);
                    if (!youtubeId) return { ...video, title: 'Invalid', uploadDate: '', loading: false, id: video.id, youtubeId: '' };

                    const metadata = await fetchVideoMetadata(youtubeId);
                    return {
                        id: video.id,
                        url: video.url,
                        youtubeId,
                        title: metadata?.title || 'Loading...',
                        game: video.game,
                        uploadDate: metadata?.uploadDate || new Date().toISOString().split('T')[0],
                        thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                        loading: false,
                    };
                })
            );
            setVideos(videosWithMetadata);
            setFilteredVideos(videosWithMetadata);
            setIsLoading(false);
        };
        loadVideos();
    }, []);

    useEffect(() => {
        if (selectedGame) {
            // Filter videos loosely based on game name (case insensitive)
            const filtered = videos.filter(v => v.game?.toLowerCase().includes(selectedGame.replace(/-/g, ' ').split(' ')[0].toLowerCase()));
            setFilteredVideos(filtered.length > 0 ? filtered : videos); // Fallback to all if none found
        } else {
            setFilteredVideos(videos);
        }
    }, [selectedGame, videos]);

    return (
        <>
            <Helmet>
                <title>Gamer Vault | Next-Gen Archive</title>
                <meta name="description" content="Futuristic gaming portfolio featuring Valorant, Marvel Rivals, and more." />
            </Helmet>

            <div ref={containerRef} className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden font-sans selection:bg-purple-500/30">

                {/* Background Image with Overlay */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />
                    <img
                        src={gamingBg}
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20">

                    {/* Navigation */}
                    <motion.a
                        href="/portfolio-v3/"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 transition-colors">
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </div>
                        <span className="text-sm font-mono tracking-wider">EXIT VAULT</span>
                    </motion.a>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-24"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-mono tracking-widest text-gray-400">SYSTEM ONLINE</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            GAMER<span className="text-purple-500">.</span>VAULT
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            A curated collection of elite gameplay moments across the metaverse.
                            <br />
                            <span className="text-purple-400 font-mono text-sm mt-2 block">SELECT A FREQUENCY TO TUNE IN</span>
                        </p>
                    </motion.div>

                    {/* Featured Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                        {GAMES.map((game, index) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
                                className={`group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 ${selectedGame === game.id ? 'ring-2 ring-offset-2 ring-offset-black' : 'hover:scale-[1.02]'}`}
                                style={{
                                    '--game-color': game.color
                                } as any}
                            >
                                {/* Card Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <game.icon
                                            className="w-10 h-10 text-white/50 group-hover:text-white transition-colors duration-300"
                                            strokeWidth={1.5}
                                        />
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            whileHover={{ rotate: 90 }}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.div>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2 tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                            {game.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 font-mono border-l-2 border-transparent group-hover:border-[var(--game-color)] pl-0 group-hover:pl-3 transition-all duration-300">
                                            {game.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Animated Border Gradient on Hover */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--game-color)] rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Video Section */}
                    <motion.div
                        layout
                        className="relative"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <MonitorPlay className="w-8 h-8 text-purple-500" />
                            <h2 className="text-3xl font-bold">
                                {selectedGame ? `ARCHIVES: ${GAMES.find(g => g.id === selectedGame)?.name}` : 'RECENT TRANSMISSIONS'}
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : filteredVideos.length > 0 ? (
                            <LaptopVideoPlayer videos={filteredVideos} />
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                <p className="text-gray-400 font-mono">NO DATA FOUND IN THIS SECTOR</p>
                                <button
                                    onClick={() => setSelectedGame(null)}
                                    className="mt-4 text-purple-400 hover:text-purple-300 underline underline-offset-4"
                                >
                                    Return to Main Database
                                </button>
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default GamerPage;
