// GitHub Configuration
export const GITHUB_USERNAME = 'AnurupMondal';

// Cache settings
export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
export const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache keys
export const CACHE_KEYS = {
    REPOS: `github_repos_v3_${GITHUB_USERNAME}`,
    PROFILE: `github_profile_v3_${GITHUB_USERNAME}`,
    STATS: `github_stats_v3_${GITHUB_USERNAME}`,
    TIMESTAMP: `github_cache_timestamp_v3_${GITHUB_USERNAME}`
};
