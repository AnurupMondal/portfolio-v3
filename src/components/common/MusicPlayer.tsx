import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Minimize2 } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData.json';

const MusicPlayer: React.FC = () => {
    const musicConfig = (portfolioData as any).music;

    if (!musicConfig || !musicConfig.enabled) return null;

    const [isExpanded, setIsExpanded] = useState(false);

    // Determine URL
    const spotifyUrl = musicConfig.musicUrl || musicConfig.audioUrl;
    if (!spotifyUrl) return null;

    const getSpotifyEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('/embed/')) return url;
        return url.replace('open.spotify.com/', 'open.spotify.com/embed/');
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 font-sans">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="origin-bottom-left"
                    >
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-2xl w-80 sm:w-96 overflow-hidden relative group">
                            {/* Header / Controls */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 pointer-events-none group-hover:pointer-events-auto">
                                <a
                                    href={spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors transform hover:scale-110"
                                    title="Open in Spotify"
                                >
                                    <ExternalLink size={14} />
                                </a>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors transform hover:scale-110"
                                    title="Minimize"
                                >
                                    <Minimize2 size={14} />
                                </button>
                            </div>

                            {/* Iframe Container */}
                            <div className="rounded-2xl overflow-hidden bg-[#121212] shadow-inner ring-1 ring-white/5 relative">
                                {/* Loading Skeleton / Background */}
                                <div className="absolute inset-0 flex items-center justify-center bg-[#121212] -z-10">
                                    <FaSpotify className="text-[#1DB954] text-4xl animate-pulse" />
                                </div>

                                <iframe
                                    src={getSpotifyEmbedUrl(spotifyUrl)}
                                    width="100%"
                                    height="380"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    title="Spotify Player"
                                    className="relative z-10"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                layout
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05, paddingRight: "1.25rem" }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 p-1.5 ${isExpanded ? 'bg-[#1DB954] text-white' : 'bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60'} rounded-full shadow-lg transition-all duration-300 group overflow-hidden max-w-[200px]`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${isExpanded ? 'bg-white/20' : 'bg-[#1DB954]'}`}>
                    <FaSpotify className="text-white text-xl" />
                </div>

                <div className="flex flex-col items-start pr-2">
                    <span className={`text-xs font-bold whitespace-nowrap ${isExpanded ? 'text-white' : 'text-white group-hover:text-[#1DB954]'} transition-colors`}>
                        {isExpanded ? 'Close Player' : 'My Playlist'}
                    </span>
                    {!isExpanded && (
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse"></span>
                            Spotify
                        </span>
                    )}
                </div>
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
