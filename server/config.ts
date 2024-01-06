/**
 * GoogleConfig
 * Google keys.
 */
export const googleConfig = {
    TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
    CLIENT_ID: '363322350143-no4515to4s888p2q1i7imr73mqb5279h.apps.googleusercontent.com',
} as const;

/**
 * DiscordConfig
 * Discord keys.
 */
export const discordConfig = {
    TOKEN_ENDPOINT: 'https://discord.com/api/oauth2/token',
    USER_INFO_ENDPOINT: 'https://discord.com/api/oauth2/@me',
    CLIENT_ID: '1184305079029878785',
} as const;

/**
 * SpotifyConfig
 * Spotify keys.
 */
export const spotifyConfig = {
    TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
    USER_INFO_ENDPOINT: 'https://api.spotify.com/v1/me',
    CLIENT_ID: '540f0cb998124069aae6432d65cf9252',
} as const;

/**
 * TwitterConfig
 * Twitter keys.
 */
 export const twitterConfig = {
    TWITTER_TOKEN_ENDPOINT: 'https://api.twitter.com/2/oauth2/token',
    USER_INFO_ENDPOINT: 'https://api.twitter.com/1.1/account/verify_credentials.json',
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