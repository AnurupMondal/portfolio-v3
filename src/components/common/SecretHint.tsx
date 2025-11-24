import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useState } from 'react';

/**
 * Optional component to hint at the secret Valorant page
 * Add this to your Home page or Footer if you want to give users a clue
 */
const SecretHint = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-4 left-4 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative cursor-help"
                whileHover={{ scale: 1.1 }}
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4655] to-[#fd4556] flex items-center justify-center shadow-lg">
                    <Lock className="w-6 h-6 text-white" />
                </div>

                {/* Pulsing ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#ff4655]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />

                {/* Tooltip */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                        <div className="bg-[#1a1f2e] border border-[#ff4655]/30 rounded-lg px-4 py-2 shadow-xl">
                            <p className="text-sm text-gray-300 font-mono">
                                🔐 Secret unlocked by typing...
                            </p>
                            <p className="text-xs text-[#ff4655] mt-1 font-bold tracking-wider">
                                Try typing "VALORANT"
                            </p>
                        </div>
                        {/* Arrow */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#ff4655]/30" />
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default SecretHint;
