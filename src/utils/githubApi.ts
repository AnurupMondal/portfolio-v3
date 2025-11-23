import { CACHE_DURATION, CACHE_KEYS } from '../config/github';

interface GitHubProfile {
    avatar_url: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
}

export const fetchGitHubProfile = async (username: string): Promise<GitHubProfile | null> => {
    try {
        // Check cache first
        const cachedProfile = localStorage.getItem(CACHE_KEYS.PROFILE);
        const cachedTimestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

        if (cachedProfile && cachedTimestamp) {
            const now = Date.now();
            if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                return JSON.parse(cachedProfile);
            }
        }

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub profile');
        }

        const data = await response.json();

        // Update cache
        localStorage.setItem(CACHE_KEYS.PROFILE, JSON.stringify(data));
        localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());

        return data;
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
};
export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
    try {
        // Check cache first
        const cachedRepos = localStorage.getItem(CACHE_KEYS.REPOS);
        const cachedTimestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

        if (cachedRepos && cachedTimestamp) {
            const now = Date.now();
            if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                return JSON.parse(cachedRepos);
            }
        }

        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub repos');
        }

        const data = await response.json();

        // Update cache
        localStorage.setItem(CACHE_KEYS.REPOS, JSON.stringify(data));
        // We might want separate timestamps or just share one. Sharing one is fine for now if we fetch both often.
        // Or we can just rely on the profile timestamp if we want strictly synchronized updates, but separate is safer if called independently.
        // For simplicity, let's just update the timestamp here too.
        localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());

        return data;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
};
