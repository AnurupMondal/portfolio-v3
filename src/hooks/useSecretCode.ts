import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to detect secret key sequences
 * @param targetSequence - Array of keys that need to be pressed in order
 * @param onSuccess - Callback function when sequence is completed
 */
export const useSecretCode = (
    targetSequence: string[],
    onSuccess: () => void
) => {
    const [currentSequence, setCurrentSequence] = useState<string[]>([]);
    const [isActivated, setIsActivated] = useState(false);

    const resetSequence = useCallback(() => {
        setCurrentSequence([]);
    }, []);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            setCurrentSequence((prev) => {
                const newSequence = [...prev, key];

                // Keep only the last N keys where N is the target sequence length
                const trimmedSequence = newSequence.slice(-targetSequence.length);

                // Check if the sequence matches
                const sequenceMatches = trimmedSequence.every(
                    (k, i) => k === targetSequence[i]?.toLowerCase()
                );

                if (sequenceMatches && trimmedSequence.length === targetSequence.length) {
                    setIsActivated(true);
                    onSuccess();
                    return [];
                }

                return trimmedSequence;
            });
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [targetSequence, onSuccess]);

    return { isActivated, resetSequence, currentSequence };
};
