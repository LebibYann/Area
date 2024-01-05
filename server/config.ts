/**
 * GoogleConfig
 * Google keys.
 */
export const googleConfig = {
    GOOGLE_TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
    GOOGLE_CLIENT_ID: '363322350143-no4515to4s888p2q1i7imr73mqb5279h.apps.googleusercontent.com',
} as const;

/**
 * DiscordConfig
 * Discord keys.
 */
export const discordConfig = {
    DISCORD_TOKEN_ENDPOINT: 'https://discord.com/api/oauth2/token',
    DISCORD_USER_INFO_ENDPOINT: 'https://discord.com/api/oauth2/@me',
    DISCORD_CLIENT_ID: '1184305079029878785',
} as const;

/**
 * SpotifyConfig
 * Spotify keys.
 */
export const spotifyConfig = {
    SPOTIFY_TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
    SPOTIFY_USER_INFO_ENDPOINT: 'https://api.spotify.com/v1/me',
    SPOTIFY_CLIENT_ID: '540f0cb998124069aae6432d65cf9252',
} as const;

/**
 * TwitterConfig
 * Twitter keys.
 */
 export const twitterConfig = {
    TWITTER_TOKEN_ENDPOINT: 'https://api.twitter.com/2/oauth2/token',
    TWITTER_CLIENT_ID: 'RDd4M0owY3k1emZmQmR5aFlENmU6MTpjaQ',
} as const;

/**
 * GithubConfig
 * Github keys.
 */
 export const githubConfig = {
    GITHUB_TOKEN_ENDPOINT: 'https://github.com/login/oauth/access_token',
    GITHUB_CLIENT_ID: 'fee6c82e9e3f4aa4c447',
} as const;