import VietNamBanner from "../../assets/banner.png";

export const cities = [
    { title: "Hanoi", description: "Hanoi is a seething metropolis that’s packed with traditional hutong houses and the grand edifices of Ho Chi Minh’s legacy." },
    { title: "Ho Chi Minh City", description: "Ho Chi Minh City, also known as Saigon, is a bustling urban center with modern skyscrapers, French colonial buildings, and vibrant street markets." },
    { title: "Da Nang", description: "Da Nang is known for its sandy beaches and history as a French colonial port." },
    { title: "Hue", description: "Hue is a city in central Vietnam that was the seat of Nguyen Dynasty emperors and the national capital from 1802 to 1945." },
    { title: "Hoi An", description: "Hoi An is a well-preserved ancient town known for its mix of different cultures and a fusion of indigenous and foreign influences." },
    { title: "Nha Trang", description: "Nha Trang is a coastal city known for its beautiful beaches, diving sites, and offshore islands." },
    { title: "Can Tho", description: "Can Tho is known for its floating markets, rice paper-making village, and picturesque rural canals." },
    { title: "Sapa", description: "Sapa is a town in the Hoàng Liên Son Mountains of northwestern Vietnam, known for its terraced rice fields and cultural diversity." }
];

export const tourDetailData = {
    description: "A thrilling journey through Ho Chi Minh City.",
    highlights: [
      "Explore the Ethnology Museum, famous for representing 54 minorities.",
      "Visit the bustling Ben Thanh Market.",
      "Enjoy a traditional Vietnamese meal at a local restaurant."
    ],
    itinerary: [
      {
        day: "One day in Ha Noi",
        activities: [
          "Visit Ho Chi Minh’s complex, the final resting place of Vietnam’s greatest father, and One Pillar Pagoda- modelled after a lotus flower, a symbol of Hanoi."
        ]
      }
    ],
    whatsIncluded: [
      "Professional English-speaking Vietnamese guide.",
      "Entrance fees to all mentioned sights.",
      "Lunch at a local restaurant."
    ],
    whatsExcluded: [
      "Personal expenses.",
      "Tips and gratuities."
    ],
    price: [
        { from: 1, to: 3, adult: 50, child: 30 },
        { from: 4, to: 6, adult: 45, child: 25 },
        { from: 7, to: 10, adult: 40, child: 20 }
      ],
      reviews: {
        stars: 4.5, // Average rating
        amount: 20, // Total number of reviews
        ratings: [
          {
            name: "John Doe",
            date: 1623469200, // Unix timestamp in seconds
            star: 5,
            description: "Amazing tour, highly recommended!"
          },
          {
            name: "Jane Smith",
            date: 1623469200, // Unix timestamp in seconds
            star: 4,
            description: "Great experience, learned a lot about Vietnamese culture."
          },
          // Add more ratings as needed
        ]
      }
  };

  export const tourData = [
    {
      id: 1,
      title: "Hanoi",
      description: "Hanoi is a seething metropolis that’s packed with traditional hutong houses and the grand edifices of Ho Chi Minh’s legacy.",
      imageUrl: VietNamBanner,
      tourId: "/hanoi",
    },
    {
      id: 2,
      title: "Ho Chi Minh City",
      description: "Ho Chi Minh City is known for its French colonial landmarks and bustling markets.",
      imageUrl: VietNamBanner,
      tourId: "/ho-chi-minh-city",
    },
    {
        id: 3,
        title: "Hanoi",
        description: "Hanoi is a seething metropolis that’s packed with traditional hutong houses and the grand edifices of Ho Chi Minh’s legacy.",
        imageUrl: VietNamBanner,
        tourId: "/hanoi",
      },
      {
        id: 4,
        title: "Ho Chi Minh City",
        description: "Ho Chi Minh City is known for its French colonial landmarks and bustling markets.",
        imageUrl: VietNamBanner,
        tourId: "/ho-chi-minh-city",
      },
      {
        id: 5,
        title: "Hanoi",
        description: "Hanoi is a seething metropolis that’s packed with traditional hutong houses and the grand edifices of Ho Chi Minh’s legacy.",
        imageUrl: VietNamBanner,
        tourId: "/hanoi",
      },
      {
        id: 6,
        title: "Ho Chi Minh City",
        description: "Ho Chi Minh City is known for its French colonial landmarks and bustling markets.",
        imageUrl: VietNamBanner,
        tourId: "/ho-chi-minh-city",
      },
  ];

  export const reviewsData = {
    stars: 4.5, // Average rating
    amount: 20, // Total number of reviews
    ratings: [
      {
        name: "John Doe",
        date: 1623469200, // Unix timestamp in seconds
        star: 5,
        description: "Amazing tour, highly recommended!"
      },
      {
        name: "Jane Smith",
        date: 1623469200, // Unix timestamp in seconds
        star: 4,
        description: "Great experience, learned a lot about Vietnamese culture."
      },
      // Add more ratings as needed
    ]
  }

