export const googleConfig = {
    GOOGLE_TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
    GOOGLE_CLIENT_ID: '363322350143-no4515to4s888p2q1i7imr73mqb5279h.apps.googleusercontent.com',
} as const;

export const discordConfig = {
    DISCORD_TOKEN_ENDPOINT: 'https://discord.com/api/oauth2/token',
    DISCORD_USER_INFO_ENDPOINT: 'https://discord.com/api/oauth2/@me',
    DISCORD_CLIENT_ID: '1184305079029878785',
} as const;

export const spotifyConfig = {
    SPOTIFY_TOKEN_ENDPOINT: 'https://accounts.spotify.com/api/token',
    SPOTIFY_USER_INFO_ENDPOINT: 'https://api.spotify.com/v1/me',
    SPOTIFY_CLIENT_ID: '540f0cb998124069aae6432d65cf9252',
} as const;
