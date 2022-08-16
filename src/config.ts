export const PLAYER_MAX_CARDS = 5
export const MAX_DATE_IMAGES = 10

export const difficulties: Difficulty[] = [
  {
    name: 'EASY',
    description:
      'These girls like a lot of stuff and are not too picky about their men. You are gauranteed to have cards she likes. You have 60 seconds.',
    gameParams: {
      numberOfCategories: 5,
      numberOfLikes: 2,
      numberOfLoves: 2,
      numberOfHates: 0,
      timeLimit: 60,
      phoneNumberThreshold: 2,
      soulmateThreshold: 5,
    },
  },
  {
    name: 'MEDIUM',
    description:
      'These girls are tougher. You play using the full deck. You have 45 seconds.',
    gameParams: {
      numberOfCategories: 3,
      numberOfLikes: 1,
      numberOfLoves: 1,
      numberOfHates: 1,
      timeLimit: 45,
      phoneNumberThreshold: 3,
      soulmateThreshold: 5,
    },
  },
  {
    name: 'HARD',
    description: 'These girls are tough cookies and you have only 30 seconds!',
    gameParams: {
      numberOfCategories: 2,
      numberOfLikes: 1,
      numberOfLoves: 1,
      numberOfHates: 2,
      timeLimit: 8, //30,
      phoneNumberThreshold: 4,
      soulmateThreshold: 7,
    },
  },
]

export const categories = [
  'cute things',
  'scary stuff',
  'movies in general',
  'music in general',
  'nerdy stuff',
  'sports',
  'macho blokes',
  'sensitive guys',
  'sophisticated guys',
  'immature people',
  'wealthy men',
  'funny things',
]

export const cards: Card[] = [
  {
    categories: [categories[0], categories[7], categories[11]],
    name: 'Cats',
  },
  {
    categories: [categories[0]],
    name: 'Dogs',
  },
  {
    categories: [categories[1], categories[2], categories[4], categories[6]],
    name: 'Horror movies',
  },
  {
    categories: [categories[2], categories[11]],
    name: 'Comedy movies',
  },
  {
    categories: [categories[2], categories[7]],
    name: 'Soppy movies',
  },
  {
    categories: [categories[2], categories[8]],
    name: 'Documentaries',
  },
  {
    categories: [categories[2], categories[9], categories[11]],
    name: 'Cartoons',
  },
  {
    categories: [categories[2], categories[8], categories[10]],
    name: 'Theatre',
  },
  {
    categories: [categories[6]],
    name: 'Body building',
  },
  {
    categories: [categories[6]],
    name: 'Smoking',
  },
  {
    categories: [categories[8], categories[10]],
    name: 'Designer Clothes',
  },
  {
    categories: [categories[10]],
    name: 'Shopping',
  },
  {
    categories: [categories[4], categories[8]],
    name: 'Books',
  },
  {
    categories: [categories[4], categories[9]],
    name: 'Comics',
  },
  {
    categories: [categories[1], categories[6]],
    name: 'Guns',
  },
  {
    categories: [categories[4], categories[6], categories[9]],
    name: 'Porn',
  },
  {
    categories: [categories[4], categories[9]],
    name: 'Computer Games',
  },
  {
    categories: [categories[5], categories[6]],
    name: 'Football players',
  },
  {
    categories: [categories[5]],
    name: 'the Olympics',
  },
  {
    categories: [categories[5], categories[6]],
    name: 'Boxing',
  },
  {
    categories: [categories[6], categories[10]],
    name: 'Luxury Cars',
  },
  {
    categories: [categories[4], categories[7]],
    name: 'Scooters',
  },
  {
    categories: [categories[5], categories[9]],
    name: 'Skateboarding',
  },
  {
    categories: [categories[5], categories[6]],
    name: 'Surfing',
  },
  {
    categories: [categories[0], categories[7]],
    name: 'Kids',
  },
  {
    categories: [categories[3], categories[6]],
    name: 'Rap',
  },
  {
    categories: [categories[1], categories[3]],
    name: 'Heavy Metal',
  },
  {
    categories: [categories[3], categories[4]],
    name: 'Techno',
  },
  {
    categories: [categories[3], categories[10]],
    name: 'Opera',
  },
  {
    categories: [categories[1], categories[3], categories[7], categories[8]],
    name: 'Classical Music',
  },
  {
    categories: [categories[7], categories[8]],
    name: 'Nature',
  },
  {
    categories: [categories[1], categories[5]],
    name: 'Bungy Jumping',
  },
  {
    categories: [categories[8], categories[11]],
    name: 'Standup Comedy',
  },
  {
    categories: [categories[9], categories[10]],
    name: 'Tabloids',
  },
]

export const spriteLayers = {
  BACKGROUND: 100,
  FOCUS: 500,
  FOREGROUND: 1000,
  UI: 1500,
}

export const timeBetweenThoughts = 2000
