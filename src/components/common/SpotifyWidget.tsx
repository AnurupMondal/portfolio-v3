import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData.json';

const SpotifyWidget: React.FC = () => {
    // Type assertion since we just added this field and TS might not know about it yet
    // or if the JSON import is not strictly typed.
    const music = (portfolioData as any).music;

    if (!music || !music.enabled) return null;

    return (
        <motion.a
            href={music.musicUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-8 left-8 z-50 hidden md:flex items-center gap-3 p-2 pr-6 bg-background/30 backdrop-blur-md border border-white/10 rounded-full shadow-xl hover:bg-background/40 hover:scale-105 transition-all duration-300 group overflow-hidden"
        >
            {/* Album Art / Icon Container */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-black/20 shrink-0">
                <img
                    src={music.placeholderImg}
                    alt="Album Art"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <FaSpotify className="text-[#1DB954] text-xl" />
                </div>
            </div>

            {/* Text Info */}
            <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground/90 whitespace-nowrap group-hover:text-[#1DB954] transition-colors">
                        {music.songTitle}
                    </span>
                </div>
                <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                    {music.artist}
                </span>
            </div>

            {/* Visualizer */}
            <div className="flex items-end gap-[2px] h-4 ml-2">
                {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                        key={bar}
                        className="w-[3px] bg-[#1DB954] rounded-t-sm"
                        animate={{
                            height: [4, 12, 6, 16, 8],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: bar * 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Hover Hint */}
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={12} className="text-muted-foreground" />
            </div>
        </motion.a>
    );
};

export default SpotifyWidget;
