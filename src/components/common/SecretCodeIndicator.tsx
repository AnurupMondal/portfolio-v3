import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Zap } from 'lucide-react';

interface SecretCodeIndicatorProps {
    isVisible: boolean;
    message?: string;
}

const SecretCodeIndicator = ({
    isVisible,
    message = "GAMER MODE ACTIVATED"
}: SecretCodeIndicatorProps) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50 }}
                    className="fixed bottom-8 right-8 z-[9999] pointer-events-none"
                >
                    <motion.div
                        className="relative bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-white/20"
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(139, 92, 246, 0.5)',
                                '0 0 40px rgba(139, 92, 246, 0.8)',
                                '0 0 20px rgba(139, 92, 246, 0.5)',
                            ],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    initial={{
                                        x: Math.random() * 100 + '%',
                                        y: Math.random() * 100 + '%',
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: [null, '-100%'],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            >
                                <Gamepad2 className="w-6 h-6" />
                            </motion.div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Zap className="w-4 h-4" />
                                    <span className="font-black text-sm tracking-wider">
                                        {message}
                                    </span>
                                </div>
                                <p className="text-xs font-mono opacity-90">
                                    Redirecting to gamer vault...
                                </p>
                            </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SecretCodeIndicator;
