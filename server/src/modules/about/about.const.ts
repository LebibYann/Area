import {
  type ServiceDto
} from './about.dto'

export enum ServiceName {
  GMAIL = 'gmail',
  GOOGLE = 'google',
  DISCORD = 'discord',
  SPOTIFY = 'spotify',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  GITHUB = 'github',
  WHEATHER = 'weather',
  TIMER = 'timer'
}

/**
 * About.json
 * Format of the about.json
 */
export const services: ServiceDto[] = [
  {
    name: ServiceName.GMAIL,
    image: 'assets/logo/gmail.png',
    actions: [
      { name: 'Receive an e-mail', description: 'Trigger receiving an email via Gmail', param1: 'test', param2: 'test2' },
    ],
    reactions: [
      {name: 'Send an e-mail',description: 'Send an email to someone',},
    ]
  },
  {
    name: ServiceName.GOOGLE,
    image: 'assets/logo/gdrive.png',
    actions: [
      { name: 'New file', description: 'Trigger when a new file is uploaded' },
    ],
    reactions: [
      {name: 'Save a file',description: 'Save a file in the drive',},
    ]
  },
  {
    name: ServiceName.DISCORD,
    image: 'assets/logo/discord.png',
    actions: [
      { name: 'Mention', description: 'Trigger when mentionned in a chanel' },
    ],
    reactions: [
      { name: 'React to a message', description: 'React to the last message' },
    ]
  },
  {
    name: ServiceName.SPOTIFY,
    image: 'assets/logo/spotify.png',
    actions: [
      { name: 'Play a song', description: 'Trigger playing a song on Spotify' },
    ],
    reactions: [
      { name: 'Add to the playlist', description: 'Trigger adding a song to a Spotify playlist' },
    ]
  },
  {
    name: ServiceName.INSTAGRAM,
    image: 'assets/logo/instagram.png',
    actions: [
        { name: 'New photo by you', description: 'Trigger every time you share any new photo on Instagram'},
    ],
    reactions: []
  },
  {
    name: ServiceName.TWITTER,
    image: 'assets/logo/twitter.png',
    actions: [
      { name: 'Retweet', description: 'Trigger when your get retweet' },
    ],
    reactions: [
      { name: 'Like', description: 'Like a post' },
    ]
  },
  {
    name: ServiceName.GITHUB,
    image: 'assets/logo/github.png',
    actions: [
      { name: 'Create a repository', description: 'Trigger creating a new repository on GitHub' },
    ],
    reactions: [
      { name: 'Upload a Readme', description: 'Upload a Readme on a repository' },
    ]
  },
  {
    name: ServiceName.WHEATHER,
    image: 'assets/logo/meteo.png',
    actions: [
      { name: 'Get the weather', description: 'Trigger getting the current weather information' },
    ],
    reactions: []
  },
  {
    name: ServiceName.TIMER,
    image: 'assets/logo/timer.png',
    actions: [
      { name: 'Start a timer', description: 'Trigger starting a timer' },
    ],
    reactions: []
  }
]
