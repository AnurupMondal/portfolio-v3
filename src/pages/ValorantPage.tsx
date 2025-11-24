import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Crosshair } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LaptopVideoPlayer from '../components/LaptopVideoPlayer';

interface Video {
    id: string;
    url: string;
    youtubeId?: string;
    title: string;
    game?: string;
    uploadDate: string;
    thumbnail?: string;
    loading?: boolean;
}

const ValorantPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    // Load videos from JSON file
    useEffect(() => {
        // Hardcoded for now to match the interface, or could fetch from JSON if structure matches
        const valorantVideos: Video[] = [
            {
                id: '1',
                url: 'https://youtu.be/1TF_D-qcEWc?si=V5ONwqwOgyp9DjG2',
                game: 'Valorant',
                title: 'ACE in Ascendant Lobby',
                uploadDate: '2023-10-15'
            },
            {
                id: '2',
                url: 'https://youtu.be/cmD4r-OhHxM?si=EgoDXfNAAAQOWSbs',
                game: 'Valorant',
                title: 'Clutch Moments',
                uploadDate: '2023-11-02'
            }
        ];
        setVideos(valorantVideos);
    }, []);

    return (
        <>
            <Helmet>
                <title>Gaming Archive - Secret Vault</title>
                <meta name="description" content="My secret gaming archive" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#1a1f2e] to-[#0f1923] relative overflow-hidden" style={{ isolation: 'isolate' }}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                    {/* Gaming Glow Effects */}
                    <motion.div
                        className="absolute top-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <motion.div
                        className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                </div>

                <div className="relative container mx-auto px-4 py-12" style={{ zIndex: 10 }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Crosshair className="w-10 h-10 text-purple-500" />
                            <h1 className="text-6xl font-black tracking-wider relative text-white">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
                                    GAMING ARCHIVE
                                </span>
                                <motion.span
                                    className="absolute -top-2 -right-8 text-xs font-normal text-purple-500"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    CLASSIFIED
                                </motion.span>
                            </h1>
                            <Target className="w-10 h-10 text-blue-500" />
                        </div>
                        <p className="text-lg font-mono text-gray-400">
                            // SECRET GAMEPLAY VAULT
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <Award className="w-5 h-5 text-purple-500" />
                            <span className="text-sm font-mono text-gray-500">
                                {videos.length} EPIC MOMENTS ARCHIVED
                            </span>
                        </div>
                    </motion.div>

                    {/* Laptop Video Player */}
                    {videos.length > 0 ? (
                        <LaptopVideoPlayer videos={videos} />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Crosshair className="w-24 h-24 mx-auto mb-4 text-gray-600" />
                            <p className="text-xl font-mono text-gray-500">
                                Loading gaming archive...
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ValorantPage;
