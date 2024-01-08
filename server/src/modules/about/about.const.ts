import {
  type ServiceDto
} from './about.dto'

export enum ServiceName {
  GMAIL = 'gmail',
  GOOGLE = 'gdrive',
  DISCORD = 'discord',
  SPOTIFY = 'spotify',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  GITHUB = 'github',
  WHEATHER = 'meteo',
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
      { name: 'Is last email read', description: 'Trigger when teh last email is readed'},
    ],
    reactions: [
      {name: 'Send an e-mail',description: 'Send an email to someone', param1: 'toEmailAddress', param2: 'fromEmailAddress', param3: 'subject', param4: 'bodyText'},
    ]
  },
  {
    name: ServiceName.GOOGLE,
    image: 'assets/logo/gdrive.png',
    actions: [
      // { name: 'New file', description: 'Trigger when a new file is uploaded' },
    ],
    reactions: [
      // {name: 'Save a file',description: 'Save a file in the drive',},
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
      { name: 'Are new playlist', description: 'Check if a playlist a created' },
      { name: 'Is playing song', description: 'Check if a song is played' },
    ],
    reactions: [
      { name: 'Play the current song', description: 'Play or resume the current song' },
    ]
  },
  {
    name: ServiceName.INSTAGRAM,
    image: 'assets/logo/instagram.png',
    actions: [
        // { name: 'New photo by you', description: 'Trigger every time you share any new photo on Instagram'},
    ],
    reactions: []
  },
  {
    name: ServiceName.TWITTER,
    image: 'assets/logo/twitter.png',
    actions: [
      { name: 'Is my word in tendancy', description: 'Trigger when my words ar in tendancies' ,param1: 'word1', param2: 'word2', param3: 'word3', param4: 'word4'},
    ],
    reactions: [
      { name: 'Tweet', description: 'Create a new tweet', param1: 'Text of the tweet'},
    ]
  },
  {
    name: ServiceName.GITHUB,
    image: 'assets/logo/github.png',
    actions: [
      { name: 'Is new issue', description: 'Trigger when a new issue is created in a repo' ,param1: 'Owner', param2: 'Repository'},
    ],
    reactions: [
      { name: 'Create an issue', description: 'Create an issue in the repository' ,param1: 'Owner', param2: 'Repository', param3: 'Header',param4: 'Body'},
    ]
  },
  {
    name: ServiceName.WHEATHER,
    image: 'assets/logo/meteo.png',
    actions: [
      { name: 'Get the weather', description: 'Trigger getting the current weather information', param1: 'Location (ex:Paris)' },
    ],
    reactions: []
  },
  {
    name: ServiceName.TIMER,
    image: 'assets/logo/timer.png',
    actions: [
      { name: 'Start a timer', description: 'Trigger starting a timer', param1: 'Time in minute (ex: 15)'},
    ],
    reactions: []
  }
]
