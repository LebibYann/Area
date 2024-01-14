import {
  type ServiceDto
} from './about.dto'

export enum ServiceName {
  GMAIL = 'google',
  GOOGLE = 'gdrive',
  DISCORD = 'discord',
  SPOTIFY = 'spotify',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  GITHUB = 'github',
  WEATHER = 'meteo',
  TIMER = 'timer'
}

/**
 * About.json
 * Format of the about.json
 */
export const services: ServiceDto[] = [
  {
    id: 0,
    name: ServiceName.GMAIL,
    image: 'assets/logo/gmail.png',
    actions: [
      { id: 0, name: 'Is last email read', description: 'Trigger when the last email is red'}, //started
    ],
    reactions: [
      {id: 0, name: 'Send an e-mail',description: 'Send an email to someone', param1: 'toEmailAddress', param2: 'fromEmailAddress', param3: 'subject', param4: 'bodyText'}, //ok
    ]
  },
  {
    id: 1,
    name: ServiceName.GOOGLE,
    image: 'assets/logo/gdrive.png',
    actions: [],
    reactions: []
  },
  {
    id: 2,
    name: ServiceName.DISCORD,
    image: 'assets/logo/discord.png',
    actions: [
    ],
    reactions: [
      {id: 0, name: 'Send a message in channel', description: 'Send a message in general channel', param1: 'message' }, //ok
    ]
  },
  {
    id: 3,
    name: ServiceName.SPOTIFY,
    image: 'assets/logo/spotify.png',
    actions: [
      {id: 0, name: 'New follower Spotify', description: 'Trigger when you get a new follower' }, //ok
      {id: 1, name: 'Is playing song', description: 'Check if a song is played' }, //ok
      {id: 2, name: 'Cap follower', description: 'Trigger when you get a cap of follower', param1: 'followers (Ex 10)' }, //ok
    ],
    reactions: []
  },
  {
    id: 4,
    name: ServiceName.INSTAGRAM,
    image: 'assets/logo/instagram.png',
    actions: [],
    reactions: []
  },
  {
    id: 5,
    name: ServiceName.TWITTER,
    image: 'assets/logo/twitter.png',
    actions: [
      {id: 0, name: 'Is my word in tendancy', description: 'Trigger when my words are in tendancies' ,param1: 'word1', param2: 'word2', param3: 'word3', param4: 'word4'},
      {id: 1, name: 'New follower Twitter', description: 'Trigger when you get a new follower' }, //ok
    ],
    reactions: []
  },
  {
    id: 6,
    name: ServiceName.GITHUB,
    image: 'assets/logo/github.png',
    actions: [
      {id: 0, name: 'Is new issue', description: 'Trigger when a new issue is created in a repo' ,param1: 'Owner', param2: 'Repository'}, //started
      {id: 1  , name: 'New follower Github', description: 'Trigger when you get a new follower' }, //ok
    ],
    reactions: [
      {id: 0, name: 'Create an issue', description: 'Create an issue in a repository' ,param1: 'Owner', param2: 'Repository', param3: 'Title',param4: 'Body'}, //started
      {id: 1, name: 'Create an repository', description: 'Create a repository' ,param1: 'Name', param2: 'Description'}, //ok
    ]
  },
  {
    id: 7,
    name: ServiceName.WEATHER,
    image: 'assets/logo/meteo.png',
    actions: [
      {id: 0, name: 'Is Equal', description: 'Trigger when the temperature is equal', param1: 'Location (ex:Paris)', param2: 'Temperature in celcius (ex: 2)' }, //ok
      {id: 1, name: 'Is windy', description: 'Trigger when the wind force is above', param1: 'Location (ex:Paris)', param2: 'wind in kph (ex: 2)' }
    ],
    reactions: []
  },
  {
    id: 8,
    name: ServiceName.TIMER,
    image: 'assets/logo/timer.png',
    actions: [
      {id: 0, name: 'Start a timer', description: 'Trigger starting a timer', param1: 'Time in seconds' }, //ok
    ],
    reactions: []
  }
]
