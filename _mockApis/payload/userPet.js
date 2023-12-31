// PET PROFILE STACKS FOR MATCHMAKING PAGE
const PET_PROFILES = [
  {
    id: 1,
    user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../../assets/images/rainamira-avatar.jpg") },
    pet: {
      pet_id: 1,
      name: "Sashi",
      type: "Cat",
      gender: "Male",
      breed: "Persian",
      age: 24,
      weight: 4.75,
      character: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      color: ["Grey", "White"],
      address: "Jakarta Selatan",
      photosUrl: [require("../../assets/images/sashi-1.jpeg"), require("../../assets/images/sashi-2.jpeg"), require("../../assets/images/sashi-3.jpeg")],
    },
  },
  {
    id: 2,
    user: { user_id: "uid2", name: "Raisya Natta", profileUrl: require("../../assets/images/raisya-natta-avatar.jpg") },
    pet: {
      pet_id: 2,
      name: "Mimi",
      type: "Cat",
      gender: "Female",
      breed: "Mainecoon",
      age: 29,
      weight: 5.8,
      character: ["Vocal", "Active", "Clingy"],
      likes: "I like to play throw and catch all day",
      dislikes: "Being alone without my human :(",
      bio: "Want to be compete on play throw and catch?",
      vaccinated: true,
      color: ["White"],
      address: "Jakarta Selatan",
      photosUrl: [require("../../assets/images/mimi-1.jpg"), require("../../assets/images/mimi-2.jpg")],
    },
  },
  {
    id: 3,
    user: { user_id: "uid3", name: "Vincent Alden", profileUrl: require("../../assets/images/vincent-alden-avatar.jpg") },
    pet: {
      name: "Pluto",
      type: "Dog",
      gender: "Male",
      breed: "Shiba Inu",
      age: 31,
      weight: 6.75,
      character: ["Active", "Smart", "Playful"],
      likes: "I like my plushies!",
      dislikes: "Human strangers",
      bio: "I can be your friend but pls bring your own plushies on a date",
      vaccinated: true,
      color: ["Red", "White"],
      address: "Jakarta Timur",
      photosUrl: [require("../../assets/images/cosmo-1.jpeg"), require("../../assets/images/cosmo-2.jpeg"), require("../../assets/images/cosmo-3.jpeg")],
    },
  },
];

// LIST OF PETS OWN BY A USER
// USED BY SWITCH PROFILE DRAWER AND USER PET PROFILE PAGE
const USER_PET_PROFILES = {
  id: 1,
  user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../../assets/images/rainamira-avatar.jpg") },
  pets: [
    {
      pet_id: 1,
      name: "Cosmo",
      type: "Dog",
      gender: "Male",
      breed: "Shiba",
      age: 24,
      weight: 4.75,
      character: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      color: ["Grey", "White"],
      address: "Jakarta Timur",
      photosUrl: [require("../../assets/images/cosmo-1.jpeg"), require("../../assets/images/cosmo-2.jpeg"), require("../../assets/images/cosmo-3.jpeg")],
    },
    {
      pet_id: 2,
      name: "Hera",
      type: "Cat",
      gender: "Female",
      breed: "British Short Hair",
      age: 24,
      weight: 4.75,
      character: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      color: ["Grey", "White"],
      address: "Jakarta Timur",
      photosUrl: [require("../../assets/images/hera-1.jpg")],
    },
  ],
};

const LIKE_PET_PROFILES = [
  {
    pet_id: 4,
    name: "Robby",
    type: "Cat",
    gender: "Male",
    breed: "Persian",
    age: 60,
    weight: 6.4,
    character: ["Curious", "Smart", "Reflects Affection"],
    likes: "Ring a bell and i'll come over to you",
    dislikes: "Locked in my beautiful cage",
    bio: "Hi! i like everyone",
    vaccinated: true,
    color: ["Black", "Brown", "White"],
    address: "Jakarta Utara",
    photosUrl: [require("../../assets/images/robby-1.jpg")],
  },
  {
    pet_id: 6,
    name: "Prada",
    type: "Cat",
    gender: "Male",
    breed: "British Short Hair",
    age: 48,
    weight: 5.5,
    character: "Lazy, Scared Of People, Clingy",
    like: "My owners bed",
    dislike: "Public place especially the vet place",
    bio: "my owners force me to be here",
    vaccinated: true,
    color: "Grey",
    user: { user_id: "uid1", name: " Rakha Putra", profileUrl: require("../../assets/images/rakha-putra-avatar.jpg"), dateCreated: "2021-05-01T00:00:00.000Z" },
    address: "Jakarta Selatan",
    photosUrl: [require("../../assets/images/prada-1.jpg")],
  },
];

// 'sociable',
// 'outgoing',
// 'trustworthy',
// 'straightforward',
// 'anxious',
// 'irritable',
// 'shy',
// 'curious',
// 'imaginative',
// 'excitable',
// 'efficient',
// 'thorough',
// 'not lazy',

// 'insecure',
// 'fearful',
// 'scared of people',
// 'suspicious',
// 'shy',
// 'active',
// 'alert',
// 'curious',
// 'inquisitive',
// 'inventive',
// 'smart',
// 'tyranny',
// 'bullying',
// 'aggressiveness',
// 'volatility',
// 'unpredictability',
// 'ruthlessness',
// 'reflects affection',
// 'gentleness',
// 'friendliness towards people',

export { PET_PROFILES, USER_PET_PROFILES, LIKE_PET_PROFILES };
