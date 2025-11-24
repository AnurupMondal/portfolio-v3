import { useState, useEffect } from 'react';

interface VideoMetadata {
    title: string;
    uploadDate: string;
    thumbnail: string;
}

// Extract video ID from YouTube URL
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

// Fetch video metadata using oEmbed API (no API key required)
const fetchVideoMetadata = async (videoId: string): Promise<VideoMetadata | null> => {
    try {
        // Use YouTube oEmbed API - no API key needed
        const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch video metadata');
        }

        const data = await response.json();

        // oEmbed doesn't provide upload date, so we'll use current date as fallback
        // For thumbnails, we can construct the URL directly
        return {
            title: data.title || 'Untitled Video',
            uploadDate: new Date().toISOString().split('T')[0], // Current date as fallback
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        };
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        return null;
    }
};

export const useYouTubeMetadata = (url: string) => {
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMetadata = async () => {
            setLoading(true);
            setError(null);

            const videoId = getYouTubeVideoId(url);

            if (!videoId) {
                setError('Invalid YouTube URL');
                setLoading(false);
                return;
            }

            const data = await fetchVideoMetadata(videoId);

            if (data) {
                setMetadata(data);
            } else {
                setError('Failed to load video metadata');
            }

            setLoading(false);
        };

        loadMetadata();
    }, [url]);

    return { metadata, loading, error };
};
