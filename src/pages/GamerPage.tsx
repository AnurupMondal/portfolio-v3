import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Gamepad2, Trophy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import gamerVideosData from '../data/gamerVideos.json';
import LaptopVideoPlayer, { type Video } from '../components/LaptopVideoPlayer';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};

// Fetch video metadata using oEmbed API
const fetchVideoMetadata = async (videoId: string): Promise<{ title: string; uploadDate: string } | null> => {
    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch video metadata');
        }

        const data = await response.json();

        return {
            title: data.title || 'Untitled Video',
            uploadDate: new Date().toISOString().split('T')[0],
        };
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        return null;
    }
};

const GamerPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load videos from JSON and fetch metadata
        const loadVideos = async () => {
            setIsLoading(true);
            const videosWithMetadata = await Promise.all(
                gamerVideosData.videos.map(async (video) => {
                    const youtubeId = getYouTubeVideoId(video.url);

                    if (!youtubeId) {
                        return {
                            id: video.id,
                            url: video.url,
                            title: 'Invalid Video',
                            game: video.game,
                            uploadDate: new Date().toISOString().split('T')[0],
                            loading: false,
                        };
                    }

                    // Fetch metadata from YouTube
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
            setIsLoading(false);
        };

        loadVideos();
    }, []);

    return (
        <>
            <Helmet>
                <title>Gaming Archive - Secret Vault</title>
                <meta name="description" content="My secret gaming archive" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] relative overflow-hidden" style={{ isolation: 'isolate' }}>
                {/* Enhanced Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                    {/* Multiple Glowing Orbs */}
                    <motion.div
                        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-[120px]"
                        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <motion.div
                        className="absolute bottom-40 left-20 w-80 h-80 rounded-full blur-[100px]"
                        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }}
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.4, 0.7, 0.4],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <motion.div
                        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-[90px]"
                        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0.5, 0.2],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Enhanced Grid Pattern with Animation */}
                    <motion.div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"
                        animate={{
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Floating Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                <div className="relative container mx-auto px-4 py-12" style={{ zIndex: 10 }}>
                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="flex items-center justify-center gap-4 mb-6"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Gamepad2 className="w-14 h-14" style={{ color: '#8b5cf6' }} />
                            </motion.div>

                            <h1 className="text-7xl font-black tracking-wider relative">
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4]"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%',
                                    }}
                                >
                                    GAMER VAULT
                                </motion.span>
                                <motion.span
                                    className="absolute -top-3 -right-14 text-xs font-normal px-2 py-1 rounded-full backdrop-blur-sm"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(139, 92, 246, 0.3)',
                                        border: '1px solid rgba(139, 92, 246, 0.5)',
                                    }}
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        scale: [0.95, 1.05, 0.95],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    TOP SECRET
                                </motion.span>
                            </h1>

                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.5,
                                }}
                            >
                                <Trophy className="w-14 h-14" style={{ color: '#3b82f6' }} />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="text-xl font-mono mb-6"
                            style={{ color: '#9ca3af' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
              // EPIC MOMENTS ARCHIVE
                        </motion.p>

                        <motion.div
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
                            style={{
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Award className="w-6 h-6" style={{ color: '#8b5cf6' }} />
                            <span className="text-lg font-bold" style={{ color: '#ffffff' }}>
                                {videos.length} EPIC CLIPS
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                                <Gamepad2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#8b5cf6' }} />
                            </motion.div>
                            <p className="text-xl font-mono" style={{ color: '#6b7280' }}>
                                Loading epic moments...
                            </p>
                        </motion.div>
                    )}

                    {/* Laptop Video Player */}
                    {!isLoading && videos.length > 0 && (
                        <LaptopVideoPlayer videos={videos} />
                    )}

                    {/* Empty State */}
                    {!isLoading && videos.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Gamepad2 className="w-24 h-24 mx-auto mb-4" style={{ color: '#374151' }} />
                            <p className="text-xl font-mono" style={{ color: '#6b7280' }}>
                                No epic moments yet. Time to showcase your skills!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GamerPage;
