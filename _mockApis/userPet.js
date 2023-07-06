const PET_PROFILES = [
  {
    id: 1,
    user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../assets/images/rainamira-avatar.jpg") },
    pet: {
      pet_id: 1,
      name: "Sashi",
      type: "Cat",
      gender: "Male",
      breed: "Persian",
      age: 24,
      weight: 4.75,
      characters: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      colour: ["Grey", "White"],
      address: "Jl. Pemuda, Taman Berdikari SentosaJl. Pemuda, Taman Berdikari Sentosa",
      photosUrl: [require("../assets/images/sashi-1.jpeg"), require("../assets/images/sashi-2.jpeg"), require("../assets/images/sashi-3.jpeg")],
    },
  },
  {
    id: 2,
    user: { user_id: "uid2", name: "Raisya Natta", profileUrl: require("../assets/images/raisya-natta-avatar.jpg") },
    pet: {
      pet_id: 2,
      name: "Mishka",
      type: "Cat",
      gender: "Female",
      breed: "Mainecoon",
      age: 29,
      weight: 5.8,
      characters: ["Vocal", "Active", "Clingy"],
      likes: "I like to play throw and catch all day",
      dislikes: "Being alone without my human :(",
      bio: "Want to be compete on play throw and catch?",
      vaccinated: true,
      colour: ["White"],
      address: "Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan Jl. Lauser, Jakarta Selatan",
      photosUrl: [require("../assets/images/mishka-1.jpeg"), require("../assets/images/mishka-2.jpeg"), require("../assets/images/mishka-3.jpeg")],
    },
  },
  {
    id: 3,
    user: { user_id: "uid3", name: "Vincent Alden", profileUrl: require("../assets/images/vincent-alden-avatar.jpg") },
    pet: {
      name: "Cosmo",
      type: "Dog",
      gender: "Male",
      breed: "Shiba Inu",
      age: 31,
      weight: 6.75,
      characters: ["Active", "Smart", "Playful"],
      likes: "I like my plushies!",
      dislikes: "Human strangers",
      bio: "I can be your friend but pls bring your own plushies on a date",
      vaccinated: true,
      colour: ["Red", "White"],
      address: "Jl. Sutan Syahrir, Jakarta Pusat",
      photosUrl: [require("../assets/images/cosmo-1.jpeg"), require("../assets/images/cosmo-2.jpeg"), require("../assets/images/cosmo-3.jpeg")],
    },
  },
];

const USER_PET_PROFILES = {
  id: 1,
  user: { user_id: "uid1", name: "Rainamira Azzahra", profileUrl: require("../assets/images/rainamira-avatar.jpg") },
  pets: [
    {
      pet_id: 1,
      name: "Cosmo",
      type: "Dog",
      gender: "Male",
      breed: "Shiba",
      age: 24,
      weight: 4.75,
      characters: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      colour: ["Grey", "White"],
      address: "Jl. Pemuda, Taman Berdikari SentosaJl. Pemuda, Taman Berdikari Sentosa",
      photosUrl: [require("../assets/images/cosmo-1.jpeg"), require("../assets/images/sashi-2.jpeg"), require("../assets/images/sashi-3.jpeg")],
    },
    {
      pet_id: 2,
      name: "Hera",
      type: "Cat",
      gender: "Female",
      breed: "Persian",
      age: 24,
      weight: 4.75,
      characters: ["Active", "Cuddly", "Clingy"],
      likes: "Play, eat, sleep, repeat",
      dislikes: "Sensitive to vacuum cleaner and hairdryer sound",
      bio: "Want to be my play date?",
      vaccinated: true,
      colour: ["Grey", "White"],
      address: "Jl. Pemuda, Taman Berdikari SentosaJl. Pemuda, Taman Berdikari Sentosa",
      photosUrl: [require("../assets/images/sashi-1.jpeg"), require("../assets/images/sashi-2.jpeg"), require("../assets/images/sashi-3.jpeg")],
    },
  ],
};

export { PET_PROFILES, USER_PET_PROFILES };
