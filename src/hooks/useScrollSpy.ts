import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], offset: number = 100) => {
    const [activeId, setActiveId] = useState<string>('home');

    useEffect(() => {
        const handleScroll = () => {
            // If we're at the very top, always show home as active
            if (window.scrollY < 100) {
                setActiveId('home');
                return;
            }

            // Find all sections and their positions
            const sections = ids
                .map(id => {
                    const element = document.getElementById(id);
                    if (!element) return null;

                    const rect = element.getBoundingClientRect();
                    const top = rect.top + window.scrollY;
                    const bottom = top + rect.height;

                    return { id, top, bottom, height: rect.height };
                })
                .filter(Boolean) as Array<{ id: string; top: number; bottom: number; height: number }>;

            // Find the section that's currently in view
            // Prioritize sections where the top is visible or we're scrolled past the top
            for (const section of sections) {
                const viewportTop = window.scrollY;
                const viewportMiddle = viewportTop + window.innerHeight / 3; // Use top third of viewport

                if (viewportMiddle >= section.top && viewportMiddle < section.bottom) {
                    setActiveId(section.id);
                    return;
                }
            }

            // If we're near the bottom of the page, activate the last section
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                const lastSection = sections[sections.length - 1];
                if (lastSection) {
                    setActiveId(lastSection.id);
                }
            }
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => window.removeEventListener('scroll', throttledScroll);
    }, [ids, offset]);

    return activeId;
};
