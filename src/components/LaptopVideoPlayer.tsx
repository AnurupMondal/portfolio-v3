import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export interface Video {
    id: string;
    url: string;
    youtubeId?: string;
    title: string;
    game?: string;
    uploadDate: string;
    thumbnail?: string;
    loading?: boolean;
}

interface LaptopVideoPlayerProps {
    videos: Video[];
}

const LaptopVideoPlayer = ({ videos }: LaptopVideoPlayerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentVideo = videos[currentIndex];

    // Extract YouTube video ID from URL
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

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const handleVideoSelect = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const videoId = currentVideo ? getYouTubeVideoId(currentVideo.url) : null;

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4">
            {/* Main Laptop Container */}
            <div className="relative w-full max-w-5xl perspective-[2000px]">
                {/* Laptop Lid (Screen) */}
                <motion.div
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative transform-style-3d origin-bottom"
                >
                    {/* Lid Housing (Aluminum Shell) */}
                    <div className="relative bg-[#0d0d0d] rounded-t-[24px] p-[12px] shadow-2xl border-[1px] border-[#333] border-b-0">

                        {/* Screen Bezel (Black Glass) */}
                        <div className="relative bg-black rounded-t-[16px] overflow-hidden aspect-[16/10] ring-1 ring-white/10">

                            {/* The Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[24px] bg-black z-50 rounded-b-[12px] flex items-center justify-center">
                                {/* Camera Lens */}
                                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333] shadow-inner" />
                                <div className="w-1 h-1 rounded-full bg-blue-900/50 ml-2" />
                            </div>

                            {/* Screen Content Area */}
                            <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden">
                                {/* Video Player */}
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: 'spring', stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                        }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        {videoId ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1`}
                                                className="w-full h-full object-cover"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                                                <p>Video Unavailable</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Screen Reflection/Gloss */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-10" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Laptop Base (Keyboard Area) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative bg-[#1a1a1a] h-[16px] rounded-b-[20px] shadow-xl border-t border-[#333] flex justify-center"
                >
                    {/* Lid Opening Groove */}
                    <div className="w-[120px] h-[4px] bg-[#0d0d0d] rounded-b-[8px] opacity-50" />
                </motion.div>

                {/* Reflection on Surface */}
                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-b from-purple-500/10 to-transparent blur-2xl transform scale-x-90 opacity-50" />
            </div>

            {/* External Controls (Floating below) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }
                }
                className="mt-16 w-full max-w-4xl"
            >
                {/* Control Bar */}
                < div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" >

                    {/* Left: Video Info */}
                    < div className="flex-1 text-center md:text-left" >
                        <h3 className="text-xl font-bold text-white mb-1 truncate">
                            {currentVideo?.title || 'Gaming Highlights'}
                        </h3>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 font-mono">
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                                {currentVideo?.game || 'GAME'}
                            </span>
                            <span>{currentVideo?.uploadDate}</span>
                        </div>
                    </div >

                    {/* Center: Playback Controls */}
                    < div className="flex items-center gap-6" >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePrev}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 fill-current" />
                            ) : (
                                <Play className="w-6 h-6 fill-current" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div >

                    {/* Right: Volume & Extras */}
                    < div className="flex items-center gap-4 flex-1 justify-end" >
                        <div className="text-xs font-mono text-gray-500">
                            {currentIndex + 1} / {videos.length}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <Maximize2 className="w-5 h-5" />
                        </motion.button>
                    </div >
                </div >

                {/* Thumbnails Strip */}
                < div className="mt-8 flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide" >
                    {
                        videos.map((video, index) => {
                            const thumbId = getYouTubeVideoId(video.url);
                            return (
                                <motion.button
                                    key={video.id}
                                    onClick={() => handleVideoSelect(index)}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                                        ? 'border-purple-500 shadow-lg shadow-purple-500/50 ring-2 ring-purple-500/20'
                                        : 'border-white/10 hover:border-white/30 grayscale hover:grayscale-0'
                                        }`}
                                >
                                    {thumbId && (
                                        <img
                                            src={`https://img.youtube.com/vi/${thumbId}/mqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-2 left-2 right-2">
                                        <p className="text-white text-[10px] font-bold truncate">
                                            {video.title}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })
                    }
                </div >
            </motion.div >
        </div >
    );
};

export default LaptopVideoPlayer;
