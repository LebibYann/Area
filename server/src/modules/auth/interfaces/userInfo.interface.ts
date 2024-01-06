/**
 * Interface representing the information contained in an ID token.
 */
export interface IDTokenInfo {
  iss: string
  sub: string
  aud: string
  exp: number
  iat: number
  name?: string
  given_name?: string
  family_name?: string
  gender?: string
  birthdate?: string
  email: string
  picture: string
}

/**
 * Interface representing user information from the Spotify service.
 */
export interface SpotifyUserInfo {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  href: string
  id: string
  images: Array<{
    height: null
    url: string
    width: null
  }>
  product: string
  type: string
  uri: string
}

/**
 * Interface representing user information from the Discord service.
 */
export interface DiscordUserInfo {
  application: {
    id: string
    name: string
    icon: string
    description: string
    hooks: boolean
    bot_public: boolean
    bot_require_code_grant: boolean
    verify_key: string
  }
  scopes: string[]
  expires: string
  user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name: string
    public_flags: number
  }
}
