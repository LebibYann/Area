import {
  type ServiceDto
} from './about.dto'

/**
 * About.json
 * Format of the about.json
 */
export const services: ServiceDto[] = [
  {
    name: 'gmail',
    image: 'assets/logo/gmail.png',
    actions: [
      { name: 'receiveEmail', description: 'Trigger receiving an email via Gmail', param1: 'test', param2: 'test2' },
    ],
    reactions: [
      {name: 'sendMail',description: 'Send email to someone',},
    ]
  },
  {
    name: 'gdrive',
    image: 'assets/logo/gdrive.png',
    actions: [
      { name: 'newFile', description: 'Trigger when a new file is uploaded' },
    ],
    reactions: [
      {name: 'saveFile',description: 'Save a file in the drive',},
    ]
  },
  {
    name: 'discord',
    image: 'assets/logo/discord.png',
    actions: [
      { name: 'Mention', description: 'Trigger when mentionned in a chanel' },
    ],
    reactions: [
      { name: 'ReactToMessage', description: 'React to the last message' },
    ]
  },
  {
    name: 'spotify',
    image: 'assets/logo/spotify.png',
    actions: [
      { name: 'playSong', description: 'Trigger playing a song on Spotify' },
    ],
    reactions: [
      { name: 'addToPlaylist', description: 'Trigger adding a song to a Spotify playlist' },
    ]
  },
  {
    name: 'instagram',
    image: 'assets/logo/instagram.png',
    actions: [],
    reactions: []
  },
  {
    name: 'twitter',
    image: 'assets/logo/twitter.png',
    actions: [
      { name: 'Retweet', description: 'Trigger when your get retweet' },
    ],
    reactions: [
      { name: 'Like', description: 'Like a post' },
    ]
  },
  {
    name: 'github',
    image: 'assets/logo/github.png',
    actions: [
      { name: 'createRepository', description: 'Trigger creating a new repository on GitHub' },
    ],
    reactions: [
      { name: 'upoaldReadMe', description: 'Upload Readme on a repository' },
    ]
  },
  {
    name: 'meteo',
    image: 'assets/logo/meteo.png',
    actions: [
      { name: 'getWeather', description: 'Trigger getting the current weather information' },
    ],
    reactions: []
  },
  {
    name: 'timer',
    image: 'assets/logo/timer.png',
    actions: [
      { name: 'startTimer', description: 'Trigger starting a timer' },
    ],
    reactions: []
  }
]
